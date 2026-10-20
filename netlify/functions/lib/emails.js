// Email copy and layout. Everything here is plain JavaScript, so you can edit the wording directly.
const SITE = 'https://procitywebdesign.com';
const PHONE = '813-556-5611';
const TEL = '+18135565611';
const CARE_LINK = 'https://square.link/u/ed6zrrMi';

const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const first = (name) => { const n = String(name || '').trim().split(/\s+/)[0]; return n ? n.charAt(0).toUpperCase() + n.slice(1) : 'there'; };

function layout({ preheader, heading, bodyHtml }) {
  return `<!doctype html><html><body style="margin:0;padding:0;background:#f4f7fb;">
<span style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(preheader || '')}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7fb;padding:24px 12px;"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:14px;overflow:hidden;font-family:Arial,Helvetica,sans-serif;color:#2c3a4b;font-size:16px;line-height:1.6;">
<tr><td style="background:#0b1420;padding:20px 28px;"><a href="${SITE}" style="color:#ffffff;text-decoration:none;font-size:20px;font-weight:bold;">Pro City Web Design</a></td></tr>
<tr><td style="padding:28px;">
<h1 style="margin:0 0 14px;font-size:24px;line-height:1.25;color:#0f1a27;">${esc(heading)}</h1>
${bodyHtml}
<p style="margin:26px 0 0;">Talk soon,<br><strong>Jason</strong><br>Pro City Web Design<br><a href="tel:${TEL}" style="color:#0a6fe0;">${PHONE}</a> (call or text, any day)</p>
</td></tr>
<tr><td style="background:#f4f7fb;padding:16px 28px;font-size:13px;color:#5a6a7e;">You are getting this because you contacted Pro City Web Design or bought from us. Just reply to this email if you have a question.</td></tr>
</table></td></tr></table></body></html>`;
}

const p = (t) => `<p style="margin:0 0 14px;">${t}</p>`;
const btn = (href, label) => `<p style="margin:18px 0;"><a href="${href}" style="display:inline-block;background:#0a6fe0;color:#ffffff;text-decoration:none;font-weight:bold;padding:13px 22px;border-radius:10px;">${esc(label)}</a></p>`;
const steps = (list) => `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:6px 0 16px;">${list.map(([h, t], i) => `<tr><td valign="top" style="padding:0 12px 12px 0;"><span style="display:inline-block;width:28px;height:28px;border-radius:14px;background:#0a6fe0;color:#fff;text-align:center;line-height:28px;font-weight:bold;">${i + 1}</span></td><td style="padding:0 0 12px;"><strong style="color:#0f1a27;">${esc(h)}</strong><br>${t}</td></tr>`).join('')}</table>`;
const checklist = (title, items, note) => `<div style="margin:18px 0;padding:16px 18px;border:1px solid #dce4ef;border-left:5px solid #0a6fe0;border-radius:10px;background:#fbfcfe;"><strong style="color:#0f1a27;">${esc(title)}</strong>${items.map((i) => `<div style="padding:6px 0 0;">&#9744;&nbsp; ${i}</div>`).join('')}${note ? `<div style="padding-top:10px;font-size:14px;color:#5a6a7e;">${note}</div>` : ''}</div>`;
const BEGIN = 'Your 7 days begin once I have everything I need from you, like your logo, wording and photos if you are providing them. Want me to create those? Then we start right away.';

const GENERIC_NEEDS = ['Your business name and what you do', 'The towns or areas you serve', 'A website you like, if you have one (optional)'];
const NEEDS_NOTE = 'No logo or photos yet? No problem. I design the logo and provide the photos for you.';

