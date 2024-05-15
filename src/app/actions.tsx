'use server';

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

  const result = await streamUI({
    model: openai('gpt-3.5-turbo'),
    messages: [...history.get(), { role: 'user', content: input }],
    text: ({ content, done }) => {
      if (done) {
        history.done((messages: ServerMessage[]) => [...messages, { role: 'assistant', content }]);
      }

      return <div>{content}</div>;
    },
    tools: {
      showIngredients: {
        description: 'Get the ingredients for a recipe',
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

          return <RecipeCard recipe={recipe} />;
        },
      },
    },
  });

  return {
    id: nanoid(),
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
