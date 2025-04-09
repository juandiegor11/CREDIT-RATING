"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; // Importa usePathname
import type * as React from "react";
import {
  AudioWaveform,
  Blocks,
  Calendar,
  Command,
  DnaOff,
  LogOut,
  Home,
  Inbox,
  ChartBar,
  MessageCircleQuestion,
  Search,
  Settings2,
  Sparkles,
  Trash2,
} from "lucide-react";

import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";
import { TeamSwitcher } from "./team-switcher";
import { Dialog, DialogContent, DialogOverlay, DialogTitle } from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const data = {
  teams: [
    
  ],
  navMain: [
    {
      title: "Inicio",
      url: "/",
      icon: Home,
      isActive: true,
    },
    {
      title: "SOLICITUDES",
      url: "/Creditos",
      icon: Sparkles,
    },
    {
      title: "RESULTADOS",
      url: "/Result",
      icon: Inbox,
      badge: "10",
    },
    {
      title: "INDICADORES",
      url: "/Indicadores",
      icon: ChartBar,
      badge: "10",
    },
  ]
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname(); // Obtiene la ruta actual

  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader className="flex flex-col gap-4 p-4" title="Notion">
        <TeamSwitcher teams={data.teams} />
        <nav>
          <ul>
            {data.navMain.map((item) => (
              <li key={`${item.url}-${item.title}`}>
                <Link
                  href={item.url}
                  className={`block p-4 flex items-center gap-2 rounded-md transition-colors ${
                    pathname === item.url ? "bg-gray-100 text-black" : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </SidebarHeader>
      <SidebarContent />
      <SidebarRail />
    </Sidebar>
  );
}

export function MobileSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50" />
      <DialogContent className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
        <DialogTitle>
          <VisuallyHidden>Menú de navegación</VisuallyHidden>
        </DialogTitle>
        <nav>
          <ul>
            <li>
              <a href="/" className="block p-4 hover:bg-gray-100">
                Inicio
              </a>
            </li>
            <li>
              <a href="/Creditos" className="block p-4 hover:bg-gray-100">
                Créditos
              </a>
            </li>
            <li>
              <a href="/Result" className="block p-4 hover:bg-gray-100">
                Resultados
              </a>
            </li>
          </ul>
        </nav>
      </DialogContent>
    </Dialog>
  );
}