// ---- what each form gets after it is submitted -------------------------------------------------
const KINDS = {
  call: {
    label: 'Call request',
    subject: (n) => `Got it, ${n}! I will call you within 30 minutes`,
    heading: (n) => `Got it, ${n}. I will call you within 30 minutes.`,
    lead: 'Thank you for reaching out. I have your request, and I call within 30 minutes, day or night.',
    steps: [['I call you', 'Within 30 minutes. I ask about your business and recommend what fits, in plain English.'], ['You see your homepage free', 'I build your homepage first. No cost, and no pressure to buy.'], ['Love it? Ready in 7 days', 'If you go ahead, you pay the setup and I build the rest in 7 days, or your money back.']],
    needs: GENERIC_NEEDS, needsNote: NEEDS_NOTE,
  },
  redesign: {
    label: 'Redesign quote request',
    subject: (n) => `Got it, ${n}! Your free redesign quote is next`,
    heading: (n) => `Got it, ${n}. I will look at your website and send your quote.`,
    lead: (d) => `I have your redesign request${d.current_website ? ` for <strong>${esc(d.current_website)}</strong>` : ''}. Every redesign is custom quoted, because no two websites are alike. Custom does not mean expensive.`,
    steps: [['I look over your current website', 'I check what it is built on, what to keep and what to improve.'], ['You get your exact price', 'Your quote is free, and you see it before you pay anything.'], ['You decide', 'No obligation. If you say yes, I handle moving everything over.']],
    needs: ['Your current website address (I have it)', 'Which pages you want to keep', 'Examples of websites you like (optional)'], needsNote: 'I never need your passwords to quote. If we move forward, I will walk you through any access I need.',
  },
  seo: {
    label: 'SEO question',
    subject: (n) => `Got your SEO question, ${n}`,
    heading: (n) => `Got your question, ${n}. I will give you a straight answer.`,
    lead: 'Thank you for asking about SEO. I will look at your business and tell you honestly whether SEO makes sense right now, even if the answer is "not yet."',
    steps: [['I look at your business', 'Your website, your Google listing and what your competitors are doing.'], ['I call you', 'Within 30 minutes. I explain what I found in plain English.'], ['You decide', 'No pressure. Monthly SEO is $199 a month and you can cancel anytime.']],
    needs: ['Your business name and the towns you serve', 'Your website address, if you have one', 'Your Google Business Profile, if you have one (I can set it up if not)'],
  },
  gads: {
    label: 'Google Ads question',
    subject: (n) => `Got your Google Ads question, ${n}`,
    heading: (n) => `Got your question, ${n}. I will give you a straight answer.`,
    lead: 'Thank you for asking about Google Ads. I will look at your business and tell you honestly whether ads make sense right now, and what budget would fit.',
    steps: [['I look at your business', 'What people in your area search for, and what it costs to show up.'], ['I call you', 'Within 30 minutes. I recommend a budget that fits, in plain English.'], ['You decide', 'No pressure. Management is $199 a month and your ad budget is paid straight to Google. Cancel anytime.']],
    needs: ['Your business name and the towns you serve', 'Your website address, if you have one', 'A rough monthly ad budget in mind (I will recommend one if not)'],
  },
  social: {
    label: 'Social ads question',
    subject: (n) => `Got your social ads question, ${n}`,
    heading: (n) => `Got your question, ${n}. I will give you a straight answer.`,
    lead: 'Thank you for asking about Facebook and Instagram ads. I will look at your business and tell you honestly whether they make sense right now.',
    steps: [['I look at your business', 'Who your customers are and where they spend time online.'], ['I call you', 'Within 30 minutes. I recommend a budget that fits, in plain English.'], ['You decide', 'No pressure. Management is $199 a month and your ad budget is paid straight to Facebook and Instagram. Cancel anytime.']],
    needs: ['Your business name and the towns you serve', 'Your Facebook or Instagram page, if you have one (I can create them free with a website)', 'A rough monthly ad budget in mind (I will recommend one if not)'],
  },
  graphic: {
    label: 'Graphic design request',
    subject: (n) => `Got your design request, ${n}`,
    heading: (n) => `Got it, ${n}. Your exact price is on the way.`,
    lead: (d) => `I have your request${d.project ? ` for <strong>${esc(d.project.toLowerCase())}</strong>` : ''}. Most projects start at $75, and I send you an exact price before any work begins.`,
    steps: [['I review what you need', 'I may call or text with a quick question or two.'], ['You get your exact price', 'You approve it before I start.'], ['I design, you approve', 'You see it, ask for changes, and approve the final.']],
    needs: ['Any wording to include (name, phone, address)', 'Colors or examples you like', 'Your logo files, if you have them'],
  },
  update: {
    label: 'Website update request',
    subject: (n) => `Got your update request, ${n}`,
    heading: (n) => `Got it, ${n}. I will confirm within 24 hours.`,
    lead: 'Your website update request is in. Small edits are included with your Care Plan, and most are done the same business day.',
    steps: [['I confirm within 24 hours', 'You will hear from me about timing, and the price first if it is a bigger change.'], ['I make the change', 'Nothing for you to log into.'], ['You check it', 'Tell me if anything needs another look.']],
    needs: [], needsNote: '',
  },
  onboard: {
    label: 'Website details and files',
    subject: (n) => `Got your details, ${n}! I am on it`,
    heading: (n) => `Got your details, ${n}. I am on it.`,
    lead: 'Thank you for sending everything over. I am starting on your website now.',
    steps: [['I build your website', 'I write the words, place the photos and design your logo options.'], ['You look it over', 'Around day 6 you see your website and tell me what to change before it goes live.'], ['It goes live by day 7', 'Your 7 days begin today, and I am working inside them.']],
    needs: [], needsNote: '',
    extra: (d, at) => p(`Your 7 days begin today, so your website will be ready by <strong>${esc(dueDate(at))}</strong>. If I need anything else, I will text you.`),
  },
  generic: {
    label: 'Website form',
    subject: (n) => `Got your message, ${n}`,
    heading: (n) => `Got your message, ${n}.`,
    lead: 'Thank you for reaching out. I will be in touch soon.',
    steps: [['I read your message', 'And I follow up with you directly.']], needs: [], needsNote: '',
  },
};

