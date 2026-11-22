import { Alert, Anchor, Card, Title } from '@mantine/core';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { RecipeForm } from '../components/RecipeForm';
import type { Recipe, RecipeDraft } from '../data/types';

type Props = {
  recipes: Recipe[];
  onSave: (id: string, draft: RecipeDraft) => Recipe;
};

export function EditPage({ recipes, onSave }: Props) {
  const { id } = useParams();
  const navigate = useNavigate();
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

  const initialValues: RecipeDraft = {
    title: recipe.title,
    baseServings: recipe.baseServings,
    ingredients: recipe.ingredients.map((ingredient) => ({
      name: ingredient.name,
      amount: ingredient.amount,
      unit: ingredient.unit,
    })),
    steps: recipe.steps,
  };

  const handleSave = (draft: RecipeDraft) => {
    const updated = onSave(recipe.id, draft);
    navigate(`/recipe/${updated.id}`);
  };

  return (
    <main className="page">
      <Anchor component={Link} to={`/recipe/${recipe.id}`} className="back-link" size="sm">
        ← К рецепту
      </Anchor>
      <Card withBorder padding="md">
        <Title order={2} mb="md">
          Редактировать рецепт
        </Title>
        <RecipeForm
          key={recipe.id}
          initialValues={initialValues}
          onSave={handleSave}
          onCancel={() => navigate(`/recipe/${recipe.id}`)}
        />
      </Card>
    </main>
  );
}
