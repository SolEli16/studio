
'use client';
import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useCollection, useFirestore, useUser, useAuth, initiateAnonymousSignIn } from "@/firebase";
import GuestStudentsTable from "@/components/guest/guest-students-table";
import { collection } from "firebase/firestore";
import { useMemoFirebase } from "@/firebase/provider";
import { Button } from "@/components/ui/button";

export default function GuestDashboard() {
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const [isSigningIn, setIsSigningIn] = React.useState(false);

  const studentsQuery = useMemoFirebase(() => collection(firestore, 'students'), [firestore]);
  const { data: students, isLoading: studentsLoading } = useCollection(user ? studentsQuery : null); // Only query if user exists
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleGuestLogin = async () => {
    setIsSigningIn(true);
    try {
      await initiateAnonymousSignIn(auth);
      // onAuthStateChanged will handle the rest
    } catch (error) {
      console.error("Guest sign-in failed", error);
      setIsSigningIn(false);
    }
  };

  const filteredStudents = React.useMemo(() => {
    if (!students) return [];
    return students.filter(student =>
      student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.dni.includes(searchTerm)
    );
  }, [students, searchTerm]);

  if (isUserLoading || isSigningIn) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Cargando...</p>
      </div>
    );
  }

  if (!user) {
    return (
        <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
            <Card className="max-w-md">
                <CardHeader>
                    <CardTitle>Acceso de Invitado</CardTitle>
                    <CardDescription>
                        Para ver la información de los alumnos, por favor inicie una sesión de invitado.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button onClick={handleGuestLogin} className="w-full">
                        Ingresar como Invitado
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
  }


  return (
    <Card>
      <CardHeader>
        <CardTitle>Listado de Alumnos</CardTitle>
        <CardDescription>
          Visualizar información de estudiantes y actualizar estado de regularidad.
        </CardDescription>
        <div className="mt-4 relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar por nombre o DNI..."
            className="w-full pl-8 sm:w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        {studentsLoading ? <p>Cargando alumnos...</p> : <GuestStudentsTable students={filteredStudents || []} />}
      </CardContent>
    </Card>
  );
}
