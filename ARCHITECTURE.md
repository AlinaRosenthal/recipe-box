# Architecture — Recipe Box

**Версия:** 1.0, 2026-11-22.  
**Область:** учебный проект ИДЗ1; приложение работает полностью в браузере, без сервера.

## 1. Обзор

Recipe Box — одностраничное приложение (SPA) на React 19 + Vite 8 + Mantine 9.8. Оно показывает каталог рецептов, фильтрует их по имеющимся ингредиентам (логика «И»), пересчитывает количества под выбранное число порций и позволяет добавлять и редактировать рецепты.

Единственное хранилище — `localStorage` браузера. Авторизация — учебный mock-прототип: форма входа, имитация запроса и локальная сессия; внешних систем, токенов и проверки пароля нет.

## 2. Карта выполнения

```text
index.html
  └─ src/main.tsx
       └─ MantineProvider (src/theme.ts)
            └─ ErrorBoundary
                 └─ BrowserRouter
                      └─ App (src/App.tsx)
                           ├─ session state  ← authRepository.readSession()
                           ├─ recipes state  ← recipeRepository.listRecipes(ownerId)
                           └─ Routes
                                ├─ /login              → LoginPage
                                ├─ RequireAuth         → защита внутренних маршрутов
                                │    ├─ /              → HomePage
                                │    ├─ /recipe/:id    → RecipePage
                                │    ├─ /recipe/:id/edit → EditPage
                                │    └─ /add           → AddPage
                                └─ *                   → Navigate
```

## 3. Маршруты

| URL | Компонент | Доступ | Назначение |
|---|---|---|---|
| `/login` | `LoginPage` | публичный | демо-вход по имени и паролю |
| `/` | `HomePage` | только с сессией | фильтр «Что имеется?» и каталог |
| `/recipe/:id` | `RecipePage` | только с сессией | рецепт, порции, ингредиенты, шаги |
| `/recipe/:id/edit` | `EditPage` | только с сессией | редактирование рецепта |
| `/add` | `AddPage` | только с сессией | добавление рецепта |
| `*` | `Navigate` | — | на `/` при сессии, иначе на `/login` |

`RequireAuth` запоминает исходный путь в `location.state.from`; после входа `LoginPage` возвращает пользователя туда. Прямые ссылки и F5 работают благодаря SPA fallback Vite: сервер отдаёт `index.html` на любой путь.

## 4. Структура данных

Типы лежат в `src/data/types.ts`.

```ts
type Session = {
  userId: string;      // совпадает с recipebox.v1.userId
  name: string;        // отображаемое имя из формы входа
  signedInAt: string;  // ISO-дата входа
};

type Ingredient = {
  id: string;
  name: string;
  amount: number | null; // null = «по вкусу»
  unit: string;          // '', г, кг, мл, л, шт, ст.л., ч.л., щепотка
};

type Recipe = {
  id: string;
  title: string;
  baseServings: number;
  ingredients: Ingredient[];
  steps: string[];
  ownerId: string;
  createdAt: string;   // ISO-дата создания
};

type RecipeDraftIngredient = {
  name: string;
  amount: number | null;
  unit: string;
};

type RecipeDraft = {
  title: string;
  baseServings: number;
  ingredients: RecipeDraftIngredient[];
  steps: string[];
};
```

`RecipeDraft` — данные из формы до сохранения. При добавлении `App` создаёт `Recipe`: `id` — UUID, `ownerId` — текущий локальный пользователь, `createdAt` — текущее время, id ингредиентов — новые UUID. При редактировании `id`, `ownerId` и `createdAt` сохраняются, id ингредиентов пересоздаются.

## 5. Ключи localStorage

Все ключи имеют префикс `recipebox.v1.` и относятся к origin приложения (при локальном запуске — `http://localhost:5173`).

