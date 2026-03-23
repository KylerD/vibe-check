import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-3 text-center">
        <p className="text-sm text-muted-foreground">
          <Link
            href="/features"
            className="underline underline-offset-4 transition-colors hover:text-foreground"
          >
            All checklists
          </Link>
          {' · '}
          Free and open source.{' '}
          <a
            href="https://github.com/Hypership-Software/vibe-check"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 transition-colors hover:text-foreground"
          >
            View on GitHub
          </a>
        </p>
      </div>
    </footer>
  );
}
