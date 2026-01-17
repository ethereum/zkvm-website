import { Github, FileText, CheckCircle2, XCircle } from 'lucide-react';
import type { ZKVMImplementation } from '@/lib/track-types';

interface ZKVMComparisonTableProps {
  implementations: ZKVMImplementation[];
}

export function ZKVMComparisonTable({ implementations }: ZKVMComparisonTableProps) {
  const getStatusColor = (status: ZKVMImplementation['status']) => {
    switch (status) {
      case 'Production Ready':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Testing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'In Development':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Planning':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'Deprecated':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTestResultColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b-2 border-gray-200 bg-gray-50">
            <th className="text-left py-4 px-4 font-semibold text-gray-900">Implementation</th>
            <th className="text-left py-4 px-4 font-semibold text-gray-900">Architecture</th>
            <th className="text-center py-4 px-4 font-semibold text-gray-900">Test Results</th>
            <th className="text-center py-4 px-4 font-semibold text-gray-900">Status</th>
            <th className="text-center py-4 px-4 font-semibold text-gray-900">Security Tests</th>
            <th className="text-center py-4 px-4 font-semibold text-gray-900">Open Source</th>
            <th className="text-left py-4 px-4 font-semibold text-gray-900">Supported Clients</th>
            <th className="text-center py-4 px-4 font-semibold text-gray-900">Links</th>
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
              {/* Implementation name and description */}
              <td className="py-4 px-4">
                <div className="max-w-xs">
                  <div className="font-semibold text-gray-900 mb-1">{impl.name}</div>
                  <div className="text-sm text-gray-600 line-clamp-2">{impl.description}</div>
                </div>
              </td>

              {/* Architecture */}
              <td className="py-4 px-4">
                <span className="text-sm font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded">
                  {impl.architecture}
                </span>
              </td>

              {/* Test Results */}
              <td className="py-4 px-4">
                <div className="flex flex-col items-center gap-1">
                  <div
                    className={`text-2xl font-bold ${getTestResultColor(
                      impl.testResults.percentage
                    )}`}
                  >
                    {impl.testResults.percentage}%
                  </div>
                  <div className="text-xs text-gray-500">
                    {impl.testResults.passed}/{impl.testResults.total}
                  </div>
                  <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden mt-1">
                    <div
                      className={`h-full ${
                        impl.testResults.percentage >= 80
                          ? 'bg-green-600'
                          : impl.testResults.percentage >= 60
                          ? 'bg-orange-600'
                          : 'bg-red-600'
                      }`}
                      style={{ width: `${impl.testResults.percentage}%` }}
                    />
                  </div>
                </div>
              </td>

              {/* Status */}
              <td className="py-4 px-4">
                <div className="flex justify-center">
                  <span
                    className={`px-3 py-1 text-xs font-medium border rounded-full whitespace-nowrap ${getStatusColor(
                      impl.status
                    )}`}
                  >
                    {impl.status}
                  </span>
                </div>
              </td>

              {/* Security Tests */}
              <td className="py-4 px-4">
                <div className="flex justify-center">
                  {impl.securityTests ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </td>

              {/* Open Source */}
              <td className="py-4 px-4">
                <div className="flex justify-center">
                  {impl.openSource ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </td>

              {/* Supported Clients */}
              <td className="py-4 px-4">
                <div className="flex flex-wrap gap-1 max-w-xs">
                  {impl.supportedClients.length > 0 ? (
                    impl.supportedClients.map((client) => (
                      <span
                        key={client.name}
                        className={`text-xs px-2 py-1 rounded ${
                          client.color === 'green'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-orange-100 text-orange-800'
                        }`}
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

              {/* Links */}
              <td className="py-4 px-4">
                <div className="flex items-center justify-center gap-2">
                  <a
                    href={impl.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                    title="GitHub Repository"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href={impl.links.docs}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                    title="Documentation"
                  >
                    <FileText className="w-5 h-5" />
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Legend */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Legend</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-600 rounded"></div>
            <span>Test pass rate: ≥80%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-600 rounded"></div>
            <span>Test pass rate: 60-79%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-600 rounded"></div>
            <span>Test pass rate: &lt;60%</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <span>Feature available</span>
          </div>
        </div>
      </div>
    </div>
  );
}
