# MEDfacials App — Premium Trust-Forward UI Enhancement

## Goal

Full design pass across all 6 screens to make the app feel like a premium aesthetic clinic experience. Every screen should build trust, showcase clinic credentials, and feel cohesive with the MEDfacials brand.

## Changes by Screen

### 1. Landing Screen

**Current:** Logo on slate container, plain text, 3 feature rows, coral CTA.

**Enhanced:**
- Hero background: `about-medfacials_2048x.jpg` with dark gradient overlay (`bg-gradient-to-b from-slate/80 via-slate/50 to-ivory`)
- Logo overlaid on hero (white on dark gradient — no need for slate container)
- Star rating banner below hero: "4.9/5 from 515+ verified reviews" with 5 coral star icons and review source text
- Headline: "Discover Your Perfect Treatment Plan" in Castoro serif, white, over the hero
- 3 value prop cards with teal icon circles: "AI-Powered Analysis", "Personalised Treatment Plan", "Expert Clinical Team"
- Horizontal accreditation logo strip (6 logos) at bottom with "Registered & Accredited" label
- Coral CTA "Begin Your Analysis" stays at bottom

### 2. Capture Screen

**Current:** Teal viewfinder with hard scan line, corner marks.

**Enhanced:**
- Remove animated scan line — replace with a slow, subtle pulsing glow on the oval border
- Guidance text below viewfinder: "Centre your face · Good lighting · Neutral expression"
- Privacy note at bottom: "Powered by AI · Your image is never stored" in muted text
- Keep corner marks but soften them (rounded ends, lower opacity)

### 3. Analyzing Screen

**Current:** Two-phase text progress with 8-zone readout list.

**Enhanced:**
- Subtle blurred clinic image background (`clinic-medfacials-59-banner-2000x600px-c.jpg`) with ivory overlay at 85% opacity
- Smooth animated progress bar (coral gradient fill) replacing or supplementing text phases
- Rotating trust carousel below progress: cycles through 3-4 testimonials every 4 seconds with crossfade
  - Each shows: star rating, quote, patient name
  - Curated from trustData.ts
- "Did you know?" rotating facts below testimonials:
  - "Dr. Stolte has over 10 years of aesthetic experience"
  - "MEDfacials is CQC registered for your safety"
  - "Over 515 five-star patient reviews"
  - "Two locations: Truro, Cornwall & London"
- Two-phase progress text stays ("Analysing your face..." / "Building your treatment plan...")

### 4. Gate Screen

**Current:** Teal checkmark, form, coral submit.

**Enhanced:**
- Blurred preview: Show the captured selfie behind a CSS `backdrop-blur-lg` frosted overlay with a lock icon and text "Complete to unlock your results & treatment plan"
- Trust bar above form: "Join 515+ patients who trust MEDfacials" with inline star rating
- Form card: elevated white card with subtle shadow, same fields
- Accreditation mini-strip (3 key logos: CQC, GMC, Save Face) below submit button
- Coral submit button stays

### 5. Results Screen

**Current:** Face overlay with teal dot markers, tabbed layout, zone cards.

**Enhanced:**
- **Face overlay**: No markers at all — clean photo. Zones accessible only via cards below.
- **Tab switcher**: Glass-frosted background (`backdrop-blur-sm bg-white/70`), more prominent active state with coral underline for active tab
- **Treatment Plan tab notification**: Pulsing coral dot (8px, `animate-pulse`) next to "Treatment Plan" text + "NEW" micro-badge in coral. Badge auto-hides after user clicks the tab (state-driven).
- **Summary card**: Subtle coral-to-transparent left border gradient instead of flat border
- **Zone cards**: Coloured left side stripe based on worst severity (graphite=none, teal=mild, coral=moderate) instead of just text severity. Tighter spacing.
- Everything else (trust layer in TreatmentPlan, testimonials on TreatmentCards) stays as already built.

### 6. Booking Screen

**Current:** Dr. Stolte CTA, "What to Expect" list, coral button.

**Enhanced:**
- Clinic banner image at top (`clinic-medfacials-59-banner-2000x600px-c.jpg`) in rounded card with gradient overlay
- "Why MEDfacials" video embed (move from TreatmentPlan to here — it's more conversion-relevant at booking stage)
- Dr. Stolte credentials card stays
- "What to Expect" list stays with enhanced styling (numbered coral circles)
- Dual CTAs: Primary coral "Book Free Consultation" + secondary teal outline "Call the Clinic" (tel: link)
- Accreditation strip at bottom (same 6 logos)

## Assets Used

All already in `public/clinic/`:
- `about-medfacials_2048x.jpg` — clinic/team photo (Landing hero, Analyzing bg)
- `clinic-medfacials-59-banner-2000x600px-c.jpg` — clinic banner (Booking, Analyzing)
- `IMG_9875-scaled.jpg` — additional clinic photo (available if needed)
- `Why_Medfacials.mp4` — promo video (Booking screen)
- `cqc-logo.svg`, `GMC-Logo.svg`, `save-face.svg`, `royal_college.svg`, `RCN-Logo.svg`, `babtac.svg` — accreditation logos

## Files Modified

- `components/screens/LandingScreen.tsx` — hero redesign + accreditations
- `components/screens/CaptureScreen.tsx` — softer viewfinder + guidance text
- `components/screens/AnalyzingScreen.tsx` — trust carousel + progress bar + clinic bg
- `components/screens/GateScreen.tsx` — blurred preview + trust bar + accreditations
- `components/screens/ResultsScreen.tsx` — no dots, notification badge, glass tabs
- `components/screens/BookingScreen.tsx` — clinic imagery + video + dual CTAs
- `components/FaceOverlay.tsx` — remove all zone markers from canvas
- `components/ZoneCard.tsx` — severity side stripe
- `components/TreatmentPlan.tsx` — remove video (moved to Booking)
- `app/globals.css` — new utility classes if needed

## No New Dependencies

All enhancements use existing stack: Tailwind CSS, Framer Motion, Next.js Image. No new packages needed.
