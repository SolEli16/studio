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
import { useCollection, useFirestore } from "@/firebase";
import GuestStudentsTable from "@/components/guest/guest-students-table";
import { collection } from "firebase/firestore";
import { useMemoFirebase } from "@/firebase/provider";


export default function GuestDashboard() {
  const firestore = useFirestore();
  const studentsQuery = useMemoFirebase(() => collection(firestore, 'students'), [firestore]);
  const { data: students, isLoading } = useCollection(studentsQuery);
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredStudents = React.useMemo(() => {
    if (!students) return [];
    return students.filter(student =>
      student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.dni.includes(searchTerm)
    );
  }, [students, searchTerm]);

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
        {isLoading ? <p>Cargando alumnos...</p> : <GuestStudentsTable students={filteredStudents || []} />}
      </CardContent>
    </Card>
  );
}