const FORM_KIND = {
  'home-callback': 'call', 'contact-callback': 'call', 'lp-callback': 'call', 'sp-help': 'call', 'wd-preview': 'call', 'pf-preview': 'call', 'ind-ask': 'call',
  'rd-quote': 'redesign', 'seo-ask': 'seo', 'gads-ask': 'gads', 'social-ask': 'social', 'gfx-quote': 'graphic', 'update-request': 'update', 'ty-onboarding': 'onboard',
};
const kindOf = (formName) => FORM_KIND[formName] || 'generic';

function clientEmail(formName, data, createdAt) {
  const k = KINDS[kindOf(formName)];
  const n = first(data.name);
  const lead = typeof k.lead === 'function' ? k.lead(data) : k.lead;
  let body = p(esc('Hi ' + n + ',')) + p(lead) + (k.steps.length ? `<p style="margin:18px 0 6px;"><strong style="color:#0f1a27;">What happens next</strong></p>` + steps(k.steps) : '');
  if (k.needs && k.needs.length) body += checklist('What I need from you', k.needs.map(esc), esc(k.needsNote || NEEDS_NOTE));
  if (k.extra) body += k.extra(data, createdAt);
  body += p(`Need me sooner? Call or text <a href="tel:${TEL}" style="color:#0a6fe0;">${PHONE}</a> any time.`);
  const text = `Hi ${n},\n\n${lead.replace(/<[^>]+>/g, '')}\n\nWhat happens next:\n${k.steps.map(([h, t], i) => `${i + 1}. ${h}: ${t}`).join('\n')}\n\nNeed me sooner? Call or text ${PHONE}.\n\nJason\nPro City Web Design`;
  return { subject: k.subject(n), html: layout({ preheader: lead.replace(/<[^>]+>/g, ''), heading: k.heading(n), bodyHtml: body }), text };
}

