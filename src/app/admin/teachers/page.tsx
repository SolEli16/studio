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
import { TEACHERS } from "@/lib/mock-data";
import TeachersTable from "@/components/admin/teachers-table";

export default function AdminTeachersPage() {
  const teachers = TEACHERS;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Docentes</CardTitle>
            <CardDescription>
              Gestionar los datos personales y profesionales del personal docente.
            </CardDescription>
          </div>
          <Button asChild size="sm" className="gap-1">
            <Link href="#">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Nuevo Docente
              </span>
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <TeachersTable teachers={teachers} />
      </CardContent>
    </Card>
  );
}
