# Industries We Serve — Home Section Design

**Date:** 2026-07-02
**Status:** Approved

## Goal

Add a new section to the home page that lists the industries / markets the
business targets specifically. It sits between the **Expertise** section and the
**Testimonials** carousel and answers "who we build for," in contrast to
Expertise, which answers "what we do."

## Scope decisions (settled)

- **Framing:** pure industries/markets only. Technical capabilities
  (Realtime Processing, IoT/Wireless) stay in the Expertise section — they are
  not part of this band.
- **Layout:** icon card grid, built from the existing `Grid` + `Box` +
  `IconText` primitives (same language as the tech-stack cards).
- **Icons:** inline line icons (Lucide), tinted with `currentColor` so they
  adapt to light/dark mode and the Gruvbox accent.
- **Content source:** a new `industries` content collection (JSON per
  industry), matching the `expertise` / `case-studies` pattern.
- **Linking:** cards are non-linked (there are no per-industry detail pages).

## Placement & vertical rhythm

Insert a new `<section>` in `src/pages/[lang]/index.astro` between the Expertise
section and the Testimonials section, with a `<Divider />` on each side, using
the shared `sectionY` padding constant. It inherits the scroll-driven
fade/rise animation automatically (the page `<style>` targets `section`).

Heading follows the existing pattern:

```astro
<Divider />
<section class:list={["[&>h1:first-child]:mt-0", sectionY]}>
  <h1>{t("home.industries.title")}</h1>
  <IndustryList />
</section>
<Divider />
```

## Components

### `src/components/business/IndustryList.astro`
- Loads the `industries` collection via `getCollection("industries")`.
- Renders `<Grid cols={3} breakpoint="md" gap={8}>` of `IndustryPreview`.
- Optional `limit?: number` prop for parity with the other `*List` components
  (not used on the home page initially, but keeps the pattern consistent).
- Deterministic order via numeric filename prefixes (see Content).

### `src/components/business/IndustryPreview.astro`
- Props: `industry: Industry`.
- Wraps `Box` (padded, **not** linked → renders a plain `div`) around
  `IconText size="sm"` with:
  - `title = pick(industry.title, lang)`
  - `description = pick(industry.description, lang)`
  - the inline SVG icon selected by `industry.icon`.

### `src/components/ui/IconText.astro` (extended, backward-compatible)
- Add an optional way to render an **inline SVG** icon (raw string) instead of
  the current `<Image>`:
  - New optional prop, e.g. `iconSvg?: string`. When present, render it via
    `<div class={styles.iconBox}><Fragment set:html={iconSvg} /></div>`
    (or equivalent) instead of the `<Image>` branch.
  - When absent, behaviour is unchanged — all existing callers (Technology,
    SplitMedia, etc.) keep using the `icon` (`ImageMetadata`) branch.
- The `size="sm"` icon styling already renders the icon plainly (no chip),
  which suits monochrome line icons on the solid card surface.

### Icon registry
- Store Lucide SVGs in `src/assets/industry-icons/<name>.svg`, each authored
  with `stroke="currentColor"` / `fill="currentColor"` and no hard-coded color.
- `IndustryPreview` resolves `industry.icon` → raw SVG string using
  `import.meta.glob("../../assets/industry-icons/*.svg", { query: "?raw", import: "default", eager: true })`,
  keyed by filename. A missing icon should fail loudly at build (or fall back to
  no icon) rather than render broken markup.

## Content model

### `content.config.ts`
Add an `industries` collection and exported type:

```ts
const industriesCollection = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/industries", generateId: pathId }),
  schema: () =>
    z.object({
      slug: z.string(),
      icon: z.string(),            // filename stem in src/assets/industry-icons/
      title: localized(z.string()),
      description: localized(z.string()),
    }),
});

export interface Industry {
  slug: string;
  icon: string;
  title: Localized<string>;
  description: Localized<string>;
}

// register under collections:
//   industries: industriesCollection,
```

### Content files
`src/content/industries/*.json`, numeric-prefixed for order. First two are
confirmed; the remaining three are tentative and can be pruned by deleting the
file (the section renders whatever files exist).

| File | slug | icon | Title (EN / DE) | One-liner (EN / DE) |
|---|---|---|---|---|
| `i01_medical_devices.json` | medical_devices | heart-pulse | Medical Devices / Medizingeräte | Safety-critical firmware for regulated medical hardware. / Sicherheitskritische Firmware für regulierte Medizingeräte. |
| `i02_life_sciences.json` | life_sciences | microscope | Life Sciences / Life Sciences | Precision embedded systems for research and diagnostics. / Präzise eingebettete Systeme für Forschung und Diagnostik. |
| `i03_scientific_instruments.json` | scientific_instruments | flask-conical | Scientific Instruments / Wissenschaftliche Instrumente | Reliable control and data acquisition for measurement devices. / Zuverlässige Steuerung und Datenerfassung für Messgeräte. |
| `i04_high_tech.json` | high_tech | cpu | High Tech / High Tech | Cutting-edge products where hardware meets modern software. / Innovative Produkte, wo Hardware auf moderne Software trifft. |
| `i05_audio.json` | audio | audio-lines | Audio / Audio | Low-latency, high-fidelity real-time audio processing. / Latenzarme, hochwertige Echtzeit-Audioverarbeitung. |

### i18n
Add to `src/i18n/labels.ts` under `home` for both `en` and `de`:

```ts
industries: {
  title: "Industries We Serve",     // en
}
industries: {
  title: "Branchen, für die wir entwickeln",  // de
}
```

## Data flow

```
industries/*.json ──(getCollection)──▶ IndustryList
                                          └─▶ IndustryPreview (per item)
                                                ├─ pick(title/description, lang)
                                                ├─ resolve icon → raw SVG (glob)
                                                └─ Box(padded) > IconText(size="sm", iconSvg)
labels.ts home.industries.title ──(t)──▶ section <h1>
```

## Error handling / edge cases

- **Missing icon file** for a given `icon` name → build-time failure or explicit
  no-icon fallback; never emit broken/empty markup.
- **Empty collection** → `IndustryList` renders an empty grid (no crash); in
  practice at least the two confirmed industries exist.
- **Missing translation** → guarded structurally by the `localized()` schema
  (both `de` and `en` required), consistent with other collections.

## Testing / verification

- `npm run build` (runs `astro check`) passes — schema, types, and translations
  validate.
- Existing `IconText` callers (Technology, SplitMedia/Hero) still render icons
  correctly (backward-compatible extension).
- Visual check at the three breakpoints: 3-up / 2-up / 1-up.
- Light and dark mode: icons tint with the accent via `currentColor`.
- Section fade/rise animation triggers on scroll like its neighbours.

## Out of scope (future)

- Per-industry detail pages.
- Linking industries to filtered case studies.
- Any capabilities/tech content in this band (stays in Expertise).
```