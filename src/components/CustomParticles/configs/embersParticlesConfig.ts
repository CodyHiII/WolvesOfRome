import { ISourceOptions } from '@tsparticles/engine';

const embersParticlesConfig: ISourceOptions = {
  fullScreen: false,
  fpsLimit: 60,
  detectRetina: true,
  background: {
    color: {
      value: 'none',
    },
  },
  particles: {
    shape: {
      type: 'image',
      options: {
        image: {
          src: 'https://s3.eu-central-1.amazonaws.com/wor.cards/ASSETS_WEBSITE/FLARE_2.png',

          width: 70,
          height: 70,
        },
      },
    },
    size: {
      value: { min: 1, max: 13 },
      animation: {
        enable: true,
        sync: false,
        speed: 1,
        startValue: 'random',
      },
    },
    move: {
      direction: 'top-right',
      enable: true,
      random: false,
      speed: { min: 3, max: 7 },
      straight: false,
      gravity: {
        acceleration: 15,
        enable: true,
        inverse: true,
        maxSpeed: 7,
      },
    },
    number: {
      density: {
        enable: true,
      },
      value: 100,
    },
    collisions: {
      enable: false,
    },
    opacity: {
      value: { min: 0, max: 1 },
      animation: {
        enable: true,
        speed: 1,
        startValue: 'max',
      },
    },
  },
};

export default embersParticlesConfig;
