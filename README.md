# GeoPram Tasks — Vercel Ready

This version uses MongoDB for live pricing.

## Admin pricing
Open `/control-room-7f3k`, sign in, then set:
- Task 1 price
- Task 2 price
- Task 3 price
- Bundle discount percentage

The bundle price is calculated automatically:
`bundle price = (task 1 + task 2 + task 3) - discount`.

Saving pricing updates the customer-facing website without a redeploy. The payment API reads the same MongoDB pricing record server-side before creating the Daraja STK Push, so the amount paid cannot be changed by the browser.

## Customer pricing
The home page loads `/api/pricing` and displays the current task prices and calculated bundle discount.

## Deployment
Set all variables from `.env.example` in Vercel. Keep MongoDB, Daraja, SMTP, SESSION_SECRET and OTP_SECRET values private.

Place the final paid-output PDF/SVG files in `private/tasks/`. Do not put paid outputs in `public/`.
