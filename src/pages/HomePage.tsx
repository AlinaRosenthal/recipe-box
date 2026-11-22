import { useMemo, useState } from 'react';
import { Input } from '@mantine/core';
import { IngredientFilter } from '../components/IngredientFilter';
import { RecipeList } from '../components/RecipeList';
import type { Recipe } from '../data/types';
import { normalizeName } from '../lib/normalize';

type Props = {
  recipes: Recipe[];
};

export function HomePage({ recipes }: Props) {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [recipeSearchValue, setRecipeSearchValue] = useState('');

  const ingredientOptions = useMemo(() => {
    const options = new Map<string, string>();

    for (const recipe of recipes) {
      for (const ingredient of recipe.ingredients) {
        const value = normalizeName(ingredient.name);
        if (value !== '' && !options.has(value)) {
          options.set(value, ingredient.name.trim());
        }
      }
    }

    return [...options.entries()]
      .map(([value, label]) => ({ value, label }))
      .sort((left, right) => left.label.localeCompare(right.label, 'ru'));
  }, [recipes]);

  const visibleRecipes = useMemo(() => {
    let result = recipes;

    // Фильтр по ингредиентам (логика «И»)
    if (selectedIngredients.length > 0) {
      result = result.filter((recipe) => {
        const recipeIngredients = new Set(recipe.ingredients.map((ingredient) => normalizeName(ingredient.name)));
        return selectedIngredients.every((name) => recipeIngredients.has(name));
      });
    }

    // Поиск по названию и ингредиентам
    if (recipeSearchValue.trim() !== '') {
      const query = normalizeName(recipeSearchValue);
      result = result.filter((recipe) => {
        const inName = normalizeName(recipe.title).includes(query);
        const inIngredients = recipe.ingredients.some((ingredient) =>
          normalizeName(ingredient.name).includes(query),
        );
        return inName || inIngredients;
      });
    }

    return result;
  }, [recipes, selectedIngredients, recipeSearchValue]);

  const hasFilters = selectedIngredients.length > 0 || recipeSearchValue.trim() !== '';

  const handleToggleIngredient = (value: string) => {
    setSelectedIngredients((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value],
    );
  };

  return (
    <main className="layout">
      <div className="column-left">
        <IngredientFilter
          options={ingredientOptions}
          selected={selectedIngredients}
          onToggle={handleToggleIngredient}
          onReset={() => setSelectedIngredients([])}
        />
      </div>
      <div>
        <Input
          placeholder="Поиск рецепта по названию или ингредиенту…"
          value={recipeSearchValue}
          onChange={(event) => setRecipeSearchValue(event.currentTarget.value)}
          mb="xs"
          __clearable
          aria-label="Поиск рецепта"
        />
        <RecipeList recipes={visibleRecipes} emptyMessage={hasFilters ? 'Ничего не найдено. Попробуйте изменить фильтры.' : undefined} />
      </div>
    </main>
  );
}
