import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const DOMAINS = [
  'Security',
  'Discoverability',
  'Analytics',
  'Platform',
  'Reliability',
  'Legal',
];

const TERMINAL_LINES = [
  { type: 'command', text: '$ npx vibe-check-cc' },
  { type: 'info', text: 'Installing vibe-check as Claude Code plugin...' },
  { type: 'blank', text: '' },
  { type: 'command', text: '$ claude /vibe-check:check' },
  { type: 'info', text: 'Mapping codebase and running assessment...' },
  { type: 'blank', text: '' },
  { type: 'header', text: 'Security' },
  { type: 'critical', text: '  FAIL  No rate limiting on login attempts' },
  { type: 'critical', text: '  FAIL  Session tokens never expire' },
  { type: 'high', text: '  WARN  Password reset links are guessable' },
  { type: 'blank', text: '' },
  { type: 'header', text: 'Reliability' },
  { type: 'critical', text: '  FAIL  No error tracking in production' },
  { type: 'high', text: '  WARN  No health check endpoint' },
  { type: 'blank', text: '' },
  { type: 'summary', text: 'Score: 34/100 — Critical issues blocking deployment' },
  { type: 'info', text: 'Run /vibe-check:fix to auto-fix 4 items' },
] as const;

export function HeroSection() {
  return (
    <section className="mx-auto max-w-4xl px-6 pt-20 pb-16">
      <div className="flex flex-col items-center text-center">
        <Badge variant="secondary" className="mb-6 rounded-full px-3 py-1">
          Open source Claude Code plugin
        </Badge>

        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Your AI built it in 20 minutes.
          <br />
          <span className="text-muted-foreground">
            Is it production ready?
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          <strong>vibe-check</strong> scans AI-generated codebases for hidden production risks
          across security, payments, auth, and more — then gives you the prompts
          to fix them. Built for <em>vibe coders</em> using Cursor, Lovable, Bolt, v0, and Claude Code.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" asChild>
            <a
              href="https://github.com/KylerD/vibe-check"
              target="_blank"
              rel="noopener noreferrer"
            >
              Install the CLI
              <svg aria-hidden="true" className="ml-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="#check-your-app">
              Try the web version
              <svg aria-hidden="true" className="ml-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
              </svg>
            </a>
          </Button>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {DOMAINS.map((domain) => (
            <Badge key={domain} variant="outline" className="rounded-full">
              {domain}
            </Badge>
          ))}
        </div>

        <div className="mt-12 w-full max-w-2xl overflow-hidden rounded-lg border border-border bg-card text-left shadow-2xl dark:bg-[oklch(0.16_0.02_260)]" role="img" aria-label="Terminal showing vibe-check scan output with security and reliability findings">
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <div className="h-3 w-3 rounded-full bg-muted-foreground/30" />
            <div className="h-3 w-3 rounded-full bg-muted-foreground/30" />
            <div className="h-3 w-3 rounded-full bg-muted-foreground/30" />
            <span className="ml-2 text-xs text-muted-foreground">terminal</span>
          </div>
          <div className="overflow-x-auto p-4 font-mono text-xs leading-relaxed sm:text-sm">
            {TERMINAL_LINES.map((line, index) => {
              if (line.type === 'blank') {
                return <div key={index} className="h-4" />;
              }
              if (line.type === 'command') {
                return (
                  <div key={index} className="text-foreground">
                    {line.text}
                  </div>
                );
              }
              if (line.type === 'info') {
                return (
                  <div key={index} className="text-muted-foreground">
                    {line.text}
                  </div>
                );
              }
              if (line.type === 'header') {
                return (
                  <div key={index} className="font-semibold text-foreground">
                    {line.text}
                  </div>
                );
              }
              if (line.type === 'critical') {
                return (
                  <div key={index} className="text-destructive">
                    {line.text}
                  </div>
                );
              }
              if (line.type === 'high') {
                return (
                  <div key={index} className="text-amber-600 dark:text-amber-400">
                    {line.text}
                  </div>
                );
              }
              if (line.type === 'summary') {
                return (
                  <div key={index} className="text-muted-foreground">
                    {line.text}
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