| Ключ | Формат | Когда создаётся | Когда удаляется |
|---|---|---|---|
| `recipebox.v1.userId` | строка UUID | при первом запуске, если ключа нет | только вручную или очисткой данных сайта |
| `recipebox.v1.session` | JSON `Session` | после успешного входа | при выходе, при повреждённом JSON |
| `recipebox.v1.recipes` | JSON `Recipe[]` | при первом запуске, добавлении, редактировании | только вручную или очисткой данных сайта |

Пример сессии:

```json
{
  "userId": "80deb056-f35c-4f18-8a5a-05df79afccea",
  "name": "Аня",
  "signedInAt": "2026-11-22T15:34:39.781Z"
}
```

Пример рецепта (сокращённо):

```json
{
  "id": "seed-plov",
  "title": "Плов",
  "baseServings": 4,
  "ingredients": [
    { "id": "seed-plov-ing-1", "name": "рис", "amount": 400, "unit": "г" }
  ],
  "steps": ["Промойте рис в холодной воде..."],
  "ownerId": "80deb056-f35c-4f18-8a5a-05df79afccea",
  "createdAt": "2026-11-22T15:34:39.781Z"
}
```

## 6. Потоки чтения и записи

### Первый запуск

1. `App` вызывает `getLocalUserId()`.
2. Если `recipebox.v1.userId` нет, создаётся UUID и сохраняется.
3. `listRecipes(ownerId)` читает `recipebox.v1.recipes`.
4. Если массива нет, `createSeedRecipes(ownerId)` создаёт 8 демо-рецептов, сохраняет их и возвращает.
5. Если массив есть, возвращаются только рецепты с текущим `ownerId`.

### Вход

1. Пользователь открывает `/login`, вводит имя и пароль.
2. `LoginPage` проверяет, что оба поля непустые; имя обрезается, ограничение — 40 символов.
3. Вход имитируется задержкой ~600 мс; внешних запросов нет.
4. `App.handleLogin` создаёт `Session` с текущим `userId` и вызывает `saveSession`.
5. Сессия сохраняется в `recipebox.v1.session`; `App` обновляет состояние.
6. `LoginPage` возвращает пользователя на исходный путь или на `/`.

Пароль не сохраняется и не проверяется. Сессия — это только локальная отметка «пользователь вошёл», а не средство безопасности.

### Выход

1. Кнопка «Выйти» вызывает `clearSession()`.
2. Ключ `recipebox.v1.session` удаляется.
3. `App` сбрасывает состояние сессии; `RequireAuth` отправляет на `/login`.
4. Рецепты и `recipebox.v1.userId` остаются, поэтому после повторного входа данные на месте.

### Добавление

1. `RecipeForm` валидирует название, порции (1–20), хотя бы один ингредиент и хотя бы один шаг.
2. `App.handleSaveRecipe` создаёт `Recipe` и вызывает `addRecipe`.
3. `addRecipe` читает текущий массив, заменяет запись с тем же `id` (если была) и записывает массив обратно.
4. Состояние `recipes` обновляется, `AddPage` переходит на `/recipe/<id>`.

### Редактирование

1. `EditPage` находит рецепт по `id` и передаёт `initialValues` в общий `RecipeForm`.
2. `App.handleUpdateRecipe` сохраняет `id`, `ownerId`, `createdAt`, заменяет остальные поля.
3. `updateRecipe` находит запись по `id`, заменяет её и записывает массив.
4. При ошибке записи форма показывает `Alert`; «Отмена» ничего не сохраняет.

### Чтение и ошибки

- Невалидный JSON рецептов → `console.warn`, массив пересоздаётся из 8 демо-рецептов.
- Невалидная сессия → `console.warn`, ключ удаляется, пользователь видит `/login`.
- `QuotaExceededError` или недоступный localStorage при записи → `Error` с понятным сообщением; форма показывает `Alert`.
- Ошибки рендера ловит `ErrorBoundary`: карточка «Что-то пошло не так» и кнопка «Обновить».

