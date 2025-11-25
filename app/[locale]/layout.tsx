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

import { routing } from '@/i18n/routing';

// ...

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Common.meta' });
  const baseUrl = 'https://tools.kamo-me.com';

  // Generate alternates for all supported locales
  const languages: Record<string, string> = {};
  routing.locales.forEach(lang => {
    languages[lang] = `${baseUrl}/${lang}`;
  });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: languages,
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${baseUrl}/${locale}`,
      siteName: 'Tool Suite',
      locale: locale,
      type: 'website',
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: 'Tool Suite',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: [`${baseUrl}/og-image.png`],
    },
    metadataBase: new URL(baseUrl),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

import JsonLd from '@/app/components/JsonLd';

// ... imports

// ... generateMetadata

export default async function LocaleLayout({
  children,
  params
}: LocaleLayoutProps) {
  const resolvedParams = await params;
  setRequestLocale(resolvedParams.locale);

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(resolvedParams.locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  const messages = await getMessages();

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Tool Suite",
    "url": "https://tools.kamo-me.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://tools.kamo-me.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

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
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased font-sans overflow-x-hidden w-full`}
      >
        <NextIntlClientProvider messages={messages}>
          <Header locale={resolvedParams.locale} />
          {children}
          <JsonLd data={websiteSchema} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
