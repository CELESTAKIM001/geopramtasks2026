# GeoPram Tasks Marketplace

A Vercel-ready Next.js marketplace for paid GIS/task outputs.

## What is included
- Email verification with 6-digit OTP.
- Admin-controlled pricing for Task 1, Task 2, Task 3 and a discounted 3-task bundle.
- Daraja production STK Push.
- Daraja callback is coded directly at `/api/daraja/callback` and does not require a callback env variable.
- Paid files live outside `public/`, so they are not static/public URLs.
- Signed download links are created only after a successful Daraja payment.
- Receipt + task-output email is sent after payment confirmation.
- Hidden admin dashboard at `/control-room-7f3k`.
- Responsive desktop/mobile interface.
- User/payment/output audit fields for admin.

## File placement
Replace these files when ready:
- `private/tasks/task1.pdf`
- `private/tasks/task1.svg`
- `private/tasks/task2.pdf`
- `private/tasks/task2.svg`
- `private/tasks/task3.pdf`
- `private/tasks/task3.svg`

Do NOT put paid task files under `public/`.

## Vercel environment variables
Copy `.env.example` into Vercel Project Settings > Environment Variables.
Set the same variables for Production (and Preview if you want to test there).

## Gmail
For Gmail SMTP, use a Google App Password rather than your normal Gmail password. The authenticated Gmail account is used as `From`; `SMTP_REPLY_TO` is set to a non-monitored address so replies do not go to the support mailbox.

## Daraja
The callback URL is fixed in code:
`https://geopramtasks2026.vercel.app/api/daraja/callback`
Register that exact URL in your Daraja application.

## Admin
Open:
`https://geopramtasks2026.vercel.app/control-room-7f3k`

The admin password comes from `ADMIN_PASSWORD`.

## Important security note
Never commit `.env.local` or real credentials. If credentials were pasted into a public repository/chat, rotate them before production.

## First deployment checklist
1. Add your real MongoDB URI and Daraja/Gmail secrets in Vercel.
2. Set `NEXT_PUBLIC_SITE_URL=https://geopramtasks2026.vercel.app`.
3. Register `https://geopramtasks2026.vercel.app/api/daraja/callback` as the Daraja callback URL.
4. Replace task 2/3 placeholders and all SVG placeholders with your final files.
5. Deploy and open the hidden control room to set prices.
6. Test with a small real transaction before public launch.
