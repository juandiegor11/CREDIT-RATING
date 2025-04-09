import React from 'react'
import {Sidebar} from '../../../components/ui/sidebar'

export default function layoutRoutes({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <main className="flex flex-col h-screen">
            <div>
                <Sidebar>{children}</Sidebar>
            </div>
        </main>
    )
}
