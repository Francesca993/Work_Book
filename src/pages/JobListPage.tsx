// Pagina lista di tutte le candidature con filtri e ricerca
import { useState, useEffect } from 'react';
import { JobCard } from '@/components/JobCard';
import { Layout } from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Job } from '@/data/mockJobs';
import { jobsAPI } from '@/services/api';
import { Search, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function JobListPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Carica le candidature all'avvio
  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      setLoading(true);
      const data = await jobsAPI.getJobs();
      // Ordina dalla più recente alla più vecchia (per applicationDate, fallback a lastUpdated)
      const sortByDateDesc = (a: Job, b: Job) => {
        const aDate = new Date(a.applicationDate || a.lastUpdated).getTime();
        const bDate = new Date(b.applicationDate || b.lastUpdated).getTime();
        return bDate - aDate;
      };

      const sorted = [...data].sort(sortByDateDesc);
      setJobs(sorted);
      setFilteredJobs(sorted);
    } catch (error) {
      toast({
        title: "Errore",
        description: "Impossibile caricare le candidature",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Applica filtri ogni volta che cambiano query di ricerca o filtro status
  useEffect(() => {
    let filtered = [...jobs];

    // Filtro per status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(job => job.status === statusFilter);
    }

    // Filtro per ricerca (posizione o azienda)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(job => 
        job.positionTitle.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Mantieni l'ordine decrescente per data (più recente prima)
    const sortByDateDesc = (a: Job, b: Job) => {
      const aDate = new Date(a.applicationDate || a.lastUpdated).getTime();
      const bDate = new Date(b.applicationDate || b.lastUpdated).getTime();
      return bDate - aDate;
    };

    setFilteredJobs(filtered.sort(sortByDateDesc));
  }, [searchQuery, statusFilter, jobs]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Caricamento candidature...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header con contatori */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Le mie candidature</h2>
            <p className="text-muted-foreground mt-1">
              {filteredJobs.length} {filteredJobs.length === 1 ? 'candidatura' : 'candidature'}
              {statusFilter !== 'all' && ' filtrate'}
            </p>
          </div>
          <div>
            <Button asChild>
              <Link to="/jobs/new">Aggiungi candidatura</Link>
            </Button>
          </div>
        </div>

        {/* Barra filtri e ricerca */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          {/* Barra di ricerca */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Cerca per posizione, azienda o tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filtro per status */}
          <div className="flex items-center gap-2 md:w-64">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filtra per status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tutti gli status</SelectItem>
                <SelectItem value="inviata">Inviata</SelectItem>
                <SelectItem value="in valutazione">In valutazione</SelectItem>
                <SelectItem value="colloquio">Colloquio</SelectItem>
                <SelectItem value="offerta">Offerta</SelectItem>
                <SelectItem value="rifiutata">Rifiutata</SelectItem>
                <SelectItem value="archiviata">Archiviata</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Griglia candidature */}
        {filteredJobs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              {searchQuery || statusFilter !== 'all' 
                ? 'Nessuna candidatura trovata con i filtri attuali' 
                : 'Nessuna candidatura presente'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
