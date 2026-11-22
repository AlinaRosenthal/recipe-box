import type { Session } from './types';

const SESSION_KEY = 'recipebox.v1.session';

function isSession(value: unknown): value is Session {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.userId === 'string' &&
    candidate.userId.trim() !== '' &&
    typeof candidate.name === 'string' &&
    candidate.name.trim() !== '' &&
    typeof candidate.signedInAt === 'string' &&
    candidate.signedInAt.trim() !== ''
  );
}

/**
 * Читает mock-сессию из localStorage. Повреждённая сессия не ломает приложение:
 * она удаляется, и пользователь видит экран входа.
 */
export function readSession(): Session | null {
  let raw: string | null = null;

  try {
    raw = localStorage.getItem(SESSION_KEY);
  } catch {
    return null;
  }

  if (!raw) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isSession(parsed)) {
      throw new Error('Ожидался объект сессии');
    }
    return {
      userId: parsed.userId,
      name: parsed.name.trim(),
      signedInAt: parsed.signedInAt,
    };
  } catch (error) {
    console.warn('Recipe Box: данные сессии повреждены, вход сброшен.', error);
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch {
      // Если хранилище недоступно, сессии всё равно нет.
    }
    return null;
  }
}

export function saveSession(session: Session): void {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch {
    throw new Error('Не удалось сохранить вход: хранилище браузера недоступно или переполнено.');
  }
}

export function clearSession(): void {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {
    // Выход из приложения не должен падать из-за недоступного хранилища.
  }
}
