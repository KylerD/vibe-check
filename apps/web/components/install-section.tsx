'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type TabId = 'cli' | 'claude-code' | 'download';

const TABS: Array<{ id: TabId; label: string }> = [
  { id: 'cli', label: 'CLI' },
  { id: 'claude-code', label: 'Claude Code' },
  { id: 'download', label: 'Download' },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleCopy}
      className="shrink-0 rounded p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      aria-label={copied ? 'Copied!' : 'Copy to clipboard'}
    >
      {copied ? (
        <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )}
    </button>
  );
}

function CodeBlock({ command }: { command: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/50 px-4 py-3 font-mono text-sm">
      <span className="text-muted-foreground select-none">$</span>
      <span className="flex-1 text-foreground">{command}</span>
      <CopyButton text={command} />
    </div>
  );
}

export function InstallSection() {
  const [activeTab, setActiveTab] = useState<TabId>('cli');

  return (
    <section className="mx-auto max-w-3xl px-6 py-16" id="install">
      <h2 className="mb-2 text-center text-2xl font-bold tracking-tight sm:text-3xl">
        Get Started
      </h2>
      <p className="mb-8 text-center text-muted-foreground">
        Install vibe-check in seconds and start assessing your AI-generated code.
      </p>

      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <div
          className="flex border-b border-border"
          role="tablist"
          aria-label="Installation methods"
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`tab-panel-${tab.id}`}
              id={`tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex-1 px-4 py-3 text-sm font-medium transition-colors',
                activeTab === tab.id
                  ? 'border-b-2 border-foreground text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          <div
            id="tab-panel-cli"
            role="tabpanel"
            aria-labelledby="tab-cli"
            hidden={activeTab !== 'cli'}
          >
            <p className="mb-4 text-sm text-muted-foreground">
              Works with any AI coding harness. Adds vibe-check as a skills package.
            </p>
            <CodeBlock command="npx skills add Hypership-Software/vibe-check" />
            <p className="mt-4 text-sm text-muted-foreground">
              Then invoke with your harness-specific syntax. Cursor uses{' '}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">@vibe-check check</code>,
              VS Code Copilot uses{' '}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">#vibe-check check</code>.
            </p>
          </div>

          <div
            id="tab-panel-claude-code"
            role="tabpanel"
            aria-labelledby="tab-claude-code"
            hidden={activeTab !== 'claude-code'}
          >
            <p className="mb-4 text-sm text-muted-foreground">
              Installs vibe-check as native Claude Code skills with slash commands.
            </p>
            <CodeBlock command="npx skills add Hypership-Software/vibe-check" />
            <p className="mt-4 text-sm text-muted-foreground">
              After installation, use{' '}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">/check</code>{' '}
              to run your first assessment.
            </p>
          </div>

          <div
            id="tab-panel-download"
            role="tabpanel"
            aria-labelledby="tab-download"
            hidden={activeTab !== 'download'}
          >
            <p className="mb-4 text-sm text-muted-foreground">
              Download the vibe-check skills package and configure it manually for your harness.
            </p>
            <Button asChild>
              <Link href="/download">
                Download vibe-check
                <svg aria-hidden="true" className="ml-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </Link>
            </Button>
            <p className="mt-4 text-sm text-muted-foreground">
              Unzip and place the <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">.skills/</code>{' '}
              directory in your project root. Refer to your harness documentation for skill configuration.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
