import {Ingredient} from '@/domain/Ingredient';

const PIXABAY_API_KEY = 'XXXXX';

export const getIngredientPictureUrl = async (ingredient: Ingredient): Promise<string | undefined> => {
  const query = `${ingredient.name} ingredient for cooking`;
  const url = `https://api.pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(query)}&image_type=photo`;
  const response = await fetch(url);
  const data = await response.json();
  const hits = data.hits;
  if (hits && hits.length > 0) {
    const randomIndex = Math.floor(Math.random() * hits.length);
    const randomHit = hits[randomIndex];
    return randomHit.webformatURL;
  }
};
