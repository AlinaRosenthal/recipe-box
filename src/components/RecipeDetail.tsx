import { Badge, Card, Group, Table, Text, Title } from '@mantine/core';
import { isSeedRecipe } from '../data/seed';
import type { Recipe } from '../data/types';
import { plural } from '../lib/plural';
import { formatAmount, scaleAmount, servingsCoefficient } from '../lib/scale';
import { ServingsControl } from './ServingsControl';

type Props = {
  recipe: Recipe;
  servings: number;
  onServingsChange: (value: number) => void;
};

export function RecipeDetail({ recipe, servings, onServingsChange }: Props) {
  const coefficient = servingsCoefficient(servings, recipe.baseServings);

  return (
    <Card withBorder padding="lg" radius="xl" component="section" aria-label="Рецепт">
      <Group justify="space-between" align="flex-start" mb="xs">
        <div>
          <Title order={2}>{recipe.title}</Title>
          {!isSeedRecipe(recipe) && (
            <Badge color="sage" variant="light" mt={4}>
              Ваш рецепт
            </Badge>
          )}
        </div>
        <ServingsControl value={servings} onChange={onServingsChange} />
      </Group>

      <Text c="dimmed" size="sm" mb="sm">
        Базово: {recipe.baseServings} {plural(recipe.baseServings, ['порция', 'порции', 'порций'])}
      </Text>

      <Title order={5}>Ингредиенты</Title>
      <Table mt="xs">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Ингредиент</Table.Th>
            <Table.Th>Количество</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {recipe.ingredients.map((ingredient) => {
            const amount = scaleAmount(ingredient.amount, coefficient);
            return (
              <Table.Tr key={ingredient.id}>
                <Table.Td>{ingredient.name}</Table.Td>
                <Table.Td className="amount">
                  {formatAmount(amount)}
                  {ingredient.unit ? ` ${ingredient.unit}` : ''}
                </Table.Td>
              </Table.Tr>
            );
          })}
        </Table.Tbody>
      </Table>

      <Title order={5} mt="md">
        Шаги
      </Title>
      <ol className="steps-list">
        {recipe.steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </Card>
  );
}
