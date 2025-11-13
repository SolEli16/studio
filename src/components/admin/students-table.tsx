'use client';

import * as React from "react";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Student } from "@/lib/definitions";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import StudentForm from "./student-form";
import { useFirestore, deleteDocumentNonBlocking } from "@/firebase";
import { doc } from "firebase/firestore";

export default function StudentsTable({ students }: { students: Student[] }) {
  const { toast } = useToast();
  const firestore = useFirestore();

  const handleDelete = (studentId: string) => {
    const studentDocRef = doc(firestore, "students", studentId);
    deleteDocumentNonBlocking(studentDocRef);
    toast({
      title: "Alumno eliminado",
      description: "El registro del alumno ha sido eliminado exitosamente.",
    });
  };
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre Completo</TableHead>
          <TableHead className="hidden md:table-cell">DNI</TableHead>
          <TableHead>Curso</TableHead>
          <TableHead className="hidden md:table-cell">Turno</TableHead>
          <TableHead>Regularidad</TableHead>
          <TableHead>
            <span className="sr-only">Acciones</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map((student) => (
          <TableRow key={student.id}>
            <TableCell className="font-medium">{student.fullName}</TableCell>
            <TableCell className="hidden md:table-cell">{student.dni}</TableCell>
            <TableCell>{student.course} {student.division}</TableCell>
            <TableCell className="hidden md:table-cell">{student.shift}</TableCell>
            <TableCell>
              <Badge variant={student.isRegular ? "default" : "destructive"} className={student.isRegular ? "bg-green-600" : ""}>
                {student.isRegular ? "Regular" : "No Regular"}
              </Badge>
            </TableCell>
            <TableCell>
              <Dialog>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                    <DialogTrigger asChild>
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <Pencil className="h-4 w-4 mr-2" />
                        Editar
                      </DropdownMenuItem>
                    </DialogTrigger>
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => handleDelete(student.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                 <DialogContent className="sm:max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Editar Alumno</DialogTitle>
                      <DialogDescription>
                        Modifique los datos del alumno.
                      </DialogDescription>
                    </DialogHeader>
                    <StudentForm student={student} />
                  </DialogContent>
              </Dialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
