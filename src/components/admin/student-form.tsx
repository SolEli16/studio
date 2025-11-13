
'use client';

import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import type { Student, Orientation } from "@/lib/definitions";
import { PlusCircle, Trash2 } from "lucide-react";
import { subjectsByYear, subjectsByOrientation, orientations } from "@/lib/subjects";
import { useFirestore, addDocumentNonBlocking, setDocumentNonBlocking } from "@/firebase";
import { collection, doc } from "firebase/firestore";

const responsibleSchema = z.object({
  name: z.string().min(1, "El nombre es requerido."),
  email: z.string().email("Email inválido."),
  phone: z.string().min(1, "El teléfono es requerido."),
});

const gradeSchema = z.object({
  courseYear: z.coerce.number().int().min(1, "Curso inválido"),
  actualYear: z.coerce.number().int().min(1980, "Año de cursada inválido"),
  division: z.string().min(1, "La división es requerida."),
  subject: z.string().min(1, "La materia es requerida."),
  grade: z.string().min(1, "La calificación es requerida."),
  book: z.string().min(1, "El libro es requerido."),
  folio: z.string().min(1, "El folio es requerido."),
});

const studentSchema = z.object({
  fullName: z.string().min(1, "El nombre completo es requerido."),
  dni: z.string().min(7, "DNI inválido."),
  cuil: z.string().min(11, "CUIL inválido."),
  birthDate: z.string().min(1, "La fecha de nacimiento es requerida."),
  birthPlace: z.string().min(1, "El lugar de nacimiento es requerido."),
  responsibles: z.array(responsibleSchema).min(1, "Se requiere al menos un responsable."),
  entryYear: z.coerce.number().int().min(1980, "Año inválido."),
  graduationYear: z.coerce.number().int().optional().nullable(),
  shift: z.enum(["Mañana", "Tarde", "Noche"]),
  course: z.string().min(1, "El curso es requerido."),
  division: z.string().min(1, "La división es requerida."),
  year: z.coerce.number().int().min(1, "Año inválido."),
  orientation: z.custom<Orientation>().optional(),
  grades: z.array(gradeSchema).optional(),
  isRegular: z.boolean().default(true),
});

