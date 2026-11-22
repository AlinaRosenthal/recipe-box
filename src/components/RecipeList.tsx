import { Card, Group, Stack, Text, Title } from '@mantine/core';
import type { Recipe } from '../data/types';
import { RecipeCard } from './RecipeCard';

type Props = {
  recipes: Recipe[];
  emptyMessage?: string;
};

export function RecipeList({ recipes, emptyMessage }: Props) {
  return (
    <Card withBorder padding="md" component="section" aria-label="Список рецептов">
      <Group justify="space-between" align="center" mb="xs">
        <Title order={4}>Рецепты</Title>
        <Text c="dimmed" size="sm">
          {recipes.length}
        </Text>
      </Group>
      {recipes.length === 0 ? (
        <Text c="dimmed" fw={700}>
          {emptyMessage ?? 'Ничего не найдено. Снимите часть ингредиентов.'}
        </Text>
      ) : (
        <Stack gap="xs">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </Stack>
      )}
    </Card>
  );
}
