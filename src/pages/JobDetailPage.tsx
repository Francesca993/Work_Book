// Pagina dettaglio di una singola candidatura
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { StatusBadge } from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Job } from '@/data/mockJobs';
import { jobsAPI } from '@/services/api';
import { 
  ArrowLeft, 
  Building2, 
  Calendar, 
  ExternalLink, 
  FileText,
  Clock,
  Tag,
  MessageSquare,
  Trash2,
  Edit
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function JobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    if (id) {
      loadJob(id);
    }
  }, [id]);

  const loadJob = async (jobId: string) => {
    try {
      setLoading(true);
      const data = await jobsAPI.getJobById(jobId);
      setJob(data);
    } catch (error) {
      toast({
        title: "Errore",
        description: "Impossibile caricare la candidatura",
        variant: "destructive"
      });
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    
    try {
      await jobsAPI.deleteJob(id);
      toast({
        title: "Candidatura eliminata",
        description: "La candidatura è stata eliminata con successo"
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Errore",
        description: "Impossibile eliminare la candidatura",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Caricamento...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!job) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">Candidatura non trovata</p>
          <Button onClick={() => navigate('/')} className="mt-4">
            Torna alla lista
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header con pulsante back */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground">{job.positionTitle}</h1>
            <div className="flex items-center gap-2 text-muted-foreground mt-1">
              <Building2 className="w-4 h-4" />
              <span className="font-medium">{job.company}</span>
            </div>
          </div>
          <StatusBadge status={job.status} />
        </div>

        {/* Azioni */}
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Edit className="w-4 h-4" />
            Modifica
          </Button>
          <Button 
            variant="destructive" 
            className="gap-2"
            onClick={() => setShowDeleteDialog(true)}
          >
            <Trash2 className="w-4 h-4" />
            Elimina
          </Button>
        </div>

        {/* Info principali */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-muted-foreground">Data candidatura</p>
                  <p className="font-medium">
                    {new Date(job.applicationDate).toLocaleDateString('it-IT', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 text-sm">
                <ExternalLink className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-muted-foreground">Sito</p>
                  <p className="font-medium">{job.site}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {job.interviewDate && (
            <Card className="md:col-span-2 border-success/50 bg-success/5">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="w-5 h-5 text-success" />
                  <div>
                    <p className="text-muted-foreground">Data colloquio</p>
                    <p className="font-medium text-success">
                      {new Date(job.interviewDate).toLocaleDateString('it-IT', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="md:col-span-2">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 text-sm">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-muted-foreground">Ultimo aggiornamento</p>
                  <p className="font-medium">
                    {new Date(job.lastUpdated).toLocaleDateString('it-IT')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tags */}
        {job.tags.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="w-5 h-5" />
                Tag
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {job.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 text-sm rounded-md bg-secondary text-secondary-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Note di risposta */}
        {job.responseNotes && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Note sul responso
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground whitespace-pre-wrap">{job.responseNotes}</p>
            </CardContent>
          </Card>
        )}

        {/* Testo annuncio */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Testo annuncio originale
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-h-96 overflow-y-auto p-4 bg-muted rounded-md">
              <pre className="text-sm text-foreground whitespace-pre-wrap font-sans">
                {job.jobPostingText}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Link annuncio */}
        {job.jobUrl && (
          <Card>
            <CardContent className="pt-6">
              <a 
                href={job.jobUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary hover:underline"
              >
                <ExternalLink className="w-4 h-4" />
                Apri annuncio originale
              </a>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Dialog conferma eliminazione */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sei sicuro?</AlertDialogTitle>
            <AlertDialogDescription>
              Questa azione non può essere annullata. La candidatura verrà eliminata definitivamente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annulla</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Elimina
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
}
