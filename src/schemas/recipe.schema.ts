import { CookingAbility } from '@/domain/CookingAbility';
import { z } from 'zod';
import { ingredientSchema } from './ingredient.schema';

export const recipeSchema = z.object({
  name: z.string(),
  ingredients: z.array(ingredientSchema),
  preparationSteps: z.array(z.string()),
  estimatedTime: z.string(),
  requiredAbility: z.nativeEnum(CookingAbility),
  requiredTools: z.array(z.string()),
  pictureUrl: z.string().optional(),
  videoUrl: z.string().optional(),
});
