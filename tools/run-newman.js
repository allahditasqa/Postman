#!/usr/bin/env node
/*
 * Runs the Postman collection with Newman, one run per folder (= module), and writes the module-wise
 * reports (HTML + CSV + history) from the REAL results. Test case details come from docs/test-cases.
 *
 *   node tools/run-newman.js              all folders
 *   node tools/run-newman.js Posts Users  only these folders
 */
const path = require('path');
const newman = require('newman');
const { parseDocs, ROOT } = require('./docs');
const { writeRun } = require('./report-lib');

const COLLECTION = path.join(ROOT, 'collections', 'JSONPlaceholder.postman_collection.json');
const ENVIRONMENT = path.join(ROOT, 'environments', 'jsonplaceholder.postman_environment.json');
const collection = require(COLLECTION);
const environmentName = require(ENVIRONMENT).values.find((v) => v.key === 'baseUrl').value;

const wanted = process.argv.slice(2);
const folders = collection.item.map((f) => f.name).filter((n) => !wanted.length || wanted.includes(n));
const docs = new Map(parseDocs().flatMap((d) => d.cases).map((c) => [c.id, c]));

const runFolder = (folder) => new Promise((resolve, reject) => {
  newman.run({ collection, environment: ENVIRONMENT, folder, reporters: [] }, (err, summary) => (err ? reject(err) : resolve(summary)));
});

(async () => {
  const started = new Date();
  const modules = [];
  for (const folder of folders) {
    const t0 = Date.now();
    const summary = await runFolder(folder);
    const cases = [];
    for (const ex of summary.run.executions) {
      const id = /^(TC_[A-Z0-9_]+_\d{2,3})/.exec(ex.item.name)?.[1];
      const doc = docs.get(id);
      if (!doc) throw new Error(`Request "${ex.item.name}" has no documented test case`);
      const assertions = ex.assertions || [];
      const failed = assertions.filter((a) => a.error);
      const status = ex.requestError ? 'failed' : failed.length ? 'failed' : 'passed';
      const http = ex.response ? `HTTP ${ex.response.code} ${ex.response.status} in ${ex.response.responseTime} ms` : `No response: ${ex.requestError?.message}`;
      const lines = [`${ex.request.method} ${ex.request.url.toString()}`, http, `${assertions.length - failed.length}/${assertions.length} assertions passed`];
      assertions.forEach((a) => lines.push(`${a.error ? 'FAIL' : 'ok  '} ${a.assertion}${a.error ? ' - ' + a.error.message : ''}`));
      cases.push({
        id, title: doc.title, priority: doc.priority, type: doc.type, pre: doc.pre, data: doc.data, steps: doc.steps, expected: doc.expected,
        actual: lines.join('\n'), status, duration: (ex.response?.responseTime || 0) / 1000, testFile: doc.testFile, testName: doc.testName,
      });
    }
    cases.sort((a, b) => a.id.localeCompare(b.id));
    modules.push({ name: folder, durationSeconds: (Date.now() - t0) / 1000, cases });
  }
  const entry = writeRun({
    reportsDir: path.join(ROOT, 'reports'), title: 'Postman', started, durationSeconds: (Date.now() - started) / 1000,
    environment: `Newman ${require('newman/package.json').version} - ${environmentName}`, modules,
  });
  const total = entry.Modules.reduce((a, m) => a + m.Total, 0);
  const failed = entry.Modules.reduce((a, m) => a + m.Failed, 0);
  console.log(`${total} test cases, ${total - failed} passed, ${failed} failed. Reports: reports/index.html`);
  process.exit(failed ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(2); });
