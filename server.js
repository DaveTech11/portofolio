const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    service: 'Dave Tech Portfolio',
    time: new Date().toISOString()
  });
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, projectType, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({
        error: 'Name, email and message are required.'
      });
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }

    if (!process.env.SMTP_HOST || !process.env.SMTP_USER ||
        !process.env.SMTP_PASS || !process.env.SMTP_FROM) {
      return res.status(500).json({
        error: 'Email service is not configured on the server.'
      });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: String(process.env.SMTP_PORT || 587) === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.CONTACT_TO || process.env.SMTP_USER,
      replyTo: email,
      subject: `New Dave Tech portfolio enquiry${projectType ? ` — ${projectType}` : ''}`,
      text:
`New portfolio enquiry

Name: ${name}
Email: ${email}
Project type: ${projectType || 'Not specified'}

Message:
${message}`
    });

    res.json({ ok: true, message: 'Message sent successfully.' });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Unable to send message right now.' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Dave Tech portfolio running on port ${PORT}`);
});
