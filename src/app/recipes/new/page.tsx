'use client';

import {generateRecipe} from '@/app/actions';
import RecipeCard from '@/components/recipe/RecipeCard';
import {Button} from '@/components/ui/Button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/Card';
import {Input} from '@/components/ui/Input';
import {Recipe} from '@/domain/Recipe';
import {readStreamableValue} from 'ai/rsc';
import {LoaderCircleIcon} from 'lucide-react';
import {useState} from 'react';

const NewRecipePage = () => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isDone, setIsDone] = useState<boolean>(false);

  const doSubmit = async (formData: FormData) => {
    const prompt = formData.get('prompt') as string;
    const { object: recipe } = await generateRecipe(prompt);

    for await (const delta of readStreamableValue<Recipe>(recipe)) {
      if (delta) {
        setRecipe(delta);
      }
    }

    setIsDone(true);
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Ask for a new recipe</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={doSubmit} className="flex gap-2">
            <Input
              name="prompt"
              placeholder="Enter a dish for its recipe..."
              className="flex-grow"
            />
            <Button type="submit">Generate Recipe</Button>
          </form>
        </CardContent>
      </Card>
      {isDone ? (
        <RecipeCard recipe={recipe!} />
      ) : !!recipe && (
        <p className="flex justify-center items-center gap-x-4">
          Generating recipe... <LoaderCircleIcon className="animate-spin" />
        </p>
      )}
    </div>
  );
}

export default NewRecipePage;
