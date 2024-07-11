import {AI} from '@/app/actions';
import {UserMessage} from '@/components/Message';

import {Button} from '@/components/ui/Button';
import {IconArrowElbow} from '@/components/ui/Icons';
import {Tooltip, TooltipContent, TooltipTrigger} from '@/components/ui/Tooltip';
import {useEnterSubmit} from '@/lib/hooks/useEnterSubmit';

import {useActions, useUIState} from 'ai/rsc';
import {nanoid} from 'nanoid';
import {useRouter} from 'next/navigation';
import * as React from 'react';
import Textarea from 'react-textarea-autosize';

export const PromptForm = ({ input, setInput }: { input: string; setInput: (value: string) => void }) => {
  const router = useRouter();
  const { formRef, onKeyDown } = useEnterSubmit();
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const { continueConversation } = useActions();
  const [_, setMessages] = useUIState<typeof AI>();

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <form
      ref={formRef}
      onSubmit={async (e: any) => {
        e.preventDefault();

        // Blur focus on mobile
        if (window.innerWidth < 600) {
          e.target['message']?.blur();
        }

        const value = input.trim();
        setInput('');
        if (!value) return;

        // Optimistically add user message UI
        setMessages(currentMessages => {
          const newId = nanoid();
          return [
            ...currentMessages,
            {
              id: newId,
              role: 'user',
              display: (
                <UserMessage key={newId} className="self-end ml-4">
                  {value}
                </UserMessage>
              ),
            },
          ];
        });

        // Submit and get response message
        const responseMessage = await continueConversation(value);
        setMessages(currentMessages => [...currentMessages, responseMessage]);
      }}
    >
      <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-amber-100 py-2 pl-4 pr-16 border rounded-md">
        <Textarea
          ref={inputRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          placeholder="Ask for a recipe..."
          className="min-h-[60px] w-full resize-none bg-transparent p-1 focus-within:outline-none sm:text-sm"
          autoFocus
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          name="message"
          rows={1}
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <div className="absolute top-[12px] right-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="submit" size="icon" className="text-gray-900 border border-input bg-amber-100 hover:bg-amber-200 dark:hover:bg-amber-300" disabled={input === ''}>
                <IconArrowElbow />
                <span className="sr-only">Send message</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Send message</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </form>
  );
};
