import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
    locales: ['en', 'ja', 'tl', 'hi', 'id', 'vi', 'th'],
    defaultLocale: 'en'
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
    createNavigation(routing);
