'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FaqSectionProps {
  faqs: Array<{ question: string; answer: string }>;
}

export function FaqSection({ faqs }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="mx-auto max-w-3xl px-6 py-16" id="faq">
      <h2 className="mb-8 text-center text-2xl font-bold tracking-tight sm:text-3xl">
        Frequently Asked Questions
      </h2>

      <div className="divide-y divide-border rounded-lg border border-border">
        {faqs.map((faq, index) => (
          <div key={index}>
            <button
              onClick={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
              className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left transition-colors hover:bg-muted/50"
              aria-expanded={openIndex === index}
            >
              <span className="text-sm font-medium">{faq.question}</span>
              <ChevronDown
                className={cn(
                  'h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200',
                  openIndex === index && 'rotate-180'
                )}
              />
            </button>
            <div
              className={cn(
                'grid transition-all duration-200',
                openIndex === index
                  ? 'grid-rows-[1fr] opacity-100'
                  : 'grid-rows-[0fr] opacity-0'
              )}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-4 text-sm text-muted-foreground">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
