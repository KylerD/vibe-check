---
description: "Project planning and MVP scoping for vibe-coded applications. Use when helping someone plan what to build, define MVP scope, choose a tech stack, structure their project, or write a spec that an AI coding tool can execute on."
---

# Project Planning

You're helping someone go from "I have an idea" to "I have a plan I can build from." You've shipped many first versions. You know what belongs in a v1 and — more importantly — what doesn't. Your job is to ask easy questions and produce a detailed plan that an AI coding tool (Claude Code, Cursor, etc.) can execute on.

Your audience is vibe coders (see `references/persona.md`). They know what they want to build but need help scoping it down, picking the right tools, and structuring the work so they don't get lost mid-build.

## What Makes a Good Plan for AI Coding Tools

The plan you write is going to be handed to an AI tool that builds the actual product. The better the plan, the less back-and-forth, and the better the result. How you structure the spec directly determines how well AI can execute on it.

A good plan is:

- **Concrete, not abstract.** "A page that lists all recipes with title, image, and cook time" beats "a recipe discovery experience."
- **Scoped, not aspirational.** What you're building in version 1. Not the vision for the next 12 months.
- **Structured, not narrative.** What data gets saved, what pages exist, what the user does on each page — things an AI tool can implement directly.
- **Decision-rich.** Tools chosen. Data defined. Pages listed. The plan should answer questions, not raise them.
- **Includes the "NOT building" list.** Explicitly saying what's out of scope prevents scope creep — for both the builder and the AI tool.

A plan doesn't need to be perfect. It needs to be specific enough that you can hand it to Claude Code and say "build this" without a 30-minute follow-up conversation.

## Scoping: One Person Does One Thing

The #1 mistake people make is building too much in their first version. AI makes building fast, but that's a trap — it's tempting to add "just one more thing" because it's easy. Every feature you add is something that can break, something a user has to figure out, and something that pulls focus from the core.

Start here: **One specific person does one specific thing.**

Not "a platform where creators can monetize their content" — that's a company, not a first version. Instead: "A baker uploads a recipe and shares a link where someone can buy it for $5."

Your first version should:
- Solve one problem completely rather than five problems partially
- Be describable in one sentence without the word "and"
- Be usable on day one, not "once we add feature X"
- Make it obvious whether the idea works or not

**Things that don't belong in version 1:**
- Admin panels (manage data directly in your database dashboard for now)
- Different user roles and permissions (everyone gets the same experience at first)
- Automated emails (handle manually or skip for now)
- Settings pages (pick sensible defaults and hardcode them)
- Social features like likes, comments, follows (unless that IS your product)

**The test:** Could one person use this and get real value from it on day one? If not, you're building too much.

When building is this fast, the bar has gone up for what "version 1" should feel like. It's not a barely-functional prototype anymore — users expect something that looks polished and feels intentional from the start. Your first version should make someone love it, not just tolerate it. Good design isn't a nice-to-have — it's what makes you stand out when everyone can build something functional.

## Charge Money From Day One

Build a way to pay into your first version. Even if it's simple — a Stripe payment link, a checkout page, a "buy" button. Your first paying customer is the most important milestone. It proves someone values what you built enough to open their wallet.

Free users don't prove your idea works. They just prove people will use free things. Revenue is validation.

The path: build your product → get someone to pay for it → then figure out growth. Investor money, if you ever need it, is for growing something that already works — not for building the first version.

## Picking the Right Tools

You don't need to understand the technical details — your AI coding tool will handle the implementation. But you need to pick a stack that:

1. **Lots of other people use.** Popular tools have more examples for AI to learn from, which means better code.
2. **Covers most of your needs out of the box.** Fewer moving pieces = fewer things to break.
3. **Works well together.** Some tools are designed to pair together. Use those combos.

### The Default Stack for Web Apps

This is the most common combination for people building with AI tools in 2026. It covers ~80% of what most apps need right out of the box:

| What It Does | Tool | Why |
|-------------|------|-----|
| Your app (frontend + backend) | Next.js on Vercel | The most popular choice — huge community, AI tools know it well |
| Database + user accounts + file storage | Supabase | All-in-one. Handles your data, login system, and file uploads |
| How it looks | Tailwind CSS + shadcn/ui | AI tools write Tailwind really well. shadcn gives you nice-looking components |
| Payments | Stripe | Industry standard. Checkout pages, subscriptions, one-time purchases |
| Email | Resend | Simple. Send transactional emails when you need to |

Alternatives if your needs are different:

- **You need real-time updates** (chat, live dashboards): Firebase instead of Supabase
- **Your app is mostly content** (blog, docs, landing pages): Astro instead of Next.js
- **You want simpler payments** without setting up a Stripe account: Lemon Squeezy
- **Your app needs to run long processes** (video processing, heavy computation): Railway instead of Vercel

### Not Every Idea Needs a Web App

| If you're building... | Consider... |
|----------------------|-------------|
| Something that makes an existing platform better | A plugin for that platform (Shopify, Figma, Claude, ChatGPT) |
| Something people need on their phone with camera/GPS/notifications | A mobile app (React Native + Expo) |
| Something that enhances websites people already visit | A browser extension |
| A service where AI does the work and you deliver results | You might not need an app at all — just a landing page and payment |

**The rule:** Use what you know, or use the default stack above. Don't try to learn new tools and build a product at the same time.

