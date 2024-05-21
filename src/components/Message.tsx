'use client';

import { IconOpenAI } from '@/components/ui/Icons';
import { Spinner } from '@/components/ui/Spinner';
import { useStreamableText } from '@/lib/hooks/useStreamableText';
import { cn } from '@/lib/utils';
import { StreamableValue } from 'ai/rsc';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import { MemoizedReactMarkdown } from './Markdown';

// Different types of message bubbles.

interface UserMessageProps {
  children: React.ReactNode;
  className?: string;
}

export const UserMessage = ({ children, className }: UserMessageProps) => (
  <div className={cn('group bg-amber-200 rounded-b-xl rounded-tl-xl text-right px-4 py-2 overflow-hidden', className)}>
    {children}
  </div>
);

interface BotMessageProps {
  children: string | StreamableValue<string>;
  className?: string;
}

export const BotMessage = ({ children, className }: BotMessageProps) => {
  const text = useStreamableText(children);

  return (
    <div className={cn('group bg-sky-200 rounded-b-xl rounded-tr-xl text-left px-4 py-2 overflow-hidden', className)}>
      <MemoizedReactMarkdown
        className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
        remarkPlugins={[remarkGfm, remarkMath]}
        components={{
          p({ children }) {
            return <p className="mb-2 last:mb-0">{children}</p>;
          },
        }}
      >
        {text}
      </MemoizedReactMarkdown>
    </div>
  );
};

export const BotCard = ({ children, showAvatar = true }: { children: React.ReactNode; showAvatar?: boolean }) => (
  <div className="group relative flex items-start md:-ml-12">
    <div
      className={cn(
        'flex size-[24px] shrink-0 select-none items-center justify-center rounded-md border bg-primary text-primary-foreground shadow-sm',
        !showAvatar && 'invisible',
      )}
    >
      <IconOpenAI />
    </div>
    <div className="ml-4 flex-1 pl-2">{children}</div>
  </div>
);

export const SystemMessage = ({ children }: { children: React.ReactNode }) => (
  <div className={'mt-2 flex items-center justify-center gap-2 text-xs text-gray-500'}>
    <div className={'max-w-[600px] flex-initial p-2'}>{children}</div>
  </div>
);

export const SpinnerMessage = () => (
  <div className="group relative flex items-start md:-ml-12">
    <div className="flex size-[24px] shrink-0 select-none items-center justify-center rounded-md border bg-primary text-primary-foreground shadow-sm">
      <IconOpenAI />
    </div>
    <div className="ml-4 h-[24px] flex flex-row items-center flex-1 space-y-2 overflow-hidden px-1">{Spinner}</div>
  </div>
);
