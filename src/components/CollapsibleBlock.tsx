'use client';

import {Button} from '@/components/ui/Button';
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from '@/components/ui/Collapsible';
import {cn} from '@/lib/utils';
import {motion} from 'framer-motion';
import {ChevronDown} from 'lucide-react';
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
        <h3 className="text-lg font-medium text-sky-900 dark:text-sky-50">{title}</h3>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="group duration-300 hover:bg-sky-100 dark:hover:bg-sky-800">
            <ChevronDown className="size-4 text-sky-500 dark:text-sky-400 transition group-data-[state=open]:rotate-180" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </header>
      <CollapsibleContent className="space-y-4" asChild>
        <motion.div
          initial={{ height: 0, opacity: 0, y: -4 }}
          animate={{ height: 'auto', opacity: 1, y: 0 }}
          exit={{ height: 0, opacity: 0, y: -4 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </CollapsibleContent>
    </section>
  </Collapsible>
);

export default CollapsibleBlock;
