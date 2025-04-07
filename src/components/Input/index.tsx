'use client';
import { useState, ChangeEvent, KeyboardEvent, MouseEvent } from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { AiOutlineEyeInvisible } from 'react-icons/ai';

import styles from './styles.module.css';

type InputTypes = {
  label: string;
  showLabel?: boolean;
  type: 'text' | 'number' | 'email' | 'password';
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  onKeyDown?: (
    e: KeyboardEvent<HTMLInputElement> | KeyboardEvent<HTMLTextAreaElement>
  ) => void;
};

const Input = ({
  label,
  type,
  value,
  placeholder,
  onChange,
  onKeyDown,
  showLabel = true,
}: InputTypes) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = (e: MouseEvent) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.inputContainer}>
      {showLabel && <label htmlFor={label}>{label}</label>}
      <div className={styles.input}>
        <input
          id={label}
          type={type === 'password' && showPassword ? 'text' : type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
        {type === 'password' && (
          <button onClick={(e) => handleShowPassword(e)}>
            {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
