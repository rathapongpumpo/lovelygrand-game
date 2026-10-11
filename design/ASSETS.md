# Assets

Visual authority: `theme.jpg`, supplied by the user, 1122 × 1402 pixels.

## Hero

Tool: built-in ImageGen (no API key or CLI).

Final asset: `public/images/hero.webp`, 1738 × 905 pixels, optimized as WebP quality 90 from the generated PNG. Original illustration is retained under the Codex generated-images directory. The artwork preserves the reference composition and pastel rainbow theme; text and service boxes are live HTML over the illustration.

Exact generation prompt:

> Use case: precise-object-edit. Asset: standalone wide hero illustration for a Next.js website, landscape 1920x1000. Input image is the edit target and exact visual authority. Extract/reconstruct ONLY the upper hero artwork of this reference, the area below the white navigation header and above the game catalogue. Keep the same three characters in precisely the same appearance and relative placement: spiky platinum/blond male warrior in iridescent blue-purple armor near the middle, pink-haired cat-eared anime girl just right of him, black-helmeted battle royale soldier at far upper right. Preserve the large tilted smartphone at right with colorful blue/violet game top-up screen, polished blue diamond crystals, golden coins, small controllers at lower left, and the exact luminous rainbow pastel blue, lavender, pink, mint-green background style with sparkles. Make the left 48 percent mostly open luminous pastel blue/lavender with flowing diagonal rainbow streaks for live HTML headline; maintain character subjects on the right half. Remove ALL large Thai and English headlines/company labels from the left, the white company placard, certification strip, and the entire four-benefit white glass box; fill these removed areas naturally with pastel rainbow light, retaining the decorative small controller at far lower left if possible. Exclude the original navigation header and all catalogue/game cards, gift-card sections, promotion panels and footer. Preserve the smartphone artwork; its tiny screen markings can remain as artwork. No new slogans, no watermark, no web page/mockup frame. Output just the clean full-bleed hero background illustration ready to have actual HTML text and cards placed over the open left side.

## Catalogue artwork

Game and selected digital-card WebP assets are reused from the user's reference repository https://github.com/rathapongpumpo/qplay2 at commit `4e4c32b841dc941affc2e70c6c60670679c2818b`. That repository documents that these thumbnails were prepared from its user-supplied artwork, whose composition matches this project's reference.

Nintendo, TrueMoney, LINE prepaid, promotion art and network logos are displayed as clipped CSS sprites from the original unmodified `public/images/reference-sheet.jpg`. Their selection regions are listed in `lib/content.ts`. Sprite scaling is based on the source image's dimensions, so it remains accurate at different viewport widths.

## Code visuals

Gradients, outlines, glowing benefit badges, glass surfaces and shadows are CSS. Navigation and service symbols are SVG components from `lucide-react`; the favicon is an original SVG in `public/icon.svg`. Thai and Latin Kanit fonts are self-hosted from Fontsource via `next/font/local`.
