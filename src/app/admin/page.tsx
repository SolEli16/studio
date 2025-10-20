import Link from "next/link";
import { ArrowUpRight, GraduationCap, BookUser } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { STUDENTS, TEACHERS } from "@/lib/mock-data";

export default function AdminDashboard() {
  const totalStudents = STUDENTS.length;
  const totalTeachers = TEACHERS.length;
  const regularStudents = STUDENTS.filter(s => s.isRegular).length;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total de Alumnos
          </CardTitle>
          <GraduationCap className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalStudents}</div>
          <p className="text-xs text-muted-foreground">
            {regularStudents} alumnos regulares
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total de Docentes
          </CardTitle>
          <BookUser className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalTeachers}</div>
          <p className="text-xs text-muted-foreground">
            Personal activo en la institución
          </p>
        </CardContent>
      </Card>
      <Card className="md:col-span-2 lg:col-span-1">
        <CardHeader>
          <CardTitle>Accesos Rápidos</CardTitle>
          <CardDescription>
            Gestione rápidamente los datos de la institución.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Link href="/admin/students" className="w-full">
            <Button className="w-full justify-between">
              Gestionar Alumnos <ArrowUpRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/admin/teachers" className="w-full">
            <Button variant="secondary" className="w-full justify-between">
              Gestionar Docentes <ArrowUpRight className="h-4 w-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
