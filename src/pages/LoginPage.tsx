import { useEffect, useState, type FormEvent } from 'react';
import { Alert, Button, Card, PasswordInput, Stack, Text, TextInput, Title } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';

type Props = {
  onLogin: (name: string) => void;
  isAuthenticated: boolean;
};

type LoginState = {
  from?: {
    pathname?: string;
    search?: string;
  };
};

export function LoginPage({ onLogin, isAuthenticated }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState<string>();
  const [passwordError, setPasswordError] = useState<string>();
  const [formError, setFormError] = useState<string>();
  const [submitting, setSubmitting] = useState(false);

  // После входа возвращаем туда, откуда пришёл пользователь (например,
  // по прямой ссылке на рецепт). Если сессия уже есть, просто уводим с /login.
  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    const state = location.state as LoginState | null;
    const from = state?.from;
    const target =
      from?.pathname && from.pathname !== '/login'
        ? `${from.pathname}${from.search ?? ''}`
        : '/';
    navigate(target, { replace: true });
  }, [isAuthenticated, location.state, navigate]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const nextNameError = trimmedName === '' ? 'Введите имя' : undefined;
    const nextPasswordError = password === '' ? 'Введите пароль' : undefined;

    setNameError(nextNameError);
    setPasswordError(nextPasswordError);
    setFormError(undefined);

    if (nextNameError || nextPasswordError) {
      return;
    }

    setSubmitting(true);

    // Имитация запроса: внешних систем нет, данные никуда не отправляются.
    window.setTimeout(() => {
      try {
        onLogin(trimmedName);
      } catch (error) {
        setFormError(error instanceof Error ? error.message : 'Не удалось выполнить вход.');
        setSubmitting(false);
      }
    }, 600);
  };

  return (
    <main className="login-page">
      <Card withBorder padding="lg">
        <Stack gap="md">
          <div>
            <Title order={2}>Вход в Recipe Box</Title>
            <Text c="dimmed" size="sm" mt={6}>
              Демо-вход: пароль не проверяется и никуда не отправляется. Данные хранятся только
              в этом браузере.
            </Text>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <Stack gap="md">
              <TextInput
                label="Имя"
                placeholder="Как вас зовут?"
                autoComplete="username"
                maxLength={40}
                value={name}
                onChange={(event) => {
                  setName(event.currentTarget.value);
                  setNameError(undefined);
                  setFormError(undefined);
                }}
                error={nameError}
                disabled={submitting}
                autoFocus
              />

              <PasswordInput
                label="Пароль"
                placeholder="Любой пароль"
                autoComplete="current-password"
                value={password}
                onChange={(event) => {
                  setPassword(event.currentTarget.value);
                  setPasswordError(undefined);
                  setFormError(undefined);
                }}
                error={passwordError}
                disabled={submitting}
              />

              {formError && (
                <Alert color="error" variant="light">
                  {formError}
                </Alert>
              )}

              <Button type="submit" color="brand" size="lg" fullWidth loading={submitting}>
                Войти
              </Button>
            </Stack>
          </form>

          <Text size="xs" c="dimmed">
            Это учебный прототип: аккаунт один, а имя нужно для шапки и сессии.
          </Text>
        </Stack>
      </Card>
    </main>
  );
}
