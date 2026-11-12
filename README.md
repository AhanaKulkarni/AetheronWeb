# Aetheron.AI Technologies Private Limited — Corporate Website

Official corporate website for **Aetheron.AI Technologies Private Limited**, built with Next.js (App Router), React, TypeScript, Tailwind CSS, and Framer Motion.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Pre-Launch Configuration Checklist

All company information, product links, founder details, and inquiry delivery settings are centralized so they can be updated cleanly without hunting across components.

### 1. Corporate Details & External URLs

Copy `.env.example` to `.env.local` or edit [`src/config/company.ts`](src/config/company.ts):

- **AetherBuilt Dedicated Website (`AETHERBUILT_WEBSITE_URL`)**: Set `NEXT_PUBLIC_AETHERBUILT_URL` in `.env.local` (or update `AETHERBUILT_WEBSITE_URL` in `src/config/company.ts`) to your live `https://...` URL.
- **Registered Office**: Set `NEXT_PUBLIC_REGISTERED_OFFICE` or replace `[INSERT OFFICIAL REGISTERED OFFICE ADDRESS]` in `src/config/company.ts`.
- **Official Email & Phone**: Set `NEXT_PUBLIC_COMPANY_EMAIL` and `NEXT_PUBLIC_COMPANY_PHONE` (or update `COMPANY_INFO` in `src/config/company.ts`).
- **Canonical Site URL**: Set `NEXT_PUBLIC_SITE_URL` to your production domain (used for `sitemap.xml`, `robots.txt`, Open Graph tags, and Schema.org metadata).

### 2. Official Brand Logo & Founder Assets

- **Company Logo**: Drop your official logo asset into `public/images/` and set `COMPANY_INFO.logoSrc` in `src/config/company.ts` (otherwise the built-in vector mark and wordmark render).
- **Founder Portraits**: Place verified portraits inside `public/images/founders/` and set each founder's `portraitSrc` in `FOUNDERS` inside `src/config/company.ts`.
- **Founder Biographies, Statements & Story**: Replace the marked editable placeholder copy in `FOUNDERS` and `FOUNDERS_STORY` in `src/config/company.ts` with verified founder-approved text.

### 3. Connecting the Inquiry Form (`/api/contact`)

The inquiry form submits to `POST /api/contact` (`src/app/api/contact/route.ts`) with full server-side validation and HTML escaping. To enable live email or webhook delivery, configure **one** of the following server-side options in `.env.local` (never expose API keys with `NEXT_PUBLIC_`):

- **Resend**: Set `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, and `CONTACT_TO_EMAIL`.
- **SMTP (Nodemailer)**: Set `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_FROM_EMAIL`, and `CONTACT_TO_EMAIL`.
- **Webhook**: Set `CONTACT_WEBHOOK_URL`.

Until one of these transports is configured, `/api/contact` intentionally responds with HTTP `503` and an actionable configuration notice rather than silently discarding submissions.

## Verification

```bash
npm run lint
npm run build
```
