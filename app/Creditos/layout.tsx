import Sidebar from '@/components/shared/Sidebar/Sidebar'
import React from 'react'

export default function layoutCreditos({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <main className="flex flex-col h-screen">
            <div>
                <Sidebar>{children}</Sidebar>
            </div>
        </main>
    )
}
