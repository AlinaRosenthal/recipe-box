---
version: alpha
name: Recipe Box
description: Тёплый, «садовый» визуальный стиль для приложения с рецептами — светлые шалфейно-зелёные поверхности, один яркий оранжевый акцент, мягкие скругления и крупные аппетитные фото.
colors:
  primary: "#FF9E2C"
  on-primary: "#1F2A1C"
  secondary: "#A9C59B"
  on-secondary: "#1F2A1C"
  tertiary: "#7FA33A"
  neutral: "#EEF2EB"
  surface: "#FFFFFF"
  surface-tint: "#E2E9DD"
  outline: "#D3DECB"
  on-surface: "#111111"
  on-surface-variant: "#2E3A2B"
  muted: "#8A9186"
  placeholder: "#B5B9B2"
  error: "#C8472F"
typography:
  display:
    fontFamily: Nunito Sans
    fontSize: 40px
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Nunito Sans
    fontSize: 28px
    fontWeight: 400
    lineHeight: 1.2
  headline-md:
    fontFamily: Nunito Sans
    fontSize: 22px
    fontWeight: 400
    lineHeight: 1.25
  title-sm:
    fontFamily: Nunito Sans
    fontSize: 14px
    fontWeight: 700
    lineHeight: 1.3
  body-lg:
    fontFamily: Nunito Sans
    fontSize: 18px
    fontWeight: 300
    lineHeight: 1.4
  body-md:
    fontFamily: Nunito Sans
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.45
  body-sm:
    fontFamily: Nunito Sans
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.4
  label-lg:
    fontFamily: Nunito Sans
    fontSize: 16px
    fontWeight: 700
    lineHeight: 1
  label-md:
    fontFamily: Nunito Sans
    fontSize: 13px
    fontWeight: 600
    lineHeight: 1.2
  label-sm:
    fontFamily: Nunito Sans
    fontSize: 11px
    fontWeight: 500
    lineHeight: 1.2
rounded:
  none: 0px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  2xl: 32px
  margin: 20px
  gutter: 12px
components:
  screen:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.lg}"
    height: 48px
    padding: 16px
  button-primary-pressed:
    backgroundColor: "#E88A14"
    textColor: "{colors.on-primary}"
  button-icon:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
    size: 36px
  input-search:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    height: 48px
    padding: 16px
  chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label-md}"
    rounded: "{rounded.sm}"
    height: 36px
    padding: 12px
  chip-selected:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.on-secondary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.sm}"
  recipe-card-featured:
    backgroundColor: "{colors.surface-tint}"
    textColor: "{colors.surface}"
    typography: "{typography.label-md}"
    rounded: "{rounded.xl}"
    width: 100px
    height: 130px
    padding: 12px
  recipe-list-item:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.lg}"
    padding: 8px
  recipe-list-item-thumb:
    rounded: "{rounded.md}"
    size: 56px
  ingredient-tile:
    backgroundColor: "{colors.surface-tint}"
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.lg}"
    padding: 8px
  step-number:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-md}"
    rounded: "{rounded.sm}"
    size: 28px
  tag-meta:
    textColor: "{colors.muted}"
    typography: "{typography.label-sm}"
---

# Recipe Box — Design System

## Overview

Recipe Box должен ощущаться как светлая, свежая кухня в солнечный день: много воздуха, мягкие органические формы, живые аппетитные фотографии и один уверенный тёплый акцент. Тон — дружелюбный и спокойный, без «ресторанной» строгости: человек должен захотеть готовить, а не изучать инструкцию.

Стилистические опоры, взятые из референса:

- **Органические «пятна» и тонкая линия** — крупная пастельно-зелёная форма с мягким контуром в верхней части экрана задаёт характер и заменяет привычную шапку-прямоугольник.
- **Светлые поверхности на слегка подкрашенном фоне** — страницы не белые, а нежно-шалфейные; белые карточки на них читаются как приподнятые.
- **Один оранжевый акцент** — только для главного действия на экране.
- **Фото — главный герой**: крупные, скруглённые, с минимумом декоративных рамок.

Из референса намеренно **не** переносятся функции и контент: видео-кнопка, приветственный экран «Make Food!», акварельные иллюстрации продуктов и конкретные разделы кухонь. Берётся только визуальный язык.

## Colors

Палитра построена на нейтральном шалфейном фоне и одном тёплом акценте.

