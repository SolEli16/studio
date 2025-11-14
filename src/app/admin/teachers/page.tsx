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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCollection, useFirestore } from "@/firebase";
import TeachersTable from "@/components/admin/teachers-table";
import TeacherForm from "@/components/admin/teacher-form";
import { collection } from "firebase/firestore";
import { useMemoFirebase } from "@/firebase/provider";

export default function AdminTeachersPage() {
  const firestore = useFirestore();
  const teachersQuery = useMemoFirebase(() => collection(firestore, 'teachers'), [firestore]);
  const { data: teachers, isLoading } = useCollection(teachersQuery);
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredTeachers = React.useMemo(() => {
    if (!teachers) return [];
    return teachers.filter(teacher =>
      teacher.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.dni.includes(searchTerm)
    );
  }, [teachers, searchTerm]);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start gap-4">
          <div className="flex-grow">
            <CardTitle>Docentes</CardTitle>
            <CardDescription>
              Gestionar los datos personales y profesionales del personal docente.
            </CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-1 flex-shrink-0">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Nuevo Docente
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>Nuevo Docente</DialogTitle>
                <DialogDescription>
                  Complete el formulario para agregar un nuevo docente.
                </DialogDescription>
              </DialogHeader>
              <TeacherForm />
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
        {isLoading ? <p>Cargando docentes...</p> : <TeachersTable teachers={filteredTeachers || []} />}
      </CardContent>
    </Card>
  );
}