function GradeForm({ control, index, remove, orientation }: { control: any, index: number, remove: (index: number) => void, orientation?: Orientation }) {
  const courseYear = useWatch({
    control,
    name: `grades.${index}.courseYear`,
  });

  const getSubjectsForYear = () => {
    if (!courseYear) return [];
    
    if (orientation === "Ciclo Basico" && courseYear >= 1 && courseYear <= 3) {
      return subjectsByYear[courseYear as keyof typeof subjectsByYear];
    }
    
    if (courseYear >= 4 && courseYear <= 6 && orientation && orientation !== "Ciclo Basico") {
      const orientationSubjects = subjectsByOrientation[orientation as keyof typeof subjectsByOrientation];
      if (orientationSubjects) {
        return orientationSubjects[courseYear as keyof typeof orientationSubjects] || [];
      }
    }
    return [];
  };

  const availableSubjects = getSubjectsForYear();

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1979 }, (_, i) => currentYear - i);
  const divisions = [
    ...Array.from({ length: 8 }, (_, i) => `${i + 1}ra`),
    ...Array.from({ length: 8 }, (_, i) => String.fromCharCode(65 + i)),
  ];

  return (
    <div className="p-4 border rounded-md relative space-y-4">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2"
        onClick={() => remove(index)}
      >
        <Trash2 className="h-4 w-4 text-destructive" />
        <span className="sr-only">Eliminar calificación</span>
      </Button>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <FormField
          control={control}
          name={`grades.${index}.courseYear`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Curso</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={String(field.value)}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Curso" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6].map(year => (
                    <SelectItem key={year} value={String(year)}>{year}°</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={control}
          name={`grades.${index}.actualYear`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Año de Cursada</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={String(field.value)}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Año" />
                  </Trigger>
                </FormControl>
                <SelectContent>
                  {years.map(year => (
                    <SelectItem key={year} value={String(year)}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`grades.${index}.division`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>División</FormLabel>
               <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="División" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {divisions.map(div => (
                    <SelectItem key={div} value={div}>{div}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`grades.${index}.subject`}
          render={({ field }) => (
            <FormItem className="md:col-span-1">
              <FormLabel>Materia</FormLabel>
               <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!courseYear}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {availableSubjects.map(subject => (
                    <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`grades.${index}.grade`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nota</FormLabel>
              <FormControl><Input {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={control}
          name={`grades.${index}.book`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Libro</FormLabel>
              <FormControl><Input {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={control}
          name={`grades.${index}.folio`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Folio</FormLabel>
              <FormControl><Input {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

export default function StudentForm({ student }: { student?: Student }) {
  const { toast } = useToast();
  const firestore = useFirestore();

  const form = useForm<z.infer<typeof studentSchema>>({
    resolver: zodResolver(studentSchema),
    defaultValues: student ? {
      ...student,
      graduationYear: student.graduationYear || null,
      orientation: student.orientation || undefined,
    } : {
      fullName: "",
      dni: "",
      cuil: "",
      birthDate: "",
      birthPlace: "",
      responsibles: [{ name: "", email: "", phone: "" }],
      entryYear: new Date().getFullYear(),
      graduationYear: null,
      shift: "Mañana",
      course: "",
      division: "",
      year: 1,
      grades: [],
      isRegular: true,
      orientation: 'Ciclo Basico'
    },
  });

  const { fields: responsibleFields, append: appendResponsible, remove: removeResponsible } = useFieldArray({
    control: form.control,
    name: "responsibles",
  });

  const { fields: gradeFields, append: appendGrade, remove: removeGrade } = useFieldArray({
    control: form.control,
    name: "grades",
  });
  
  const watchedOrientation = useWatch({ control: form.control, name: 'orientation' });

  function onSubmit(data: z.infer<typeof studentSchema>) {
    // Ensure graduationYear is null if it's undefined or an empty string, which the form can produce
    const studentData = {
      ...data,
      graduationYear: data.graduationYear || null,
    };

    if (student) {
      // Update existing student
      const studentDocRef = doc(firestore, "students", student.id);
      setDocumentNonBlocking(studentDocRef, studentData, { merge: true });
    } else {
      // Create new student
      const studentsCollectionRef = collection(firestore, "students");
      addDocumentNonBlocking(studentsCollectionRef, studentData);
    }

    toast({
      title: `Alumno ${student ? 'actualizado' : 'creado'}`,
      description: `Los datos de ${data.fullName} se han guardado correctamente.`,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <ScrollArea className="h-[70vh] pr-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Datos Personales</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre/s y Apellido/s</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dni"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>DNI</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cuil"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CUIL</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha de Nacimiento</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birthPlace"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lugar de Nacimiento</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <Separator />
            
            <h3 className="text-lg font-medium">Datos de Responsables</h3>
            {responsibleFields.map((field, index) => (
              <div key={field.id} className="p-4 border rounded-md relative space-y-4">
                 {index > 0 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => removeResponsible(index)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                    <span className="sr-only">Eliminar responsable</span>
                  </Button>
                )}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name={`responsibles.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre Responsable</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`responsibles.${index}.email`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`responsibles.${index}.phone`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Teléfono</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendResponsible({ name: "", email: "", phone: "" })}
            >
              Agregar Responsable
            </Button>
            
            <Separator />

            <h3 className="text-lg font-medium">Datos Académicos</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <FormField
                control={form.control}
                name="entryYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Año de Ingreso</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="graduationYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Año de Egreso (opcional)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} value={field.value ?? ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                  control={form.control}
                  name="shift"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Turno</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione un turno" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Mañana">Mañana</SelectItem>
                          <SelectItem value="Tarde">Tarde</SelectItem>
                          <SelectItem value="Noche">Noche</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="course"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Curso Actual</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="division"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>División Actual</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Año Actual</FormLabel>
                       <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="orientation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Orientación</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione una orientación" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {orientations.map(o => <SelectItem key={o.key} value={o.key}>{o.label}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
            
            <Separator />

            <h3 className="text-lg font-medium">Calificaciones</h3>
            <div className="space-y-4">
              {gradeFields.map((field, index) => (
                 <GradeForm
                  key={field.id}
                  control={form.control}
                  index={index}
                  remove={removeGrade}
                  orientation={watchedOrientation}
                />
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => appendGrade({ courseYear: 1, subject: '', grade: '', book: '', folio: '', actualYear: new Date().getFullYear(), division: '' })}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Agregar Calificación
              </Button>
            </div>

          </div>
        </ScrollArea>
        <div className="pt-6 flex justify-end">
          <Button type="submit">Guardar Cambios</Button>
        </div>
      </form>
    </Form>
  )
}
