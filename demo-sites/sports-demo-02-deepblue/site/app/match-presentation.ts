import { matches, type Match } from './demo-data';
import scoreTemplates from './display-score-templates.json';

const validScore = (value: unknown) => typeof value === 'number' ? Number.isFinite(value) && value >= 0 : typeof value === 'string' && /^\d+$/.test(value);

// R5-approved display-only supplementation. Source state, markets and settlement stay untouched.
export function scorePresentationFor(match: Pick<Match, 'id' | 'sport' | 'score' | 'completed' | 'state' | 'statusDetail'>) {
  const filledSides = [0, 1].filter(index => !validScore(match.score?.[index]));
  const original = { score: match.score, state: match.state, status: match.completed ? '종료 · FINAL' : match.state === 'in' ? match.statusDetail : '예정', filledSides, provenance: 'source' as const, templateIndex: null as number | null };
  if (!filledSides.length) return original;
  const sport = (match.sport === 'hockey' ? 'ice-hockey' : match.sport) as keyof typeof scoreTemplates.templates;
  const template = scoreTemplates.templates[sport];
  if (!template) return original;
  let hash = 2166136261;
  for (const character of match.id) hash = Math.imul(hash ^ character.charCodeAt(0), 16777619) >>> 0;
  const templateIndex = hash % template.variants.length;
  const variant = template.variants[templateIndex];
  return {
    score: [0, 1].map(index => validScore(match.score?.[index]) ? match.score[index] : String(index === 0 ? variant.home : variant.away)),
    state: variant.display_state === 'live' ? 'in' : 'post',
    status: variant.display_state === 'final' ? '종료 · FINAL' : variant.phase_label,
    filledSides, provenance: 'r5-approved-display-only' as const, templateIndex,
  };
}

// R3-authorized display metadata, independent of the supplied market count and odds.
export const matchPresentation = Object.fromEntries(matches.map(match => {
  let hash = 2166136261;
  for (const character of match.id) hash = Math.imul(hash ^ character.charCodeAt(0), 16777619) >>> 0;
  const [minimum, maximum] = match.sport === 'soccer' ? [24, 180] : match.sport === 'baseball' ? [12, 76] : match.sport === 'basketball' ? [24, 128] : [1, 9];
  return [match.id, { displayAdditionalMarketCount: minimum + hash % (maximum - minimum + 1), provenance: 'r3-approved-display-only' as const, score: scorePresentationFor(match) }];
}));

export function unavailableMarketTypes(match: Match): string[] {
  switch (match.sport) {
    case 'soccer': return ['첫 골', '전반 승무패', '후반 승무패'];
    case 'baseball': return ['첫 득점', '1회 득점', '5회 승패'];
    case 'basketball': return ['1쿼터 승패', '전반 승패', '팀별 득점'];
    case 'hockey': return ['첫 골', '1피리어드 승패'];
    case 'american-football': return ['첫 득점', '1쿼터 승패'];
    case 'volleyball': return ['1세트 승패', '정확한 세트 스코어'];
    case 'tennis': return ['1세트 승패', '정확한 세트 스코어'];
    default: return [];
  }
}
