import Image from '@/components/ui/Image';
import {Ingredient} from '@/domain/Ingredient';
import {cn} from '@/lib/utils';
import Link from 'next/link';

interface IngredientSummaryProps {
  ingredient: Ingredient;
  className?: string;
}

const IngredientSummary = ({ ingredient, className }: IngredientSummaryProps) => (
  <li className={cn('flex items-start gap-4', className)}>
    <Image
      src={ingredient.pictureUrl}
      alt={ingredient.name}
      className="rounded-md object-cover aspect-square"
      height={64}
      width={64}
    />
    <div className="flex-1">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium text-sky-900 dark:text-sky-50">{ingredient.name}</h4>
          <p className="text-sm text-sky-500 dark:text-sky-400">{ingredient.quantity}</p>
        </div>
        {!!ingredient.shopLink && (
          <Link className="text-sky-500 hover:text-sky-600 whitespace-nowrap" href={ingredient.shopLink}>
            Buy Now
          </Link>
        )}
      </div>
      {!!ingredient.preparationsAdvices?.length && (
        <ul>
          {ingredient.preparationsAdvices?.map((advice, i) => (
            <li key={i} className="text-sm text-sky-500 dark:text-sky-400">
              {advice}
            </li>
          ))}
        </ul>
      )}
    </div>
  </li>
);

export default IngredientSummary;
