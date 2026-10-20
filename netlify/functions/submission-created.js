// Runs automatically every time a Netlify Form is submitted (the filename "submission-created" is what triggers it).
// 1) Emails the lead to you with phone, answers and campaign source.  2) Emails the visitor a confirmation.
const { sendEmail, OWNER } = require('./lib/send');
const { clientEmail, ownerEmail } = require('./lib/emails');

exports.handler = async (event) => {
  let payload;
  try { payload = JSON.parse(event.body).payload; } catch (e) { return { statusCode: 400, body: 'Bad request' }; }
  const data = payload.data || {};
  const formName = payload.form_name || data['form-name'] || 'unknown';
  const id = payload.id || payload.number || Date.now();
  const out = { form: formName };

  try {
    const m = ownerEmail(formName, payload);
    await sendEmail({ to: OWNER(), subject: m.subject, html: m.html, text: m.text, replyTo: data.email, idempotencyKey: `sub-${id}-owner`, fallbackToTestSender: true });
    out.owner = 'sent';
  } catch (e) { console.error('owner email failed', e.message); out.owner = 'failed'; }

  const email = String(data.email || '').trim();
  if (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) && email.toLowerCase() !== OWNER().toLowerCase()) {
    try {
      const m = clientEmail(formName, data, payload.created_at);
      await sendEmail({ to: email, subject: m.subject, html: m.html, text: m.text, replyTo: OWNER(), idempotencyKey: `sub-${id}-client` });
      out.client = 'sent';
    } catch (e) { console.error('client email failed', e.message); out.client = 'failed'; }
  }
  return { statusCode: 200, body: JSON.stringify(out) };
};
