import { Card, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import type { Recipe } from '../data/types';
import { plural } from '../lib/plural';

type Props = {
  recipe: Recipe;
};

export function RecipeCard({ recipe }: Props) {
  return (
    <Card
      withBorder
      padding="sm"
      component={Link}
      to={`/recipe/${recipe.id}`}
      className="recipe-card"
    >
      <Text fw={700}>{recipe.title}</Text>
      <Text c="dimmed" size="xs">
        {recipe.baseServings} {plural(recipe.baseServings, ['порция', 'порции', 'порций'])} ·{' '}
        {recipe.ingredients.length} {plural(recipe.ingredients.length, ['ингредиент', 'ингредиента', 'ингредиентов'])}
      </Text>
    </Card>
  );
}
