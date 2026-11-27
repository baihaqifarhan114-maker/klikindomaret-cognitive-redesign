# Klik Indomaret — Cognitive Engineering UI Redesign Prototype

Interactive responsive prototype comparing the existing Klik Indomaret web shopping flow (`Eksisting`) against a surgical cognitive-engineering redesign (`Redesign`).

## Highlights
- **Surgical Redesign:** Preserves Klik Indomaret's authentic visual language (`Inter`, `#1178D4`, `#0B4F8C`, `#F29D0D`, `#EE2B2E`, `1216px` container) and 22 real catalog/banner assets while fixing six cognitive bottlenecks.
- **Interactive Modes:** Switch between `Redesign` and `Eksisting`, toggle `Auto` / `Desktop` / `Mobile` viewports, inspect 6 cognitive theory annotations (*Gestalt*, *Hick-Hyman*, *Information Scent*, *Cognitive Load*, *Seven Stages of Action*, *Forcing Function*), and open the live KLM-GOMS / SUS / NASA-TLX metrics drawer.
- **Measurable Improvements:**
  - **KLM-GOMS Execution Time:** `24.60s (7 clicks)` -> `11.55s (3 clicks)` (`-53.0%`)
  - **Hick-Hyman Category Load:** `log2(11) = 3.46 bit` -> `log2(6) = 2.58 bit` (`-25.3%`)
  - **Viewport 1 Visual Clutter:** `1 modal + 6 banners` -> `0 modal + 1 main banner` (`-83%`)

## Local Development
```bash
npm install
npm run dev
```
