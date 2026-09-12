# Dave Tech Portfolio

A static portfolio converted into a deployable Node.js app with a working contact-form backend.

## Run locally

```bash
npm install
npm start
```

Open http://localhost:3000

Health check:

`/api/health`

## Environment variables

Copy `.env.example` values into your hosting provider's environment variables.

For Gmail SMTP, use a Google App Password rather than your normal Gmail password.

## Render

Deploy this folder/repository as a Node Web Service.

Build command:
`npm install`

Start command:
`npm start`

Set the SMTP environment variables in Render.

Do not commit `.env` or SMTP credentials to GitHub.