// ---- email to Jason for every form ------------------------------------------------------------
const HIDE = new Set(['form-name', 'bot-field', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid', 'referrer', 'landing_page', 'page_url', 'ip', 'user_agent']);
const label = (k) => k.replace(/_/g, ' ').replace(/^./, (c) => c.toUpperCase());
function filesOf(v) {
  if (!v) return [];
  if (Array.isArray(v)) return v.flatMap(filesOf);
  if (typeof v === 'object' && v.url) return [v];
  return [];
}
const row = (a, b) => `<tr><td style="padding:6px 12px 6px 0;color:#5a6a7e;vertical-align:top;white-space:nowrap;">${esc(a)}</td><td style="padding:6px 0;color:#0f1a27;">${b}</td></tr>`;

function ownerEmail(formName, payload) {
  const data = payload.data || {};
  const k = KINDS[kindOf(formName)];
  const rows = []; const files = [];
  for (const [key, val] of Object.entries(data)) {
    if (HIDE.has(key)) continue;
    const f = filesOf(val);
    if (f.length) { f.forEach((x) => files.push(x)); continue; }
    if (val === '' || val == null) continue;
    let shown = esc(val).replace(/\n/g, '<br>');
    if (key === 'phone') shown = `<a href="tel:${esc(String(val).replace(/[^\d+]/g, ''))}" style="color:#0a6fe0;font-weight:bold;">${esc(val)}</a>`;
    if (key === 'email') shown = `<a href="mailto:${esc(val)}" style="color:#0a6fe0;">${esc(val)}</a>`;
    rows.push(row(label(key), shown));
  }
  const src = [];
  const s = (a, b) => b && src.push(row(a, esc(b)));
  s('Source', data.utm_source); s('Medium', data.utm_medium); s('Campaign', data.utm_campaign); s('Term', data.utm_term); s('Content', data.utm_content);
  s('Google click ID', data.gclid); s('Facebook click ID', data.fbclid);
  s('Came from', data.referrer || payload.referrer); s('First page', data.landing_page); s('Form page', data.page_url);
  const filesHtml = files.length ? `<p style="margin:16px 0 6px;"><strong>Files</strong></p>` + files.map((f) => `<div><a href="${esc(f.url)}" style="color:#0a6fe0;">${esc(f.filename || f.url)}</a>${f.size ? ` (${Math.round(f.size / 1024)} KB)` : ''}</div>`).join('') : '';
  const who = data.name || 'Someone';
  if (kindOf(formName) === 'onboard') rows.unshift(row('7-day clock', `<strong>Begins today. Website due ${esc(dueDate(payload.created_at))}.</strong>`));
  const body = `<p style="margin:0 0 6px;"><strong>${esc(k.label)}</strong> from the <strong>${esc(formName)}</strong> form</p><table role="presentation" cellpadding="0" cellspacing="0">${rows.join('')}</table>${filesHtml}` +
    (src.length ? `<p style="margin:18px 0 6px;"><strong>Where they came from</strong></p><table role="presentation" cellpadding="0" cellspacing="0">${src.join('')}</table>` : `<p style="margin:18px 0 0;color:#5a6a7e;">No campaign tag on this one (they arrived without a UTM link).</p>`) +
    (data.phone ? `<p style="margin:18px 0 0;"><a href="tel:${esc(String(data.phone).replace(/[^\d+]/g, ''))}" style="display:inline-block;background:#0a6fe0;color:#fff;text-decoration:none;font-weight:bold;padding:12px 20px;border-radius:10px;">Call ${esc(data.phone)}</a></p>` : '');
  const text = `${k.label} (${formName})\n` + Object.entries(data).filter(([key, v]) => !HIDE.has(key) && v && !filesOf(v).length).map(([key, v]) => `${label(key)}: ${v}`).join('\n') + (data.utm_source ? `\nSource: ${data.utm_source} / ${data.utm_medium || ''} / ${data.utm_campaign || ''}` : '') + files.map((f) => `\nFile: ${f.url}`).join('');
  const tag = data.utm_source ? ` [${data.utm_source}]` : '';
  const subject = `${kindOf(formName) === 'onboard' ? 'Client details' : 'New lead'}: ${who}${data.phone ? ' ' + data.phone : ''} (${k.label})${tag}`;
  return { subject, html: layout({ preheader: subject, heading: subject, bodyHtml: body }).replace('You are getting this because you contacted Pro City Web Design or bought from us. Just reply to this email if you have a question.', 'Automatic alert from your website.').replace(/<p style="margin:26px 0 0;">Talk soon[\s\S]*?<\/p>/, ''), text };
}

// ---- purchases ---------------------------------------------------------------------------------
const PRODUCTS = {
  site5: { name: '5-Page Website', site: true },
  site10: { name: '10-Page Website', site: true },
  care: { name: 'Website Care Plan' },
  seo: { name: 'Monthly SEO' },
  gads: { name: 'Google Ads Management' },
  social: { name: 'Facebook and Instagram Ads Management' },
  other: { name: 'your purchase' },
};
const dueDate = (iso) => {
  const d = new Date(iso || Date.now()); d.setDate(d.getDate() + 7);
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', timeZone: 'America/New_York' });
};
const money = (c) => (c == null ? '' : '$' + (c / 100).toFixed(2).replace(/\.00$/, ''));

function purchaseClientEmail(kind, ctx) {
  const n = first(ctx.name); const c = n === 'there' ? '' : ', ' + n; const pr = PRODUCTS[kind] || PRODUCTS.other;
  const needsSite = ['Your business name, and what you do', 'Your services, and the towns or areas you serve', 'Your logo, if you have one. If not, I design 3 for free.', 'Photos you would like to use. If not, I provide them.', 'Your domain, if you own one. If not, I help you pick one.', 'Which 2 social pages I should create, like Facebook and Instagram'];
  if (pr.site) {
    const body = p(`Hi ${esc(n)},`) + p(`Thank you! I received your payment${ctx.amount ? ' of ' + money(ctx.amount) : ''} for the <strong>${pr.name}</strong>. <strong>Your 7 days begin once I have everything I need from you</strong>, like your logo, wording and photos if you are providing them. Want me to create those? Then we start right away.`) +
      `<p style="margin:18px 0 6px;"><strong style="color:#0f1a27;">Two quick steps</strong></p>` +
      steps([['Start your Care Plan ($59 a month)', 'Every website needs a home on the internet. The Care Plan covers hosting, security, updates and small edits. No contract. Cancel anytime.'], ['Send me what I need', 'Your details, logo and photos. Skip anything you do not have, and I will help or provide it.']]) +
      btn(CARE_LINK, 'Start my Care Plan: $59/month') + btn(SITE + '/thank-you.html#needs', 'Send my details and files') +
      checklist('What I need from you', needsSite.map(esc), 'Cannot send it all now? Send what you have, and I will call about the rest.') +
      p(`I will also call you within 30 minutes if we have not talked yet. Have not heard from me? Text <a href="sms:${TEL}" style="color:#0a6fe0;">${PHONE}</a>.`);
    return { subject: `Payment received${c}! Here is how we get started`, html: layout({ preheader: 'Two quick steps to get your 7 days started.', heading: `Payment received${c}. Your website is on its way.`, bodyHtml: body }), text: `Hi ${n},\n\nThank you! I received your payment for the ${pr.name}. ${BEGIN}\n\nStep 1: Start your Care Plan ($59/month): ${CARE_LINK}\nStep 2: Send me what I need: ${SITE}/thank-you.html#needs\n\nJason\n${PHONE}` };
  }
  if (kind === 'care') {
    const body = p(`Hi ${esc(n)},`) + p('Thank you! Your <strong>Website Care Plan</strong> is active. Your website now has a home on the internet.') +
      checklist('What your Care Plan covers', ['Monthly hosting', 'The security lock (SSL)', 'Updates and upkeep', 'Small edits, unlimited with fair use', 'Help with your web address'], 'No contract. Cancel anytime.') +
      p('Need a change? Send a request any time and I confirm within 24 hours:') + btn(SITE + '/maintenance.html', 'Request a website update');
    return { subject: `Your Care Plan is active${c}`, html: layout({ preheader: 'Hosting, security, updates and small edits are covered.', heading: `Your Care Plan is active${c}.`, bodyHtml: body }), text: `Hi ${n},\n\nYour Website Care Plan is active. Need a change? ${SITE}/maintenance.html\n\nJason\n${PHONE}` };
  }
  const svc = {
    seo: { h: 'Monthly SEO', what: 'Each month I work on getting you found by people already searching: your Google Maps listing, trusted directory listings, fresh content and tune-ups.', needs: ['Your website address', 'The towns or areas you want to be found in', 'Your list of services, and which ones you want more of', 'Manager access to your Google Business Profile (add jason@procitywebdesign.com), if you have one'] },
    gads: { h: 'Google Ads Management', what: 'I set up your ads, then watch and improve them every month. Your ad budget is paid straight to Google, and you choose the amount.', needs: ['Your website address', 'The services you want more calls for', 'The towns or areas to show your ads in', 'A monthly ad budget in mind (I will recommend one if not)'] },
    social: { h: 'Facebook and Instagram Ads Management', what: 'I design ads for your business and show them to people near you, then test and improve them every month. Your ad budget is paid straight to Facebook and Instagram.', needs: ['Your Facebook or Instagram page address, if you have one', 'The services you want more customers for', 'The towns or areas to show your ads in', 'A monthly ad budget in mind (I will recommend one if not)'] },
  }[kind];
  if (svc) {
    const body = p(`Hi ${esc(n)},`) + p(`Thank you! Your <strong>${svc.h}</strong> is set up, and I am glad to be working with you.`) + p(esc(svc.what)) +
      checklist('What I need from you', svc.needs.map(esc), 'Reply to this email with whatever you have, or call or text me. Skip anything you are not sure about.') +
      p(`I will call you within 30 minutes if we have not talked yet. No contract. Cancel anytime.`);
    return { subject: `Welcome${c}! Your ${svc.h} is set up`, html: layout({ preheader: svc.what, heading: `Welcome${c}. Let us get started.`, bodyHtml: body }), text: `Hi ${n},\n\nThank you! Your ${svc.h} is set up.\n\n${svc.what}\n\nWhat I need from you:\n- ${svc.needs.join('\n- ')}\n\nJason\n${PHONE}` };
  }
  const body = p(`Hi ${esc(n)},`) + p(`Thank you! I received your payment${ctx.amount ? ' of ' + money(ctx.amount) : ''}. A receipt from Square is on its way to you, and I will call you within 30 minutes if we have not talked yet.`);
  return { subject: `Payment received${c}. Thank you!`, html: layout({ preheader: 'Your payment went through.', heading: `Payment received${c}.`, bodyHtml: body }), text: `Hi ${n},\n\nThank you! I received your payment. I will call you within 30 minutes.\n\nJason\n${PHONE}` };
}

function purchaseOwnerEmail(kind, ctx) {
  const pr = PRODUCTS[kind] || PRODUCTS.other;
  const rows = [row('Product', esc(pr.name)), ctx.amount != null ? row('Amount', esc(money(ctx.amount))) : '', row('Name', esc(ctx.name || '(not provided)')), row('Email', ctx.email ? `<a href="mailto:${esc(ctx.email)}" style="color:#0a6fe0;">${esc(ctx.email)}</a>` : '<strong>No email found. Check the Square dashboard.</strong>'), ctx.phone ? row('Phone', esc(ctx.phone)) : '', ctx.paidAt ? row('Paid', esc(new Date(ctx.paidAt).toLocaleString('en-US', { timeZone: 'America/New_York' }))) : '', ctx.note ? row('Heads up', esc(ctx.note)) : '', ctx.paymentId ? row('Square payment', esc(ctx.paymentId)) : ''].join('');
  const subject = `New purchase: ${pr.name}${ctx.amount != null ? ' ' + money(ctx.amount) : ''}${ctx.name ? ' from ' + ctx.name : ''}`;
  const body = `<table role="presentation" cellpadding="0" cellspacing="0">${rows}</table>` + (pr.site ? p('<br>Reminder: their 7 days begin once you have their details. They were sent the Care Plan link and the checklist.') : '');
  return { subject, html: layout({ preheader: subject, heading: subject, bodyHtml: body }).replace(/<p style="margin:26px 0 0;">Talk soon[\s\S]*?<\/p>/, ''), text: subject };
}

module.exports = { clientEmail, ownerEmail, purchaseClientEmail, purchaseOwnerEmail, kindOf, PRODUCTS, esc, first };
