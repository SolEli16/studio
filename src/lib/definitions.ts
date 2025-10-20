export type Grade = {
  year: number;
  subject: string;
  grade: string;
  book: string;
  folio: string;
};

export type Student = {
  id: string;
  fullName: string;
  dni: string;
  cuil: string;
  address: string;
  birthDate: string;
  birthPlace: string;
  email: string;
  responsibleAdultsPhones: [string, string];
  entryYear: number;
  graduationYear: number | null;
  shift: 'Mañana' | 'Tarde' | 'Noche';
  course: string;
  year: number;
  grades: Grade[];
  isRegular: boolean;
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
  dni: string;
  cuil: string;
  address: string;
  birthDate: string;
  birthPlace: string;
  abcEmail: string;
  altEmail: string;
  phone: string;
  titles: string[];
  assignedCourses: CourseAssignment[];
};
