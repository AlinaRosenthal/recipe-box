# HANDOFF: полный контекст проекта Recipe Box

Скопируйте текст ниже целиком в новую сессию.

---

## Recipe Box — локальное приложение «коробка рецептов»

**Путь:** `C:\Users\Alina\recipe-box_IDZ1`  
**Версия:** 1.0, 2026-11-22  
**Стек:** React 19.3.1, TypeScript 7.0.2, Vite 8.3.7, react-router-dom 7.18.5, Mantine 9.8.0, `@fontsource/nunito-sans` 5.3.0, pnpm 11.28.5

**Задача:** приложение для тех, кто готовит дома и хранит рецепты в заметках. Позволяет искать рецепты по ингредиентам, которые есть на кухне, и пересчитывать количества под нужное число порций.

---

## 1. Структура проекта

```
recipe-box_IDZ1/
├── index.html                  # Точка входа HTML
├── package.json                # Зависимости и скрипты (pnpm install, build, dev)
├── tsconfig.json               # TypeScript конфиг
├── vite.config.ts              # Vite конфиг (devServer.historyApiFallback для SPA)
├── .gitignore                  # Исключает node_modules, dist, .pnpm-store
├── .npmrc                      # node-linker=hoisted (для песочницы DSH)
│
├── src/
│   ├── main.tsx                # Точка входа React: createRoot, StrictMode,
│   │                             # MantineProvider + ErrorBoundary + BrowserRouter
│   ├── App.tsx                 # Роуты, шапка, обработка входа/выхода, сохранения, редактирования
│   ├── theme.ts                # Mantine тема: палитры brand/sage/olive/error, типографика, радиусы, тени,
│   │                             # resolver для CSS-переменных Mantine
│   ├── styles.css              # CSS-токены --rb-*, карточка, шапка, сетка, адаптив
│   │
│   ├── pages/                  # Страницы (маршруты)
│   │   ├── LoginPage.tsx       # /login — форма входа (имя + пароль), валидация, имитация ~600мс
│   │   ├── HomePage.tsx        # / — каталог + фильтр «Что имеется?»
│   │   ├── RecipePage.tsx      # /recipe/:id — детали рецепта, порции, ингредиенты, шаги
│   │   ├── AddPage.tsx         # /add — форма добавления рецепта
│   │   └── EditPage.tsx        # /recipe/:id/edit — форма редактирования
│   │
│   ├── components/             # UI-компоненты
│   │   ├── RequireAuth.tsx     # HOC: защита маршрутов, редирект на /login без сессии
│   │   ├── ErrorBoundary.tsx   # Ловит ошибки рендера, показывает «Что-то пошло не так» + кнопка
│   │   ├── RecipeList.tsx      # Список карточек рецептов
│   │   ├── RecipeCard.tsx      # Карточка рецепта — ссылка на /recipe/:id
│   │   ├── RecipeDetail.tsx    # Детали: название, порции, таблица ингредиентов, шаги
│   │   ├── IngredientFilter.tsx# Чекбоксы ингредиентов, логика «И», «Сбросить», счётчик
│   │   ├── ServingsControl.tsx # − / число / + — управление порциями
│   │   └── RecipeForm.tsx      # Форма для добавления и редактирования (общая, с initialValues)
│   │
│   ├── data/                   # Слой данных (localStorage)
│   │   ├── types.ts            # Типы: Session, Recipe, Ingredient, RecipeDraft
│   │   ├── seed.ts             # 8 демо-рецептов (Плов, Куриный суп с рисом, Брауни, Греческий салат,
│   │   │                         # Овсянка с яблоком, Омлет с помидорами, Паста карбонара, Сырники)
│   │   ├── recipeRepository.ts # listRecipes(ownerId), addRecipe, updateRecipe, localStorage CRUD
│   │   └── authRepository.ts   # readSession, saveSession, clearSession — mock-сессия
│   │
│   └── lib/                    # Утилиты
│       ├── scale.ts            # Масштабирование: roundAmount, scaleAmount, formatAmount, servingsCoefficient
│       ├── normalize.ts        # normalizeName: trim, lowercase, ё→е, collapse spaces
│       └── plural.ts           # plural(count, [one, few, many]) — склонения «порция/порции/порций»
│
├── docs/
│   ├── DESIGN.md               # Дизайн-система: цвета, типографика, layout, elevation, shapes,
│   │                             # components, do's/don'ts, implementation status
│   └── qa/                     # 20+ скриншотов ручной проверки (desktop, 375, 320px)
│
├── PRD.md                      # Product Requirements Document: сценарий, экраны, проверки, журнал работ
├── ARCHITECTURE.md             # Структура данных, localStorage ключи, потоки, ограничения, карта модулей
├── README.md                   # Запуск, маршруты, сброс данных, документация
├── REFLECTION.md               # 6 строк: ИИ помог/мешал/сделала сама (для сдачи ИДЗ1)
└── HANDOFF.md                  # Этот файл — контекст для новой сессии
```

