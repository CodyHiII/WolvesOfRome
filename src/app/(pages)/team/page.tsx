import React from 'react';
import FullHeightSection from '@/components/FullHeightSection';

const Team = () => {
  return (
    <div
      style={{
        maxWidth: '2000px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '100px 0 50px 0',
        background: '1E1E1E',
      }}
    >
      <img className='img-fluid' src='/teamImage.png' alt='team members' />
    </div>
  );
};

export default Team;
