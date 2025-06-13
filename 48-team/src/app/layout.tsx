import './globals.css';
import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import SmoothScrollProvider from '@/providers/SmoothScrollProvider';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
    title: '48Team',
    description: 'Build. Connect. Create.',
};

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </body>
        </html>
    );
}