- **Primary (#FF9E2C) — «Морковный оранжевый».** Единственный акцент действия: основная кнопка, кнопка поиска. Не более одного элемента этого цвета на экран, кроме иконки поиска рядом с полем.
- **Secondary (#A9C59B) — «Шалфей».** Пастельный зелёный для декоративных форм-пятен в шапках и для выбранного состояния чипов/вкладок.
- **Tertiary (#7FA33A) — «Оливковая линия».** Тонкая (1,5–2 px) волнистая линия-контур вокруг декоративных пятен и под разделами. Не используется для текста и кнопок.
- **Neutral (#EEF2EB) — фон экрана.** Едва зеленоватый светлый серо-белый, мягче чистого белого.
- **Surface (#FFFFFF)** — карточки, поле поиска, шапка экрана.
- **Surface-tint (#E2E9DD)** — нижняя «подложка» плиток ингредиентов, плейсхолдеры фото.
- **Outline (#D3DECB)** — 1 px границы карточек и плиток.
- **On-surface (#111111)** — заголовки и основной текст; **On-surface-variant (#2E3A2B)** — вторичный текст; **Muted (#8A9186)** — мета-данные (время, подписи); **Placeholder (#B5B9B2)** — плейсхолдеры полей.
- **Error (#C8472F)** — ошибки валидации; в референсе отсутствует, добавлен как тёплый красный в тон палитре.

> Отступление от референса ради доступности: белый текст на оранжевом (≈2:1) не проходит WCAG AA, поэтому текст на primary — тёмно-зелёный `on-primary` (#1F2A1C). Если бренд всё же требует белый, он допустим только для крупного (≥18px bold) текста.

## Typography

Один гуманистический гротеск без засечек — **Nunito Sans** (свободная замена Avenir из референса, близкая по пропорциям и дружелюбной округлости). Запасной стек: `Avenir Next, Avenir, system-ui, sans-serif`.

- **Display (40/800)** — только для редких акцентных заголовков (пустые состояния, онбординг). Плотный, жирный.
- **Headline-lg (28/400)** — название рецепта на экране рецепта. Лёгкий вес создаёт воздушный контраст с жирным display.
- **Headline-md (22/400)** — заголовки разделов («Новые рецепты», «Ингредиенты»).
- **Body-lg (18/300)** — лид-текст, короткие вводные фразы.
- **Body-md (14/400)** — основной текст, шаги приготовления.
- **Body-sm (12/400)** — описания в списках (перечень ингредиентов, 1–2 строки с многоточием).
- **Title-sm (14/700)** — названия рецептов в списке.
- **Label-lg (16/700)** — текст кнопок.
- **Label-md (13/600)** — чипы, подписи поверх фото.
- **Label-sm (11/500)** — мета-данные (время, количество, единицы).

Используются не более трёх начертаний (300, 400, 700/800) на одном экране.

## Layout

Мобильный, одноколоночный, вертикальный скролл. Базовая сетка — **шаг 4/8 px**; боковые поля экрана — **20 px**, зазор между карточками — **12 px**.

Типовая структура экрана списка:

1. Декоративная шапка с зелёным пятном (слева сверху) и стрелкой «назад»/меню.
2. Поле поиска во всю ширину с оранжевой кнопкой справа внутри поля.
3. Заголовок раздела (headline-md).
4. Горизонтальная лента крупных карточек рецептов (скролл вбок, следующая карточка «выглядывает» за край — это подсказывает скролл).
5. Ряд чипов/вкладок категорий.
6. Вертикальный список компактных карточек рецептов.

Экран рецепта: крупное фото на всю ширину со скруглением, под ним волнистая граница-контур, затем заголовок, плитки ингредиентов (сетка с переносом, 3 в ряд), нумерованные шаги.

Основное действие экрана — оранжевая кнопка, закреплённая у нижнего края или у правого края под фото; размер не меньше 48 px по высоте для удобного нажатия.

## Elevation & Depth

Глубина создаётся **тональными слоями и очень мягкими тенями**, а не жёсткими обводками:

- Фон экрана (`neutral`) → белые карточки (`surface`) → фото-карточки поверх.
- Тень карточек: `0 8px 24px rgba(63, 90, 52, 0.12)` — рассеянная, с зеленоватым оттенком; без чёрных теней.
- Белые элементы на светлом фоне дополнительно получают границу 1 px `outline`, чтобы не «растворяться».
- Подписи поверх фото лежат на размытой полупрозрачной подложке (backdrop blur ≈ 8 px, белый 20–30 %), а не на тёмном градиенте.

## Shapes

Язык форм — **мягкий и округлый**, но не «пузырьковый».

- Крупные фото-карточки и блоки — 24 px.
- Кнопки, поле поиска, карточки списка, плитки ингредиентов — 16 px.
- Миниатюры в списке и маленькие иконки-кнопки — 12 px.
- Чипы, бейджи шагов — 8 px.
- Декоративные пятна — свободная органическая форма с оливковым контуром; не повторяют форму карточек.

Не смешивать в одном ряду разные радиусы одноимённых элементов.

## Components

**Кнопка (button-primary).** Оранжевая заливка, тёмно-зелёный текст label-lg, радиус 16, высота 48, горизонтальный паддинг 16. Может содержать иконку после текста (стрелка, ▶). Pressed — на ≈8 % темнее. Вторичных кнопок в референсе нет: второстепенные действия оформляются как текст/иконка без заливки.

**Кнопка-иконка (button-icon).** Квадрат 36 px, радиус 12, оранжевая заливка; используется только как кнопка поиска внутри поля.

**Поле поиска (input-search).** Белое, радиус 16, высота 48, граница 1 px `outline`, очень лёгкая внутренняя тень; плейсхолдер — `placeholder`, body-md. Кнопка поиска внутри поля справа с отступом 6 px.

**Чипы категорий (chip / chip-selected).** Невыбранный — прозрачный/белый, текст `on-surface-variant`; выбранный — заливка шалфейным `secondary`, радиус 8. Ряд разделён тонкой линией-подчёркиванием.

**Крупная карточка рецепта (recipe-card-featured).** Вертикальная, фото на всю карточку, радиус 24, название снизу на матово-размытой плашке (label-md, белый). Ширина ≈ 100 px в ленте, высота ≈ 130 px.

**Карточка списка (recipe-list-item).** Белая, радиус 16, паддинг 8, граница 1 px `outline`. Слева миниатюра 56 px (радиус 12), справа: название (title-sm), время приготовления — справа в углу (`tag-meta`), под названием — перечень основных ингредиентов (body-sm, `muted`, до двух строк).

**Плитка ингредиента (ingredient-tile).** Рамка 1 px `outline`, радиус 16; в верхней части — маленькая линейная иконка и название (label-sm), внизу — полоска `surface-tint` с количеством. Иконки тонкие, однотонные, 1.5 px штрих.

**Шаг приготовления (step-number).** Квадратный бейдж 28 px, радиус 8, белая заливка с границей `outline`, цифра label-md; рядом текст шага body-md.

## Do's and Don'ts

- Do используй оранжевый только для главного действия на экране.
- Do ставь фотографии блюд в центр внимания: крупно, с радиусом 16–24 и без рамок поверх.
- Do сохраняй тональную глубину: светлый зелёный фон → белые карточки → мягкая зеленоватая тень.
- Do держи контраст текста не ниже WCAG AA (4,5:1), особенно на оранжевом и на фото-плашках.
- Do оставляй много воздуха: поля 20 px, зазоры 12–24 px.
- Don't не используй чисто чёрные тени и жёсткие тёмные обводки.
- Don't не применяй оранжевый и оливковый для декоративных заливок больших площадей.
- Don't не смешивай острые и скруглённые углы в одном экране.
- Don't не используй более трёх начертаний шрифта на экране.
- Don't не переносите из референса видео, онбординг «Make Food!», акварельные иллюстрации и набор кухонь — это контент, а не стиль.

## Implementation status

Applied in the Recipe Box application on 2026-11-11 (React 19 + Vite 8 + Mantine 9.8; theme in `src/theme.ts`, tokens in `src/styles.css`). Manual QA and visual fixes — 2026-11-17.

**Implemented:**

- Colors, radii, spacing and shadows are wired as `--rb-*` CSS custom properties; Mantine receives overrides through `recipeCssVariablesResolver` (`cssVariablesResolver`), because Mantine generates its `:root` variables after `styles.css`.
- Nunito Sans is self-hosted (`@fontsource/nunito-sans`, Cyrillic + Latin, weights 300–800, no external requests).
- Header: white surface, 24 px radius, organic sage blob with olive outline; compact 42 px button in the top-right corner (including when it wraps to a second line below 720 px).
- Login screen (`/login`): a white card with the same 16 px radius, Nunito Sans headings, outlined fields and a single orange «Войти» button. The header has no add/logout actions on this screen. On protected screens the header shows «Вы: Имя» and a text-only «Выйти» next to the add action; below 480 px the duplicate name in the header is hidden because it is already shown in the subtitle.
- One orange accent per screen: «+ Добавить рецепт» only on the list page, «Сохранить» on the add page; on the recipe and add pages the header action is a text-only `subtle` button, so there is no orange on the recipe page.
- Cards: white, 1 px `outline` border, 16 px radius (24 px on the recipe page), green-tinted card shadow, hover lift.
- Primary buttons: orange fill, dark-green label `#1F2A1C` (7.2:1), 16 px radius; secondary actions are text-only (`subtle`); icon buttons are white with outline, 12 px radius, 36 px.
- Inputs: white, 16 px radius, `outline` border, placeholder `#B5B9B2`, dark-green focus ring `#566E4B`; error fields get the warm `#C8472F` border and message; labels 13/600.
- Checkboxes: sage fill with a dark-green checkmark; focus ring `#566E4B`.
- Ingredient table: 11/500 uppercase header in the accessible muted tone (`#5F6A58`), light outline separators, non-wrapping amounts.
- Steps: 28 px square numbered badges (8 px radius, outline) with body-md step text.
- «Ваш рецепт» badge: sage light, 8 px radius, normal case (not uppercase); validation errors use the warm `#C8472F`.
- Links (back link, brand hover) use `#566E4B` (5.3:1 on white); metadata text uses `#5F6A58` (5.2:1 on white).
- Empty states and the not-found page use headline/body styles from this spec. Form validation messages disappear as the user fixes the field.
- Recipe pages carry a text-only «Редактировать» action; the edit page reuses the add form and keeps «Сохранить» as the only orange accent on that screen.
- Render errors are caught by an error boundary that shows a white card with «Что-то пошло не так» and the single orange «Обновить» action; the header is replaced, so the screen keeps exactly one accent.
- Unchecked checkbox borders use the palette muted `#8A9186` (3.24:1 on white) instead of Mantine `gray-4` (1.49:1), meeting WCAG 1.4.11.
- The unit `Select` uses tighter inner padding (8/20 px, 20 px right section) so «шт», «мл», «ст.л.» and «щепотка» fit without changing the approved column widths.

**Recorded deviations:**

- App header title is 32/800 instead of display 40/800, to keep the header compact.
- Primary button height is 42 px, not 48 px, at the product owner's request.
- Form inputs are 42 px: 48 px is specified only for the search field, which the app does not have.
- Muted `#8A9186` from the palette remains the `--rb-muted` token, but metadata text uses `--rb-muted-text: #5F6A58`: `#8A9186` gives only 3.2:1 on white and fails WCAG AA, while `#5F6A58` gives 5.2:1.
- No photos, thumbnails, category chips or ingredient tiles: photos are out of scope, and ingredient tiles would change the approved layout. Ingredients stay in a table.
- Steps are a semantic `<ol>` with CSS counters; the numbered badges are presentational only.
- The unchecked checkbox border uses the palette muted `#8A9186` instead of Mantine's default `gray-4`: the default measured 1.49:1 on white and failed WCAG 1.4.11, while the palette muted gives 3.24:1.
- The unit `Select` has 8/20 px inner padding (20 px right section) instead of the default 14/40 px, so longer unit labels are not clipped; the approved 60/68–90/96 px column widths are unchanged.
- Editing is available for demo recipes too, not only for user-added ones: seeds are stored in localStorage under the local user's `ownerId`, and their `id`/`createdAt` are preserved on save.
- The login screen is a training prototype: the password field is required by the form but is never checked or stored, and the screen says so. The visual language is unchanged; only the new screen and the header user block were added.

**Not verified manually:** on 2026-11-17 headless Chrome ran 96 checks at widths 1280, 900, 768, 721, 720, 375 and 320 px: no WCAG text failures (except the approved placeholder), no horizontal overflow, the full add and edit flows (including units, validation, cancel and F5), the storage-failure Alert, a full browser restart, and the error boundary (forced render error → message + «Обновить» → reload) were checked. On 2026-11-22 the login screen, protected routes, logout, return-by-direct-link, F5 and the existing scenario were checked in the in-app Chromium; a separate headless Chrome run checked `/login` and `/` at 320, 375, 768 and 1280 px and `/recipe/seed-plov` and `/add` at 320 px with no horizontal overflow, then restarted Chrome and confirmed the session and 9 recipes survived. The login card keeps one orange accent and the header user block wraps without horizontal overflow. Still not verified on a physical display or real device, with touch or at 150–200 % zoom, or in Safari/Firefox (Safari is unavailable on Windows and the installed Firefox 72.0.2 predates the supported stack). Placeholder `#B5B9B2` stays below 4.5:1 because it is the approved token; long ingredient names and «щепотка» still clip at 320 px because the approved compact grid is unchanged.
