// Sends one email through Resend (https://resend.com). Needs RESEND_API_KEY in Netlify > Site settings > Environment variables.
const FROM = () => process.env.FROM_EMAIL || 'Jason at Pro City Web Design <jason@procitywebdesign.com>';
const OWNER = () => process.env.OWNER_EMAIL || 'jason@procitywebdesign.com';

async function sendEmail({ to, subject, html, text, replyTo, idempotencyKey, fallbackToTestSender }) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn('RESEND_API_KEY is not set, so this email was not sent:', subject);
    return { skipped: true };
  }
  const base = process.env.RESEND_API_URL || 'https://api.resend.com';
  const headers = { Authorization: 'Bearer ' + key, 'Content-Type': 'application/json' };
  if (idempotencyKey) headers['Idempotency-Key'] = idempotencyKey;
  const body = { from: FROM(), to: Array.isArray(to) ? to : [to], subject, html, text };
  if (replyTo) body.reply_to = replyTo;
  let res = await fetch(base + '/emails', { method: 'POST', headers, body: JSON.stringify(body) });
  if (!res.ok && fallbackToTestSender && (res.status === 403 || res.status === 422)) {
    // Your domain is not verified yet. Resend's test sender can still deliver to the email address you signed up to Resend with.
    const msg = await res.text();
    if (/verif/i.test(msg)) {
      console.warn('Domain not verified yet, using Resend test sender for the owner alert.');
      body.from = 'Pro City Web Design <onboarding@resend.dev>';
      if (idempotencyKey) headers['Idempotency-Key'] = idempotencyKey + '-test';
      res = await fetch(base + '/emails', { method: 'POST', headers, body: JSON.stringify(body) });
    } else { throw new Error('Resend ' + res.status + ': ' + msg); }
  }
  if (!res.ok) throw new Error('Resend ' + res.status + ': ' + (await res.text()));
  return res.json();
}

module.exports = { sendEmail, OWNER, FROM };
