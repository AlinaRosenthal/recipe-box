import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Button, Card, Text, Title } from '@mantine/core';

type Props = {
  children: ReactNode;
};

type State = {
  error: Error | null;
};

/**
 * Ловит ошибки рендера дерева приложения и показывает сообщение вместо
 * пустого экрана. Ошибки обработчиков событий и асинхронного кода сюда
 * не попадают: для них нужен отдельный обработчик.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('Recipe Box: ошибка рендера.', error, info.componentStack);
  }

  private handleReload = (): void => {
    window.location.reload();
  };

  render(): ReactNode {
    if (!this.state.error) {
      return this.props.children;
    }

    return (
      <div className="app">
        <main className="page error-page">
          <Card withBorder padding="lg" radius="xl" component="section" aria-label="Ошибка приложения">
            <Title order={2}>Что-то пошло не так</Title>
            <Text c="dimmed" mt="xs">
              Приложение столкнулось с ошибкой и не может продолжить работу. Обновите страницу —
              сохранённые рецепты останутся на месте.
            </Text>
            <Button color="brand" mt="md" onClick={this.handleReload}>
              Обновить
            </Button>
          </Card>
        </main>
      </div>
    );
  }
}
