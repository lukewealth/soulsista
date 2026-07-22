# Soulsysta Collective

A luxury sanctuary for therapy, somatic wellness, literature, and transformational lifestyle for women and youth.

Built with React + Vite + TypeScript + Tailwind CSS v4.

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```
   npm install
   ```
2. Set the `GEMINI_API_KEY` in `.env.local` to your Gemini API key
3. Run the app:
   ```
   npm run dev
   ```

## Deploy

Deploys to Vercel automatically on push to `main`.

---

## Product Requirements Document (PRD) v2.0

### Executive Summary
Soulsysta Collective is a premium marketing website designed to convert visitors into clients, book buyers, and program participants. It prioritizes brand storytelling, SEO, and seamless conversion funnels over complex user account systems.

### Core Architecture
- **Objective:** Discover → Trust → Book or Buy.
- **No User Portal:** Guest-only checkout and booking to minimize friction.
- **Conversion Targets:** 
  - Therapy & Wellness Bookings
  - Book Sales ('She Too Can')
  - Program Registrations
  - Speaking Engagements

### Information Architecture
#### Public Pages
1. **Home:** Cinematic storytelling, multi-slide hero, service teasers.
2. **About:** Editorial founder journey (Merit Nene Chuks).
3. **Services:** High-SEO landing pages for Therapy, Wellness, Massage/Spa, and Youth Circle.
4. **Programs:** Masterclasses and retreats.
5. **Books:** Apple-style product page for 'She Too Can'.
6. **Speaking:** Engagement request portal.
7. **Initiative:** Social impact and donations.
8. **Blog/CMS:** SEO-optimized wellness guides and devotionals.

### Tech Stack
- **Frontend:** Next.js 15, Tailwind CSS v4, Framer Motion, GSAP.
- **CMS:** Payload CMS (Admin-only).
- **Booking:** Google Calendar API integration.
- **Payments:** Paystack, Flutterwave, Stripe.

### Success Metrics
- 80% increase in organic SEO traffic.
- >10% Therapy booking conversion.
- >5% Book purchase conversion.
- Lighthouse Score >95.
