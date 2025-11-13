'use client';

import * as React from "react";
import { MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react";
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
  DropdownMenuSeparator,
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
import StudentDetails from "@/components/guest/student-details";
import { useFirestore, deleteDocumentNonBlocking } from "@/firebase";
import { doc } from "firebase/firestore";

export default function StudentsTable({ students }: { students: Student[] }) {
  const { toast } = useToast();
  const firestore = useFirestore();
  const [selectedStudent, setSelectedStudent] = React.useState<Student | null>(null);
  const [isViewOpen, setViewOpen] = React.useState(false);
  const [isEditOpen, setEditOpen] = React.useState(false);

  const handleDelete = (studentId: string) => {
    const studentDocRef = doc(firestore, "students", studentId);
    deleteDocumentNonBlocking(studentDocRef);
    toast({
      title: "Alumno eliminado",
      description: "El registro del alumno ha sido eliminado exitosamente.",
    });
  };
  
  return (
    <>
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
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onSelect={() => { setSelectedStudent(student); setViewOpen(true); }}>
                        <Eye className="h-4 w-4 mr-2" />
                        Ver Detalles
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => { setSelectedStudent(student); setEditOpen(true); }}>
                        <Pencil className="h-4 w-4 mr-2" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => handleDelete(student.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {/* View Details Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setViewOpen}>
        <DialogContent className="sm:max-w-3xl">
          {selectedStudent && (
            <>
              <DialogHeader>
                <DialogTitle>Detalles del Alumno</DialogTitle>
                <DialogDescription>
                  Información personal y académica de {selectedStudent.fullName}.
                </DialogDescription>
              </DialogHeader>
              <StudentDetails student={selectedStudent} />
            </>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-2xl">
          {selectedStudent && (
            <>
              <DialogHeader>
                <DialogTitle>Editar Alumno</DialogTitle>
                <DialogDescription>
                  Modifique los datos del alumno.
                </DialogDescription>
              </DialogHeader>
              <StudentForm student={selectedStudent} />
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}