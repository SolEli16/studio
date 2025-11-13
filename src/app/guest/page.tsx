'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCollection, useFirestore } from "@/firebase";
import GuestStudentsTable from "@/components/guest/guest-students-table";
import { collection } from "firebase/firestore";
import { useMemoFirebase } from "@/firebase/provider";


export default function GuestDashboard() {
  const firestore = useFirestore();
  const studentsQuery = useMemoFirebase(() => collection(firestore, 'students'), [firestore]);
  const { data: students, isLoading } = useCollection(studentsQuery);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Listado de Alumnos</CardTitle>
        <CardDescription>
          Visualizar información de estudiantes y actualizar estado de regularidad.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? <p>Cargando alumnos...</p> : <GuestStudentsTable students={students || []} />}
      </CardContent>
    </Card>
  );
}
