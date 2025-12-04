
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


export default function GuestDashboard() {
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const studentsQuery = useMemoFirebase(() => collection(firestore, 'students'), [firestore]);
  const { data: students, isLoading: studentsLoading } = useCollection(studentsQuery);
  const [searchTerm, setSearchTerm] = React.useState('');

  React.useEffect(() => {
    // If loading is finished and there's no user at all, initiate anonymous sign-in.
    // This will only run when a completely unauthenticated user visits this page.
    if (!isUserLoading && !user) {
      initiateAnonymousSignIn(auth);
    }
  }, [isUserLoading, user, auth]);

  const filteredStudents = React.useMemo(() => {
    if (!students) return [];
    return students.filter(student =>
      student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.dni.includes(searchTerm)
    );
  }, [students, searchTerm]);

  // Show a loading state until the user status is confirmed and they are logged in.
  if (isUserLoading || !user) {
     return (
      <div className="flex items-center justify-center h-full">
        <p>Iniciando sesión de invitado...</p>
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
