import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import '@fontsource/nunito-sans/cyrillic-300.css';
import '@fontsource/nunito-sans/cyrillic-400.css';
import '@fontsource/nunito-sans/cyrillic-500.css';
import '@fontsource/nunito-sans/cyrillic-600.css';
import '@fontsource/nunito-sans/cyrillic-700.css';
import '@fontsource/nunito-sans/cyrillic-800.css';
import '@fontsource/nunito-sans/latin-300.css';
import '@fontsource/nunito-sans/latin-400.css';
import '@fontsource/nunito-sans/latin-500.css';
import '@fontsource/nunito-sans/latin-600.css';
import '@fontsource/nunito-sans/latin-700.css';
import '@fontsource/nunito-sans/latin-800.css';
import '@mantine/core/styles.css';
import App from './App';
import { ErrorBoundary } from './components/ErrorBoundary';
import { recipeCssVariablesResolver, recipeTheme } from './theme';
import './styles.css';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Не найден элемент #root');
}

createRoot(container).render(
  <StrictMode>
    <MantineProvider theme={recipeTheme} cssVariablesResolver={recipeCssVariablesResolver}>
      <ErrorBoundary>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ErrorBoundary>
    </MantineProvider>
  </StrictMode>,
);
