'use client';

import { isOpenSelector } from '@/store/modal/selectors';
import { setIsOpen } from '@/store/modal/slice';
import { Modal } from '@mui/material/index';
import { useDispatch, useSelector } from 'react-redux';

type CustomModalTypes = {
  children: React.ReactNode;
  bg: any;
  onClose: () => void;
};

const CustomModal = ({ children, bg, onClose }: any) => {
  const dispatch = useDispatch();
  const isOpen = useSelector(isOpenSelector);

  return (
    <Modal
      open={isOpen}
      onClose={() => {
        typeof onClose === 'function' ? onClose() : onClose;
        dispatch(setIsOpen(false));
      }}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
      sx={{
        backgroundImage: `url(${bg?.src})`,
      }}
    >
      <>{children}</>
    </Modal>
  );
};

export default CustomModal;
