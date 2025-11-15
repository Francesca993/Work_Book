// Layout principale dell'applicazione con header
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <div className="p-2 rounded-lg bg-primary">
              <Briefcase className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Job Tracker</h1>
              <p className="text-sm text-muted-foreground">Gestisci le tue candidature</p>
            </div>
          </Link>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
};
