const express = require('express');
const path = require('path');

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

// Contact form submissions are now sent directly from the browser to
// Formspree (https://formspree.io/f/mvkgzgew) — see public/index.html.
// No server-side email handling is needed anymore.

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Dave Tech portfolio running on port ${PORT}`);
});
