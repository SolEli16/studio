
"use client";

import type { Student } from "@/lib/definitions";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "../ui/badge";

export default function StudentDetails({ student }: { student: Student }) {
  return (
    <ScrollArea className="h-[70vh] pr-4">
      <div className="space-y-6">
        {/* Personal Details */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-2">
            Datos Personales
          </h3>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
            <div>
              <p className="text-muted-foreground">Nombre Completo</p>
              <p className="font-medium">{student.fullName}</p>
            </div>
            <div>
              <p className="text-muted-foreground">DNI</p>
              <p className="font-medium">{student.dni}</p>
            </div>
            <div>
              <p className="text-muted-foreground">CUIL</p>
              <p className="font-medium">{student.cuil}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Fecha de Nacimiento</p>
              <p className="font-medium">{new Date(student.birthDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Lugar de Nacimiento</p>
              <p className="font-medium">{student.birthPlace}</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Responsible Details */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-2">
            Responsables
          </h3>
          <div className="space-y-4">
            {student.responsibles.map((resp, index) => (
              <div key={index} className="p-3 border rounded-md">
                <div className="grid grid-cols-3 gap-x-4">
                  <div>
                    <p className="text-muted-foreground text-xs">Nombre</p>
                    <p className="font-medium text-sm">{resp.name}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Email</p>
                    <p className="font-medium text-sm">{resp.email}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Teléfono</p>
                    <p className="font-medium text-sm">{resp.phone}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Academic Details */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-2">
            Datos Académicos
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4 text-sm">
            <div>
              <p className="text-muted-foreground">Año de Ingreso</p>
              <p className="font-medium">{student.entryYear}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Año de Egreso</p>
              <p className="font-medium">{student.graduationYear || "No egresado"}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Curso Actual</p>
              <p className="font-medium">{student.year}° {student.division}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Turno</p>
              <p className="font-medium">{student.shift}</p>
            </div>
            <div>
                <p className="text-muted-foreground">Regularidad</p>
                <div className="font-medium">
                    <Badge variant={student.isRegular ? "default" : "destructive"} className={student.isRegular ? "bg-green-600" : ""}>
                        {student.isRegular ? "Regular" : "No Regular"}
                    </Badge>
                </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Grades */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-2">
            Calificaciones
          </h3>
          {student.grades && student.grades.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Curso</TableHead>
                  <TableHead>Año de Cursada</TableHead>
                  <TableHead>División</TableHead>
                  <TableHead>Materia</TableHead>
                  <TableHead>Nota</TableHead>
                  <TableHead>Libro</TableHead>
                  <TableHead>Folio</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {student.grades.map((grade, index) => (
                  <TableRow key={index}>
                    <TableCell>{grade.courseYear}°</TableCell>
                    <TableCell>{grade.actualYear}</TableCell>
                    <TableCell>{grade.division}</TableCell>
                    <TableCell>{grade.subject}</TableCell>
                    <TableCell>{grade.grade}</TableCell>
                    <TableCell>{grade.book}</TableCell>
                    <TableCell>{grade.folio}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-sm text-muted-foreground">No hay calificaciones cargadas.</p>
          )}
        </div>
      </div>
    </ScrollArea>
  );
}

