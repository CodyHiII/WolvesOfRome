import localFont from '@next/font/local';
import { DM_Sans, Barlow, Poppins } from 'next/font/google';

export const calSans = localFont({
  src: './CalSans-SemiBold.ttf',
  variable: '--primary-font',
  preload: true,
  fallback: ['sans-serif'],
});

export const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--secondary-font',
  weight: ['400', '500', '600', '700'],
  preload: true,
  fallback: ['sans-serif'],
});

export const barlow = Barlow({
  subsets: ['latin'],
  variable: '--ternary-font',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  preload: true,
  fallback: ['sans-serif'],
});

export const poppins = Poppins({
  subsets: ['latin'],
  variable: '--quaternary-font',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  preload: true,
  fallback: ['sans-serif'],
});
