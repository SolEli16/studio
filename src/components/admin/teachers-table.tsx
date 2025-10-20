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
import { Button } from "@/components/ui/button";
import type { Teacher } from "@/lib/definitions";
import { useToast } from "@/hooks/use-toast";

export default function TeachersTable({ teachers: initialTeachers }: { teachers: Teacher[] }) {
  const [teachers, setTeachers] = React.useState(initialTeachers);
  const { toast } = useToast();

  const handleDelete = (teacherId: string) => {
    setTeachers(teachers.filter((teacher) => teacher.id !== teacherId));
    toast({
      title: "Docente eliminado",
      description: "El registro del docente ha sido eliminado exitosamente.",
    });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre Completo</TableHead>
          <TableHead className="hidden md:table-cell">DNI</TableHead>
          <TableHead className="hidden lg:table-cell">Email ABC</TableHead>
          <TableHead className="hidden md:table-cell">Teléfono</TableHead>
          <TableHead>
            <span className="sr-only">Acciones</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {teachers.map((teacher) => (
          <TableRow key={teacher.id}>
            <TableCell className="font-medium">{teacher.fullName}</TableCell>
            <TableCell className="hidden md:table-cell">{teacher.dni}</TableCell>
            <TableCell className="hidden lg:table-cell">{teacher.abcEmail}</TableCell>
            <TableCell className="hidden md:table-cell">{teacher.phone}</TableCell>
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
                    onClick={() => handleDelete(teacher.id)}
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
