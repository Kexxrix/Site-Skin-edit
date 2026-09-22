const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '../../..');
const assetRoot = 'E:/codexwork/Site-Skin-edit/TEMP/Sports-Images';
const read = p => JSON.parse(fs.readFileSync(p, 'utf8').replace(/^\uFEFF/, ''));
const sha = p => crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const recordsFile = path.join(root, 'site/app/match-records.json');
const records = read(recordsFile);
const sources = new Map();
const findings = records.map(record => {
  const file = path.resolve(record.sourceFile.startsWith('qa/') ? root : assetRoot, record.sourceFile);
  if (!sources.has(file)) sources.set(file, {data: read(file), sha: sha(file)});
  const source = sources.get(file);
  const event = source.data.events.find(event => String(event.id) === String(record.sourceEventId));
  if (!event) return {id: record.id, pass: false, error: 'Source event not found'};
  const competition = event.competitions[0];
  const home = competition.competitors.find(team => team.homeAway === 'home');
  const away = competition.competitors.find(team => team.homeAway === 'away');
  const status = event.status.type;
  const checks = {
    sourceHash: record.sourceSha256.toLowerCase() === source.sha,
    homeID: String(home.team.id) === String(record.home.id),
    awayID: String(away.team.id) === String(record.away.id),
    homeName: home.team.displayName === record.home.originalName,
    awayName: away.team.displayName === record.away.originalName,
    startTime: new Date(event.date).getTime() === new Date(record.startUtc).getTime(),
    state: status.state === record.state,
    statusCode: status.name === record.statusCode,
    completed: status.completed === record.completed,
    score: record.state === 'pre' || (String(home.score) === String(record.score[0]) && String(away.score) === String(record.score[1])),
    localAssets: [record.home.logo, record.away.logo, record.leagueLogo, record.sportLogo].every(url => url?.startsWith('/') && fs.existsSync(path.join(root, 'site/public', url))),
  };
  return {id: record.id, sourceEventId: record.sourceEventId, checks, pass: Object.values(checks).every(Boolean)};
});
const sectionCounts = records.reduce((counts, record) => ({...counts, [record.section]: (counts[record.section] || 0) + 1}), {});
const uniqueFixtures = new Set(records.map(record => String(record.sourceEventId))).size;
const output = {
  checkedAt: new Date().toISOString(), method: 'Independent coordinator comparison of selected records only against preserved source JSON',
  recordsSHA256: sha(recordsFile), count: records.length, uniqueFixtures, sectionCounts,
  minimum60: uniqueFixtures >= 60, duplicates: records.length - uniqueFixtures,
  failed: findings.filter(item => !item.pass), findings,
  limitations: ['Static source snapshots; not a claim about current live schedules or odds', 'Asset existence checked here; subject identity and visual readability are separate audit checks'],
};
fs.writeFileSync(path.join(__dirname, 'selected-records-check.json'), JSON.stringify(output, null, 2) + '\n');
console.log(JSON.stringify({count: output.count, uniqueFixtures, sectionCounts, minimum60: output.minimum60, failed: output.failed}));
process.exitCode = output.minimum60 && output.duplicates === 0 && output.failed.length === 0 ? 0 : 1;
