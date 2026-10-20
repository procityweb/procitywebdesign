// Square calls this address after a purchase. It emails the buyer a welcome/next-steps message and emails you.
//   one-time packages ($99 / $199)  -> payment.updated (COMPLETED)
//   monthly plans (Care, SEO, Ads)  -> subscription.created
// Needs: SQUARE_WEBHOOK_SIGNATURE_KEY, SQUARE_WEBHOOK_URL, SQUARE_ACCESS_TOKEN, RESEND_API_KEY.
const crypto = require('crypto');
const { sendEmail, OWNER } = require('./lib/send');
const { purchaseClientEmail, purchaseOwnerEmail } = require('./lib/emails');

const API = () => process.env.SQUARE_API_BASE || 'https://connect.squareup.com';
async function sq(path) {
  const token = process.env.SQUARE_ACCESS_TOKEN;
  if (!token) return null;
  const res = await fetch(API() + path, { headers: { Authorization: 'Bearer ' + token, 'Square-Version': '2024-12-18', 'Content-Type': 'application/json' } });
  if (!res.ok) { console.error('Square API', path, res.status); return null; }
  return res.json();
}

function verify(rawBody, header) {
  const key = process.env.SQUARE_WEBHOOK_SIGNATURE_KEY, url = process.env.SQUARE_WEBHOOK_URL;
  if (!key || !url || !header) return false;
  const expected = crypto.createHmac('sha256', key).update(url + rawBody).digest('base64');
  const a = Buffer.from(expected), b = Buffer.from(String(header));
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

function classify(names, amount) {
  const n = names.join(' ').toLowerCase();
  if (/10[\s-]*page/.test(n)) return 'site10';
  if (/\b5[\s-]*page/.test(n)) return 'site5';
  if (/care/.test(n)) return 'care';
  if (/seo/.test(n)) return 'seo';
  if (/google/.test(n)) return 'gads';
  if (/facebook|instagram|social/.test(n)) return 'social';
  if (!names.length) { if (amount === 9900) return 'site5'; if (amount === 5900) return 'care'; }
  return 'other';
}

async function customerInfo(id) {
  if (!id) return {};
  const c = await sq('/v2/customers/' + encodeURIComponent(id));
  const cu = c && c.customer;
  return cu ? { email: cu.email_address, name: [cu.given_name, cu.family_name].filter(Boolean).join(' '), phone: cu.phone_number } : {};
}

async function deliver(kind, ctx, idKey) {
  const out = {};
  try { const m = purchaseOwnerEmail(kind, ctx); await sendEmail({ to: OWNER(), subject: m.subject, html: m.html, text: m.text, replyTo: ctx.email, idempotencyKey: idKey + '-owner', fallbackToTestSender: true }); out.owner = 'sent'; } catch (e) { console.error(e.message); out.owner = 'failed'; }
  if (ctx.email) { try { const m = purchaseClientEmail(kind, ctx); await sendEmail({ to: ctx.email, subject: m.subject, html: m.html, text: m.text, replyTo: OWNER(), idempotencyKey: idKey + '-client' }); out.client = 'sent'; } catch (e) { console.error(e.message); out.client = 'failed'; } }
  return out;
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'POST only' };
  const raw = event.isBase64Encoded ? Buffer.from(event.body, 'base64').toString('utf8') : event.body;
  if (!verify(raw, event.headers['x-square-hmacsha256-signature'] || event.headers['X-Square-HMACSHA256-Signature'])) return { statusCode: 403, body: 'Bad signature' };
  let body; try { body = JSON.parse(raw); } catch (e) { return { statusCode: 400, body: 'Bad JSON' }; }

  if (body.type === 'payment.updated' || body.type === 'payment.created') {
    const pay = body.data && body.data.object && body.data.object.payment;
    if (!pay || pay.status !== 'COMPLETED') return { statusCode: 200, body: 'ignored: not completed' };
    const amount = pay.amount_money && pay.amount_money.amount;
    let names = [];
    if (pay.order_id) { const o = await sq('/v2/orders/' + encodeURIComponent(pay.order_id)); names = ((o && o.order && o.order.line_items) || []).map((i) => i.name || ''); }
    const kind = classify(names, amount);
    if (['care', 'seo', 'gads', 'social'].includes(kind)) return { statusCode: 200, body: 'ignored: monthly plan, handled by subscription.created' };
    const cu = await customerInfo(pay.customer_id);
    const ctx = { email: pay.buyer_email_address || cu.email, name: cu.name || (pay.shipping_address && pay.shipping_address.first_name) || '', phone: cu.phone, amount, paidAt: pay.created_at, paymentId: pay.id };
    if (kind === 'other') ctx.note = 'Could not tell which product this was' + (process.env.SQUARE_ACCESS_TOKEN ? '. Check the item names in Square.' : ' because SQUARE_ACCESS_TOKEN is not set.');
    return { statusCode: 200, body: JSON.stringify(await deliver(kind, ctx, 'pay-' + pay.id)) };
  }

  if (body.type === 'subscription.created') {
    const sub = body.data && body.data.object && body.data.object.subscription;
    if (!sub) return { statusCode: 200, body: 'ignored' };
    let names = [];
    const v = sub.plan_variation_id && await sq('/v2/catalog/object/' + encodeURIComponent(sub.plan_variation_id));
    if (v && v.object) { const d = v.object.subscription_plan_variation_data || {}; names.push(d.name || ''); const par = d.subscription_plan_id && await sq('/v2/catalog/object/' + encodeURIComponent(d.subscription_plan_id)); if (par && par.object) names.push((par.object.subscription_plan_data || {}).name || ''); }
    const kind = classify(names.filter(Boolean), null);
    const cu = await customerInfo(sub.customer_id);
    const ctx = { email: cu.email, name: cu.name, phone: cu.phone, paidAt: sub.created_at, paymentId: sub.id };
    if (kind === 'other') ctx.note = 'New monthly plan, but I could not tell which one. Check Square.';
    return { statusCode: 200, body: JSON.stringify(await deliver(kind, ctx, 'sub-' + sub.id)) };
  }
  return { statusCode: 200, body: 'ignored: ' + body.type };
};
