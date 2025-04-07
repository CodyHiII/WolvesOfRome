import React from 'react';

import styles from './styles.module.css';

type Checkbox = {
  label: string;
  checked: boolean;
  onChange: (event: any) => void;
};

const Checkbox = ({ label, checked, onChange }: Checkbox) => {
  return (
    <label className={styles.checkbox}>
      <input type='checkbox' checked={checked} onChange={onChange} />
      <span className={styles.checkmark}></span>
      {label}
    </label>
  );
};

export default Checkbox;
