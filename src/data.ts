export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  lessons: Lesson[];
  quiz: Question[];
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  points: number;
}

export const CURRICULUM_DATA: Module[] = [
  {
    id: 'm1',
    title: '¿Qué es la Filosofía?',
    description: 'Explora el asombro, la duda y las preguntas fundamentales que dan origen al pensamiento filosófico.',
    icon: 'HelpCircle',
    color: 'bg-blue-500',
    lessons: [
      {
        id: 'l1-1',
        title: 'El paso del Mito al Logos',
        content: 'La filosofía nace en Grecia como un intento de explicar el mundo mediante la razón (logos) en lugar de relatos míticos.',
        points: 50
      },
      {
        id: 'l1-2',
        title: 'El Asombro y la Duda',
        content: 'Según Platón y Aristóteles, el asombro es el origen de la filosofía. Descartes, por otro lado, pone la duda en el centro.',
        points: 50
      }
    ],
    quiz: [
      {
        id: 'q1-1',
        text: '¿Cuál es el significado etimológico de "Filosofía"?',
        options: ['Amor a la sabiduría', 'Búsqueda de la verdad', 'Estudio del alma', 'Ciencia de las cosas'],
        correctAnswer: 0,
        explanation: 'Proviene del griego "philo" (amor/amistad) y "sophia" (sabiduría).'
      }
    ]
  },
  {
    id: 'm2',
    title: 'Lógica y Argumentación',
    description: 'Aprende a pensar con claridad, detectar falacias y construir argumentos sólidos.',
    icon: 'Brain',
    color: 'bg-purple-500',
    lessons: [
      {
        id: 'l2-1',
        title: '¿Qué es un argumento?',
        content: 'Un argumento es un conjunto de premisas que pretenden apoyar una conclusión.',
        points: 60
      }
    ],
    quiz: [
      {
        id: 'q2-1',
        text: '¿Qué es una falacia?',
        options: ['Un argumento válido', 'Un error de razonamiento que parece válido', 'Una verdad absoluta', 'Una opinión personal'],
        correctAnswer: 1,
        explanation: 'Las falacias son razonamientos engañosos que parecen correctos pero no lo son.'
      }
    ]
  },
  {
    id: 'm3',
    title: 'Ética y Política',
    description: '¿Cómo debemos vivir? ¿Qué es una sociedad justa? Desafíos morales en el Chile actual.',
    icon: 'Scale',
    color: 'bg-emerald-500',
    lessons: [
      {
        id: 'l3-1',
        title: 'Aristóteles y la Felicidad',
        content: 'Para Aristóteles, el fin último del ser humano es la Eudaimonía (felicidad) a través de la virtud.',
        points: 70
      }
    ],
    quiz: [
      {
        id: 'q3-1',
        text: '¿Qué es el imperativo categórico de Kant?',
        options: ['Haz lo que te haga feliz', 'Actúa según una máxima que quieras ver como ley universal', 'Sigue las leyes de tu país', 'Busca el mayor bien para el mayor número'],
        correctAnswer: 1,
        explanation: 'Kant propone que debemos actuar de modo que nuestra conducta pueda convertirse en norma para todos.'
      }
    ]
  }
];

export const RAPID_FIRE_QUESTIONS: Question[] = [
  {
    id: 'rf1',
    text: '¿Fue Sócrates quien escribió "La República"?',
    options: ['Verdadero', 'Falso'],
    correctAnswer: 1,
    explanation: 'Fue Platón, su discípulo, quien escribió "La República".'
  },
  {
    id: 'rf2',
    text: '¿La lógica estudia las leyes del pensamiento correcto?',
    options: ['Verdadero', 'Falso'],
    correctAnswer: 0,
    explanation: 'Exacto, la lógica formal se ocupa de la estructura de los razonamientos.'
  },
  {
    id: 'rf3',
    text: '¿Nietzsche proclamó la "muerte de Dios"?',
    options: ['Verdadero', 'Falso'],
    correctAnswer: 0,
    explanation: 'Sí, como una metáfora del fin de los valores absolutos de la modernidad.'
  }
];
