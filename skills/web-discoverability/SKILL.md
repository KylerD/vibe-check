---
description: "SEO, meta tags, and web discoverability patterns for web applications. Use when adding meta tags, improving SEO, configuring social sharing, setting up sitemaps, or when a user asks about making their site discoverable."
---

# Web Discoverability Patterns

Making sure your app looks professional when shared and shows up when searched. This isn't "SEO optimization" in the marketing sense — it's the technical foundation that makes search engines and social platforms understand your site.

## Essential Meta Tags

Every page needs these two things at minimum. Without them, search results show garbled text and shared links look broken.

### Title Tag

The `<title>` tag shows up in browser tabs, search results, and bookmarks. Make it descriptive and specific to each page.

```html
<!-- Bad — default framework title -->
<title>React App</title>
<title>Vite + React + TS</title>
<title>Next.js App</title>

<!-- Good — describes the actual app -->
<title>Acme - Project Management for Small Teams</title>

<!-- Good — page-specific titles -->
<title>Pricing - Acme</title>
<title>Dashboard - Acme</title>
```

Keep titles under 60 characters so they don't get truncated in search results. Put the most important words first.

### Meta Description

The meta description appears below the title in search results. It's your pitch to get people to click.

```html
<!-- Bad — missing entirely, or generic -->
<meta name="description" content="Welcome to our website" />

<!-- Good — specific and compelling -->
<meta name="description" content="Acme helps small teams track projects, manage deadlines, and ship faster. Free for up to 5 users." />
```

Keep descriptions between 120-160 characters. Unique per page.

### Viewport

Required for mobile responsiveness. Every modern web app needs this:

```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

Most frameworks include this by default, but verify it's there.

## OpenGraph Tags for Social Sharing

OpenGraph (OG) tags control how your link appears when someone shares it on Slack, Discord, LinkedIn, Facebook, iMessage, and most other platforms. Without OG tags, shared links show a blank card or pull random text from the page.

### The Core Three

```html
<meta property="og:title" content="Acme - Project Management for Small Teams" />
<meta property="og:description" content="Track projects, manage deadlines, ship faster." />
<meta property="og:image" content="https://acme.com/og-image.png" />
```

### og:image Requirements

The OG image is what makes or breaks the appearance of a shared link. Guidelines:

- **Recommended size:** 1200x630 pixels (works well across all platforms)
- **Must be an absolute URL** (not a relative path) — `https://acme.com/og.png`, not `/og.png`
- **Must be publicly accessible** — social platforms fetch it from their servers, so localhost or authenticated URLs won't work
- **Format:** PNG or JPG. Keep file size under 1MB.
- **Content:** Usually your logo, app name, and a tagline on a branded background. Tools like og-image.vercel.app can generate these dynamically.

### Additional OG Tags

```html
<!-- URL of the page (canonical) -->
<meta property="og:url" content="https://acme.com/pricing" />

<!-- Type of content -->
<meta property="og:type" content="website" />

<!-- Your site name (shows as secondary text on some platforms) -->
<meta property="og:site_name" content="Acme" />
```

## Twitter Card Meta Tags

Twitter (X) uses its own meta tags but falls back to OG tags when they're missing. If you've set up OG tags, Twitter will mostly work. Adding Twitter-specific tags gives you more control.

### Summary Card (Default)

```html
<meta name="twitter:card" content="summary" />
<meta name="twitter:title" content="Acme - Project Management for Small Teams" />
<meta name="twitter:description" content="Track projects, manage deadlines, ship faster." />
<meta name="twitter:image" content="https://acme.com/og-image.png" />
```

### Large Image Card

For a bigger, more prominent image preview:

```html
<meta name="twitter:card" content="summary_large_image" />
```

### Twitter Handle

```html
<meta name="twitter:site" content="@acme" />
<meta name="twitter:creator" content="@founderhandle" />
```

### Priority

If you can only do one thing: set up OG tags. Twitter will fall back to them. Twitter-specific tags are a nice enhancement but not critical.

## Sitemap Generation

A sitemap tells search engines what pages exist on your site. Without one, crawlers have to discover pages by following links — they might miss some.

### Static Sitemap

For simple sites, a hand-written `sitemap.xml` in your public directory works:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://acme.com/</loc>
    <lastmod>2025-01-15</lastmod>
  </url>
  <url>
    <loc>https://acme.com/pricing</loc>
  </url>
  <url>
    <loc>https://acme.com/about</loc>
  </url>
</urlset>
```

### Framework-Specific Generation

Most frameworks can generate sitemaps automatically:

**Next.js (App Router)** — Create `app/sitemap.ts`:

```typescript
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://acme.com', lastModified: new Date() },
    { url: 'https://acme.com/pricing', lastModified: new Date() },
    { url: 'https://acme.com/about', lastModified: new Date() },
  ];
}
```

**Astro** — Install `@astrojs/sitemap` and add to your config. It auto-generates from your pages.

**SvelteKit** — Use `@sveltejs/adapter-static` with a custom sitemap endpoint, or use a plugin like `svelte-sitemap`.

**Remix** — Create a `routes/[sitemap.xml].tsx` route that returns XML.

### Dynamic Sites

If your content changes frequently (blog posts, user-generated content), generate the sitemap dynamically from your database. Include a `<lastmod>` date so search engines know when to re-crawl.

## robots.txt

A `robots.txt` file tells search engine crawlers which parts of your site to index and which to skip.

### Basic Setup

Place a `robots.txt` file in your public root directory:

```
# Allow all crawlers to index the site
User-agent: *
Allow: /

