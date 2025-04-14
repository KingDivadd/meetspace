import React from 'react';
import StreamVideoProvider from '@/providers/streamVideoClient';


export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
    return (
        <main>
            <StreamVideoProvider>
                {children}
            </StreamVideoProvider>
        </main>
    );
}
