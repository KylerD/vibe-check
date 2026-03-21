'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface AuditPromptCardProps {
  title: string;
  prompt: string;
  category: string;
  whyItMatters: string;
}

export function AuditPromptCard({
  title,
  prompt,
  category,
  whyItMatters,
}: AuditPromptCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base">{title}</CardTitle>
          <Badge variant="secondary">{category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <pre className="whitespace-pre-wrap rounded-md bg-muted p-4 pr-20 font-mono text-sm">
            {prompt}
          </pre>
          <Button
            variant="outline"
            size="sm"
            className="absolute right-2 top-2"
            onClick={handleCopy}
          >
            <span aria-live="polite">{copied ? 'Copied!' : 'Copy'}</span>
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">{whyItMatters}</p>
      </CardContent>
    </Card>
  );
}
