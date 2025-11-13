"use client";

import type { Teacher } from "@/lib/definitions";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

export default function TeacherDetails({ teacher }: { teacher: Teacher }) {
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
              <p className="font-medium">{teacher.fullName}</p>
            </div>
            <div>
              <p className="text-muted-foreground">DNI</p>
              <p className="font-medium">{teacher.dni}</p>
            </div>
            <div>
              <p className="text-muted-foreground">CUIL</p>
              <p className="font-medium">{teacher.cuil}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Fecha de Nacimiento</p>
              <p className="font-medium">{new Date(teacher.birthDate).toLocaleDateString()}</p>
            </div>
             <div>
              <p className="text-muted-foreground">Lugar de Nacimiento</p>
              <p className="font-medium">{teacher.birthPlace}</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Contact & Professional Details */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-2">
            Datos de Contacto y Profesionales
          </h3>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
            <div>
              <p className="text-muted-foreground">Email ABC</p>
              <p className="font-medium">{teacher.abcEmail}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Email Alternativo</p>
              <p className="font-medium">{teacher.altEmail || "No especificado"}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Teléfono</p>
              <p className="font-medium">{teacher.phone}</p>
            </div>
             <div>
              <p className="text-muted-foreground">Listado de Inscripción</p>
              <p className="font-medium">{teacher.registrationList}</p>
            </div>
            <div className="col-span-2">
              <p className="text-muted-foreground">Títulos</p>
              <p className="font-medium">{teacher.titles.join(", ")}</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Assigned Courses */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-2">
            Cursos Asignados
          </h3>
          {teacher.assignedCourses && teacher.assignedCourses.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Materia</TableHead>
                  <TableHead>Curso</TableHead>
                  <TableHead>Turno</TableHead>
                  <TableHead>Horario</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teacher.assignedCourses.map((course, index) => (
                  <TableRow key={index}>
                    <TableCell>{course.subject}</TableCell>
                    <TableCell>{course.course}</TableCell>
                    <TableCell>{course.shift}</TableCell>
                    <TableCell>{course.schedule}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-sm text-muted-foreground">No hay cursos asignados.</p>
          )}
        </div>
      </div>
    </ScrollArea>
  );
}