## 7. Авторизация: границы прототипа

- Нет сервера, внешних запросов, токенов, cookies и проверки пароля.
- Пароль не хранится ни в localStorage, ни в коде.
- Один локальный профиль: имя отображается в шапке, но `userId` не меняется при смене имени.
- Сессия не является защитой: любой с доступом к браузеру может открыть DevTools и прочитать данные.
- Нет восстановления пароля, регистрации, нескольких аккаунтов и синхронизации между устройствами.

## 8. Ограничения

- Только `localStorage`, только текущий браузер/профиль/origin.
- Объём localStorage обычно около 5 МБ; при переполнении запись не проходит, показывается сообщение.
- Очистка данных сайта или ручное удаление ключей удаляет рецепты, сессию и `userId`.
- Нет синхронизации между вкладками; при одновременной записи из двух вкладок побеждает последняя.
- Нет автотестов: проверки ручные и разовыми скриптами.
- Кросс-браузерная проверка ограничена: проверен Chromium; Safari на Windows недоступен, установленный Firefox 72 старше поддерживаемого стека.

## 9. Сброс и инспекция данных

DevTools → Application → Local Storage → `http://localhost:5173`.

Полный сброс:

```js
localStorage.removeItem('recipebox.v1.session');
localStorage.removeItem('recipebox.v1.recipes');
localStorage.removeItem('recipebox.v1.userId');
```

Сброс только входа (рецепты останутся):

```js
localStorage.removeItem('recipebox.v1.session');
```

После полного сброса при следующем запуске создаётся новый `userId` и снова 8 демо-рецептов.

## 10. Карта модулей

| Путь | Ответственность |
|---|---|
| `src/main.tsx` | точка входа, MantineProvider, ErrorBoundary, BrowserRouter |
| `src/App.tsx` | сессия, рецепты, обработчики, шапка, маршруты |
| `src/theme.ts` | палитры, типографика, радиусы, тени, переменные Mantine |
| `src/styles.css` | токены `--rb-*`, каркас, сетка, шапка, строки ингредиентов |
| `src/pages/LoginPage.tsx` | демо-форма входа и возврат на исходный путь |
| `src/pages/HomePage.tsx` | фильтр по ингредиентам и список рецептов |
| `src/pages/RecipePage.tsx` | страница рецепта и управление порциями |
| `src/pages/AddPage.tsx` | добавление рецепта |
| `src/pages/EditPage.tsx` | редактирование рецепта |
| `src/components/RequireAuth.tsx` | защита маршрутов |
| `src/components/RecipeForm.tsx` | общая форма добавления и редактирования |
| `src/components/ErrorBoundary.tsx` | fallback при ошибке рендера |
| `src/data/authRepository.ts` | чтение, запись, очистка сессии |
| `src/data/recipeRepository.ts` | localStorage-репозиторий рецептов |
| `src/data/seed.ts` | 8 демо-рецептов |
| `src/data/types.ts` | Session, Recipe, Ingredient, RecipeDraft |
| `src/lib/scale.ts` | коэффициент порций и округление |
| `src/lib/normalize.ts` | нормализация названий ингредиентов |
| `src/lib/plural.ts` | склонения «порция/порции/порций» |

## 11. Проверка

Минимальная приёмка описана в `PRD.md`, раздел 8. Кратко:

- `pnpm build` — exit 0;
- без сессии внутренние маршруты ведут на `/login`;
- вход, F5 и повторный запуск браузера сохраняют сессию и рецепты;
- выход очищает сессию, но не рецепты;
- фильтр «курица» + «рис» → 2;
- Плов 4 → 6: 600 г риса, 900 г курицы, 3 шт моркови;
- Брауни 6 → 5: 167 г шоколада, 2,5 шт яйца;
- добавление и редактирование сохраняются после F5;
- консоль без ошибок и предупреждений в обычном сценарии.
