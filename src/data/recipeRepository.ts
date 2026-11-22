import { createSeedRecipes } from './seed';
import type { Ingredient, Recipe } from './types';

const RECIPES_KEY = 'recipebox.v1.recipes';
const USER_KEY = 'recipebox.v1.userId';
const FALLBACK_USER_ID = 'local-user';

function createId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export function getLocalUserId(): string {
  try {
    const existing = localStorage.getItem(USER_KEY);
    if (existing) {
      return existing;
    }
  } catch {
    return FALLBACK_USER_ID;
  }

  const id = createId();
  try {
    localStorage.setItem(USER_KEY, id);
  } catch {
    // Идентификатор всё равно нужен для ownerId, даже если сохранить его не удалось.
  }
  return id;
}

export function listRecipes(ownerId: string): Recipe[] {
  const stored = readRecipes();
  if (stored) {
    return stored.filter((recipe) => recipe.ownerId === ownerId);
  }

  const seeded = createSeedRecipes(ownerId);
  try {
    writeRecipes(seeded);
  } catch (error) {
    console.warn('Recipe Box: не удалось сохранить стартовый набор рецептов.', error);
  }
  return seeded;
}

export function addRecipe(recipe: Recipe): void {
  const current = readRecipes() ?? createSeedRecipes(recipe.ownerId);
  writeRecipes([...current.filter((item) => item.id !== recipe.id), recipe]);
}

export function updateRecipe(recipe: Recipe): void {
  const current = readRecipes();

  if (!current) {
    throw new Error('Не удалось сохранить данные в браузере: хранилище недоступно или переполнено.');
  }

  const index = current.findIndex((item) => item.id === recipe.id);

  if (index === -1) {
    throw new Error('Рецепт не найден.');
  }

  const next = [...current];
  next[index] = recipe;
  writeRecipes(next);
}

function readRecipes(): Recipe[] | null {
  let raw: string | null = null;

  try {
    raw = localStorage.getItem(RECIPES_KEY);
  } catch {
    return null;
  }

  if (!raw) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      throw new Error('Ожидался массив рецептов');
    }
    const recipes = parsed.filter(isRecipe);
    if (recipes.length !== parsed.length) {
      throw new Error('Некорректные данные рецепта');
    }
    return recipes;
  } catch (error) {
    console.warn('Recipe Box: данные в localStorage повреждены, каталог пересоздан.', error);
    return null;
  }
}

function writeRecipes(recipes: Recipe[]): void {
  try {
    localStorage.setItem(RECIPES_KEY, JSON.stringify(recipes));
  } catch {
    throw new Error('Не удалось сохранить данные в браузере: хранилище недоступно или переполнено.');
  }
}

function isIngredient(value: unknown): value is Ingredient {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.id === 'string' &&
    typeof candidate.name === 'string' &&
    typeof candidate.unit === 'string' &&
    (typeof candidate.amount === 'number' || candidate.amount === null)
  );
}

function isRecipe(value: unknown): value is Recipe {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.id === 'string' &&
    typeof candidate.title === 'string' &&
    typeof candidate.ownerId === 'string' &&
    typeof candidate.createdAt === 'string' &&
    typeof candidate.baseServings === 'number' &&
    Array.isArray(candidate.steps) &&
    candidate.steps.every((step) => typeof step === 'string') &&
    Array.isArray(candidate.ingredients) &&
    candidate.ingredients.every(isIngredient)
  );
}
