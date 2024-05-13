import { CookingAbility } from '@/domain/CookingAbility';
import { Ingredient } from '@/domain/Ingredient';

export interface Recipe {
  name: string;
  ingredients: Ingredient[];
  preparationSteps: string[];
  estimatedTime: string;
  requiredAbility: CookingAbility;
  requiredTools: string[];
  pictureUrl?: string;
  videoUrl?: string;
}
