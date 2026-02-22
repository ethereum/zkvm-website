'use client';

import { Github, FileText, Info } from 'lucide-react';
import type { ZKVMSecurityEntry } from '@/data/zkvm-security';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ZKVMComparisonTableProps {
  implementations: ZKVMSecurityEntry[];
}

export function ZKVMComparisonTable({ implementations }: ZKVMComparisonTableProps) {
  const getComplianceColor = (percentage: number) => {
    if (percentage === 0) return 'text-gray-400';
    if (percentage === 100) return 'text-green-600';
    if (percentage >= 90) return 'text-yellow-400';
    return 'text-red-600';
  };

  return (
    <TooltipProvider>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-200 bg-gray-50">
              <th className="text-left py-3 px-4 font-semibold text-gray-900"></th>
              <th className="text-center py-3 px-6 font-semibold text-gray-900 max-w-32">
                ISA<Tooltip delayDuration={0}>
                  <TooltipTrigger>
                    <Info className="w-3.5 h-3.5 text-gray-400 cursor-help inline-block ml-0.5 align-middle" />
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-sm p-3 whitespace-normal break-words">
                    <p className="text-sm leading-relaxed">
                      The compilation target that the zkVM proves.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </th>
              <th className="text-center py-3 px-6 font-semibold text-gray-900 max-w-32">
                ISA Compliance<Tooltip delayDuration={0}>
                  <TooltipTrigger>
                    <Info className="w-3.5 h-3.5 text-gray-400 cursor-help inline-block ml-0.5 align-middle" />
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-sm p-3 whitespace-normal break-words">
                    <p className="text-sm leading-relaxed">
                      Testing against the specs or a canonical reference implementation.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </th>
              <th className="text-center py-3 px-6 font-semibold text-gray-900 max-w-32">
                Verifier Testing<Tooltip delayDuration={0}>
                  <TooltipTrigger>
                    <Info className="w-3.5 h-3.5 text-gray-400 cursor-help inline-block ml-0.5 align-middle" />
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-sm p-3 whitespace-normal break-words">
                    <p className="text-sm leading-relaxed">
                      Verifier security assessment based on: unit testing coverage,
                      fuzzing campaigns, and formal verification status.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </th>
              <th className="text-center py-3 px-6 font-semibold text-gray-900 max-w-32">
                Prover Fuzzing<Tooltip delayDuration={0}>
                  <TooltipTrigger>
                    <Info className="w-3.5 h-3.5 text-gray-400 cursor-help inline-block ml-0.5 align-middle" />
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-sm p-3 whitespace-normal break-words">
                    <p className="text-sm leading-relaxed">
                      Fuzzing to prevent liveness failures.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </th>
              <th className="text-center py-3 px-6 font-semibold text-gray-900 max-w-32">
                Supported Clients<Tooltip delayDuration={0}>
                  <TooltipTrigger>
                    <Info className="w-3.5 h-3.5 text-gray-400 cursor-help inline-block ml-0.5 align-middle" />
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-sm p-3 whitespace-normal break-words">
                    <p className="text-sm leading-relaxed">
                      Which EVM implementations are verified to work for this zkVM.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </th>
              <th className="w-full"></th>
            </tr>
          </thead>
        <tbody>
          {implementations.map((impl, index) => (
            <tr
              key={impl.name}
              className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
              }`}
            >
              {/* Implementation name with links and license */}
              <td className="py-3 px-4">
                <div>
                  <div className="font-semibold text-gray-900">{impl.name}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <a
                      href={impl.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-gray-900 transition-colors"
                      title="GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      href={impl.links.docs}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-gray-900 transition-colors"
                      title="Docs"
                    >
                      <FileText className="w-4 h-4" />
                    </a>
                    {impl.license && (
                      <span className="text-xs text-gray-500">{impl.license}</span>
                    )}
                  </div>
                </div>
              </td>

              {/* ISA */}
              <td className="py-3 px-6 text-center">
                <span className="text-sm font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded">
                  {impl.architecture}
                </span>
              </td>

              {/* ISA Compliance */}
              <td className="py-3 px-6 text-center">
                <span className={`text-lg font-bold ${getComplianceColor(impl.isaCompliance)}`}>
                  {impl.isaCompliance === 0 ? '—' : `${impl.isaCompliance}%`}
                </span>
              </td>

              {/* Verifier Testing - blank for now */}
              <td className="py-3 px-6 text-center">
                <span className="text-gray-400">—</span>
              </td>

              {/* Prover Fuzzing - blank for now */}
              <td className="py-3 px-6 text-center">
                <span className="text-gray-400">—</span>
              </td>

              {/* Supported Clients */}
              <td className="py-3 px-6 text-center">
                <div className="flex flex-wrap gap-1 justify-center">
                  {impl.supportedClients.length > 0 ? (
                    impl.supportedClients.map((client) => (
                      <span
                        key={client.name}
                        className="text-xs px-2 py-1 rounded bg-green-100 text-green-800"
                        title={client.status}
                      >
                        {client.name}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-gray-500 italic">None yet</span>
                  )}
                </div>
              </td>
              <td></td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </TooltipProvider>
  );
}
