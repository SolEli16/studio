import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { STUDENTS } from "@/lib/mock-data";
import GuestStudentsTable from "@/components/guest/guest-students-table";

export default function GuestDashboard() {
  const students = STUDENTS;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Listado de Alumnos</CardTitle>
        <CardDescription>
          Visualizar información de estudiantes y actualizar estado de regularidad.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <GuestStudentsTable students={students} />
      </CardContent>
    </Card>
  );
}
