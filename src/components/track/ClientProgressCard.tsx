'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight, CheckCircle2, Circle, AlertCircle, Clock } from 'lucide-react';
import type { EthereumClient } from '@/lib/track-types';

interface ClientProgressCardProps {
  client: EthereumClient;
}

export function ClientProgressCard({ client }: ClientProgressCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const statusColors = {
    green: 'bg-green-100 text-green-800 border-green-200',
    orange: 'bg-orange-100 text-orange-800 border-orange-200',
    blue: 'bg-blue-100 text-blue-800 border-blue-200',
    gray: 'bg-gray-100 text-gray-800 border-gray-200',
  };

  const criteriaStatusIcons = {
    'complete': <CheckCircle2 className="w-5 h-5 text-green-600" />,
    'in-progress': <Clock className="w-5 h-5 text-orange-600" />,
    'under-review': <AlertCircle className="w-5 h-5 text-blue-600" />,
    'not-started': <Circle className="w-5 h-5 text-gray-400" />,
  };

  const criteriaStatusLabels = {
    'complete': 'Complete',
    'in-progress': 'In Progress',
    'under-review': 'Under Review',
    'not-started': 'Not Started',
  };

  const progressPercentage = (client.progress / client.total) * 100;

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-colors">
      {/* Header - Always visible */}
      <div className="px-4 py-4 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <h3 className="text-base font-bold text-gray-900 sm:text-lg">{client.name}</h3>
            <span className="text-xs text-gray-600 sm:text-sm capitalize">
              ({client.type})
            </span>
            <span className="text-xs font-medium text-gray-600 sm:text-sm">
              {client.progress}/{client.total}
            </span>
            <span
              className={`rounded px-2 py-1 text-xs font-medium sm:px-3 ${
                statusColors[client.statusColor]
              }`}
            >
              {client.status}
            </span>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
            aria-controls={`client-details-${client.name.toLowerCase().replace(/\s+/g, '-')}`}
            className="self-start text-xs font-medium text-primary transition-colors hover:text-blue-600 sm:text-sm flex items-center gap-1"
          >
            {isExpanded ? (
              <>
                <ChevronDown className="w-4 h-4" />
                Hide Details
              </>
            ) : (
              <>
                <ChevronRight className="w-4 h-4" />
                Show Details
              </>
            )}
          </button>
        </div>

        {/* Progress bar */}
        <div className="mt-3 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all ${
              progressPercentage === 100
                ? 'bg-green-600'
                : progressPercentage >= 50
                ? 'bg-orange-600'
                : 'bg-gray-400'
            }`}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Expanded content */}
      {isExpanded && (
        <div
          id={`client-details-${client.name.toLowerCase().replace(/\s+/g, '-')}`}
          className="px-6 pb-6 pt-2 border-t border-gray-100 bg-gray-50"
        >
          {/* Criteria list */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Criteria</h4>
            {Object.entries(client.criteria).map(([key, criterion]) => (
              <div key={key} className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {criteriaStatusIcons[criterion.status]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h5 className="font-medium text-gray-900">{criterion.name}</h5>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                        {criteriaStatusLabels[criterion.status]}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{criterion.description}</p>

                    {criterion.note && (
                      <div className="mt-2 text-sm text-gray-700 bg-blue-50 border border-blue-100 rounded px-3 py-2">
                        <span className="font-medium">Note:</span> {criterion.note}
                      </div>
                    )}

                    {criterion.disputeDetails && (
                      <div className="mt-2 text-sm text-gray-700 bg-yellow-50 border border-yellow-200 rounded px-3 py-2">
                        <span className="font-medium">Dispute Details:</span>
                        <p className="mt-1 whitespace-pre-line">{criterion.disputeDetails}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Notes section */}
          {client.notes && client.notes.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Additional Notes</h4>
              <ul className="space-y-1">
                {client.notes.map((note, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="text-gray-400 mt-1">•</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
