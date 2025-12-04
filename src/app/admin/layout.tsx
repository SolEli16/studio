
'use client';

import Link from "next/link";
import {
  Bell,
  BookUser,
  GraduationCap,
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  Search,
  ShoppingCart,
  Users,
  LogOut,
} from "lucide-react";
import * as React from 'react';
import { useRouter, usePathname } from "next/navigation";

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/logo";
import { Badge } from "@/components/ui/badge";
import AdminSidebarNav from "@/components/admin/admin-sidebar-nav";
import { useAuth, useUser } from '@/firebase';
import { signOut } from "firebase/auth";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    if (!isUserLoading && !user && pathname !== '/admin/login') {
      router.replace('/admin/login');
    }
  }, [isUserLoading, user, router, pathname]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/'); // Redirect to home after logout
  };

  if (isUserLoading && pathname !== '/admin/login') {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <p>Verificando sesión...</p>
      </div>
    );
  }

  if (!user && pathname !== '/admin/login') {
    return null; // Don't render anything while redirecting
  }

  // If user is logged in, but on the login page, don't show the layout
  if (user && pathname === '/admin/login') {
    return <>{children}</>;
  }
  
  // If no user and on login page, just show the login page
  if(!user && pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2" data-sidebar="header-content">
            <Logo className="w-6 h-6 text-primary" />
            <span className="text-lg font-semibold">EduGestion</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <AdminSidebarNav />
        </SidebarContent>
        <SidebarFooter>
           <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left gap-2 p-2 h-auto"
                >
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col items-start" data-sidebar="user-info">
                    <span className="text-sm font-medium">Admin</span>
                    <span className="text-xs text-muted-foreground">
                      {user?.email || 'admin@edugestion.com'}
                    </span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Admin</p>
                    <p className="text-xs leading-none text-muted-foreground">
                       {user?.email || 'admin@edugestion.com'}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar Sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-card px-6">
          <SidebarTrigger className="md:hidden" />
          <div className="flex-1">
            <h1 className="text-lg font-semibold md:text-xl">Panel de Administrador</h1>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
