import { useState } from 'react';
import { Alert, Anchor, Button } from '@mantine/core';
import { Link, useParams } from 'react-router-dom';
import { RecipeDetail } from '../components/RecipeDetail';
import type { Recipe } from '../data/types';
import { MAX_SERVINGS, MIN_SERVINGS } from '../lib/scale';

type Props = {
  recipes: Recipe[];
};

type ServingsState = {
  recipeId: string | null;
  value: number;
};

export function RecipePage({ recipes }: Props) {
  const { id } = useParams();
  const [servingsState, setServingsState] = useState<ServingsState>({ recipeId: null, value: 1 });

  const recipe = recipes.find((item) => item.id === id) ?? null;

  if (!recipe) {
    return (
      <main className="page">
        <Anchor component={Link} to="/" className="back-link" size="sm">
          ← К списку рецептов
        </Anchor>
        <Alert color="sage" variant="light">
          Рецепт не найден. Возможно, ссылка неверна.
        </Alert>
      </main>
    );
  }

  const servings = servingsState.recipeId === recipe.id ? servingsState.value : recipe.baseServings;

  const handleServingsChange = (value: number) => {
    const clamped = Math.min(MAX_SERVINGS, Math.max(MIN_SERVINGS, Math.round(value)));
    setServingsState({ recipeId: recipe.id, value: clamped });
  };

  return (
    <main className="page">
      <div className="page-toolbar">
        <Anchor component={Link} to="/" className="back-link" size="sm">
          ← К списку рецептов
        </Anchor>
        <Button
          component={Link}
          to={`/recipe/${recipe.id}/edit`}
          variant="subtle"
          color="dark"
          size="sm"
        >
          Редактировать
        </Button>
      </div>
      <RecipeDetail recipe={recipe} servings={servings} onServingsChange={handleServingsChange} />
    </main>
  );
}