# Block admin and API routes from indexing
Disallow: /admin/
Disallow: /api/
Disallow: /_next/

# Point to your sitemap
Sitemap: https://acme.com/sitemap.xml
```

### Common Mistakes

```
# Bad — blocks your entire site (sometimes a default in dev configs)
User-agent: *
Disallow: /

# Bad — missing entirely (crawlers still index, but won't find your sitemap reference)
```

### What to Block

- Admin panels (`/admin/`, `/dashboard/` if not public)
- API routes (`/api/`)
- Auth pages (`/login`, `/signup` — not useful in search results)
- Framework internals (`/_next/`, `/_app/`)

### What NOT to Block

- Your main content pages
- Blog posts, product pages, landing pages
- Your home page (obviously)

## Canonical URLs

Canonical tags prevent duplicate content issues when the same content is accessible at multiple URLs.

```html
<link rel="canonical" href="https://acme.com/blog/my-post" />
```

### When You Need Them

- Your site is accessible with and without `www.`
- Pages are accessible with trailing slashes and without
- URL parameters create duplicate pages (`/products?sort=price` vs `/products`)
- Content is syndicated across multiple domains

### Framework Support

Most frameworks handle this automatically:
- **Next.js** — Use the `metadata` export or `<Head>` component
- **Astro** — Built-in canonical URL support in layouts
- **SvelteKit** — Add in `app.html` or per-page in `<svelte:head>`

## Semantic HTML and Heading Hierarchy

Search engines use your heading structure to understand page content. Screen readers depend on it for navigation.

### Rules

1. **One `<h1>` per page** — This is the page title. Only one.
2. **Don't skip levels** — Go h1 > h2 > h3, not h1 > h4.
3. **Use headings for structure, not styling** — If you want big text, use CSS. Don't use `<h2>` just because it looks the right size.

```html
<!-- Bad — multiple h1s, skipped levels -->
<h1>Welcome to Acme</h1>
<h1>Our Features</h1>
<h4>Feature One</h4>

<!-- Good — proper hierarchy -->
<h1>Acme - Project Management</h1>
  <h2>Features</h2>
    <h3>Task Management</h3>
    <h3>Team Collaboration</h3>
  <h2>Pricing</h2>
  <h2>Testimonials</h2>
```

### Semantic Elements

Use semantic HTML elements where they apply:

- `<nav>` for navigation menus
- `<main>` for the primary content area
- `<article>` for self-contained content blocks
- `<section>` for thematic groupings
- `<header>` and `<footer>` for page/section headers and footers
- `<aside>` for sidebars and tangential content

These help search engines understand your page structure and improve accessibility.

## Framework-Specific Guidance

### Next.js (App Router)

```typescript
// app/layout.tsx — global defaults
export const metadata: Metadata = {
  title: { default: 'Acme', template: '%s | Acme' },
  description: 'Project management for small teams',
  openGraph: {
    title: 'Acme',
    description: 'Project management for small teams',
    images: [{ url: 'https://acme.com/og.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
  },
};

// app/pricing/page.tsx — page-specific overrides
export const metadata: Metadata = {
  title: 'Pricing', // Renders as "Pricing | Acme"
  description: 'Simple pricing for teams of all sizes',
};
```

### SvelteKit

```svelte
<!-- +page.svelte or +layout.svelte -->
<svelte:head>
  <title>Acme - Project Management</title>
  <meta name="description" content="Track projects, manage deadlines, ship faster." />
  <meta property="og:title" content="Acme" />
  <meta property="og:description" content="Track projects, manage deadlines, ship faster." />
  <meta property="og:image" content="https://acme.com/og.png" />
</svelte:head>
```

### Astro

```astro
---
// src/layouts/Layout.astro
const { title, description } = Astro.props;
---
<html>
<head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content="https://acme.com/og.png" />
</head>
<body><slot /></body>
</html>
```

### Remix

```typescript
// app/root.tsx
export const meta: MetaFunction = () => [
  { title: 'Acme - Project Management' },
  { name: 'description', content: 'Track projects, manage deadlines, ship faster.' },
  { property: 'og:title', content: 'Acme' },
  { property: 'og:image', content: 'https://acme.com/og.png' },
];
```

## Quick Checklist

When adding discoverability to a new project, hit these in order:

1. Set a real `<title>` and `<meta name="description">` on every page
2. Add `og:title`, `og:description`, and `og:image` tags
3. Create or generate a `sitemap.xml`
4. Add a `robots.txt` that references your sitemap
5. Verify your heading hierarchy (single h1, no skipped levels)
6. Test your links with a social preview tool (opengraph.xyz, metatags.io)
