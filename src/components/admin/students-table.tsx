"use client";

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

export default function StudentsTable({ students: initialStudents }: { students: Student[] }) {
  const [students, setStudents] = React.useState(initialStudents);
  const { toast } = useToast();

  const handleDelete = (studentId: string) => {
    setStudents(students.filter((student) => student.id !== studentId));
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
            <TableCell>{student.course}</TableCell>
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
                  <DropdownMenuItem>
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
  );
}
