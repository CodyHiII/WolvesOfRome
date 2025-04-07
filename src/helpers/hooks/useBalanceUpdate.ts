import { useDispatch } from 'react-redux';
import { setCurrency } from '@/store/currency/slice';
import { getUserBalance } from '../utils/getUserBalance';

export const useBalanceUpdate = () => {
  const dispatch = useDispatch();

  const updateBalance = async () => {
    try {
      const updatedBalance = await getUserBalance();
      dispatch(setCurrency(updatedBalance));
    } catch (error) {
      console.log('Error updating balance:', error);
    }
  };

  return { updateBalance };
};
