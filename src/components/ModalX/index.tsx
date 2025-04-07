'use client';
import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  isModalOpenSelector,
  modalPropsSelector,
  modalComponentSelector,
} from '@/store/modalX/selectors';
import { closeModal } from '@/store/modalX/slice';

import DynamicComponent from '../DynamicComponent';

import styles from './styles.module.css';

const ModalX = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(isModalOpenSelector);
  const type = useSelector(modalComponentSelector);
  const props = useSelector(modalPropsSelector);

  const handleCoseModal = () => {
    dispatch(closeModal());
  };

  const handleOutsideClick = (e: any) => {
    if (e.target.classList.contains(styles.childrenContainer)) {
      handleCoseModal();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('click', handleOutsideClick);
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.overflowX = 'hidden';
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <div className={`${styles.modal} ${isOpen && styles.modalOpen}`}>
      <div className={styles.childrenContainer}>
        <DynamicComponent type={type} props={props} />
      </div>
    </div>
  );
};

export default ModalX;
