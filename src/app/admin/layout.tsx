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
} from "lucide-react";
import * as React from 'react';

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
import { useAuth, useUser, initiateAnonymousSignIn, setDocumentNonBlocking } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useFirestore } from '@/firebase';


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  React.useEffect(() => {
    if (!isUserLoading && !user) {
      initiateAnonymousSignIn(auth);
    }
  }, [isUserLoading, user, auth]);

  React.useEffect(() => {
    if (user && firestore) {
      const adminRoleDoc = doc(firestore, `roles_admin/${user.uid}`);
      getDoc(adminRoleDoc).then(docSnap => {
        if (!docSnap.exists()) {
          // Use the non-blocking function which has error handling built-in
          setDocumentNonBlocking(adminRoleDoc, { uid: user.uid }, {});
        }
      }).catch(error => {
        // This will likely be a permission error if the rules are not set up.
        // The error will be handled by the global error listener via the .catch() 
        // in setDocumentNonBlocking. We just need to make sure we call it correctly.
        // The console.error below is for local debugging, but not essential for the user.
        console.error("Error checking or setting admin role: ", error);
        // We ensure a non-blocking write attempt is made even on error,
        // which will then be caught by our global handler.
        setDocumentNonBlocking(adminRoleDoc, { uid: user.uid }, {});
      });
    }
  }, [user, firestore]);

  if (isUserLoading || !user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Cargando e iniciando sesión...</p>
      </div>
    );
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
                      {user.email || 'admin@edugestion.com'}
                    </span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Admin</p>
                    <p className="text-xs leading-none text-muted-foreground">
                       {user.email || 'admin@edugestion.com'}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/">Cerrar Sesión</Link>
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
