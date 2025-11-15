// Card componente per visualizzare una singola candidatura nella lista
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { StatusBadge } from '@/components/StatusBadge';
import { Job } from '@/data/mockJobs';
import { Calendar, Building2, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface JobCardProps {
  job: Job;
}

export const JobCard = ({ job }: JobCardProps) => {
  return (
    <Link to={`/jobs/${job.id}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-foreground mb-1">
                {job.positionTitle}
              </h3>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Building2 className="w-4 h-4" />
                <span className="font-medium">{job.company}</span>
              </div>
            </div>
            <StatusBadge status={job.status} />
          </div>
        </CardHeader>
        
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>Candidatura: {new Date(job.applicationDate).toLocaleDateString('it-IT')}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ExternalLink className="w-4 h-4" />
            <span>{job.site}</span>
          </div>
          
          {job.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {job.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 text-xs rounded-md bg-secondary text-secondary-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          {job.interviewDate && (
            <div className="pt-2 text-sm font-medium text-primary">
              📅 Colloquio: {new Date(job.interviewDate).toLocaleDateString('it-IT')}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};
