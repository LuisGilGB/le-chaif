'use client';

import { PromptForm } from '@/components/PromptForm';
import { TooltipProvider } from '@/components/ui/Tooltip';
import { useUIState } from 'ai/rsc';
import { useState } from 'react';
import { ClientMessage } from './actions';

const Chat = () => {
  const [input, setInput] = useState<string>('');
  const [conversation, setConversation] = useUIState();

  return (
    <TooltipProvider>
      <div>
        <div>
          {conversation.map((message: ClientMessage) => (
            <div key={message.id}>
              {message.role}: {message.display}
            </div>
          ))}
        </div>
        <PromptForm input={input} setInput={setInput} />
      </div>
    </TooltipProvider>
  );
};

export default Chat;
