# Browser verification — 2026-10-11

Result: PASS for the delivered presentation site and inquiry flows.

Tested the actual optimized production build using `next start` at `http://127.0.0.1:3001/` through the Codex In-app Browser. The development preview is available separately at port 3000. No payment, game fulfillment, or real authentication service is connected or claimed as tested.

## Build checks

- `npm run lint`: passed, no errors or warnings.
- `npm run typecheck`: passed.
- `npm run build`: passed; home page prerendered successfully.
- Production root HTTP response: 200.
- `npm audit --omit=dev --audit-level=high`: 0 vulnerabilities.
- `git diff --check`: passed before committing.

Runtime used locally: Node.js 20.13.1, Next.js 16.4.0, React 19.3.0. Node.js 22 LTS or newer is recommended for dependency engine compatibility.

## Responsive and visual review

Verified widths 320, 390, 768, 950, 1024, 1122, 1300, 1440 and 1600 pixels. All passed document, header and hero overflow checks. See the actual measured results in `responsive-results.json`.

- Desktop: six game cards plus a seventh catalogue tile, five columns of digital cards, side-by-side digital cards/promotions.
- Tablet: three game columns, stacked offer sections, mobile menu.
- Phone: two game columns, readable live headlines, full-width mobile game CTA and stacked network section.
- Visually compared the real 1122-pixel page against `theme.jpg`: rainbow pastel palette, white company header, violet active navigation, pink login, characters/phone hero, company placard, three trust badges, four benefit badges, six featured games, nine card products, three promotions and mobile networks retained.
- Hero illustration is regenerated, so individual artwork details differ from the reference. Text, navigation, section headings, actions and product captions are live HTML.
- Resolved the initial Thai font fallback, sprite scaling, narrow header clipping and dialog focus transitions before the final build.

Saved screenshots: `desktop.jpg`, `mobile.jpg` and `game-detail-mobile.jpg`. Full mobile capture uses a tall viewport so the complete footer is included without a scrollbar-induced reflow during capture.

## Interaction checks

- Opened the phone menu, selected the card/game section and verified anchor navigation and menu dismissal.
- Opened the game catalogue; checked all six results.
- Searched for PUBG and verified exactly one matching result, then opened PUBG details.
- Filtered MOBA and verified RoV and Mobile Legends only.
- Searched an unmatched term and verified the empty-state message.
- Switched to digital cards, searched Nintendo, verified a single result and opened its detail panel.
- Opened the news panel, followed its promotion action and verified all three promotion descriptions.
- Opened the first-purchase promotion directly from its home-page card.
- Opened the support panel and checked contact actions.
- Clicked the actual LINE contact action; the new tab redirected to `https://line.me/R/ti/p/@901mvpnu?oat_content=qr` and displayed the Add LINE friend page. No message was sent.
- Verified the exact telephone URI `tel:0818782470`; no phone call was placed.
- Submitted dummy local login form data and verified the unavailable-member-service message. The handler prevents submission and does not perform authentication.
- Checked initial catalogue search focus, focus inside product details, Escape dismissal, focus restoration to the original button and restoration of page scrolling.
- Confirmed all images in the final home page loaded successfully.
- No production browser console errors observed; retained production log subset in `production-console.json`.

## Delivery scope

The deliverable is a Next.js website ready to import into Vercel. Ordering inquiries go to the user-approved LINE account and phone number. Automatic top-ups, payments and membership authentication require separate service integration.
