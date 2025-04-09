'use client';
import Sidebar from '@/components/shared/Sidebar/Sidebar';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function LayoutCreditos({ children }: Readonly<{ children: React.ReactNode }>) {
    const router = useRouter();
    return (
        <main className="flex flex-col h-screen">
                <div>
                    <Sidebar>{children}</Sidebar>
                </div>
        </main>
    );
}