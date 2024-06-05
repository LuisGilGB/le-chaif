'use server';

import {BotMessage} from '@/components/Message';
import RecipeCard from '@/components/recipe/RecipeCard';
import {recipeSchema} from '@/schemas/recipe.schema';
import {openai} from '@ai-sdk/openai';
import {createAI, getMutableAIState, streamUI} from 'ai/rsc';
import {LoaderCircleIcon} from 'lucide-react';
import {nanoid} from 'nanoid';
import {ReactNode} from 'react';
import {z} from 'zod';

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

  const history = getMutableAIState<ReturnType<typeof createAI<ServerMessage[], ClientMessage[]>>>();

  const newId = nanoid();

  const result = await streamUI({
    model: openai('gpt-3.5-turbo'),
    initial: (
      <div className="flex items-center justify-start gap-x-2">
        <LoaderCircleIcon className="animate-spin text-sky-400"/>
        Waiting for a response...
      </div>
    ),
    messages: [...(history.get() || []), { role: 'user', content: input }],
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
        description: 'Return a recipe with its ingredients, preparation steps, image, required tools and more. Search the web to provide valid links for the recipe image, the ingredients images and the shop links. Preparation steps must not be preceded by a number. All the ingredients must include a quantity expressed in units (if 4 units of that ingredient are required, say 4 units instead of just 4), weight or any other metric. Be as descriptive as possible with the preparation steps, assuming the reader doesn\'t have knowledge about different cooking techniques. Be exhaustive enumerating the required tools, no matter how trivial it can be (for example: if a wooden spoon is useful, enumerate the wooden spoon, if a pot is needed for a secondary task, enumerate the pot). The recipe must include a video link from the web if available.',
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
