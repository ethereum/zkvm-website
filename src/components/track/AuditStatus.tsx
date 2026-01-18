'use client';

import { AuditEntry, ResearchPaper } from '@/lib/track-types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, FileText, ExternalLink, CheckCircle2, Clock, Circle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface AuditStatusProps {
  audits?: AuditEntry[];
  researchPapers?: ResearchPaper[];
}

export default function AuditStatus({ audits = [], researchPapers = [] }: AuditStatusProps) {
  const getStatusIcon = (status: AuditEntry['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-orange-500" />;
      case 'planned':
        return <Circle className="h-4 w-4 text-gray-300" />;
    }
  };

  const getStatusBadge = (status: AuditEntry['status']) => {
    const colors = {
      completed: 'bg-green-100 text-green-800',
      'in-progress': 'bg-orange-100 text-orange-800',
      planned: 'bg-gray-100 text-gray-600'
    };

    const labels = {
      completed: 'Completed',
      'in-progress': 'In Progress',
      planned: 'Planned'
    };

    return (
      <Badge variant="secondary" className={`${colors[status]} font-medium`}>
        {labels[status]}
      </Badge>
    );
  };

  const getSeverityColor = (severity: 'critical' | 'high' | 'medium' | 'low') => {
    switch (severity) {
      case 'critical':
        return 'text-red-600';
      case 'high':
        return 'text-orange-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-blue-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Security Audits */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Audits
          </CardTitle>
        </CardHeader>
        <CardContent>
          {audits.length === 0 ? (
            <p className="text-sm text-muted-foreground">No audits scheduled yet</p>
          ) : (
            <div className="space-y-4">
              {audits.map((audit) => (
                <div key={audit.id} className="rounded-lg border p-4">
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        {getStatusIcon(audit.status)}
                      </div>
                      <div>
                        <h3 className="font-medium">{audit.name}</h3>
                        <p className="text-sm text-muted-foreground">{audit.organization}</p>
                      </div>
                    </div>
                    {getStatusBadge(audit.status)}
                  </div>

                  <div className="mb-3 text-sm text-muted-foreground">
                    <p className="font-medium">Scope:</p>
                    <p>{audit.scope}</p>
                  </div>

                  {audit.findings && (
                    <div className="mb-3 rounded bg-muted p-3">
                      <p className="mb-2 text-xs font-medium text-muted-foreground">Findings</p>
                      <div className="grid grid-cols-4 gap-2 text-center text-sm">
                        <div>
                          <p className={`text-lg font-bold ${getSeverityColor('critical')}`}>
                            {audit.findings.critical}
                          </p>
                          <p className="text-xs text-muted-foreground">Critical</p>
                        </div>
                        <div>
                          <p className={`text-lg font-bold ${getSeverityColor('high')}`}>
                            {audit.findings.high}
                          </p>
                          <p className="text-xs text-muted-foreground">High</p>
                        </div>
                        <div>
                          <p className={`text-lg font-bold ${getSeverityColor('medium')}`}>
                            {audit.findings.medium}
                          </p>
                          <p className="text-xs text-muted-foreground">Medium</p>
                        </div>
                        <div>
                          <p className={`text-lg font-bold ${getSeverityColor('low')}`}>
                            {audit.findings.low}
                          </p>
                          <p className="text-xs text-muted-foreground">Low</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    {audit.startDate && (
                      <span>Started: {new Date(audit.startDate).toLocaleDateString()}</span>
                    )}
                    {audit.completionDate && (
                      <span>Completed: {new Date(audit.completionDate).toLocaleDateString()}</span>
                    )}
                    {audit.reportUrl && (
                      <a
                        href={audit.reportUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-primary hover:underline"
                      >
                        View Report
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Research Papers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Research Publications
          </CardTitle>
        </CardHeader>
        <CardContent>
          {researchPapers.length === 0 ? (
            <p className="text-sm text-muted-foreground">No research papers published yet</p>
          ) : (
            <div className="space-y-4">
              {researchPapers.map((paper) => (
                <div key={paper.id} className="rounded-lg border p-4">
                  <h3 className="mb-2 font-medium">{paper.title}</h3>
                  <p className="mb-2 text-sm text-muted-foreground">{paper.summary}</p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <span>{paper.authors.join(', ')}</span>
                    <span>{new Date(paper.date).toLocaleDateString()}</span>
                    <a
                      href={paper.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-primary hover:underline"
                    >
                      Read Paper
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
