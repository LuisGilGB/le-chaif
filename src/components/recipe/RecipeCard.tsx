/**
 * v0 by Vercel.
 * @see https://v0.dev/t/ZqUV1RJsmfd
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Badge } from '@/components/ui/Badge';
import { IconStar } from '@/components/ui/Icons';
import { Recipe } from '@/domain/Recipe';
import Link from 'next/link';

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard = ({ recipe }: RecipeCardProps) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden dark:bg-gray-950">
    <div className="grid md:grid-cols-2">
      <div className="p-8 space-y-6">
        <h2 className="text-2xl font-bold">{recipe.name}</h2>
        <div className="space-y-4 order-2 md:order-1">
          <h3 className="text-lg font-medium">Ingredients</h3>
          <ul className="space-y-2">
            {recipe.ingredients.map((ingredient, i) => (
              <li key={i} className="flex items-start gap-4">
                <img
                  alt={ingredient.name}
                  className="rounded-md"
                  height={64}
                  src={ingredient.pictureUrl}
                  style={{
                    aspectRatio: '64/64',
                    objectFit: 'cover',
                  }}
                  width={64}
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{ingredient.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{ingredient.quantity}</p>
                    </div>
                    {!!ingredient.shopLink && (
                      <Link className="text-primary hover:underline whitespace-nowrap" href={ingredient.shopLink}>
                        Buy Now
                      </Link>
                    )}
                  </div>
                  {!!ingredient.preparationsAdvices?.length && (
                    <ul className="pl-4">
                      {ingredient.preparationsAdvices.map((advice, i) => (
                        <li key={i} className="text-sm text-gray-500 dark:text-gray-400">
                          {advice}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4 order-3 md:order-2">
          <h3 className="text-lg font-medium">Preparation</h3>
          <ol className="space-y-2 list-decimal pl-4">
            {recipe.preparationSteps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>
        <div className="grid grid-cols-2 gap-4 order-4">
          <div>
            <h3 className="text-lg font-medium">Total Time</h3>
            <p>{recipe.estimatedTime}</p>
          </div>
          <div>
            <h3 className="text-lg font-medium">Skill Level</h3>
            <div className="flex items-center gap-1">
              <IconStar className="w-5 h-5 fill-primary" />
              <IconStar className="w-5 h-5 fill-primary" />
              <IconStar className="w-5 h-5 fill-primary" />
              <IconStar className="w-5 h-5 fill-muted stroke-muted-foreground" />
              <IconStar className="w-5 h-5 fill-muted stroke-muted-foreground" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium">Tools</h3>
            <div className="flex flex-wrap gap-2">
              {recipe.requiredTools.map((tool, i) => (
                <Badge key={i}>{tool}</Badge>
              ))}
              {/*
                <Badge className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-sm font-medium text-gray-900 dark:bg-gray-800 dark:text-gray-50">
                  Large skillet
                </Badge>
              */}
            </div>
          </div>
        </div>
      </div>
      <div className="relative order-1 md:order-2">
        <img
          alt={recipe.name}
          className="w-full h-full object-cover"
          height={600}
          src={recipe.pictureUrl}
          style={{
            aspectRatio: '800/600',
            objectFit: 'cover',
          }}
          width={800}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-transparent" />
        {!!recipe.videoUrl && (
          <div className="absolute bottom-4 left-4">
            <h3 className="text-white text-lg font-medium mb-2">Watch the Video</h3>
            <Link
              className="bg-gray-500 bg-opacity-30 rounded-full px-4 py-1 text-primary text-xs hover:bg-gray-100 transition-colors"
              href={recipe.videoUrl}
              target="_blank"
            >
              View Preparation
            </Link>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default RecipeCard;
