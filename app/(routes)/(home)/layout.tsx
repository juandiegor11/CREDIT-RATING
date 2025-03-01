import React from 'react'
import Sidebar from '@/components/shared/Sidebar/Sidebar'

export default function layoutRoutes({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <main className="flex flex-col h-screen">
            <div>
                <Sidebar>{children}</Sidebar>
            </div>
        </main>
    )
}
