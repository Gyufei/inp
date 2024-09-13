import localFont from 'next/font/local';
import { Inter_Tight } from 'next/font/google';

export const Inter = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const CalSans = localFont({
  src: '../public/fonts/CalSans-SemiBold.ttf',
  variable: '--font-cal-sans',
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Roboto', 'Segoe UI', 'Ubuntu', 'Helvetica Neue', 'Arial', 'sans-serif'],
});

export const Hel = localFont({
  src: '../public/fonts/Helvetica-Neue.ttf',
  variable: '--font-hel',
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Roboto', 'Segoe UI', 'Ubuntu', 'Helvetica Neue', 'Arial', 'sans-serif'],
});

export const Din = localFont({
  src: [
    {
      path: '../public/fonts/DIN-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/DIN-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/DIN-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/DIN-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-din',
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Roboto', 'Segoe UI', 'Ubuntu', 'Helvetica Neue', 'Arial', 'sans-serif'],
});
