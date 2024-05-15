export enum CookingAbility {
  COMPLETE_BEGINNER = 'Complete Beginner',
  BEGINNER = 'Beginner',
  AVERAGE = 'Average',
  ADVANCED = 'Advanced',
  PROFESSIONAL = 'Professional',
}

export const cookingAbilityService = {
  toNumber: (cookingAbility: CookingAbility): number => {
    switch (cookingAbility) {
      case CookingAbility.COMPLETE_BEGINNER:
        return 0;
      case CookingAbility.BEGINNER:
        return 1;
      case CookingAbility.AVERAGE:
        return 2;
      case CookingAbility.ADVANCED:
        return 3;
      case CookingAbility.PROFESSIONAL:
        return 4;
    }
  },
};
