export type Ingredient = {
  id: string;
  name: string;
  amount: number | null;
  unit: string;
};

export type Recipe = {
  id: string;
  title: string;
  baseServings: number;
  ingredients: Ingredient[];
  steps: string[];
  ownerId: string;
  createdAt: string;
};

export type RecipeDraftIngredient = {
  name: string;
  amount: number | null;
  unit: string;
};

export type RecipeDraft = {
  title: string;
  baseServings: number;
  ingredients: RecipeDraftIngredient[];
  steps: string[];
};

export type Session = {
  userId: string;
  name: string;
  signedInAt: string;
};
