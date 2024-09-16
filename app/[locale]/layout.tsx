import type { Metadata } from 'next';
import Head from 'next/head';
import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import { Inter, CalSans, Hel, Din } from '../fonts';

import { GlobalMsgProvider } from '../global-msg-context';
import GlobalActionTip from '../global-action-tip';
import { cn } from '../../lib/utils';
import { isProduction } from '../../lib/PathMap';
import Web3ModalProvider from '../../lib/web3-modal';

export const metadata: Metadata = {
  title: {
    template: '%s - Inphura',
    default: 'MetaCene ServerFi Node Computing Power Portal - Inphura',
  },
  description: 'Get your own server from MetaCene, and make money from it.',
  metadataBase: new URL(`https://${process.env.VERCEL_DOMAIN}`),
  openGraph: {
    title: 'MetaCene ServerFi Node Computing Power Portal - Inphura',
    description: 'Get your own server from MetaCene, and make money from it.',
    url: `https://${process.env.VERCEL_DOMAIN}`,
    siteName: '',
    images: '/images/77d25eba.png',
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: [{ url: '/images/favicons/favicon-32x32.png' }, { url: '/images/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' }],
    shortcut: '/images/shortcut-icon.png',
    apple: [
      { url: '/images/favicons/apple-touch-icon.png' },
      {
        url: '/images/favicons/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/images/favicons/apple-touch-icon-precomposed.png',
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MetaCene ServerFi Node Computing Power Portal - Inphura',
    description: 'Get your own server from MetaCene, and make money from it.',
    creator: '@MetaCeneGame',
    images: ['/images/77d25eba.png'],
  },
};

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export default async function RootLayout({ children, params: { locale } }: Props) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <Head>{!isProduction ? <meta name="robots" content="noindex, nofollow" /> : <meta name="robots" content="index, follow" />}</Head>
      <body className={cn(Inter.variable, CalSans.variable, Hel.variable, Din.variable, 'overflow-x-hidden')}>
        <GlobalMsgProvider>
          <Web3ModalProvider>
            <NextIntlClientProvider messages={messages}>
              {children}
              <GlobalActionTip />
            </NextIntlClientProvider>
          </Web3ModalProvider>
        </GlobalMsgProvider>
      </body>
    </html>
  );
}
