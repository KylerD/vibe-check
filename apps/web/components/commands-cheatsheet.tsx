const SKILLS = [
  { name: 'check', description: 'Run production readiness assessment' },
  { name: 'fix', description: 'Review and apply fixes with approval' },
  { name: 'idea', description: 'Validate product ideas' },
  { name: 'plan', description: 'Plan your build interactively' },
  { name: 'refresh', description: 'Re-assess and compare progress' },
  { name: 'discuss', description: 'Ask questions about results' },
  { name: 'map-codebase', description: 'Analyze project structure' },
  { name: 'help', description: 'Show available commands' },
];

export function CommandsCheatsheet() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16" id="commands">
      <h2 className="mb-2 text-center text-2xl font-bold tracking-tight sm:text-3xl">
        Available Skills
      </h2>
      <p className="mb-8 text-center text-muted-foreground">
        Eight skills to guide your app from vibe to production.
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        {SKILLS.map((skill) => (
          <div
            key={skill.name}
            className="flex items-start gap-4 rounded-lg border border-border bg-card p-4"
          >
            <code className="shrink-0 rounded bg-primary/10 px-2 py-1 font-mono text-xs font-semibold text-primary">
              {skill.name}
            </code>
            <p className="text-sm text-muted-foreground">{skill.description}</p>
          </div>
        ))}
      </div>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        Skill invocation syntax varies by harness. Claude Code uses{' '}
        <code className="rounded bg-muted px-1 py-0.5 font-mono">/skill-name</code>, Cursor uses{' '}
        <code className="rounded bg-muted px-1 py-0.5 font-mono">@vibe-check skill-name</code>, etc.
      </p>
    </section>
  );
}