---

## 2. Маршруты и навигация

| URL | Страница | Доступ | Назначение |
|---|---|---|---|
| `/login` | LoginPage | Публичный | Форма входа, шапка видна |
| `/` | HomePage | Только сессия | Фильтр «Что имеется?» + каталог |
| `/recipe/:id` | RecipePage | Только сессия | Детали рецепта, порции, ингредиенты, шаги |
| `/recipe/:id/edit` | EditPage | Только сессия | Редактирование рецепта |
| `/add` | AddPage | Только сессия | Добавление рецепта |
| `*` | Navigate | — | Редирект на `/` (с сессией) или `/login` |

**Порядок маршрутов в `App.tsx`:** `/recipe/:id/edit` объявлен **до** `/recipe/:id`, иначе бы `:id` подхватил `edit` как id.

---

## 3. Что сделано

### Роутинг
- `react-router-dom` 7, `BrowserRouter` в `main.tsx`
- 5 страниц с собственными URL
- `RequireAuth` защищает `/`, `/recipe/:id`, `/recipe/:id/edit`, `/add`
- `Navigate` на `*` — возвращает на исходный путь после входа
- F5 и прямые ссылки работают (Vite `historyApiFallback`)

### Авторизация (mock)
- `authRepository.ts`: `readSession()` валидирует JSON, повреждённая сессия удаляется и считается выходом
- `LoginPage.tsx`: форма «Имя» / «Пароль», валидация, задержка ~600 мс, подсказка «пароль не проверяется»
- `session` в `recipebox.v1.session`: `{ userId, name, signedInAt }`
- `userId` из `recipebox.v1.userId` — UUID, создаётся при первом запуске
- Пароль **не проверяется** и **не сохраняется**

### Контент
- **8 демо-рецептов** в `seed.ts`: Плов (4), Куриный суп с рисом (4), Шоколадный брауни (6), Греческий салат (2), Овсянка с яблоком (2), Омлет с помидорами (2), Паста карбонара (4), Сырники (3)
- Единицы: г, кг, мл, л, ст.л., ч.л., шт, щепотка, пусто («по вкусу»)
- Карточка — ссылка на `/recipe/:id`, пометка «Ваш рецепт» для добавленных

### Поиск по ингредиентам
- `IngredientFilter.tsx`: чекбоксы всех ингредиентов каталога, логика «И» (все выбранные), счётчик, кнопка «Сбросить»
- `normalize.ts`: нормализация названий для сравнения (trim, lowercase, ё→е, collapse spaces)
- `plural.ts`: склонения «порция/порции/порций»

### Масштабирование
- `ServingsControl.tsx`: − / число / +, диапазон 1–20
- `scale.ts`: `roundAmount()` — v < 1 шаг 0,25; v < 10 шаг 0,5; иначе целое; минимум 0,25
- Формат: `formatAmount()` — точка заменяется на запятую (0,5; 2,5)
- «по вкусу» (amount = null) не пересчитывается

### Добавление / редактирование
- `RecipeForm.tsx` общий для `/add` и `/recipe/:id/edit` (проп `initialValues`)
- Валидация: название непустое, порции 1–20, хотя бы один ингредиент, хотя бы один шаг
- Ошибки снимаются при исправлении полей
- `addRecipe` создаёт новый, `updateRecipe` заменяет по id
- `id`, `ownerId`, `createdAt` сохраняются при редактировании

### Шапка (редизайн 2026-11-22)
- Видна **на всех страницах**, включая `/login` (рендерится всегда)
- Зелёное круглое пятно: 220×220px, `border-radius: 50%`, position absolute top: -60px left: -40px, opacity 0.55, olive контур 2px
- «Recipe Box» поверх пятна: position absolute, 24px/800 weight
- Волнистые линии через всю шапку снизу: `<svg>`, stroke="#7FA33A", width 100%, position absolute bottom: 0, z-index: 0
- Высота 88px, padding 16px 24px, border-radius 24px
- Кнопки справа (только после входа): «Выйти», «+ Добавить рецепт»

### Error Boundary
- В `ErrorBoundary.tsx` ловит ошибки рендера, показывает карточку «Что-то пошло не так» и кнопку «Обновить» (перезагрузка)
- Подключён в `main.tsx` внутри `MantineProvider`

