'use client';
import * as React from "react";
import { PlusCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCollection, useFirestore } from "@/firebase";
import StudentsTable from "@/components/admin/students-table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import StudentForm from "@/components/admin/student-form";
import { collection } from "firebase/firestore";
import { useMemoFirebase } from "@/firebase/provider";

export default function AdminStudentsPage() {
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
        <div className="flex justify-between items-start gap-4">
          <div className="flex-grow">
            <CardTitle>Alumnos</CardTitle>
            <CardDescription>
              Gestionar los datos personales y académicos de los alumnos.
            </CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-1 flex-shrink-0">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Nuevo Alumno
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>Nuevo Alumno</DialogTitle>
                <DialogDescription>
                  Complete el formulario para agregar un nuevo alumno.
                </DialogDescription>
              </DialogHeader>
              <StudentForm />
            </DialogContent>
          </Dialog>
        </div>
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
        {isLoading ? <p>Cargando alumnos...</p> : <StudentsTable students={filteredStudents || []} />}
      </CardContent>
    </Card>
  );
}
