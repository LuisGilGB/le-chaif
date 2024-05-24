/**
 * v0 by Vercel.
 * @see https://v0.dev/t/ZqUV1RJsmfd
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import CollapsibleBlock from '@/components/CollapsibleBlock';
import FiveStarsRating from '@/components/FiveStarsRating';
import IngredientSummary from '@/components/recipe/IngredientSummary';
import { Badge } from '@/components/ui/Badge';
import Image from '@/components/ui/Image';
import { cookingAbilityService } from '@/domain/CookingAbility';
import { Recipe } from '@/domain/Recipe';
import Link from 'next/link';

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard = ({ recipe }: RecipeCardProps) => (
  <section className="bg-white rounded-lg shadow-md overflow-hidden dark:bg-gray-950">
    <div className="grid md:grid-cols-2">
      <section className="p-8 space-y-6">
        <header>
          <h2 className="text-2xl font-bold">{recipe.name}</h2>
        </header>
        <CollapsibleBlock title="Ingredients">
          <ul className="space-y-2">
            {recipe.ingredients.map((ingredient, i) => (
              <IngredientSummary key={i} ingredient={ingredient} />
            ))}
          </ul>
        </CollapsibleBlock>
        <CollapsibleBlock title="Preparation">
          <ol className="space-y-2 list-decimal pl-4">
            {recipe.preparationSteps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </CollapsibleBlock>
        <section className="grid grid-cols-2 gap-4 order-4">
          <div>
            <h3 className="text-lg font-medium">Total Time</h3>
            <p>{recipe.estimatedTime}</p>
          </div>
          <div>
            <h3 className="text-lg font-medium">Skill Level</h3>
            <FiveStarsRating rating={cookingAbilityService.toNumber(recipe.requiredAbility) + 1} />
          </div>
          <div className="col-span-2">
            <h3 className="text-lg font-medium">Tools</h3>
            <div className="flex flex-wrap gap-2">
              {recipe.requiredTools.map((tool, i) => (
                <Badge key={i}>{tool}</Badge>
              ))}
            </div>
          </div>
        </section>
      </section>
      <section className="relative order-1 md:order-2">
        <Image
          src={recipe.pictureUrl || '/placeholder.svg'}
          alt={recipe.name}
          className="w-full h-full object-cover aspect-[4/3]"
          height={600}
          width={800}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-transparent" />
        {!!recipe.videoUrl && (
          <div className="absolute bottom-4 left-4">
            <h3 className="text-white text-lg font-medium mb-1">Watch the Video</h3>
            <Link
              className="bg-gray-50 bg-opacity-30 rounded-full px-4 py-1 text-primary text-xs hover:bg-gray-100 transition-colors"
              href={recipe.videoUrl}
              target="_blank"
            >
              View Preparation
            </Link>
          </div>
        )}
      </section>
    </div>
  </section>
);

export default RecipeCard;
