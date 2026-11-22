import { Anchor, Card, Title } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import { RecipeForm } from '../components/RecipeForm';
import type { Recipe, RecipeDraft } from '../data/types';

type Props = {
  onSave: (draft: RecipeDraft) => Recipe;
};

export function AddPage({ onSave }: Props) {
  const navigate = useNavigate();

  const handleSave = (draft: RecipeDraft) => {
    const recipe = onSave(draft);
    navigate(`/recipe/${recipe.id}`);
  };

  return (
    <main className="page">
      <Anchor component={Link} to="/" className="back-link" size="sm">
        ← К списку рецептов
      </Anchor>
      <Card withBorder padding="md">
        <Title order={2} mb="md">
          Новый рецепт
        </Title>
        <RecipeForm onSave={handleSave} onCancel={() => navigate('/')} />
      </Card>
    </main>
  );
}
