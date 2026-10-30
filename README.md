# Correct Weight Scales

A website make over for Correct Weight Scales. The focus on the new site has been to improve page load performance so that customers visiting will get the information they're looking for almost instantly.

Another focus was removing wordpress and replacing that with a custom solution that includes Supabase and NextJs.

## Tech stack

- [NextJs](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/)
- [Resend](https://resend.com/)
- [React Email](https://react.email)
- [Framer Motion](https://framer.com/motion)
- [React Hot Toast](https://github.com/timolins/react-hot-toast)
- [Google Recaptcha](https://github.com/dozoisch/react-google-recaptcha)
- [Hero Icons](https://github.com/tailwindlabs/heroicons)

## Getting Started

Copy `.env.example` to `.env.local` and configure the listed variables. Contact
enquiries require a server-only `RESEND_API_KEY` with permission to send from the
verified `cwscales.com.au` domain. Configure this variable in the hosting
environment as well when deploying. Enquiries are sent to `louis@cwscales.com.au`.

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Head over to `src/app/page.js` to start editing the site!

Run `npm run test:email` to check the email template, API failure handling and
shared form submission client. These tests mock network calls and send no email.

