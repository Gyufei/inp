import type { Metadata } from 'next';
import Head from 'next/head';
import './globals.css';

import { HaasGrotDisp, HaasGrotText } from './fonts';

import { GlobalMsgProvider } from './global-msg-context';
import GlobalActionTip from './global-action-tip';
import { cn } from '../lib/utils';
import { isProduction } from '../lib/PathMap';
import Web3ModalProvider from '../lib/web3-modal';

export const metadata = {
  title: {
    template: '%s - Inphura',
    default: 'Inphura',
  },
  description: '',
  metadataBase: new URL(`https://${process.env.VERCEL_DOMAIN}`),
  openGraph: {
    title: '',
    description: '',
    url: `https://${process.env.VERCEL_DOMAIN}`,
    siteName: '',
    images: '/images/907d507a.png',
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: [{ url: '/images/favs/favicon-32x32.png' }, { url: '/images/favs/favicon-16x16.png', sizes: '16x16', type: 'image/png' }],
    shortcut: '/images/shortcut-icon.png',
    apple: [
      { url: '/images/favs/apple-touch-icon.png' },
      {
        url: '/images/favs/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/images/favs/apple-touch-icon-precomposed.png',
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: '',
    description: '',
    creator: '@xxx',
    images: ['/images/907d507a.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>{!isProduction ? <meta name="robots" content="noindex, nofollow" /> : <meta name="robots" content="index, follow" />}</Head>
      <body className={cn(HaasGrotDisp.variable, HaasGrotText.variable)}>
        <GlobalMsgProvider>
          <Web3ModalProvider>{children}</Web3ModalProvider>
          <GlobalActionTip />
        </GlobalMsgProvider>
      </body>
    </html>
  );
}
