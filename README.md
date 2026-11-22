# Recipe Box

Локальное приложение «коробка рецептов»: каталог, поиск по ингредиентам (логика «И»), масштабирование порций, добавление и редактирование своих рецептов. Всё работает в браузере, без сервера.

**Стек:** React 19, TypeScript, Vite 8, react-router-dom 7, Mantine 9.8, локальный шрифт Nunito Sans.

## Запуск

Нужны Node.js 24+ и pnpm 11+.

```bash
pnpm install
pnpm build
pnpm dev --port 5173 --strictPort
```

Открыть `http://localhost:5173/`.

Если pnpm недоступен глобально, используется bundled-поставка DSH:

```powershell
$nodeDir = "C:\Users\Alina\.dsh\dsh-runtimes\dsh-primary-runtime\dependencies\node\bin"
$node = Join-Path $nodeDir "node.exe"
$pnpm = "C:\Users\Alina\.dsh\dsh-runtimes\dsh-primary-runtime\dependencies\pnpm\bin\pnpm.mjs"
$env:PATH = "$nodeDir;$env:PATH"

& $node $pnpm install
& $node $pnpm build
& $node $pnpm dev --port 5173 --strictPort
```

## Демо-вход

Открывается экран `/login`. Введите любое имя и любой пароль — это учебный прототип:

- пароль не проверяется и никуда не отправляется;
- сессия хранится в localStorage;
- после F5 и повторного запуска браузера вход и рецепты остаются;
- «Выйти» очищает сессию, но не удаляет рецепты.

## Маршруты

| URL | Что там |
|---|---|
| `/login` | вход |
| `/` | каталог и фильтр «Что имеется?» |
| `/recipe/:id` | рецепт, порции, ингредиенты, шаги |
| `/recipe/:id/edit` | редактирование |
| `/add` | добавление рецепта |
| `*` | редирект на `/` или `/login` |

## Где хранятся данные

Только в `localStorage` текущего браузера:

- `recipebox.v1.userId` — UUID локального профиля;
- `recipebox.v1.session` — mock-сессия `{ userId, name, signedInAt }`;
- `recipebox.v1.recipes` — массив рецептов.

Подробно: [ARCHITECTURE.md](ARCHITECTURE.md).

Полный сброс — DevTools → Application → Local Storage → удалить ключи `recipebox.v1.*`. После этого снова появятся 8 демо-рецептов и экран входа.

## Документация

- [PRD.md](PRD.md) — идея, границы, сценарий, проверки, журнал.
- [ARCHITECTURE.md](ARCHITECTURE.md) — структура данных, localStorage, потоки, ограничения.
- [docs/DESIGN.md](docs/DESIGN.md) — выбранный визуальный язык и статус реализации.
- [REFLECTION.md](REFLECTION.md) — рефлексия по итогам работы.
- [HANDOFF.md](HANDOFF.md) — состояние проекта для следующей сессии.
- `docs/qa/` — скриншоты ручной проверки.

## Ограничения

- Только localStorage, один локальный профиль, без синхронизации и сервера.
- Авторизация — учебный прототип без проверки пароля.
- Нет удаления, избранного, таймера, фото, импорта/экспорта.
- Нет автотестов; проверки ручные и разовыми скриптами.
- Проверено в Chromium; Safari/Firefox и реальное устройство остаются на потом.
