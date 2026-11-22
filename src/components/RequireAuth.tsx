import { Navigate, Outlet, useLocation } from 'react-router-dom';
import type { Session } from '../data/types';

type Props = {
  session: Session | null;
};

/**
 * Защищает внутренние маршруты: без mock-сессии отправляет на /login
 * и запоминает исходный адрес, чтобы вернуться туда после входа.
 */
export function RequireAuth({ session }: Props) {
  const location = useLocation();

  if (!session) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
