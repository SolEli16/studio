"use client";

import * as React from "react";
import Link from "next/link";
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

export default function GuestStudentsTable({ students: initialStudents }: { students: Student[] }) {
  const [students, setStudents] = React.useState(initialStudents);
  const { toast } = useToast();

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

  return (
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
              <div className="flex items-center space-x-2">
                <Switch
                  id={`regularity-${student.id}`}
                  checked={student.isRegular}
                  onCheckedChange={(checked) =>
                    handleRegularityChange(student.id, checked)
                  }
                  aria-label={`Marcar como ${student.isRegular ? 'no regular' : 'regular'}`}
                />
                <Label htmlFor={`regularity-${student.id}`}>
                  <Badge variant={student.isRegular ? "default" : "destructive"} className={student.isRegular ? "bg-green-600" : ""}>
                    {student.isRegular ? "Regular" : "No Regular"}
                  </Badge>
                </Label>
              </div>
            </TableCell>
            <TableCell className="text-right">
              <Button asChild variant="outline" size="sm">
                <Link href="#">
                  <Eye className="h-4 w-4 mr-2" />
                  Ver Detalles
                </Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
