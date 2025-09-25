"use client";

import React, { useState } from 'react';
import { zkevmData } from '@/data/zkevm-tracker';
import { ZKEVMData } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Github, BookOpen } from 'lucide-react';


// Checkmark Icon for boolean values - matches homepage styling
const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="icon-pass">
    <path d="M20 6 9 17l-5-5"/>
  </svg>
);

// Badge Component for ZK-EVM types and clients
interface TypeBadgeProps {
  text: string;
  colorClass: string;
}

const TypeBadge: React.FC<TypeBadgeProps> = ({ text, colorClass }) => (
  <Badge variant="secondary" className={`${colorClass} font-medium whitespace-nowrap`}>
    {text}
  </Badge>
);

// Card View Component
const CardView: React.FC<{ data: ZKEVMData[] }> = ({ data }) => (
  <div className="zkevm-grid">
    {data.map((item, index) => (
      <Card key={index} className="zkevm-card">
        <CardContent className="p-8">
          <div className="flex justify-between items-start mb-2">
            <h3>{item.name}</h3>
            <TypeBadge text={item.type.label} colorClass={item.type.color} />
          </div>
          <p className="description">{item.description}</p>
          <ul className="criteria-list">
            <li className="criteria-item">
              <span className="name">Security Tests</span>
              <div className="value">
                {item.securityTests && <CheckIcon />}
              </div>
            </li>
            <li className="criteria-item">
              <span className="name">Open Source</span>
              <div className="value">
                {item.openSource && <CheckIcon />}
              </div>
            </li>
            <li className="criteria-item">
              <span className="name">Supported Clients</span>
              <div className="value">
                <div className="flex flex-wrap gap-2 justify-end">
                  {item.supportedClients.map(client => (
                    <TypeBadge key={client.name} text={client.name} colorClass={client.color} />
                  ))}
                </div>
              </div>
            </li>
          </ul>
          <div className="pt-4 border-t border-gray-200 flex items-center justify-center gap-6 mt-6">
            <a 
              href={item.links.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Github className="w-5 h-5" />
              GitHub
            </a>
            <a 
              href={item.links.docs} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <BookOpen className="w-5 h-5" />
              Docs
            </a>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

// Table View Component
const TableView: React.FC<{ data: ZKEVMData[] }> = ({ data }) => (
  <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-gray-200">
    <Table>
      <TableHeader>
        <TableRow className="bg-gray-50">
          <TableHead className="min-w-[250px]">Project</TableHead>
          <TableHead className="w-24">Type</TableHead>
          <TableHead>Security Tests</TableHead>
          <TableHead>Open Source</TableHead>
          <TableHead className="min-w-[200px]">Supported Clients</TableHead>
          <TableHead>Links</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={index} className="hover:bg-gray-50">
            <TableCell>
              <div className="font-bold text-gray-900">{item.name}</div>
              <div className="text-xs text-gray-500 mt-1">{item.description}</div>
            </TableCell>
            <TableCell className="w-24">
              <TypeBadge text={item.type.label} colorClass={item.type.color} />
            </TableCell>
            <TableCell>{item.securityTests && <CheckIcon />}</TableCell>
            <TableCell>{item.openSource && <CheckIcon />}</TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-2">
                {item.supportedClients.map(client => (
                  <TypeBadge key={client.name} text={client.name} colorClass={client.color} />
                ))}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-3">
                <a 
                  href={item.links.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-800 transition-colors"
                  title="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a 
                  href={item.links.docs} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-800 transition-colors"
                  title="Documentation"
                >
                  <BookOpen className="w-5 h-5" />
                </a>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

// Main ZKEVMTracker Component
function ZKEVMTracker() {
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            ZK-EVM Mainnet Readiness
          </h1>
          <p className="mt-2 text-lg text-gray-600 max-w-3xl">
            Evaluating core ZK-EVM implementations based on criteria required for a secure and sustainable mainnet deployment.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1200px] mx-auto px-4 py-8 bg-gray-50 min-h-screen">
        {/* Controls: View Toggle and Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-1 p-1 bg-white rounded-lg shadow-sm border border-gray-200">
            <button
              onClick={() => setViewMode('cards')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                viewMode === 'cards' 
                  ? 'bg-blue-100 text-[var(--dark)] hover:bg-blue-200' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Cards
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                viewMode === 'table' 
                  ? 'bg-blue-100 text-[var(--dark)] hover:bg-blue-200' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Table
            </button>
          </div>
          <div className="text-sm text-gray-600">
            Filters and sorting coming soon.
          </div>
        </div>

        {/* Conditional Rendering based on viewMode */}
        {viewMode === 'table' ? (
          <TableView data={zkevmData} />
        ) : (
          <CardView data={zkevmData} />
        )}
      </div>
    </div>
  );
}

export default ZKEVMTracker;
