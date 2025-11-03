export type Grade = {
  courseYear: number;
  actualYear: number;
  division: string;
  subject: string;
  grade: string;
  book: string;
  folio: string;
};

export type Responsible = {
  name: string;
  email: string;
  phone: string;
};

export type Orientation = 
  | "Economia"
  | "Ciencias Naturales"
  | "Arte"
  | "Ciencias Sociales"
  | "Comunicacion"
  | "Turismo"
  | "Educacion Fisica"
  | "Lenguas Extranjeras";

export type Student = {
  id: string;
  fullName: string;
  cuil: string;
  dni: string;
  birthDate: string;
  birthPlace: string;
  responsibles: Responsible[];
  entryYear: number;
  graduationYear: number | null;
  shift: 'Mañana' | 'Tarde' | 'Noche';
  course: string;
  division: string;
  year: number;
  grades: Grade[];
  isRegular: boolean;
  orientation?: Orientation;
};

export type CourseAssignment = {
  shift: 'Mañana' | 'Tarde' | 'Noche';
  course: string;
  schedule: string;
  subject: string;
};

export type Teacher = {
  id: string;
  fullName: string;
  cuil: string;
  dni: string;
  birthDate: string;
  birthPlace: string;
  abcEmail: string;
  altEmail: string;
  phone: string;
  titles: string[];
  registrationList: string;
  assignedCourses: CourseAssignment[];
};
