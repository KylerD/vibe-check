import Link from 'next/link';
import type { Metadata } from 'next';
import { SiteHeader } from '@/components/game/game-header';
import { SiteFooter } from '@/components/site-footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const BASE_URL = 'https://vibe-check.cloud';
const PAGE_URL = `${BASE_URL}/download`;
const DOWNLOAD_URL =
  'https://github.com/kylerd/vibe-check/releases/latest/download/vibe-check-universal.zip';

export const metadata: Metadata = {
  title: 'Download Vibe Check — Universal ZIP for All AI Coding Tools',
  description:
    'Download the Vibe Check universal ZIP and install it in Claude Code, Cursor, Gemini CLI, Codex CLI, VS Code Copilot, Kiro, OpenCode, or Pi. One download, every AI harness.',
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: 'Download Vibe Check — Universal ZIP for All AI Coding Tools',
    description:
      'Download the Vibe Check universal ZIP and install it in Claude Code, Cursor, Gemini CLI, Codex CLI, VS Code Copilot, Kiro, OpenCode, or Pi. One download, every AI harness.',
    url: PAGE_URL,
    images: [
      {
        url: '/vibe-check-og.png',
        width: 1200,
        height: 630,
        alt: 'Download Vibe Check — Universal ZIP',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Download Vibe Check — Universal ZIP for All AI Coding Tools',
    description:
      'Download the Vibe Check universal ZIP and install it in Claude Code, Cursor, Gemini CLI, Codex CLI, VS Code Copilot, Kiro, OpenCode, or Pi. One download, every AI harness.',
    images: ['/vibe-check-og.png'],
  },
};

const HARNESS_INSTRUCTIONS = [
  {
    harness: 'Claude Code',
    folder: '.claude',
    description: 'Anthropic\'s official CLI for Claude',
  },
  {
    harness: 'Cursor',
    folder: '.cursor',
    description: 'AI-first code editor',
  },
  {
    harness: 'Gemini CLI',
    folder: '.gemini',
    description: 'Google\'s Gemini command-line tool',
  },
  {
    harness: 'Codex CLI',
    folder: '.codex',
    description: 'OpenAI\'s Codex command-line tool',
  },
  {
    harness: 'VS Code Copilot',
    folder: '.agents',
    description: 'GitHub Copilot inside VS Code',
  },
  {
    harness: 'Kiro',
    folder: '.kiro',
    description: 'Amazon\'s AI coding assistant',
  },
  {
    harness: 'OpenCode',
    folder: '.opencode',
    description: 'Open-source AI coding assistant',
  },
  {
    harness: 'Pi',
    folder: '.pi',
    description: 'Pi AI assistant',
  },
];

export default function DownloadPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader backHref="/" backLabel="Home" />

      <main id="main-content" className="flex-1">
        <div className="mx-auto max-w-3xl px-6 py-10">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="transition-colors hover:text-foreground">
                  Vibe Check
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-foreground font-medium" aria-current="page">
                Download
              </li>
            </ol>
          </nav>

          <header className="mb-10">
            <Badge className="mb-4">Universal Download</Badge>
            <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Download Vibe Check
            </h1>
            <p className="text-lg text-muted-foreground">
              One ZIP. Every AI coding harness. Install Vibe Check in whichever tool you use
              — Claude Code, Cursor, Gemini CLI, and more.
            </p>
          </header>

          <section className="mb-10">
            <div className="flex flex-col items-start gap-4 rounded-lg border bg-muted/30 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium">vibe-check-universal.zip</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Contains skill folders for all supported AI harnesses
                </p>
              </div>
              <Button asChild size="lg">
                <a href={DOWNLOAD_URL} download>
                  Download ZIP
                </a>
              </Button>
            </div>
          </section>

          <Separator className="mb-10" />

          <section className="mb-10">
            <h2 className="mb-2 text-2xl font-semibold tracking-tight">
              Per-harness installation
            </h2>
            <p className="mb-6 text-muted-foreground">
              After downloading and extracting the ZIP, follow the instructions for your AI
              coding tool below.
            </p>

            <div className="space-y-2">
              {HARNESS_INSTRUCTIONS.map((instruction) => (
                <details
                  key={instruction.harness}
                  className="group rounded-lg border bg-background"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 font-medium select-none hover:bg-muted/50 [&::-webkit-details-marker]:hidden">
                    <span>{instruction.harness}</span>
                    <span className="text-sm text-muted-foreground transition-transform group-open:rotate-180">
                      ▾
                    </span>
                  </summary>
                  <div className="border-t px-5 py-4">
                    <p className="mb-3 text-sm text-muted-foreground">{instruction.description}</p>
                    <p className="mb-2 text-sm">
                      Copy the{' '}
                      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
                        {instruction.folder}/skills/vibe-check/
                      </code>{' '}
                      folder from the extracted ZIP to your project root:
                    </p>
                    <pre className="overflow-x-auto rounded bg-muted px-4 py-3 font-mono text-xs">
                      <code>{`cp -r ${instruction.folder}/skills/vibe-check/ ./your-project/${instruction.folder}/skills/vibe-check/`}</code>
                    </pre>
                  </div>
                </details>
              ))}
            </div>
          </section>

          <Separator className="mb-10" />

          <section className="mb-10">
            <h2 className="mb-2 text-2xl font-semibold tracking-tight">
              Or install via CLI
            </h2>
            <p className="mb-4 text-muted-foreground">
              If you prefer a one-command install, use the{' '}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">skills</code>{' '}
              CLI. It automatically detects your harness and installs the correct folder.
            </p>
            <pre className="overflow-x-auto rounded bg-muted px-4 py-3 font-mono text-sm">
              <code>npx skills add kylerd/vibe-check</code>
            </pre>
          </section>

          <Separator className="mb-10" />

          <section>
            <h2 className="mb-4 text-xl font-semibold">Related</h2>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="outline">
                <Link href="/guides/vibe-coding-security">Security Guide</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/guides/cursor-production-ready">Cursor Production Ready</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/#check-your-app">Try the web app</Link>
              </Button>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
