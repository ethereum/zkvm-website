/**
 * Transform raw test monitor data from eth-act/zkevm-test-monitor
 * into a simplified summary for the website.
 *
 * Input:  src/data/test-monitor-raw/{zkvm}.json (per-zkVM files from Cody's repo)
 * Output: src/data/test-monitor-summary.json (simplified pass/fail per zkVM)
 *
 * Each input file has the format:
 * {
 *   "zkvm": "jolt",
 *   "suite": "act4-standard",
 *   "runs": [{ "date": "...", "commit": "...", "isa": "...", "total": N, "passed": [...], "failed": [...] }]
 * }
 *
 * We take the latest run (first in the array) from each file.
 */

const fs = require('fs');
const path = require('path');

const rawDir = path.join(__dirname, '..', 'src', 'data', 'test-monitor-raw');
const outputPath = path.join(__dirname, '..', 'src', 'data', 'test-monitor-summary.json');

try {
  const summary = {
    lastUpdated: new Date().toISOString(),
    zkvms: {},
  };

  if (!fs.existsSync(rawDir)) {
    console.error('Raw data directory not found:', rawDir);
    process.exit(1);
  }

  const files = fs.readdirSync(rawDir).filter(f => f.endsWith('.json'));

  for (const file of files) {
    const filePath = path.join(rawDir, file);
    const content = fs.readFileSync(filePath, 'utf8').trim();

    if (!content || content === '404: Not Found') {
      console.warn(`Skipping ${file} — empty or not found`);
      continue;
    }

    let data;
    try {
      data = JSON.parse(content);
    } catch (e) {
      console.warn(`Skipping ${file} — invalid JSON`);
      continue;
    }

    const name = data.zkvm || file.replace('.json', '');
    const latestRun = (data.runs || [])[0];

    if (!latestRun) {
      console.warn(`Skipping ${name} — no runs found`);
      continue;
    }

    const passed = Array.isArray(latestRun.passed) ? latestRun.passed.length : 0;
    const failed = Array.isArray(latestRun.failed) ? latestRun.failed.length : 0;
    const total = latestRun.total || (passed + failed);

    summary.zkvms[name] = {
      isa: latestRun.isa || 'unknown',
      commit: latestRun.commit || null,
      monitorCommit: latestRun.monitor_commit || null,
      lastRun: latestRun.date || null,
      passed,
      failed,
      total,
      passRate: total > 0 ? ((passed / total) * 100).toFixed(1) : '0.0',
      isRV64: (latestRun.isa || '').toUpperCase().startsWith('RV64'),
    };
  }

  fs.writeFileSync(outputPath, JSON.stringify(summary, null, 2));
  console.log(`Transformed ${Object.keys(summary.zkvms).length} zkVMs -> ${outputPath}`);
} catch (err) {
  console.error('Failed to transform test data:', err.message);
  process.exit(1);
}
