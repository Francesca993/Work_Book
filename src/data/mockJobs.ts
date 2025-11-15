// Mock data per le candidature
// In futuro questo sarà sostituito da chiamate API al backend Node.js+Express

export interface Job {
  id: string;
  site: string;
  positionTitle: string;
  company: string;
  applicationDate: string;
  status: 'inviata' | 'in valutazione' | 'colloquio' | 'rifiutata' | 'offerta' | 'archiviata';
  responseNotes: string;
  interviewDate: string | null;
  jobPostingText: string;
  jobUrl: string;
  tags: string[];
  lastUpdated: string;
}

export const mockJobs: Job[] = [
  {
    id: '1',
    site: 'LinkedIn',
    positionTitle: 'Frontend Developer',
    company: 'TechCorp Italia',
    applicationDate: '2025-01-10',
    status: 'colloquio',
    responseNotes: 'Ricevuta risposta positiva. Colloquio fissato per il 20 gennaio.',
    interviewDate: '2025-01-20',
    jobPostingText: `Frontend Developer - TechCorp Italia

Cerchiamo uno sviluppatore frontend con esperienza in React e TypeScript per unirsi al nostro team di sviluppo. 

Requisiti:
- 2+ anni di esperienza con React
- Conoscenza di TypeScript
- Esperienza con Tailwind CSS
- Familiarità con Git e workflow agile

Offriamo:
- Contratto a tempo indeterminato
- Smart working flessibile
- RAL 30-40k in base all'esperienza`,
    jobUrl: 'https://linkedin.com/jobs/frontend-developer-techcorp',
    tags: ['react', 'typescript', 'remote', 'frontend'],
    lastUpdated: '2025-01-15'
  },
  {
    id: '2',
    site: 'Indeed',
    positionTitle: 'Full Stack Developer',
    company: 'StartupXYZ',
    applicationDate: '2025-01-08',
    status: 'in valutazione',
    responseNotes: 'In attesa di risposta.',
    interviewDate: null,
    jobPostingText: `Full Stack Developer - StartupXYZ

Startup innovativa cerca full stack developer per sviluppo prodotto SaaS.

Stack tecnologico:
- Frontend: React, Next.js
- Backend: Node.js, Express
- Database: PostgreSQL
- Cloud: AWS

Cerchiamo persone appassionate e con voglia di crescere in ambiente dinamico.`,
    jobUrl: 'https://indeed.com/jobs/fullstack-developer-startupxyz',
    tags: ['fullstack', 'node.js', 'react', 'startup'],
    lastUpdated: '2025-01-08'
  },
  {
    id: '3',
    site: 'Sito aziendale',
    positionTitle: 'React Developer',
    company: 'Digital Solutions',
    applicationDate: '2025-01-05',
    status: 'rifiutata',
    responseNotes: 'Ricevuta email di rifiuto. Profilo non in linea con le esigenze attuali.',
    interviewDate: null,
    jobPostingText: `React Developer - Digital Solutions

Agenzia digitale cerca sviluppatore React per progetti client.

Richiesta esperienza minima di 3 anni e portfolio di progetti realizzati.`,
    jobUrl: 'https://digitalsolutions.com/careers/react-developer',
    tags: ['react', 'agenzia', 'senior'],
    lastUpdated: '2025-01-12'
  },
  {
    id: '4',
    site: 'LinkedIn',
    positionTitle: 'Junior JavaScript Developer',
    company: 'WebAgency Pro',
    applicationDate: '2025-01-12',
    status: 'inviata',
    responseNotes: '',
    interviewDate: null,
    jobPostingText: `Junior JavaScript Developer - WebAgency Pro

Cerchiamo developer junior per affiancamento e formazione.

Requisiti minimi:
- Conoscenza base JavaScript
- HTML/CSS
- Voglia di imparare

Offriamo formazione e crescita professionale.`,
    jobUrl: 'https://linkedin.com/jobs/junior-js-webagency',
    tags: ['javascript', 'junior', 'formazione'],
    lastUpdated: '2025-01-12'
  },
  {
    id: '5',
    site: 'Indeed',
    positionTitle: 'Frontend Engineer',
    company: 'InnovateTech',
    applicationDate: '2025-01-14',
    status: 'offerta',
    responseNotes: 'Ricevuta offerta! RAL 35k + benefits. Tempo per decidere fino al 25 gennaio.',
    interviewDate: '2025-01-18',
    jobPostingText: `Frontend Engineer - InnovateTech

Azienda leader nel settore tech cerca frontend engineer.

Tech stack:
- React 18+
- TypeScript
- Vite
- Tailwind CSS

Offriamo:
- RAL competitiva
- Smart working 100%
- Budget formazione
- Team giovane e dinamico`,
    jobUrl: 'https://indeed.com/jobs/frontend-engineer-innovatetech',
    tags: ['react', 'typescript', 'remote', 'benefits'],
    lastUpdated: '2025-01-19'
  }
];
