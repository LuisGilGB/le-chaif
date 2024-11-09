'use server';

import {BotMessage} from '@/components/Message';
import RecipeCard from '@/components/recipe/RecipeCard';
import {recipeSchema} from '@/schemas/recipe.schema';
import {openai} from '@ai-sdk/openai';
import {streamObject} from 'ai';
import {createAI, createStreamableValue, getMutableAIState, streamUI} from 'ai/rsc';
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

export const continueConversation = async (input: string): Promise<ClientMessage> => {
  'use server';

  const history = getMutableAIState<ReturnType<typeof createAI<ServerMessage[], ClientMessage[]>>>();

  history.update([...history.get(), { role: 'user', content: input }]);

  const newId = nanoid();

  const result = await streamUI({
    model: openai('gpt-4o-mini'),
    initial: (
      <div className="flex items-center justify-start gap-x-2">
        <LoaderCircleIcon className="animate-spin text-sky-400"/>
        Waiting for a response...
      </div>
    ),
    temperature: 0.8,
    presencePenalty: 0.5,
    frequencyPenalty: -0.2,
    system: 'You are an a cooking expert assistant. People contact you to get recipes. People can ask you in multiple ways, like asking for a specific recipe or just asking you for suggestions (providing more or less context, being more or less specific, etc. expect questions like "suggest me something for dinner today" or "tell me dishes I can cook with squids"). You provide mainly recipes and can follow up after with tips, and suggestions. Prioritize providing recipes above returning just text messages asking for clarification, take all ask for suggestions as command to provide a best-effort reply giving a recipe no matter how vague the question was. People have all kind of levels at cooking skill, including almost no cooking experience at all, so better be descriptive with each instruction instead of relying exclusively on cooking jargon. You can also ask for feedback on the recipes you provide.',
    messages: history.get(),
    text: ({ content, done }) => {
      console.log('Handling text');
      if (done) {
        const pastMessages = history.get() || [];
        const newMessage: ServerMessage = { role: 'assistant', content };
        const updatedMessages = [...pastMessages, newMessage];
        history.done(updatedMessages);
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
          console.log('Handling getRecipe');
          const pastMessages = history.get() || [];
          const newMessage: ServerMessage = { role: 'assistant', content: `Showing a recipe for ${recipe.name}` };
          const updatedMessages = [...pastMessages, newMessage];
          history.done(updatedMessages);

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
};

export const generateRecipe = async (input: string) => {
  const stream = createStreamableValue();

  (async () => {
    const { partialObjectStream } = await streamObject({
      model: openai('gpt-4o-mini'),
      system: 'You are an expert in cooking and you provide recipes. You can also ask for feedback on the recipes you provide.',
      temperature: 0.8,
      prompt: input,
      schema: recipeSchema,
    });

    for await (const delta of partialObjectStream) {
      stream.update(delta);
    }

    stream.done();
  })();

  return {
    object: stream.value,
  }
}

export const AI = createAI<ServerMessage[], ClientMessage[]>({
  actions: {
    continueConversation,
  },
  initialAIState: [],
  initialUIState: [],
});
