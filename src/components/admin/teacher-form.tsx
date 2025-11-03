"use client";

import { useForm } from "react-hook-form";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import type { Teacher } from "@/lib/definitions";

const teacherSchema = z.object({
  fullName: z.string().min(1, "El nombre completo es requerido."),
  dni: z.string().min(7, "DNI inválido."),
  cuil: z.string().min(11, "CUIL inválido."),
  birthDate: z.string().min(1, "La fecha de nacimiento es requerida."),
  birthPlace: z.string().min(1, "El lugar de nacimiento es requerido."),
  abcEmail: z.string().email("Email ABC inválido."),
  altEmail: z.string().email("Email alternativo inválido.").optional(),
  phone: z.string().min(1, "El teléfono es requerido."),
  titles: z.string().min(1, "Se requiere al menos un título."),
  registrationList: z.string().min(1, "El listado es requerido."),
});

export default function TeacherForm({ teacher }: { teacher?: Teacher }) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof teacherSchema>>({
    resolver: zodResolver(teacherSchema),
    defaultValues: teacher ? {
      ...teacher,
      titles: teacher.titles.join(', ')
    } : {
      fullName: "",
      dni: "",
      cuil: "",
      birthDate: "",
      birthPlace: "",
      abcEmail: "",
      altEmail: "",
      phone: "",
      titles: "",
      registrationList: "",
    },
  });

  function onSubmit(data: z.infer<typeof teacherSchema>) {
    toast({
      title: `Docente ${teacher ? 'actualizado' : 'creado'}`,
      description: `Los datos de ${data.fullName} se han guardado correctamente.`,
    });
    // Here you would typically handle form submission, e.g., API call
    console.log({ ...data, titles: data.titles.split(',').map(t => t.trim()) });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <ScrollArea className="h-96 pr-6">
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
               <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número de Contacto</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <Separator />
            
            <h3 className="text-lg font-medium">Datos de Contacto y Profesionales</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="abcEmail"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email ABC</FormLabel>
                        <FormControl>
                        <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="altEmail"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email Alternativo</FormLabel>
                        <FormControl>
                        <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="registrationList"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Listado en el que se inscribe</FormLabel>
                        <FormControl>
                        <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="titles"
                    render={({ field }) => (
                    <FormItem className="md:col-span-2">
                        <FormLabel>Títulos (separados por coma)</FormLabel>
                        <FormControl>
                        <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
            </div>

            {/* TODO: Add assigned courses management */}
          </div>
        </ScrollArea>
        <div className="pt-6 flex justify-end">
          <Button type="submit">Guardar Cambios</Button>
        </div>
      </form>
    </Form>
  );
}
