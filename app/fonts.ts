import localFont from 'next/font/local';

export const RedHat = localFont({
  src: '../public/fonts/RedHatMono-VariableFont_wght.ttf',
  variable: '--font-red-hat',
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Roboto', 'Segoe UI', 'Ubuntu', 'Helvetica Neue', 'Arial', 'sans-serif'],
});
