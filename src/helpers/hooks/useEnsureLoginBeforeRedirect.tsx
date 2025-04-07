import { routes } from '@/routes';
import { useAuthStatus } from '../hooks/useAuthStatus';
import { useRouter } from 'next/navigation';

type Props = {
  path: string;
  newTab: boolean;
};

const useEnsureLoginBeforeRedirect = () => {
  const isAuthenticated = useAuthStatus();
  const { push } = useRouter();

  const ensureLoginBeforeRedirect = ({ path, newTab = false }: Props) => {
    if (!isAuthenticated) {
      push(routes.login);
    } else {
      if (newTab) {
        window.open(path, '_blank');
      } else {
        push(path);
      }
    }
  };

  return ensureLoginBeforeRedirect;
};

export default useEnsureLoginBeforeRedirect;
