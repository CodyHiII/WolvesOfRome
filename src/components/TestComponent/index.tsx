import React from 'react';

import { TestComponentProps } from '@/types';

const TestComponent = ({ title }: TestComponentProps) => {
  return <div style={{ border: '1px solid red' }}>TestComponent {title}</div>;
};

export default TestComponent;
