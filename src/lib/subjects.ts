export const subjectsByYear = {
  1: [
    "Matemática", "Ciencias Naturales", "Ciencias Sociales", "Prácticas del Lenguaje", "Inglés", "Construcción de Ciudadanía", "Educación Artística", "Educación Física"
  ],
  2: [
    "Matemática", "Prácticas del Lenguaje", "Inglés", "Fisicoquímica", "Biología", "Construcción de Ciudadanía", "Educación Artística", "Geografía", "Historia"
  ],
  3: [
    "Matemática", "Prácticas del Lenguaje", "Inglés", "Fisicoquímica", "Biología", "Construcción de Ciudadanía", "Educación Artística", "Geografía", "Historia"
  ],
};

export const subjectsByOrientation = {
  "Ciclo Basico": {
    1: subjectsByYear[1],
    2: subjectsByYear[2],
    3: subjectsByYear[3],
  },
  Economia: {
    4: ["Matemática-Ciclo Superior", "Literatura", "Educación Física", "Inglés", "Salud y Adolescencia", "Introducción a la Física", "Historia", "Geografía", "Biología", "NTICX", "Sistemas de información contable", "Teoría de las organizaciones"],
    5: ["Matemática-Ciclo Superior", "Literatura", "Educación Física", "Inglés", "Política y Ciudadanía", "Introducción a la Química", "Historia", "Geografía", "Elementos de micro y macroeconomía", "Derecho", "Sistemas de información contable", "Gestión Organizacional"],
    6: ["Matemática-Ciclo Superior", "Literatura", "Educación Física", "Inglés", "Trabajo y Ciudadanía", "Arte", "Filosofía", "Economía Política", "Proyectos Organizacionales"],
  },
  "Ciencias Naturales": {
    4: ["Matemática Ciclo-Superior", "Literatura", "Inglés", "Historia", "Geografía", "Biología", "Educación Física", "Salud y Adolescencia", "NTICx", "Introducción a la Física", "Introducción a la Química"],
    5: ["Matemática Ciclo-Superior", "Literatura", "Inglés", "Historia", "Geografía", "Educación Física", "Política y Ciudadanía", "Introducción a la Química", "Biología", "Física", "Ciencias de la Tierra", "Fundamentos de Química"],
    6: ["Matemática Ciclo-Superior", "Literatura", "Inglés", "Educación Física", "Filosofía", "Filosofía e Historia de la Ciencia y la Tecnología", "Trabajo y Ciudadanía", "Ambiente, Desarrollo y Sociedad", "Biología, Genética y Sociedad", "Física Clásica y Moderna", "Química del Carbono"],
  },
  Arte: {
    4: ["Matemática Ciclo-Superior", "Literatura", "Inglés", "Historia", "Geografía", "Biología", "Educación Física", "Salud y Adolescencia", "Nuevas Tecnologías de la Información", "Actuación / Lenguaje Musical / Lenguaje de la Danza / Producción y análisis de la imagen", "Taller de Lectura Literaria y Escritura"],
    5: ["Matemática Ciclo-Superior", "Literatura", "Inglés", "Historia", "Geografía", "Educación Física", "Política y Ciudadanía", "Introducción a la Química", "Actuación y Procedimientos / Prácticas vocales e instrumentales / Análisis Coreográfico / Imagen y nuevos medios", "Análisis del Lenguaje Teatral / Producción en Música / Composición Coreográfica / Procedimientos Constructivos", "Seminario de Investigación Literaria", "Taller de Escritura y su Enseñanza"],
    6: ["Matemática Ciclo-Superior", "Literatura", "Inglés", "Educación Física", "Filosofía", "Filosofía e Historia de la Ciencia y la Tecnología", "Trabajo y Ciudadanía", "Historia del Arte", "Proyecto de Producción", "Arte – Diseño Curricular Integrador"],
  },
  "Ciencias Sociales": {
    4: ["Matemática Ciclo-Superior", "Literatura", "Inglés", "Historia", "Geografía", "Biología", "Educación Física", "Salud y Adolescencia", "Nuevas Tecnologías de la Información", "Psicología", "Comunicación, Cultura y Sociedad"],
    5: ["Matemática Ciclo-Superior", "Literatura", "Inglés", "Historia", "Geografía", "Educación Física", "Política y Ciudadanía", "Introducción a la Química", "Sociología", "Economía Política", "Comunicación, Cultura y Sociedad II", "Proyectos de Investigación en Ciencias Sociales I"],
    6: ["Matemática Ciclo-Superior", "Literatura", "Inglés", "Educación Física", "Filosofía", "Filosofía e Historia de la Ciencia y la Tecnología", "Trabajo y Ciudadanía", "Comunicación, Cultura y Sociedad III", "Proyectos de Investigación en Ciencias Sociales II", "Historia Social y Política Argentina y Latinoamericana"],
  },
  Comunicacion: {
    4: ["Matemática", "Literatura", "Inglés", "Historia", "Geografía", "Biología", "Educación Física", "Salud y Adolescencia", "Nuevas Tecnologías de la Información", "Introducción a la Comunicación", "Psicología"],
    5: ["Matemática", "Literatura", "Inglés", "Historia", "Geografía", "Educación Física", "Política y Ciudadanía", "Introducción a la Química", "Comunicación y Culturas del Consumo", "Observatorio de Medios", "Observatorio de Comunicación, Cultura y Sociedad", "Taller de Producción en Lenguajes"],
    6: ["Matemática (Ciclo Superior)", "Literatura", "Inglés", "Educación Física", "Filosofía", "Filosofía e Historia de la Ciencia y la Tecnología", "Trabajo y Ciudadanía", "Comunicación y Transformaciones Socioculturales en el Siglo XXI", "Taller de Comunicación Institucional y Comunitaria", "Proyecto de Producción en Comunicación"],
  },
  Turismo: {
    4: ["Matemática Ciclo-Superior", "Literatura", "Inglés", "Historia", "Geografía", "Biología", "Educación Física", "Salud y Adolescencia", "Nuevas Tecnologías de la Información", "Introducción al Turismo", "Psicología"],
    5: ["Matemática Ciclo-Superior", "Literatura", "Inglés", "Historia", "Geografía", "Educación Física", "Política y Ciudadanía", "Introducción a la Química", "Organización y Gestión de Servicios Turísticos", "Patrimonio Cultural y Natural", "Geografía del Turismo", "Proyectos de Investigación en Turismo I"],
    6: ["Matemática Ciclo-Superior", "Literatura", "Inglés", "Educación Física", "Filosofía", "Filosofía e Historia de la Ciencia y la Tecnología", "Trabajo y Ciudadanía", "Turismo y Desarrollo Local", "Proyectos de Investigación en Turismo II", "Práctica Profesionalizante"],
  },
  "Educacion Fisica": {
    4: ["Matemática Ciclo-Superior", "Literatura", "Inglés", "Historia", "Geografía", "Biología", "Educación Física", "Salud y Adolescencia", "Nuevas Tecnologías de la Información", "Anatomía y Fisiología", "Deporte y Sociedad"],
    5: ["Matemática Ciclo-Superior", "Literatura", "Inglés", "Historia", "Geografía", "Educación Física", "Política y Ciudadanía", "Introducción a la Química", "Psicología del Deporte", "Entrenamiento y Preparación Física", "Recreación y Tiempo Libre", "Proyectos de Intervención en Educación Física I"],
    6: ["Matemática Ciclo-Superior", "Literatura", "Inglés", "Educación Física", "Filosofía", "Filosofía e Historia de la Ciencia y la Tecnología", "Trabajo y Ciudadanía", "Práctica Profesionalizante", "Proyectos de Intervención en Educación Física II", "Actividad Física y Salud"],
  },
  "Lenguas Extranjeras": {
    4: ["Matemática Ciclo-Superior", "Literatura", "Inglés", "Historia", "Geografía", "Biología", "Educación Física", "Salud y Adolescencia", "Nuevas Tecnologías de la Información", "Lengua Extranjera I", "Lengua Extranjera II"],
    5: ["Matemática Ciclo-Superior", "Literatura", "Inglés", "Historia", "Geografía", "Educación Física", "Política y Ciudadanía", "Introducción a la Química", "Lengua Extranjera I", "Lengua Extranjera II", "Literatura en Lengua Extranjera", "Proyectos de Investigación en Lenguas Extranjeras I"],
    6: ["Matemática Ciclo-Superior", "Literatura", "Inglés", "Educación Física", "Filosofía", "Filosofía e Historia de la Ciencia y la Tecnología", "Trabajo y Ciudadanía", "Lengua Extranjera I", "Lengua Extranjera II", "Proyectos de Investigación en Lenguas Extranjeras II"],
  },
};

export const orientations: { key: string, label: string }[] = [
    { key: "Ciclo Basico", label: "Ciclo Básico" },
    { key: "Economia", label: "Economía" },
    { key: "Ciencias Naturales", label: "Ciencias Naturales" },
    { key: "Arte", label: "Arte" },
    { key: "Ciencias Sociales", label: "Ciencias Sociales" },
    { key: "Comunicacion", label: "Comunicación" },
    { key: "Turismo", label: "Turismo" },
    { key: "Educacion Fisica", label: "Educación Física" },
    { key: "Lenguas Extranjeras", label: "Lenguas Extranjeras" },
];

export const allSubjects = [
    ...new Set([
      ...Object.values(subjectsByYear).flat(),
      ...Object.values(subjectsByOrientation).flatMap(o => Object.values(o).flat())
    ])
  ];
