'use server';

import { BotMessage } from '@/components/Message';
import RecipeCard from '@/components/recipe/RecipeCard';
import { recipeSchema } from '@/schemas/recipe.schema';
import { openai } from '@ai-sdk/openai';
import { createAI, getMutableAIState, streamUI } from 'ai/rsc';
import { nanoid } from 'nanoid';
import { ReactNode } from 'react';
import { z } from 'zod';

export interface ServerMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ClientMessage {
  id: string;
  role: 'user' | 'assistant';
  display: ReactNode;
}

export async function continueConversation(input: string): Promise<ClientMessage> {
  'use server';

  const history = getMutableAIState();

  const newId = nanoid();

  const result = await streamUI({
    model: openai('gpt-3.5-turbo'),
    messages: [...history.get(), { role: 'user', content: input }],
    text: ({ content, done }) => {
      if (done) {
        history.done((messages: ServerMessage[]) => [...messages, { role: 'assistant', content }]);
      }

      return (
        <BotMessage key={newId} className="self-start mr-4">
          {content}
        </BotMessage>
      );
    },
    tools: {
      getRecipe: {
        description: 'Return a recipe with its ingredients, instructions, image, required toold and more',
        parameters: z.object({
          recipe: recipeSchema,
        }),
        generate: async ({ recipe }) => {
          history.done((messages: ServerMessage[]) => [
            ...messages,
            {
              role: 'assistant',
              content: `Showing ingredients for ${recipe.name}`,
            },
          ]);

          return <RecipeCard key={newId} recipe={recipe} />;
        },
      },
    },
  });

  return {
    id: newId,
    role: 'assistant',
    display: result.value,
  };
}

export const AI = createAI<ServerMessage[], ClientMessage[]>({
  actions: {
    continueConversation,
  },
  initialAIState: [],
  initialUIState: [],
});
