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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Teacher } from "@/lib/definitions";
import { useToast } from "@/hooks/use-toast";
import TeacherForm from "./teacher-form";
import TeacherDetails from "./teacher-details";
import { useFirestore, deleteDocumentNonBlocking } from "@/firebase";
import { doc } from "firebase/firestore";

export default function TeachersTable({ teachers }: { teachers: Teacher[] }) {
  const { toast } = useToast();
  const firestore = useFirestore();
  const [selectedTeacher, setSelectedTeacher] = React.useState<Teacher | null>(null);
  const [isViewOpen, setViewOpen] = React.useState(false);
  const [isEditOpen, setEditOpen] = React.useState(false);

  const handleDelete = (teacherId: string) => {
    const teacherDocRef = doc(firestore, "teachers", teacherId);
    deleteDocumentNonBlocking(teacherDocRef);
    toast({
      title: "Docente eliminado",
      description: "El registro del docente ha sido eliminado exitosamente.",
    });
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre Completo</TableHead>
            <TableHead className="hidden md:table-cell">DNI</TableHead>
            <TableHead>Email ABC</TableHead>
            <TableHead className="hidden lg:table-cell">Listado</TableHead>
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
              <TableCell>{teacher.abcEmail}</TableCell>
              <TableCell className="hidden lg:table-cell">{teacher.registrationList}</TableCell>
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
                     <DropdownMenuItem onSelect={() => { setSelectedTeacher(teacher); setViewOpen(true); }}>
                        <Eye className="h-4 w-4 mr-2" />
                        Ver Detalles
                      </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => { setSelectedTeacher(teacher); setEditOpen(true); }}>
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
      
      {/* View Details Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setViewOpen}>
        <DialogContent className="sm:max-w-3xl">
          {selectedTeacher && (
            <>
              <DialogHeader>
                <DialogTitle>Detalles del Docente</DialogTitle>
                <DialogDescription>
                  Información personal y profesional de {selectedTeacher.fullName}.
                </DialogDescription>
              </DialogHeader>
              <TeacherDetails teacher={selectedTeacher} />
            </>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-2xl">
          {selectedTeacher && (
            <>
              <DialogHeader>
                <DialogTitle>Editar Docente</DialogTitle>
                <DialogDescription>
                  Modifique los datos del docente.
                </DialogDescription>
              </DialogHeader>
              <TeacherForm teacher={selectedTeacher} />
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}