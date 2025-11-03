import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TEACHERS } from "@/lib/mock-data";
import TeachersTable from "@/components/admin/teachers-table";
import TeacherForm from "@/components/admin/teacher-form";

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
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Nuevo Docente
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>Nuevo Docente</DialogTitle>
                <DialogDescription>
                  Complete el formulario para agregar un nuevo docente.
                </DialogDescription>
              </DialogHeader>
              <TeacherForm />
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <TeachersTable teachers={teachers} />
      </CardContent>
    </Card>
  );
}
