import { Button } from '@/components/ui/Button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/Collapsible';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import React from 'react';

interface CollapsibleBlockProps {
  children: React.ReactNode;
  title: string;
  className?: string;
}

const CollapsibleBlock = ({ children, title, className }: CollapsibleBlockProps) => (
  <Collapsible asChild>
    <section className={cn('space-y-4', className)}>
      <header className="flex items-center justify-between">
        <h3 className="text-lg font-medium">{title}</h3>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="group w-9 p-0">
            <ChevronDown className="size-4 transition-transform group-data-[state=open]:rotate-180" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </header>
      <CollapsibleContent>{children}</CollapsibleContent>
    </section>
  </Collapsible>
);

export default CollapsibleBlock;
