import type { Student, Teacher } from './definitions';

export const STUDENTS: Student[] = [
  {
    id: '1',
    fullName: 'Juan Pérez',
    dni: '40123456',
    cuil: '20-40123456-7',
    birthDate: '2006-05-10',
    birthPlace: 'Springfield',
    responsibles: [
      { name: 'Homero Pérez', email: 'homero@example.com', phone: '1122334455' },
      { name: 'Marge Pérez', email: 'marge@example.com', phone: '5544332211' }
    ],
    entryYear: 2019,
    graduationYear: null,
    shift: 'Mañana',
    course: '5to',
    division: 'A',
    year: 5,
    orientation: 'Economia',
    grades: [
      { courseYear: 4, actualYear: 2022, division: 'A', subject: 'Matemática-Ciclo Superior', grade: '8', book: 'L1', folio: 'F23' },
      { courseYear: 4, actualYear: 2022, division: 'A', subject: 'Literatura', grade: '9', book: 'L1', folio: 'F24' },
    ],
    isRegular: true,
  },
  {
    id: '2',
    fullName: 'Maria Garcia',
    dni: '41987654',
    cuil: '27-41987654-3',
    birthDate: '2005-11-22',
    birthPlace: 'Shelbyville',
    responsibles: [
        { name: 'Carlos Garcia', email: 'carlos.g@example.com', phone: '3344556677' },
        { name: 'Ana Garcia', email: 'ana.g@example.com', phone: '7766554433' }
    ],
    entryYear: 2018,
    graduationYear: 2023,
    shift: 'Tarde',
    course: 'Egresado',
    division: '',
    year: 6,
    orientation: 'Ciencias Naturales',
    grades: [
       { courseYear: 6, actualYear: 2023, division: 'B', subject: 'Física Clásica y Moderna', grade: '10', book: 'L1', folio: 'F02' },
       { courseYear: 6, actualYear: 2023, division: 'B', subject: 'Química del Carbono', grade: '9', book: 'L1', folio: 'F03' },
    ],
    isRegular: false,
  },
  {
    id: '3',
    fullName: 'Carlos Rodriguez',
    dni: '42333444',
    cuil: '20-42333444-5',
    birthDate: '2007-02-15',
    birthPlace: 'Capital City',
    responsibles: [
        { name: 'Ricardo Rodriguez', email: 'ricardo@example.com', phone: '1234567890' },
        { name: 'Elena Rodriguez', email: 'elena@example.com', phone: '0987654321' }
    ],
    entryYear: 2020,
    graduationYear: null,
    shift: 'Mañana',
    course: '4to',
    division: 'B',
    year: 4,
    grades: [
      { courseYear: 3, actualYear: 2022, division: 'B', subject: 'Historia', grade: '7', book: 'L1', folio: 'F55' },
    ],
    isRegular: false,
    orientation: 'Ciencias Sociales',
  },
];

export const TEACHERS: Teacher[] = [
  {
    id: 't1',
    fullName: 'Ana Martinez',
    dni: '25111222',
    cuil: '27-25111222-9',
    birthDate: '1985-08-20',
    birthPlace: 'Buenos Aires',
    abcEmail: 'ana.martinez@abc.gob.ar',
    altEmail: 'anamartinez@personal.com',
    phone: '1199887766',
    titles: ['Profesorado en Matemática', 'Licenciatura en Ciencias de la Educación'],
    registrationList: 'Listado Oficial',
    assignedCourses: [
      { shift: 'Mañana', course: '5to A', schedule: 'Lunes 7:30-9:30', subject: 'Matemática' },
      { shift: 'Mañana', course: '4to B', schedule: 'Martes 10:00-12:00', subject: 'Matemática' },
    ],
  },
  {
    id: 't2',
    fullName: 'Roberto Sanchez',
    dni: '22888999',
    cuil: '20-22888999-1',
    birthDate: '1979-03-12',
    birthPlace: 'Córdoba',
    abcEmail: 'roberto.sanchez@abc.gob.ar',
    altEmail: 'robertos@provider.com',
    phone: '3511234567',
    titles: ['Profesorado en Lengua y Literatura'],
    registrationList: 'Listado 108 A',
    assignedCourses: [
      { shift: 'Tarde', course: '2do C', schedule: 'Miércoles 13:30-15:30', subject: 'Lengua y Literatura' },
      { shift: 'Tarde', course: '3ro A', schedule: 'Jueves 16:00-18:00', subject: 'Lengua y Literatura' },
    ],
  },
];
