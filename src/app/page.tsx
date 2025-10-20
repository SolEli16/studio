import Link from 'next/link';
import { ShieldCheck, Users } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-background relative">
      <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/edugestion/1920/1080')] bg-cover bg-center opacity-10 dark:opacity-5"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"></div>
      
      <div className="z-10 flex flex-col items-center text-center max-w-4xl">
        <Logo className="h-20 w-20 text-primary mb-4" />
        <h1 className="text-5xl md:text-7xl font-bold text-foreground font-headline">
          Bienvenido a EduGestion
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl">
          Digitalizando y optimizando la gestión administrativa y académica de su institución.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">
          <Card className="transform hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-primary/20">
            <CardHeader className="items-center">
              <ShieldCheck className="h-12 w-12 text-primary" />
              <CardTitle className="text-2xl mt-4">Administrador</CardTitle>
              <CardDescription>Personal de secretaría</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <p className="text-center text-sm text-muted-foreground mb-6 h-12">
                Acceso completo para gestionar datos de alumnos y personal docente.
              </p>
              <Button asChild className="w-full">
                <Link href="/admin">Ingresar</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="transform hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-primary/20">
            <CardHeader className="items-center">
              <Users className="h-12 w-12 text-primary" />
              <CardTitle className="text-2xl mt-4">Invitado</CardTitle>
              <CardDescription>Personal de preceptoría</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
               <p className="text-center text-sm text-muted-foreground mb-6 h-12">
                Visualizar información de estudiantes y actualizar estado de regularidad.
              </p>
              <Button asChild className="w-full" variant="secondary">
                <Link href="/guest">Ingresar</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
