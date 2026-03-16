/**
 * Transform raw test monitor data from eth-act/zkevm-test-monitor
 * into a simplified summary for the website.
 *
 * Input:  src/data/test-monitor-results.json (full results.json from Cody's repo)
 * Output: src/data/test-monitor-summary.json (simplified pass/fail per zkVM)
 *
 * The website reads the summary file to populate the zkVM Readiness table
 * with live ISA compliance data.
 */

const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '..', 'src', 'data', 'test-monitor-results.json');
const outputPath = path.join(__dirname, '..', 'src', 'data', 'test-monitor-summary.json');

try {
  const raw = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
  const summary = {
    lastUpdated: raw.last_updated || new Date().toISOString(),
    frameworkVersion: raw.framework_version || 'unknown',
    zkvms: {},
  };

  for (const [name, data] of Object.entries(raw.zkvms || {})) {
    const zkvm = data;
    const archSuite = zkvm.suites?.arch || {};
    const extraSuite = zkvm.suites?.extra || {};

    summary.zkvms[name] = {
      isa: zkvm.isa || 'unknown',
      buildStatus: zkvm.build_status || 'unknown',
      lastRun: zkvm.last_run || null,
      commit: zkvm.commit || null,
      arch: {
        passed: archSuite.passed || 0,
        failed: archSuite.failed || 0,
        total: archSuite.total || 0,
        status: archSuite.test_status || 'unknown',
      },
      extra: {
        passed: extraSuite.passed || 0,
        failed: extraSuite.failed || 0,
        total: extraSuite.total || 0,
        status: extraSuite.test_status || 'unknown',
      },
      // Derived: is this zkVM RV64-based?
      isRV64: (zkvm.isa || '').startsWith('rv64'),
      // Derived: overall pass rate for arch tests
      archPassRate: archSuite.total > 0
        ? ((archSuite.passed / archSuite.total) * 100).toFixed(1)
        : '0.0',
    };
  }

  fs.writeFileSync(outputPath, JSON.stringify(summary, null, 2));
  console.log(`Transformed ${Object.keys(summary.zkvms).length} zkVMs -> ${outputPath}`);
} catch (err) {
  console.error('Failed to transform test data:', err.message);
  process.exit(1);
}
