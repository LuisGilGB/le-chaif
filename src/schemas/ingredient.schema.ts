import { z } from 'zod';

export const ingredientSchema = z.object({
  name: z.string(),
  quantity: z.string(),
  preparationsAdvices: z.array(z.string()).optional(),
  pictureUrl: z.string().optional(),
  shopLink: z.string().optional(),
});
