import { useSelector } from 'react-redux';
import { userTokenSelector } from '@/store/auth/selectors';

export const useAuthStatus = () => {
  const userToken = useSelector(userTokenSelector);
  const isAuthenticated = !!userToken;

  return isAuthenticated;
};
