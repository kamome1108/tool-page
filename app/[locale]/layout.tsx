import { setRequestLocale, getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "@/app/globals.css";
import { NextIntlClientProvider } from 'next-intl';
import Header from '@/app/components/Header';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Common.meta' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ja' }];
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params
}: LocaleLayoutProps) {
  const resolvedParams = await params;
  setRequestLocale(resolvedParams.locale);

  // Ensure that the incoming `locale` is valid
  if (!['en', 'ja'].includes(resolvedParams.locale)) {
    notFound();
  }

  // Providing all messages to the client
  const messages = await getMessages();

  return (
    <html lang={resolvedParams.locale}>
      <head>
        <meta name="google-adsense-account" content="ca-pub-9143019988533589" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9143019988533589" crossOrigin="anonymous"></script>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-81PNTEDXZM"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-81PNTEDXZM');
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased font-sans`}
      >
        <NextIntlClientProvider messages={messages}>
          <Header locale={resolvedParams.locale} />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
