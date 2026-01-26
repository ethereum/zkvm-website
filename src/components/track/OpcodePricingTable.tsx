'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { OpcodeRepricing } from '@/lib/track-types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Info, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface OpcodePricingTableProps {
  repricings: OpcodeRepricing[];
}

type SortColumn = 'opcode' | 'currentGas' | 'newGas' | 'multiplier';
type SortDirection = 'asc' | 'desc';

export default function OpcodePricingTable({ repricings }: OpcodePricingTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState<SortColumn>('multiplier');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  // Group repricings by category
  const groupedRepricings = useMemo(() => {
    const groups = repricings.reduce((acc, repricing) => {
      if (!acc[repricing.category]) {
        acc[repricing.category] = [];
      }
      acc[repricing.category].push(repricing);
      return acc;
    }, {} as Record<string, OpcodeRepricing[]>);

    // Sort each group
    Object.keys(groups).forEach(category => {
      groups[category].sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortDirection === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        // Both must be numbers at this point
        const aNum = aValue as number;
        const bNum = bValue as number;
        return sortDirection === 'asc' ? aNum - bNum : bNum - aNum;
      });
    });

    return groups;
  }, [repricings, sortColumn, sortDirection]);

  // Filter by search term
  const filteredGroups = useMemo(() => {
    if (!searchTerm) return groupedRepricings;

    const filtered: Record<string, OpcodeRepricing[]> = {};
    Object.entries(groupedRepricings).forEach(([category, opcodes]) => {
      const matchingOpcodes = opcodes.filter(op =>
        op.opcode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        op.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (matchingOpcodes.length > 0) {
        filtered[category] = matchingOpcodes;
      }
    });
    return filtered;
  }, [groupedRepricings, searchTerm]);

  // Calculate category statistics
  const getCategoryStats = (opcodes: OpcodeRepricing[]) => {
    const avgMultiplier = opcodes.reduce((sum, op) => sum + op.multiplier, 0) / opcodes.length;
    return {
      count: opcodes.length,
      avgMultiplier: avgMultiplier.toFixed(1),
    };
  };

  // Get multiplier badge color
  const getMultiplierColor = (multiplier: number) => {
    if (multiplier >= 10) return 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200';
    if (multiplier >= 2) return 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-200';
    return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200';
  };

  // Category display names
  const categoryNames: Record<string, string> = {
    storage: 'Storage Operations',
    crypto: 'Crypto & Precompiles',
    calls: 'Call Operations',
    memory: 'Memory Operations',
    computation: 'Computation',
  };

  // Handle column sort
  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  };

  // Get sort indicator
  const getSortIndicator = (column: SortColumn) => {
    if (sortColumn !== column) return null;
    return sortDirection === 'asc' ? ' ↑' : ' ↓';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gas Repricing for Block Proving</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Info banner */}
          <div className="flex gap-2 rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-blue-900 dark:border-blue-800 dark:bg-blue-950/20 dark:text-blue-100">
            <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
            <p>
              These repricing values are based on ongoing benchmarking work to ensure all operations can be proven within the 12-second slot time. See the{' '}
              <Link href="/blog/repricings-for-block-proving-part-1" className="underline hover:text-blue-700 dark:hover:text-blue-300">
                Repricings for block proving
              </Link>{' '}
              blog post for more details.
            </p>
          </div>

          {/* Search box */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search opcodes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Category count */}
          <div className="text-sm text-muted-foreground">
            Showing {Object.values(filteredGroups).reduce((sum, ops) => sum + ops.length, 0)} opcodes
            {searchTerm && ` matching "${searchTerm}"`}
            {' '}across {Object.keys(filteredGroups).length} categories
          </div>

          {/* Grouped accordion */}
          <Accordion type="multiple" defaultValue={Object.keys(categoryNames)} className="w-full">
            {Object.entries(filteredGroups).map(([category, opcodes]) => {
              const stats = getCategoryStats(opcodes);
              return (
                <AccordionItem key={category} value={category}>
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center justify-between w-full pr-4">
                      <span className="font-semibold">{categoryNames[category]}</span>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span>{stats.count} opcodes</span>
                        <span>Avg {stats.avgMultiplier}x</span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    {/* Desktop table */}
                    <div className="hidden md:block overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th
                              className="px-4 py-3 text-left font-medium cursor-pointer hover:bg-muted/50"
                              onClick={() => handleSort('opcode')}
                            >
                              Opcode{getSortIndicator('opcode')}
                            </th>
                            <th className="px-4 py-3 text-left font-medium">
                              Description
                            </th>
                            <th
                              className="px-4 py-3 text-right font-medium cursor-pointer hover:bg-muted/50"
                              onClick={() => handleSort('currentGas')}
                            >
                              Current Gas{getSortIndicator('currentGas')}
                            </th>
                            <th
                              className="px-4 py-3 text-right font-medium cursor-pointer hover:bg-muted/50"
                              onClick={() => handleSort('newGas')}
                            >
                              New Gas{getSortIndicator('newGas')}
                            </th>
                            <th
                              className="px-4 py-3 text-center font-medium cursor-pointer hover:bg-muted/50"
                              onClick={() => handleSort('multiplier')}
                            >
                              Multiplier{getSortIndicator('multiplier')}
                            </th>
                            <th className="px-4 py-3 text-left font-medium">
                              Reason
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {opcodes.map((op, idx) => (
                            <tr key={idx} className="border-b last:border-0 hover:bg-muted/30">
                              <td className="px-4 py-3 font-mono font-semibold">{op.opcode}</td>
                              <td className="px-4 py-3 text-muted-foreground">{op.description}</td>
                              <td className="px-4 py-3 text-right font-mono">{op.currentGas.toLocaleString()}</td>
                              <td className="px-4 py-3 text-right font-mono">{op.newGas.toLocaleString()}</td>
                              <td className="px-4 py-3 text-center">
                                <span className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${getMultiplierColor(op.multiplier)}`}>
                                  {op.multiplier}x
                                </span>
                              </td>
                              <td className="px-4 py-3 text-sm text-muted-foreground">{op.reason || '—'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Mobile cards */}
                    <div className="md:hidden space-y-3">
                      {opcodes.map((op, idx) => (
                        <div key={idx} className="rounded-lg border p-4 space-y-2">
                          <div className="flex items-start justify-between">
                            <div className="font-mono font-semibold text-lg">{op.opcode}</div>
                            <span className={`rounded-full px-2 py-1 text-xs font-semibold ${getMultiplierColor(op.multiplier)}`}>
                              {op.multiplier}x
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{op.description}</p>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-muted-foreground">Current Gas:</span>
                              <div className="font-mono font-semibold">{op.currentGas.toLocaleString()}</div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">New Gas:</span>
                              <div className="font-mono font-semibold">{op.newGas.toLocaleString()}</div>
                            </div>
                          </div>
                          {op.reason && (
                            <div className="pt-2 text-sm text-muted-foreground border-t">
                              {op.reason}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>

          {/* Empty state */}
          {Object.keys(filteredGroups).length === 0 && (
            <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
              <p className="text-sm">No opcodes found matching &ldquo;{searchTerm}&rdquo;</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
