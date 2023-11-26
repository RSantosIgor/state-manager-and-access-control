import { IRoute } from '@/types/navigation';
import { RedirectType } from 'next/dist/client/components/redirect';
import {redirect} from 'next/navigation';

export const isWindowAvailable = () => typeof window !== 'undefined';

export const findCurrentRoute = (routes: any[], pathname: string ): any => {
  if (!isWindowAvailable()) return null;

  for (let route of routes) {
    if (!!route?.items) {
      const found = findCurrentRoute(route.items, pathname);
      if (!!found) return found;
    }
    if (pathname?.match(route.path) && route) return route;
  }
};

export const getActiveRoute = (routes: IRoute[], pathname: string): string => {
  const route = findCurrentRoute(routes, pathname);
  return route?.name || 'Inicio';
};

export const getActiveNavbar = (
  routes: IRoute[],
  pathname: string,
): boolean => {
  const route = findCurrentRoute(routes, pathname);
  return route?.secondary;
};

export const getActiveNavbarText = (
  routes: IRoute[],
  pathname: string,
): string | boolean => {
  return getActiveRoute(routes, pathname) || false;
};

export const middlewareAuth = (path: string, isLoggedIn: boolean) => {
  const layout = path.split('/')[1];
  if (layout === 'dashboard' && !isLoggedIn) {
    return redirect('/authentication')
      
  } else if (layout === 'authentication' && isLoggedIn) {
    return redirect('/dashboard')
  }
}