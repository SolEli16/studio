"use client";

import * as React from "react";
import { Eye } from "lucide-react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import type { Student } from "@/lib/definitions";
import { useToast } from "@/hooks/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import StudentDetails from "./student-details";

export default function GuestStudentsTable({ students: initialStudents }: { students: Student[] }) {
  const [students, setStudents] = React.useState(initialStudents);
  const [isFriday, setIsFriday] = React.useState(false);
  const { toast } = useToast();

  React.useEffect(() => {
    const today = new Date();
    setIsFriday(today.getDay() === 5); // 0=Sun, 1=Mon, ..., 5=Fri, 6=Sat
  }, []);

  const handleRegularityChange = (studentId: string, isRegular: boolean) => {
    setStudents(
      students.map((student) =>
        student.id === studentId ? { ...student, isRegular } : student
      )
    );
    toast({
      title: "Estado de regularidad actualizado",
      description: `El estado de ${students.find(s=>s.id === studentId)?.fullName} se ha actualizado.`,
    });
  };

  const switchComponent = (student: Student) => (
    <div className="flex items-center space-x-2">
      <Switch
        id={`regularity-${student.id}`}
        checked={student.isRegular}
        onCheckedChange={(checked) =>
          handleRegularityChange(student.id, checked)
        }
        disabled={!isFriday}
        aria-label={`Marcar como ${student.isRegular ? 'no regular' : 'regular'}`}
      />
      <Label htmlFor={`regularity-${student.id}`}>
        <Badge variant={student.isRegular ? "default" : "destructive"} className={student.isRegular ? "bg-green-600" : ""}>
          {student.isRegular ? "Regular" : "No Regular"}
        </Badge>
      </Label>
    </div>
  );

  return (
    <TooltipProvider>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre Completo</TableHead>
            <TableHead className="hidden md:table-cell">DNI</TableHead>
            <TableHead>Curso</TableHead>
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
              <TableCell>
                {!isFriday ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>{switchComponent(student)}</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>La regularidad solo se puede editar los viernes.</p>
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  switchComponent(student)
                )}
              </TableCell>
              <TableCell className="text-right">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Ver Detalles
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>Detalles del Alumno</DialogTitle>
                      <DialogDescription>
                        Información personal y académica de {student.fullName}.
                      </DialogDescription>
                    </DialogHeader>
                    <StudentDetails student={student} />
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TooltipProvider>
  );
}