### Дизайн по DESIGN.md
- Палитра: шалфейный фон (#EEF2EB), белый surface, оранжевый акцент (#FF9E2C), olive outline
- Nunito Sans — локальный шрифт (12 файлов шрифтов, кириллица + латиница, веса 300-800)
- Радиусы 8–24px, мягкая зелёная тень
- Один оранжевый акцент на экран
- WCAG AA контраст текста (кроме placeholder `#B5B9B2` ≈1,9:1)
- Граница чекбокса 3,24:1 (WCAG 1.4.11)

### Сборка и запуск
- `pnpm build` — exit 0, JS ~475 КБ (gzip 147 КБ), CSS ~259 КБ (gzip 38 КБ)
- Dev-сервер: `http://localhost:5173/`
- В DSH: требуется bundled Node и разовый расширенный доступ (`spawn EPERM`)

---

## 4. Хранение данных

Три ключа в `localStorage` (origin: `http://localhost:5173`):

| Ключ | Формат | Описание |
|---|---|---|
| `recipebox.v1.userId` | UUID строка | Локальный профиль, создаётся при первом запуске |
| `recipebox.v1.recipes` | JSON `Recipe[]` | Каталог рецептов |
| `recipebox.v1.session` | JSON `Session` | Mock-сессия `{ userId, name, signedInAt }` |

**Потоки:**
- Первый запуск: нет ключа → создаётся UUID + 8 демо-рецептов
- Вход: создаётся session, используется существующий userId
- Выход: session удаляется, recipes остаются
- F5/перезапуск: session и recipes переживают

**Ограничения:**
- Только localStorage, один профиль, без сервера
- ≈5 МБ, очистка данных сайта удаляет всё
- Нет синхронизации между вкладками

---

## 5. Ограничения

- Только localStorage, один локальный профиль
- Авторизация — учебный прототип: пароль не проверяется, сессия не защищает
- Нет удаления, избранного, категорий, тегов, сортировки, фото, импорта/экспорта, печати, шаринга, списка покупок, конвертации единиц, режима готовки
- Нет автотестов: проверки ручные
- Error boundary ловит только ошибки рендера и жизненного цикла
- В DSH: pnpm/Vite требуют разового расширенного доступа (`spawn EPERM`)
- Кэш Vite может дать пустой экран — перезапуск и очистка `node_modules/.vite`
- Placeholder `#B5B9B2` ≈1,9:1 ниже AA (оставлен по DESIGN.md)
- На 320 px длинные названия и «щепотка» обрезаются
- Кросс-браузерность: проверен Chromium

---

## 6. Технические ловушки

1. **CSS-переменные Mantine:** Mantine генерирует свой `:root` после `styles.css`, поэтому `--mantine-*` переопределяются через `cssVariablesResolver` в `src/theme.ts`
2. **Порядок маршрутов:** `/recipe/:id/edit` **до** `/recipe/:id`, иначе `:id` подхватит `edit`
3. **DSH:** `spawn EPERM` из-за `net use` в piped stdio — install/build/dev требуют разового расширенного доступа
4. **Кэш Vite:** пустой экран после правок — перезапуск dev-сервера + `rm -rf node_modules/.vite`
5. **Дубль CSS:** в `src/styles.css` два блока `.header-actions` — второй перезаписывает первый
6. **Шрифт:** `@fontsource/nunito-sans` подключается вручную по весам в `main.tsx` (12 импортов)

---

## 7. Что не проверено вручную

1. **Шапка визуально:** пятно 220px и текст на реальном экране — радиус, позиционирование, контраст на матрице
2. **Мобильная адаптация шапки:** при ширине < 480px имя скрывается, кнопки переносятся — не проверялось
3. **SVG-линии:** `preserveAspectRatio: none` может искажать кривые на 320/375/720 px
4. **Консолидация CSS:** дубль `.header-actions` — стоит убрать
5. **Физическое устройство:** тач, масштаб 150–200%
6. **Safari/Firefox** (Safari недоступен на Windows, Firefox 72 старше стека)

---

## 8. Следующий шаг

1. **Собрать архив** без `node_modules`/`dist`, проверить состав
2. **Записать видео** до 60 секунд: запуск, сценарий, сохранение данных
3. **Сдать ИДЗ1**
4. После сдачи — проверить на реальном устройстве и в актуальных Safari/Firefox

**Запуск (bundled Node/pnpm DSH):**
```powershell
$nodeDir = "C:\Users\Alina\.dsh\dsh-runtimes\dsh-primary-runtime\dependencies\node\bin"
$node = Join-Path $nodeDir "node.exe"
$pnpm = "C:\Users\Alina\.dsh\dsh-runtimes\dsh-primary-runtime\dependencies\pnpm\bin\pnpm.mjs"
$env:PATH = "$nodeDir;$env:PATH"

& $node $pnpm install
& $node $pnpm build
& $node $pnpm dev --port 5173 --strictPort
```

**Проверки после любых изменений:**
- `pnpm build` — exit 0;
- `/login` — шапка видна, «Recipe Box» на зелёном круглом пятне слева, подзаголовок, без кнопок;
- Вход → `/` — шапка + кнопки справа; фильтр «курица» + «рис» → 2;
- Плов 4 → 6: 600/900/3; Брауни 6 → 5: 167/2,5;
- добавление/редактирование/сохранение/F5 — данные на месте;
- консоль без ошибок (кроме повреждённой сессии).
