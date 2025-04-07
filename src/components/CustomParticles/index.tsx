import { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadAll } from '@tsparticles/all';

import styles from './styles.module.css';

type ParticlesType = {
  config: {};
};

const CustomParticles = ({ config }: ParticlesType) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadAll(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (init) {
    return (
      <div className={styles.particlesContainer}>
        <Particles
          className={styles.particles}
          id='tsparticles'
          options={config}
        />
      </div>
    );
  }

  return <></>;
};

export default CustomParticles;
