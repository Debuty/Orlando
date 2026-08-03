import { useAppSelector } from '../../../store/hooks';

export function useAuth() {
  const user = useAppSelector((state) => state.auth.user);
  const token = useAppSelector((state) => state.auth.token);

  const isAuthenticated = Boolean(token && user);
  const isGuest = !isAuthenticated;
  const isTenant = isAuthenticated && user?.role === 'TENANT';
  const isAdmin = isAuthenticated && user?.role === 'ADMIN';

  return {
    user,
    token,
    isAuthenticated,
    isGuest,
    isTenant,
    isAdmin,
  };
}
