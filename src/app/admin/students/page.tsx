import Link from "next/link";
import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { STUDENTS } from "@/lib/mock-data";
import StudentsTable from "@/components/admin/students-table";

export default function AdminStudentsPage() {
  const students = STUDENTS;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Alumnos</CardTitle>
            <CardDescription>
              Gestionar los datos personales y académicos de los alumnos.
            </CardDescription>
          </div>
          <Button asChild size="sm" className="gap-1">
            <Link href="#">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Nuevo Alumno
              </span>
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <StudentsTable students={students} />
      </CardContent>
    </Card>
  );
}
