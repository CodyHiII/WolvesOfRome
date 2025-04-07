'use client';
import React, { useRef, useEffect } from 'react';

import { VideoTypes } from '@/types';
import { useSelector } from 'react-redux';
import { isModalOpenSelector } from '@/store/modalX/selectors';

import styles from './styles.module.css';

const FullScreenTrailer = ({ src }: VideoTypes) => {
  const isModalOpen = useSelector(isModalOpenSelector);

  const videoRef = useRef<any>(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      videoElement.volume = 0.3;
    }

    if (!isModalOpen) {
      videoElement.pause();
    } else if (isModalOpen) {
      videoElement.play();
    }
  }, [isModalOpen]);

  return (
    <div>
      <video
        ref={videoRef}
        src={src}
        className={styles.video}
        autoPlay
        controls
      ></video>
    </div>
  );
};

export default FullScreenTrailer;
