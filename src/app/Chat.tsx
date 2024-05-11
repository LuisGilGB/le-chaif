'use client';

import { useActions, useUIState } from 'ai/rsc';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { ClientMessage } from './actions';

const Chat = () => {
  const [input, setInput] = useState<string>('');
  const [conversation, setConversation] = useUIState();
  const { continueConversation } = useActions();

  return (
    <div>
      <div>
        {conversation.map((message: ClientMessage) => (
          <div key={message.id}>
            {message.role}: {message.display}
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={input}
          onChange={event => {
            setInput(event.target.value);
          }}
        />
        <button
          onClick={async () => {
            setConversation((currentConversation: ClientMessage[]) => [
              ...currentConversation,
              { id: nanoid(), role: 'user', display: input },
            ]);

            const message = await continueConversation(input);

            setConversation((currentConversation: ClientMessage[]) => [...currentConversation, message]);
          }}
        >
          Send Message
        </button>
      </div>
    </div>
  );
};

export default Chat;