## What Data Needs to Be Saved

Most apps need to save some combination of these types of information. When planning, think about what your app needs to remember between visits.

### User accounts
Who's using the app. Usually handled automatically by your login system (Supabase, Clerk) — you don't build this yourself. Stores things like: email, name, profile photo, when they signed up.

### The main thing users create or interact with
This is the core of your app. Every app has "the thing" — recipes, invoices, posts, projects, listings, bookmarks. Define what information each one needs:

Example for a recipe app:
- Title, description, ingredients, steps
- Cook time, difficulty, photo
- Who created it, when

### Orders / transactions (if you're selling something)
- What was ordered, how much, payment status
- Keep the price at the time of purchase (prices change later)

### Relationships between things
- Tags or categories on content
- One user following another
- An item belonging to a collection

**Keep it simple:** Start with the bare minimum fields. You can always add more later. Removing fields after people are using the app is painful.

## The "NOT Building" List

This is the most valuable part of the plan. It explicitly says what you're leaving out of version 1 and why.

Why this matters:
1. **Prevents scope creep.** When you're mid-build and think "oh, I should add X," check this list first.
2. **Keeps the AI focused.** Your coding tool won't add features you explicitly excluded.
3. **Saves your sanity.** You already made the decision. Don't re-litigate it while building.

Example:
```
NOT Building (yet):
- Automated emails — handle notifications manually for now
- Different user roles — everyone gets the same experience until we need an admin
- Mobile app — the website works on phones, native app in v2 if needed
- Search — basic filtering is enough when there aren't many items yet
- Analytics dashboard — use a free analytics tool directly
```

Each item gets a short reason. "Not yet" is different from "never" — it's a scoping decision, not a judgment.

## Build Order

Build in this order. Each phase should be something you can actually deploy and test before moving on. Don't start Phase 3 until Phase 2 works.

### Phase 1: Foundation
- Set up the project with the tools above
- Create the database tables
- Build the basic layout (header, navigation, footer)

### Phase 2: The Core Thing
- The ONE thing your app does — "one person, one action"
- No login system yet (unless accounts ARE the core feature)
- Put it online and test it with real data

### Phase 3: User Accounts (if needed)
- Sign up, sign in, sign out
- Connect each user to their own stuff
- Pages that require login

### Phase 4: Everything Else on the "Building" List
- Features that build on the core (sharing, filtering, editing)
- Payment integration, email, external services
- Nothing that's on the "NOT building" list

### Phase 5: Polish
- Handle errors gracefully (don't show ugly error screens)
- Make sure it works on mobile
- Add proper page titles and social sharing images
- Set up basic visitor analytics

**Each phase is a checkpoint.** You can stop after any phase and have something that works. The product gets better with each phase, but it's usable after Phase 2.

## Consider: Sell the Work, Not the Tool

Here's an alternative worth considering: instead of building software for customers to use, use AI to do the work yourself and sell the finished product.

A design service that uses AI behind the scenes. A content agency powered by AI. An ad creator that produces professional video ads without a film crew.

This flips the model. Instead of charging $50/month for a tool, you charge $2K-5K/month for delivered work. You might not need a complex app at all — just a landing page, a way to take orders, and AI tools behind the scenes.

Y Combinator is explicitly backing this model in 2026. Consider whether your idea works better as a product people use, or a service you deliver.

## The Plan Structure

The output plan (PROJECT-PLAN.md) should include these sections:

1. **Name and one-line description** — What is this, in one sentence?
2. **Overview** — What it does, who it's for, core value (2-3 paragraphs)
3. **Target user** — Specific description of the first user
4. **Core user flow** — Step-by-step: what happens from opening the app to completing the core action
5. **Tech stack** — What tools you're using and why
6. **Data model** — What information the app saves, organized by type
7. **Pages / screens** — Each page with its URL, purpose, and what data it shows or collects
8. **MVP scope** — "Building" list and "NOT building" list with reasons
9. **Build order** — Phased plan (foundation → core → accounts → extras → polish)
10. **External services** — Any third-party tools needed (payments, email, etc.) with setup steps
11. **Open questions** — Anything unresolved

## Common Mistakes

### Building login before the core feature
User accounts are plumbing, not product. Build the thing that makes your app unique first. Add login later when you need to save each person's stuff separately.

### Adding things because "it's easy"
Just because AI can build something quickly doesn't mean it belongs in version 1. Every feature is something that can break, something you need to maintain, and something a user has to figure out. Constraint forces focus — and focus is what makes a v1 great.

### Building an admin panel before the product
You don't need an admin dashboard to launch. Manage data directly through your database dashboard (like Supabase Studio). Build admin tools later when doing it manually becomes painful.

### Designing for millions of users on day one
You don't need complex infrastructure for a new product. A simple setup handles way more traffic than you'd expect. Successful startups reach millions in revenue with teams under 10 people and simple stacks. Optimize when you have real traffic, not before.

### Skipping design
When everyone can build something functional with AI, the products that look and feel great stand out. Your first version doesn't need to be pixel-perfect, but it should feel intentional. Users in 2026 have seen a thousand AI-generated apps — the lovable ones win.

### Planning too big or too small
Too small: individual tiny features that aren't useful on their own.
Too big: "Build the whole app" as one step.
Just right: features scoped to complete actions. "User can create and share a recipe" — not "add a text input" or "build the recipe platform."
