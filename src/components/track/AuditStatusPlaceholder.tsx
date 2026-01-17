import { Shield, FileCheck, Users } from 'lucide-react';

export function AuditStatusPlaceholder() {
  return (
    <div className="space-y-6">
      <div className="border-t pt-8">
        <h2 className="text-2xl font-bold mb-2">Security Audits & Economic Model</h2>
        <p className="text-muted-foreground mb-6">
          Audit status, research findings, and economic incentive design for the prover market
        </p>

        <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex justify-center gap-4 mb-6">
              <div className="p-3 bg-white rounded-lg border border-gray-200">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <div className="p-3 bg-white rounded-lg border border-gray-200">
                <FileCheck className="w-8 h-8 text-blue-600" />
              </div>
              <div className="p-3 bg-white rounded-lg border border-gray-200">
                <Users className="w-8 h-8 text-green-600" />
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Audit & Research Information Coming Soon
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              We&apos;re working with security firms and researchers to establish comprehensive
              audit processes and economic models. This section will include:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-purple-600" />
                  <h4 className="font-semibold text-gray-900 text-sm">Security Audits</h4>
                </div>
                <p className="text-xs text-gray-600">
                  Status and findings from formal audits of zkVM implementations and clients
                </p>
              </div>

              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <FileCheck className="w-5 h-5 text-blue-600" />
                  <h4 className="font-semibold text-gray-900 text-sm">Research Papers</h4>
                </div>
                <p className="text-xs text-gray-600">
                  Academic research on economic incentives, game theory, and security guarantees
                </p>
              </div>

              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-green-600" />
                  <h4 className="font-semibold text-gray-900 text-sm">Prover Market Design</h4>
                </div>
                <p className="text-xs text-gray-600">
                  Economic models and incentive structures for decentralized prover markets
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <p className="text-sm text-purple-800">
                <strong>Note:</strong> Security audit results and economic research will be published
                as they become available. Check back for updates on formal verification efforts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
