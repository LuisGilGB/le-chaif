'use client';

import {PromptForm} from '@/components/PromptForm';
import {Button} from '@/components/ui/Button';
import {TooltipProvider} from '@/components/ui/Tooltip';
import useScrollAnchor from '@/lib/hooks/useScrollAnchor';
import {cn} from '@/lib/utils';
import {useUIState} from 'ai/rsc';
import {useEffect, useState} from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import {ClientMessage} from './actions';

interface ChatProps {
  className?: string;
  messagesWrapperClassName?: string;
}

const Chat = ({ className, messagesWrapperClassName }: ChatProps) => {
  const [input, setInput] = useState<string>('');
  const [conversation, setConversation] = useUIState();

  const { messagesRef, scrollRef, scrollToBottom } = useScrollAnchor();

  useEffect(() => {
    // Scroll to bottom whenever the conversation changes
    scrollToBottom?.();
  }, [conversation, scrollRef, scrollToBottom]);

  return (
    <TooltipProvider>
      <div
        className={cn(
          'group w-full overflow-auto pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]',
          className,
        )}
        ref={scrollRef}
      >
        <div
          className={cn(
            'relative mx-auto max-w-2xl px-4 pb-[200px] pt-4 flex flex-col gap-y-4 md:pt-10',
            messagesWrapperClassName,
          )}
          ref={messagesRef}
        >
          <ErrorBoundary fallbackRender={({ error, resetErrorBoundary }) => (
            <div className="overflow-x-hidden overflow-y-auto text-red-500 space-y-2">
              <p>Something went wrong:</p>
              <p>{error.message}</p>
              <Button onClick={resetErrorBoundary}>Try again</Button>
            </div>
          )}>
            {conversation.map((message: ClientMessage) => message.display)}
          </ErrorBoundary>
        </div>
        <div className="fixed inset-x-0 bottom-0 w-full pt-4 bg-gradient-to-b from-muted/30 from-0% to-muted/30 to-50% duration-300 ease-in-out animate-in dark:from-background/10 dark:from-10% dark:to-background/80 peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px]">
          <div className="mx-auto sm:max-w-2xl sm:px-4">
            <div className="space-y-4 border-t bg-amber-200 px-4 py-2 md:py-4 shadow-lg sm:rounded-t-xl sm:border border-amber-300">
              <PromptForm input={input} setInput={setInput} />
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Chat;
