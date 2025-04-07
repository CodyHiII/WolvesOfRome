'use client';
import { useEffect, useMemo, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { usePathname, useRouter } from 'next/navigation';
import { routes, routesConfig } from '@/routes';

import { userTokenSelector } from '@/store/auth/selectors';

type ProtectedWrapperType = {
  children: ReactNode;
};

const ProtectedRoutes = (props: ProtectedWrapperType) => {
  const { children } = props;

  const { replace } = useRouter();
  const pathname = usePathname();

  const LogIn = routes.login;
  const SignUp = routes.signup;

  const token = useSelector(userTokenSelector);

  const protectedRoutes = routesConfig.filter(
    (route) => route.isProtected === true
  );

  const isProtectedRoute = useMemo(
    () => protectedRoutes.some((route) => route.url === pathname),
    [pathname, protectedRoutes]
  );

  const isAuthenticated = useMemo(() => (token ? true : false), [token]);

  useEffect(() => {
    if (isProtectedRoute && !isAuthenticated) {
      replace(routes.login);
    }

    if ((pathname === LogIn || pathname == SignUp) && isAuthenticated) {
      replace(routes.home);
    }
  }, [pathname, isAuthenticated, isProtectedRoute]);

  return children;
};

export default ProtectedRoutes;
