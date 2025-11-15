import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { jobsAPI } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

export default function AddJobPage() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [site, setSite] = useState('');
  const [positionTitle, setPositionTitle] = useState('');
  const [company, setCompany] = useState('');
  const [applicationDate, setApplicationDate] = useState('');
  const [status, setStatus] = useState<'inviata' | 'in valutazione' | 'colloquio' | 'rifiutata' | 'offerta' | 'archiviata'>('inviata');
  const [responseNotes, setResponseNotes] = useState('');
  const [interviewDate, setInterviewDate] = useState<string>('');
  const [jobPostingText, setJobPostingText] = useState('');
  const [jobUrl, setJobUrl] = useState('');
  const [tagsRaw, setTagsRaw] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const tags = tagsRaw.split(',').map(t => t.trim()).filter(Boolean);

    try {
      const newJob = await jobsAPI.createJob({
        site,
        positionTitle,
        company,
        applicationDate: applicationDate || new Date().toISOString().split('T')[0],
        status,
        responseNotes,
        interviewDate: interviewDate || null,
        jobPostingText,
        jobUrl,
        tags,
      });

      toast({
        title: 'Candidatura aggiunta',
        description: 'La candidatura è stata creata con successo',
      });

      navigate(`/jobs/${newJob.id}`);
    } catch (error) {
      toast({
        title: 'Errore',
        description: 'Impossibile creare la candidatura',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Aggiungi nuova candidatura</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground">Sito</label>
            <Input value={site} onChange={e => setSite(e.target.value)} placeholder="Es. LinkedIn, Indeed, Sito aziendale" />
          </div>

          <div>
            <label className="text-sm text-muted-foreground">Posizione</label>
            <Input value={positionTitle} onChange={e => setPositionTitle(e.target.value)} placeholder="Titolo della posizione" />
          </div>

          <div>
            <label className="text-sm text-muted-foreground">Azienda</label>
            <Input value={company} onChange={e => setCompany(e.target.value)} placeholder="Nome azienda" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-muted-foreground">Data candidatura</label>
              <Input type="date" value={applicationDate} onChange={e => setApplicationDate(e.target.value)} />
            </div>

            <div>
              <label className="text-sm text-muted-foreground">Status</label>
              <Select value={status} onValueChange={(v) => setStatus(v as any)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
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

          <div>
            <label className="text-sm text-muted-foreground">Data colloquio (opzionale)</label>
            <Input type="date" value={interviewDate} onChange={e => setInterviewDate(e.target.value)} />
          </div>

          <div>
            <label className="text-sm text-muted-foreground">Link annuncio (opzionale)</label>
            <Input value={jobUrl} onChange={e => setJobUrl(e.target.value)} placeholder="https://..." />
          </div>

          <div>
            <label className="text-sm text-muted-foreground">Tag (separati da virgola)</label>
            <Input value={tagsRaw} onChange={e => setTagsRaw(e.target.value)} placeholder="es. react, typescript, remote" />
          </div>

          <div>
            <label className="text-sm text-muted-foreground">Testo annuncio</label>
            <Textarea value={jobPostingText} onChange={e => setJobPostingText(e.target.value)} />
          </div>

          <div>
            <label className="text-sm text-muted-foreground">Note di risposta / stato</label>
            <Textarea value={responseNotes} onChange={e => setResponseNotes(e.target.value)} />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <Button type="submit" disabled={loading}>
              {loading ? 'Salvando...' : 'Crea candidatura'}
            </Button>
            <Button variant="outline" onClick={() => navigate(-1)}>
              Annulla
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
