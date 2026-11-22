import { useState } from 'react';
import { Button, Text, Title } from '@mantine/core';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { RequireAuth } from './components/RequireAuth';
import { clearSession, readSession, saveSession } from './data/authRepository';
import { addRecipe, getLocalUserId, listRecipes, updateRecipe } from './data/recipeRepository';
import type { Recipe, RecipeDraft, Session } from './data/types';
import { AddPage } from './pages/AddPage';
import { EditPage } from './pages/EditPage';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RecipePage } from './pages/RecipePage';

export default function App() {
  const [ownerId] = useState(() => getLocalUserId());
  const [session, setSession] = useState<Session | null>(() => readSession());
  const [recipes, setRecipes] = useState<Recipe[]>(() => listRecipes(ownerId));
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  const handleLogin = (name: string) => {
    const nextSession: Session = {
      userId: ownerId,
      name,
      signedInAt: new Date().toISOString(),
    };
    saveSession(nextSession);
    setSession(nextSession);
  };

  const handleLogout = () => {
    clearSession();
    setSession(null);
  };

  const handleSaveRecipe = (draft: RecipeDraft): Recipe => {
    const recipe: Recipe = {
      id: crypto.randomUUID(),
      title: draft.title,
      baseServings: draft.baseServings,
      ingredients: draft.ingredients.map((ingredient) => ({
        id: crypto.randomUUID(),
        ...ingredient,
      })),
      steps: draft.steps,
      ownerId,
      createdAt: new Date().toISOString(),
    };

    addRecipe(recipe);
    setRecipes((current) => [...current, recipe]);
    return recipe;
  };

  const handleUpdateRecipe = (id: string, draft: RecipeDraft): Recipe => {
    const existing = recipes.find((item) => item.id === id);

    if (!existing) {
      throw new Error('Рецепт не найден.');
    }

    const updated: Recipe = {
      ...existing,
      title: draft.title,
      baseServings: draft.baseServings,
      ingredients: draft.ingredients.map((ingredient) => ({
        id: crypto.randomUUID(),
        ...ingredient,
      })),
      steps: draft.steps,
    };

    updateRecipe(updated);
    setRecipes((current) => current.map((item) => (item.id === id ? updated : item)));
    return updated;
  };

  return (
    <div className="app">
      <header className="app-header">
        <svg className="header-waves" aria-hidden="true">
          <path d="M0,32 Q175,16 350,32 T700,32 T1050,32 T1400,32" stroke="#7FA33A" stroke-width="1.5" fill="none" opacity="0.4"/>
          <path d="M0,44 Q175,28 350,44 T700,44 T1050,44 T1400,44" stroke="#7FA33A" stroke-width="1.5" fill="none" opacity="0.25"/>
        </svg>
        <div className="header-blob" aria-hidden="true"></div>
        <div className="header-brand">
          <Title order={1} className="header-title">
            <Link to={session ? '/' : '/login'} className="brand">
              Recipe Box
            </Link>
          </Title>
          <Text c="dimmed" size="sm" className="header-subtitle">
            {session ? `Вы: ${session.name}` : 'Поиск по ингредиентам и пересчёт порций'}
          </Text>
        </div>
        {session && (
          <div className="header-actions">
            <Button variant="subtle" color="dark" size="sm" onClick={handleLogout}>
              Выйти
            </Button>
            <Button
              component={Link}
              to="/add"
              color={isHome ? 'brand' : 'dark'}
              variant={isHome ? 'filled' : 'subtle'}
              size="md"
            >
              + Добавить рецепт
            </Button>
          </div>
        )}
      </header>

      <Routes>
        <Route
          path="/login"
          element={<LoginPage onLogin={handleLogin} isAuthenticated={session !== null} />}
        />
        <Route element={<RequireAuth session={session} />}>
          <Route path="/" element={<HomePage recipes={recipes} />} />
          <Route
            path="/recipe/:id/edit"
            element={<EditPage recipes={recipes} onSave={handleUpdateRecipe} />}
          />
          <Route path="/recipe/:id" element={<RecipePage recipes={recipes} />} />
          <Route path="/add" element={<AddPage onSave={handleSaveRecipe} />} />
        </Route>
        <Route path="*" element={<Navigate to={session ? '/' : '/login'} replace />} />
      </Routes>
    </div>
  );
}
