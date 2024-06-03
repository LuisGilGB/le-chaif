/**
 * v0 by Vercel.
 * @see https://v0.dev/t/ZqUV1RJsmfd
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import CollapsibleBlock from '@/components/CollapsibleBlock';
import FiveStarsRating from '@/components/FiveStarsRating';
import IngredientSummary from '@/components/recipe/IngredientSummary';
import {Badge} from '@/components/ui/Badge';
import Image from '@/components/ui/Image';
import {cookingAbilityService} from '@/domain/CookingAbility';
import {Recipe} from '@/domain/Recipe';
import Link from 'next/link';

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard = ({ recipe }: RecipeCardProps) => (
  <section className="@container bg-sky-50 rounded-lg shadow-md overflow-hidden dark:bg-sky-950">
    <div className="grid @md:grid-cols-2">
      <section className="p-8 space-y-6">
        <header>
          <h2 className="text-2xl font-bold text-sky-900 dark:text-sky-50">{recipe.name}</h2>
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
              <li className="text-sky-900 dark:text-sky-50" key={i}>
                {step}
              </li>
            ))}
          </ol>
        </CollapsibleBlock>
        <section className="grid grid-cols-2 gap-4 order-4">
          <section>
            <h3 className="text-lg font-medium text-sky-900 dark:text-sky-50">Total Time</h3>
            <p className="text-sky-900 dark:text-sky-50">{recipe.estimatedTime}</p>
          </section>
          <section>
            <h3 className="text-lg font-medium text-sky-900 dark:text-sky-50">Skill Level</h3>
            <FiveStarsRating rating={cookingAbilityService.toNumber(recipe.requiredAbility) + 1} />
          </section>
          <section className="col-span-2">
            <h3 className="text-lg font-medium text-sky-900 dark:text-sky-50">Tools</h3>
            <div className="flex flex-wrap gap-2">
              {recipe.requiredTools.map((tool, i) => (
                <Badge
                  key={i}
                  className="bg-sky-100 text-sky-900 dark:bg-sky-800 dark:text-sky-50 hover:bg-sky-200 dark:hover:bg-sky-700"
                >
                  {tool}
                </Badge>
              ))}
            </div>
          </section>
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
        <div className="absolute inset-0 bg-gradient-to-t from-sky-950 to-transparent" />
        {!!recipe.videoUrl && (
          <div className="absolute bottom-4 left-4">
            <h3 className="text-lg font-medium text-sky-50 mb-1">Watch the Video</h3>
            <Link
              className="bg-sky-50 bg-opacity-30 rounded-full px-4 py-1 text-xs text-sky-500 hover:text-sky-600 hover:bg-sky-100 transition-colors"
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
