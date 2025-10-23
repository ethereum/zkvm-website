'use client';

import React, { useState } from 'react';
import { Info, AlertCircle, CheckCircle, Clock, HelpCircle } from 'lucide-react';

interface CriterionStatus {
  status: string;
  note?: string;
  disputeDetails?: string;
}

const ClientStatus = () => {
  const [expandedClients, setExpandedClients] = useState<Set<string>>(new Set());

  const toggleClient = (clientName: string) => {
    setExpandedClients((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(clientName)) {
        newSet.delete(clientName);
      } else {
        newSet.add(clientName);
      }
      return newSet;
    });
  };

  const executionCriteria = [
    {
      id: 'hardforks',
      name: 'Up to date with current hardforks',
      description: 'Client supports all mainnet hardforks'
    },
    {
      id: 'eest',
      name: 'Passes all EEST tests',
      description: 'Program compilation passes Ethereum Execution Specification Tests'
    },
    {
      id: 'witness',
      name: 'Generates ExecutionWitness',
      description: 'Node can generate the ExecutionWitness data structure',
      disputed: true,
      disputeNote: 'Under review: differences in witness format between implementations'
    },
    {
      id: 'compilation',
      name: 'Compiles to zkVM target',
      description: 'Can compile to target supported by production-ready zkVMs',
      disputed: true,
      disputeNote: 'Under review: debate over what constitutes production-ready zkVM support'
    }
  ];

  const consensusCriteria = [
    {
      id: 'hardforks',
      name: 'Up to date with current hardforks',
      description: 'Client supports all mainnet hardforks'
    },
    {
      id: 'executionProofs',
      name: 'Implemented Optional execution proofs',
      description: 'Support for optional execution proof generation'
    },
    {
      id: 'epbs',
      name: 'Implemented ePBS',
      description: 'Support for enshrined Proposer-Builder Separation'
    }
  ];

  const executionClients = [
    {
      name: 'Geth',
      progress: 2,
      total: 4,
      status: 'IN DEVELOPMENT',
      statusColor: 'orange',
      criteria: {
        hardforks: { status: 'complete', note: 'Running on mainnet' },
        eest: { status: 'complete' },
        witness: { 
          status: 'under-review', 
          note: 'PR #32216 merged, compatibility being verified',
          disputeDetails: 'Geth team: Implementation complete. EF: Verifying compatibility with reference implementation.'
        },
        compilation: { 
          status: 'under-review', 
          note: 'Works with Ziren, production readiness under discussion',
          disputeDetails: 'Geth team: Compiles and proves with Ziren. EF: Concerns about partial syscall support and brittleness.'
        }
      },
      notes: [
        'Can run as zkVM guest program in Ziren',
        'ExecutionWitness implementation under verification',
        'Discussion ongoing about zkVM target requirements'
      ]
    },
    {
      name: 'Nethermind',
      progress: 2,
      total: 4,
      status: 'IN DEVELOPMENT',
      statusColor: 'orange',
      criteria: {
        hardforks: { status: 'complete', note: 'Up to date with current hardforks' },
        eest: { status: 'in-progress' },
        witness: { status: 'complete', note: 'Generates ExecutionWitness' },
        compilation: { status: 'in-progress' }
      }
    },
    {
      name: 'Besu',
      progress: 1,
      total: 4,
      status: 'PLANNING',
      statusColor: 'blue',
      criteria: {
        hardforks: { status: 'complete', note: 'Up to date with current hardforks' },
        eest: { status: 'not-started' },
        witness: { status: 'not-started' },
        compilation: { status: 'not-started' }
      }
    },
    {
      name: 'Reth',
      progress: 4,
      total: 4,
      status: 'SPEC COMPLIANT',
      statusColor: 'green',
      criteria: {
        hardforks: { status: 'complete' },
        eest: { status: 'complete' },
        witness: { status: 'complete' },
        compilation: { status: 'complete', note: 'Rust is readily supported by zkVMs' }
      }
    },
    {
      name: 'Ethrex',
      progress: 4,
      total: 4,
      status: 'SPEC COMPLIANT',
      statusColor: 'green',
      criteria: {
        hardforks: { status: 'complete' },
        eest: { status: 'complete' },
        witness: { status: 'complete' },
        compilation: { status: 'complete', note: 'Rust is readily supported by zkVMs' }
      }
    }
  ];

  const consensusClients = [
    {
      name: 'Lighthouse',
      progress: 2,
      total: 3,
      status: 'IN DEVELOPMENT',
      statusColor: 'orange',
      criteria: {
        hardforks: { status: 'complete', note: 'Up to date with current hardforks' },
        executionProofs: { status: 'complete', note: 'Implemented Optional execution proofs' },
        epbs: { status: 'in-progress', note: 'Implemented ePBS (in progress)' }
      }
    },
    {
      name: 'Teku',
      progress: 1,
      total: 3,
      status: 'IN DEVELOPMENT',
      statusColor: 'orange',
      criteria: {
        hardforks: { status: 'complete', note: 'Up to date with current hardforks' },
        executionProofs: { status: 'in-progress', note: 'Implemented Optional execution proofs (in progress)' },
        epbs: { status: 'in-progress', note: 'Implemented ePBS (in progress)' }
      }
    },
    {
      name: 'Prysm',
      progress: 0,
      total: 3,
      status: 'NOT STARTED',
      statusColor: 'gray',
      criteria: {
        hardforks: { status: 'complete', note: 'Up to date with current hardforks' },
        executionProofs: { status: 'not-started' },
        epbs: { status: 'in-progress', note: 'Implemented ePBS (in progress)' }
      }
    },
    {
      name: 'Nimbus',
      progress: 0,
      total: 3,
      status: 'NOT STARTED',
      statusColor: 'gray',
      criteria: {
        hardforks: { status: 'not-started' },
        executionProofs: { status: 'not-started' },
        epbs: { status: 'not-started' }
      }
    },
    {
      name: 'Lodestar',
      progress: 0,
      total: 3,
      status: 'NOT STARTED',
      statusColor: 'gray',
      criteria: {
        hardforks: { status: 'not-started' },
        executionProofs: { status: 'not-started' },
        epbs: { status: 'not-started' }
      }
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'complete':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'in-progress':
        return <Clock className="w-4 h-4 text-orange-500" />;
      case 'under-review':
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      case 'not-started':
        return <div className="w-4 h-4 rounded-full border-2 border-gray-300" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      complete: 'bg-green-100 text-green-800',
      'in-progress': 'bg-orange-100 text-orange-800',
      'under-review': 'bg-yellow-100 text-yellow-800',
      'not-started': 'bg-gray-100 text-gray-600'
    };
    
    const labels: Record<string, string> = {
      complete: 'Complete',
      'in-progress': 'In Progress',
      'under-review': 'Under Review',
      'not-started': 'Not Started'
    };

    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${colors[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="bg-card border border-border rounded-xl p-8 mb-6">
        <div className="text-center mb-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            Ethereum Client Readiness for zkVM Integration
          </h3>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            General readiness status of Ethereum clients for zkVM integration. 
            Individual zkVM-specific client readiness is shown in the zkVM Tracker.
          </p>
        </div>
      </div>

<div className="grid lg:grid-cols-2 gap-6">
        {/* Execution Layer Clients */}
        <div className="bg-card border border-border rounded-xl p-8">
          <h4 className="text-2xl font-bold text-foreground mb-6">Execution Layer Clients</h4>
          
          <div className="space-y-4">
            {executionClients.map((client) => (
              <div key={client.name} className="border border-border rounded-lg overflow-hidden">
                <div className="p-4 bg-muted/30">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-lg font-bold text-foreground">{client.name}</h3>
                      <span className="text-sm text-muted-foreground">
                        {client.progress}/{client.total}
                      </span>
                      <span className={`px-3 py-1 rounded text-xs font-medium ${
                        client.statusColor === 'green' ? 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200' :
                        client.statusColor === 'orange' ? 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-200' :
                        'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200'
                      }`}>
                        {client.status}
                      </span>
                    </div>
                    <button
                      onClick={() => toggleClient(client.name)}
                      className="text-primary hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium transition-colors"
                    >
                      {expandedClients.has(client.name) ? 'Hide Details' : 'Show Details'}
                    </button>
                  </div>
                  
                  <div className="w-full bg-border rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        client.statusColor === 'green' ? 'bg-green-600' :
                        client.statusColor === 'orange' ? 'bg-orange-500' :
                        'bg-blue-500'
                      }`}
                      style={{ width: `${(client.progress / client.total) * 100}%` }}
                    />
                  </div>
                </div>

                {expandedClients.has(client.name) && (
                  <div className="p-4 border-t border-border bg-card">
                    <div className="space-y-4">
                      {executionCriteria.map((criterion) => {
                        const criterionStatus = client.criteria[criterion.id as keyof typeof client.criteria] as CriterionStatus;
                        if (!criterionStatus) return null;

                        return (
                          <div key={criterion.id} className="flex items-start gap-3">
                            <div className="mt-1">
                              {getStatusIcon(criterionStatus.status)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <p className="font-medium text-foreground">{criterion.name}</p>
                                {getStatusBadge(criterionStatus.status)}
                              </div>
                              {criterionStatus.note && (
                                <p className="text-sm text-muted-foreground">{criterionStatus.note}</p>
                              )}
                              {criterionStatus.disputeDetails && (
                                <div className="mt-2 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded border border-yellow-200 dark:border-yellow-800">
                                  <div className="flex gap-2">
                                    <HelpCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" />
                                    <div>
                                      <p className="text-sm font-medium text-yellow-900 dark:text-yellow-100 mb-1">
                                        Different Interpretations
                                      </p>
                                      <p className="text-sm text-yellow-800 dark:text-yellow-200">
                                        {criterionStatus.disputeDetails}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                      
                      {('notes' in client && client.notes) ? (
                        <div className="mt-4 pt-4 border-t border-border">
                          <p className="text-sm font-medium text-foreground mb-2">Additional Notes:</p>
                          <ul className="space-y-1">
                            {(Array.isArray(client.notes) ? client.notes : []).map((note: string, idx: number) => (
                              <li key={idx} className="text-sm text-muted-foreground flex gap-2">
                                <span>•</span>
                                <span>{note}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Consensus Layer Clients */}
        <div className="bg-card border border-border rounded-xl p-8">
          <h4 className="text-2xl font-bold text-foreground mb-6">Consensus Layer Clients</h4>
          
          <div className="space-y-4">
            {consensusClients.map((client) => (
              <div key={client.name} className="border border-border rounded-lg overflow-hidden">
                <div className="p-4 bg-muted/30">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-lg font-bold text-foreground">{client.name}</h3>
                      <span className="text-sm text-muted-foreground">
                        {client.progress}/{client.total}
                      </span>
                      <span className={`px-3 py-1 rounded text-xs font-medium ${
                        client.statusColor === 'green' ? 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200' :
                        client.statusColor === 'orange' ? 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-200' :
                        client.statusColor === 'blue' ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-950 dark:text-gray-200'
                      }`}>
                        {client.status}
                      </span>
                    </div>
                    <button
                      onClick={() => toggleClient(client.name)}
                      className="text-primary hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium transition-colors"
                    >
                      {expandedClients.has(client.name) ? 'Hide Details' : 'Show Details'}
                    </button>
                  </div>
                  
                  <div className="w-full bg-border rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        client.statusColor === 'green' ? 'bg-green-600' :
                        client.statusColor === 'orange' ? 'bg-orange-500' :
                        client.statusColor === 'blue' ? 'bg-blue-500' :
                        'bg-gray-500'
                      }`}
                      style={{ width: `${(client.progress / client.total) * 100}%` }}
                    />
                  </div>
                </div>

                {expandedClients.has(client.name) && (
                  <div className="p-4 border-t border-border bg-card">
                    <div className="space-y-4">
                      {consensusCriteria.map((criterion) => {
                        const criterionStatus = client.criteria[criterion.id as keyof typeof client.criteria] as CriterionStatus;
                        if (!criterionStatus) return null;

                        return (
                          <div key={criterion.id} className="flex items-start gap-3">
                            <div className="mt-1">
                              {getStatusIcon(criterionStatus.status)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <p className="font-medium text-foreground">{criterion.name}</p>
                                {getStatusBadge(criterionStatus.status)}
                              </div>
                              {criterionStatus.note && (
                                <p className="text-sm text-muted-foreground">{criterionStatus.note}</p>
                              )}
                              {criterionStatus.disputeDetails && (
                                <div className="mt-2 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded border border-yellow-200 dark:border-yellow-800">
                                  <div className="flex gap-2">
                                    <HelpCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" />
                                    <div>
                                      <p className="text-sm font-medium text-yellow-900 dark:text-yellow-100 mb-1">
                                        Different Interpretations
                                      </p>
                                      <p className="text-sm text-yellow-800 dark:text-yellow-200">
                                        {criterionStatus.disputeDetails}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                      
                      {('notes' in client && client.notes) ? (
                        <div className="mt-4 pt-4 border-t border-border">
                          <p className="text-sm font-medium text-foreground mb-2">Additional Notes:</p>
                          <ul className="space-y-1">
                            {(Array.isArray(client.notes) ? client.notes : []).map((note: string, idx: number) => (
                              <li key={idx} className="text-sm text-muted-foreground flex gap-2">
                                <span>•</span>
                                <span>{note}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
        <div className="flex gap-2">
          <Info className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          <div className="text-sm text-muted-foreground">
            <p className="font-medium mb-1">About This Tracker</p>
            <p>
              This tracker represents the current state of discussion and assessment within the Ethereum 
              zkEVM development community. Where criteria are marked as &ldquo;Under Review,&rdquo; there are ongoing 
              discussions about implementation completeness or methodology. All assessments are subject 
              to change as development progresses and community consensus evolves.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientStatus;
