// Componente badge per visualizzare lo status delle candidature
import { Badge } from '@/components/ui/badge';
import { Job } from '@/data/mockJobs';

interface StatusBadgeProps {
  status: Job['status'];
}

const statusConfig = {
  'inviata': {
    variant: 'secondary' as const,
    label: 'Inviata',
    className: ''
  },
  'in valutazione': {
    variant: 'default' as const,
    label: 'In valutazione',
    className: ''
  },
  'colloquio': {
    variant: 'default' as const,
    label: 'Colloquio',
    className: 'bg-success text-success-foreground hover:bg-success/90'
  },
  'offerta': {
    variant: 'default' as const,
    label: 'Offerta',
    className: 'bg-success text-success-foreground hover:bg-success/90'
  },
  'rifiutata': {
    variant: 'destructive' as const,
    label: 'Rifiutata',
    className: ''
  },
  'archiviata': {
    variant: 'outline' as const,
    label: 'Archiviata',
    className: ''
  }
};

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const config = statusConfig[status];
  
  return (
    <Badge 
      variant={config.variant}
      className={config.className || undefined}
    >
      {config.label}
    </Badge>
  );
};
