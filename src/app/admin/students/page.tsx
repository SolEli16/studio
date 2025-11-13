'use client';
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Alumnos</CardTitle>
            <CardDescription>
              Gestionar los datos personales y académicos de los alumnos.
            </CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-1">
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
      </CardHeader>
      <CardContent>
        {isLoading ? <p>Cargando alumnos...</p> : <StudentsTable students={students || []} />}
      </CardContent>
    </Card>
  );
}
