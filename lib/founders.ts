export type Founder = {
  name: string;
  role: string;
  bio: string;
  github: string;
  linkedin: string;
  email: string;
  medium?: string;
  portfolio?: string;
  playstore?: string;
  offset: string;
};

export const founders: Founder[] = [
  {
    name: 'Nitya Mehta',
    role: 'Full-Stack & AI/ML Developer.',
    bio: 'Builds responsive web architectures, custom AI/ML pipelines, and generative interfaces that scale.',
    github: 'Nitya-Mehta',
    linkedin: 'nityamehta',
    email: 'nityachintan@gmail.com',
    medium: 'nityachintan',
    offset: 'lg:translate-y-0',
  },
  {
    name: 'Aarav Halvadiya',
    role: 'Android Developer.',
    bio: 'Focuses on Android product work, location-aware features, and mobile experiences that feel reliable.',
    github: 'Aarav3325',
    linkedin: 'aaravhalvadiya',
    email: 'aaravhalvadiya@gmail.com',
    portfolio: 'aarav3325.github.io',
    playstore: '6894991724723705286',
    medium: 'aaravhalvadiya',
    offset: 'lg:translate-y-10',
  },
  {
    name: 'Devanshu Verma',
    role: 'Full-Stack Developer.',
    bio: 'Works across backend and frontend delivery, turning rough concepts into clear shipped products.',
    github: 'verma-devanshu',
    linkedin: 'verma-devanshu',
    email: 'devanshuverma72@gmail.com',
    offset: 'lg:-translate-y-8',
  },
];
