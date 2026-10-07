export const COLOR_FIELDS = [
  {key: 'background', label: '전체 배경'},
  {key: 'surface', label: '카드 · 패널'},
  {key: 'raised', label: '패널 제목 · 돌출 표면'},
  {key: 'control', label: '일반 버튼'},
  {key: 'input', label: '입력 · 목록 안쪽'},
  {key: 'header', label: '헤더 이미지 뒤 바탕'},
  {key: 'border', label: '경계 · 구분선'},
  {key: 'text', label: '본문 글자'},
  {key: 'muted', label: '보조 글자'},
  {key: 'disabled', label: '비활성 글자'},
  {key: 'accent', label: '강조 · 선택'},
  {key: 'accentSoft', label: '밝은 강조'},
  {key: 'onAccent', label: '강조 위 글자 · 마스크'},
  {key: 'shadow', label: '그림자 · 팝업 가림'},
  {key: 'headerMenu', label: '메뉴 바탕 그라데이션'},
  {key: 'headerButton', label: '헤더 버튼 바탕'},
  {key: 'headerButtonText', label: '헤더 버튼 글자'},
  {key: 'headerButtonBorder', label: '헤더 버튼 테두리'},
  {key: 'headerButtonAccent', label: '무기명 버튼 강조'},
  {key: 'headerButtonHover', label: '헤더 버튼 hover 바탕'},
  {key: 'odds', label: '배당 숫자'},
  {key: 'error', label: '오류 · 경고'},
  {key: 'menuActiveText', label: '활성 메뉴 글자'},
  {key: 'menuActiveLine', label: '활성 메뉴 밑줄'},
  {key: 'sportSelectedBackground', label: '선택 종목 배경'},
  {key: 'sportSelectedText', label: '선택 종목 글자'},
  {key: 'sportSelectedBorder', label: '선택 종목 테두리'},
  {key: 'oddsSelectedBackground', label: '선택 배당 · 마켓 배경'},
  {key: 'oddsSelectedText', label: '선택 배당 · 마켓 글자'},
  {key: 'oddsSelectedBorder', label: '선택 배당 · 마켓 테두리'},
  {key: 'actionBackground', label: '크림 동작 버튼 배경'},
  {key: 'actionText', label: '크림 동작 버튼 글자 · 마스크'},
  {key: 'actionBorder', label: '크림 동작 버튼 테두리'},
  {key: 'chipBackground', label: '작은 칩 배경'},
  {key: 'chipText', label: '작은 칩 글자'},
  {key: 'chipBorder', label: '작은 칩 테두리'},
  {key: 'leagueText', label: '리그 제목 글자'},
  {key: 'chipGradientTop', label: '칩 그라데이션 위쪽'},
  {key: 'chipGradientBottom', label: '칩 그라데이션 아래쪽'},
] as const;

export type ColorKey = typeof COLOR_FIELDS[number]['key'];
export type Palette = Record<ColorKey, string>;
export type Mood = {hue: number; saturation: number; lightness: number};
export type ColorLocks = Record<ColorKey, boolean>;
export type MenuStyle = 'metal' | 'solid';
export type OddsSelectedStyle = MenuStyle | 'warm';
export type CreamDetails = 'original' | 'warm';
export type ChipStyle = 'original' | 'solid' | 'gradient';
export type GoldIconGroup = 'sport' | 'selectedSport' | 'service';
export type GoldIconTuning = Record<GoldIconGroup, {brightness: number; contrast: number; saturation: number}>;
export type ButtonFill = {mode: 'original' | 'solid' | 'gradient'; angle: number; strength: number; stops: {color: string; position: number}[]};
export type Snapshot = {palette: Palette; mood: Mood; locks: ColorLocks; menuStyle: MenuStyle; goldIconOutline: boolean; buttonFill: ButtonFill; oddsSelectedStyle: OddsSelectedStyle; creamDetails: CreamDetails; goldIconTuning: GoldIconTuning; chipStyle: ChipStyle};
export type ColorLink = {variable: string; source: string; role: ColorKey};
export const COLOR_LINKS: ColorLink[] = [
  {
    "variable": "--skin-header-141414",
    "source": "#141414",
    "role": "header"
  },
  {
    "variable": "--skin-control-353535",
    "source": "#353535",
    "role": "control"
  },
  {
    "variable": "--skin-input-090909",
    "source": "#090909",
    "role": "input"
  },
  {
    "variable": "--skin-text-ffffff",
    "source": "#ffffff",
    "role": "text"
  },
  {
    "variable": "--skin-disabled-757575",
    "source": "#757575",
    "role": "disabled"
  },
  {
    "variable": "--skin-accent-ffcd55",
    "source": "#ffcd55",
    "role": "accent"
  },
  {
    "variable": "--skin-accentSoft-ffe6a3",
    "source": "#ffe6a3",
    "role": "accentSoft"
  },
  {
    "variable": "--skin-accentSoft-fff7c7",
    "source": "#fff7c7",
    "role": "accentSoft"
  },
  {
    "variable": "--skin-control-939393",
    "source": "#939393",
    "role": "control"
  },
  {
    "variable": "--skin-accent-ffedc0",
    "source": "#ffedc0",
    "role": "accent"
  },
  {
    "variable": "--skin-accent-af800d",
    "source": "#af800d",
    "role": "accent"
  },
  {
    "variable": "--skin-control-292929",
    "source": "#292929",
    "role": "control"
  },
  {
    "variable": "--skin-control-585858",
    "source": "#585858",
    "role": "control"
  },
  {
    "variable": "--skin-onAccent-171717",
    "source": "#171717",
    "role": "onAccent"
  },
  {
    "variable": "--skin-header-080808",
    "source": "#080808",
    "role": "header"
  },
  {
    "variable": "--skin-headerMenu-080808",
    "source": "#080808",
    "role": "headerMenu"
  },
  {
    "variable": "--skin-headerMenu-171717",
    "source": "#171717",
    "role": "headerMenu"
  },
  {
    "variable": "--skin-headerMenu-30302e",
    "source": "#30302e",
    "role": "headerMenu"
  },
  {
    "variable": "--skin-headerMenu-191918",
    "source": "#191918",
    "role": "headerMenu"
  },
  {
    "variable": "--skin-headerMenu-070707",
    "source": "#070707",
    "role": "headerMenu"
  },
  {
    "variable": "--skin-headerMenu-020202",
    "source": "#020202",
    "role": "headerMenu"
  },
  {
    "variable": "--skin-text-ffffff0d",
    "source": "#ffffff0d",
    "role": "text"
  },
  {
    "variable": "--skin-accent-382211",
    "source": "#382211",
    "role": "accent"
  },
  {
    "variable": "--skin-accent-b5832e",
    "source": "#b5832e",
    "role": "accent"
  },
  {
    "variable": "--skin-accent-fff7df",
    "source": "#fff7df",
    "role": "accent"
  },
  {
    "variable": "--skin-accent-76501c",
    "source": "#76501c",
    "role": "accent"
  },
  {
    "variable": "--skin-accent-422a13",
    "source": "#422a13",
    "role": "accent"
  },
  {
    "variable": "--skin-accent-d9ad50",
    "source": "#d9ad50",
    "role": "accent"
  },
  {
    "variable": "--skin-accent-fff9e7",
    "source": "#fff9e7",
    "role": "accent"
  },
  {
    "variable": "--skin-accent-8b5d1d",
    "source": "#8b5d1d",
    "role": "accent"
  },
  {
    "variable": "--skin-accent-3e2711",
    "source": "#3e2711",
    "role": "accent"
  },
  {
    "variable": "--skin-accent-c9993d",
    "source": "#c9993d",
    "role": "accent"
  },
  {
    "variable": "--skin-accent-fff3d1",
    "source": "#fff3d1",
    "role": "accent"
  },
  {
    "variable": "--skin-accent-483016",
    "source": "#483016",
    "role": "accent"
  },
  {
    "variable": "--skin-accent-fff3d13d",
    "source": "#fff3d13d",
    "role": "accent"
  },
  {
    "variable": "--skin-accent-fff9e742",
    "source": "#fff9e742",
    "role": "accent"
  },
  {
    "variable": "--skin-accent-fff3d138",
    "source": "#fff3d138",
    "role": "accent"
  },
  {
    "variable": "--skin-accent-352111",
    "source": "#352111",
    "role": "accent"
  },
  {
    "variable": "--skin-accent-aa7626",
    "source": "#aa7626",
    "role": "accent"
  },
  {
    "variable": "--skin-accent-fff6d9",
    "source": "#fff6d9",
    "role": "accent"
  },
  {
    "variable": "--skin-accent-7e531a",
    "source": "#7e531a",
    "role": "accent"
  },
  {
    "variable": "--skin-accent-3c2511",
    "source": "#3c2511",
    "role": "accent"
  },
  {
    "variable": "--skin-accent-d5a448",
    "source": "#d5a448",
    "role": "accent"
  },
  {
    "variable": "--skin-accent-82561c",
    "source": "#82561c",
    "role": "accent"
  },
  {
    "variable": "--skin-accent-402810",
    "source": "#402810",
    "role": "accent"
  },
  {
    "variable": "--skin-accent-c79639",
    "source": "#c79639",
    "role": "accent"
  },
  {
    "variable": "--skin-accent-fff2cf",
    "source": "#fff2cf",
    "role": "accent"
  },
  {
    "variable": "--skin-accent-604018",
    "source": "#604018",
    "role": "accent"
  },
  {
    "variable": "--skin-accent-fff6d93d",
    "source": "#fff6d93d",
    "role": "accent"
  },
  {
    "variable": "--skin-accent-fff2cf38",
    "source": "#fff2cf38",
    "role": "accent"
  },
  {
    "variable": "--skin-text-f3f0e8",
    "source": "#f3f0e8",
    "role": "text"
  },
  {
    "variable": "--skin-accent-ffe59a",
    "source": "#ffe59a",
    "role": "accent"
  },
  {
    "variable": "--skin-accent-d2a03b",
    "source": "#d2a03b",
    "role": "accent"
  },
  {
    "variable": "--skin-accent-af7d24",
    "source": "#af7d24",
    "role": "accent"
  },
  {
    "variable": "--skin-accent-f4dfad",
    "source": "#f4dfad",
    "role": "accent"
  },
  {
    "variable": "--skin-shadow-000000b3",
    "source": "#000000b3",
    "role": "shadow"
  },
  {
    "variable": "--skin-headerButtonBorder-454545",
    "source": "#454545",
    "role": "headerButtonBorder"
  },
  {
    "variable": "--skin-headerButtonText-f2f0e9",
    "source": "#f2f0e9",
    "role": "headerButtonText"
  },
  {
    "variable": "--skin-headerButton-050505",
    "source": "#050505",
    "role": "headerButton"
  },
  {
    "variable": "--skin-headerButtonAccent-f3ce65",
    "source": "#f3ce65",
    "role": "headerButtonAccent"
  },
  {
    "variable": "--skin-headerButtonAccent-9e7c25",
    "source": "#9e7c25",
    "role": "headerButtonAccent"
  },
  {
    "variable": "--skin-headerButtonHover-111111",
    "source": "#111111",
    "role": "headerButtonHover"
  },
  {
    "variable": "--skin-headerButtonBorder-747168",
    "source": "#747168",
    "role": "headerButtonBorder"
  },
  {
    "variable": "--skin-headerButtonAccent-e0bb50",
    "source": "#e0bb50",
    "role": "headerButtonAccent"
  },
  {
    "variable": "--skin-background-050505",
    "source": "#050505",
    "role": "background"
  },
  {
    "variable": "--skin-control-313131",
    "source": "#313131",
    "role": "control"
  },
  {
    "variable": "--skin-control-4c4c4c",
    "source": "#4c4c4c",
    "role": "control"
  },
  {
    "variable": "--skin-accent-51350840",
    "source": "#51350840",
    "role": "accent"
  },
  {
    "variable": "--skin-control-444444",
    "source": "#444444",
    "role": "control"
  },
  {
    "variable": "--skin-control-242424",
    "source": "#242424",
    "role": "control"
  },
  {
    "variable": "--skin-text-ffffff26",
    "source": "#ffffff26",
    "role": "text"
  },
  {
    "variable": "--skin-shadow-00000066",
    "source": "#00000066",
    "role": "shadow"
  },
  {
    "variable": "--skin-text-ffffffb3",
    "source": "#ffffffb3",
    "role": "text"
  },
  {
    "variable": "--skin-accent-c69b4f99",
    "source": "#c69b4f99",
    "role": "accent"
  },
  {
    "variable": "--skin-text-ffffff80",
    "source": "#ffffff80",
    "role": "text"
  },
  {
    "variable": "--skin-shadow-000000",
    "source": "#000000",
    "role": "shadow"
  },
  {
    "variable": "--skin-shadow-000000bf",
    "source": "#000000bf",
    "role": "shadow"
  },
  {
    "variable": "--skin-accent-fff1c9",
    "source": "#fff1c9",
    "role": "accent"
  },
  {
    "variable": "--skin-accent-ffd36b66",
    "source": "#ffd36b66",
    "role": "accent"
  },
  {
    "variable": "--skin-accent-ffe1a3",
    "source": "#ffe1a3",
    "role": "accent"
  },
  {
    "variable": "--skin-onAccent-000000",
    "source": "#000000",
    "role": "onAccent"
  },
  {
    "variable": "--skin-accentSoft-ffdd6d",
    "source": "#ffdd6d",
    "role": "accentSoft"
  },
  {
    "variable": "--skin-text-f5f1e8",
    "source": "#f5f1e8",
    "role": "text"
  },
  {
    "variable": "--skin-surface-141414",
    "source": "#141414",
    "role": "surface"
  },
  {
    "variable": "--skin-accent-d9ad43",
    "source": "#d9ad43",
    "role": "accent"
  },
  {
    "variable": "--skin-raised-1c1c1c",
    "source": "#1c1c1c",
    "role": "raised"
  },
  {
    "variable": "--skin-muted-b8b5ad",
    "source": "#b8b5ad",
    "role": "muted"
  },
  {
    "variable": "--skin-border-3b3b3b",
    "source": "#3b3b3b",
    "role": "border"
  },
  {
    "variable": "--skin-accent-78511c",
    "source": "#78511c",
    "role": "accent"
  },
  {
    "variable": "--skin-text-f5eedf",
    "source": "#f5eedf",
    "role": "text"
  },
  {
    "variable": "--skin-shadow-171717",
    "source": "#171717",
    "role": "shadow"
  },
  {
    "variable": "--skin-border-555555",
    "source": "#555",
    "role": "border"
  },
  {
    "variable": "--skin-border-353535",
    "source": "#353535",
    "role": "border"
  },
  {
    "variable": "--skin-control-202020",
    "source": "#202020",
    "role": "control"
  },
  {
    "variable": "--skin-control-171717",
    "source": "#171717",
    "role": "control"
  },
  {
    "variable": "--skin-text-ffffff24",
    "source": "#ffffff24",
    "role": "text"
  },
  {
    "variable": "--skin-shadow-080808",
    "source": "#080808",
    "role": "shadow"
  },
  {
    "variable": "--skin-shadow-00000055",
    "source": "#0005",
    "role": "shadow"
  },
  {
    "variable": "--skin-control-282828",
    "source": "#282828",
    "role": "control"
  },
  {
    "variable": "--skin-control-1c1c1c",
    "source": "#1c1c1c",
    "role": "control"
  },
  {
    "variable": "--skin-accent-9b864f",
    "source": "#9b864f",
    "role": "accent"
  },
  {
    "variable": "--skin-accent-ffe6a34d",
    "source": "#ffe6a34d",
    "role": "accent"
  },
  {
    "variable": "--skin-accent-d9ad432b",
    "source": "#d9ad432b",
    "role": "accent"
  },
  {
    "variable": "--skin-accent-ffe6a3",
    "source": "#ffe6a3",
    "role": "accent"
  },
  {
    "variable": "--skin-accent-e6bb55",
    "source": "#e6bb55",
    "role": "accent"
  },
  {
    "variable": "--skin-accent-d4a038",
    "source": "#d4a038",
    "role": "accent"
  },
  {
    "variable": "--skin-accent-f6d786",
    "source": "#f6d786",
    "role": "accent"
  },
  {
    "variable": "--skin-accent-886123",
    "source": "#886123",
    "role": "accent"
  },
  {
    "variable": "--skin-accent-fff7dc",
    "source": "#fff7dc",
    "role": "accent"
  },
  {
    "variable": "--skin-accent-93641e",
    "source": "#93641e",
    "role": "accent"
  },
  {
    "variable": "--skin-shadow-00000077",
    "source": "#0007",
    "role": "shadow"
  },
  {
    "variable": "--skin-accent-d9ad4315",
    "source": "#d9ad4315",
    "role": "accent"
  },
  {
    "variable": "--skin-accent-fff0c5",
    "source": "#fff0c5",
    "role": "accent"
  },
  {
    "variable": "--skin-accent-f3cc72",
    "source": "#f3cc72",
    "role": "accent"
  },
  {
    "variable": "--skin-accentSoft-fff0c0",
    "source": "#fff0c0",
    "role": "accentSoft"
  },
  {
    "variable": "--skin-accent-fffbed",
    "source": "#fffbed",
    "role": "accent"
  },
  {
    "variable": "--skin-accent-d9ad4350",
    "source": "#d9ad4350",
    "role": "accent"
  },
  {
    "variable": "--skin-shadow-000000aa",
    "source": "#000a",
    "role": "shadow"
  },
  {
    "variable": "--skin-shadow-00000099",
    "source": "#0009",
    "role": "shadow"
  },
  {
    "variable": "--skin-disabled-858585",
    "source": "#858585",
    "role": "disabled"
  },
  {
    "variable": "--skin-border-383838",
    "source": "#383838",
    "role": "border"
  },
  {
    "variable": "--skin-text-ffffff08",
    "source": "#ffffff08",
    "role": "text"
  },
  {
    "variable": "--skin-muted-a8a69e",
    "source": "#a8a69e",
    "role": "muted"
  },
  {
    "variable": "--skin-disabled-555555",
    "source": "#555",
    "role": "disabled"
  },
  {
    "variable": "--skin-accentSoft-fff1c6",
    "source": "#fff1c6",
    "role": "accentSoft"
  },
  {
    "variable": "--skin-muted-929292",
    "source": "#929292",
    "role": "muted"
  },
  {
    "variable": "--skin-surface-171717",
    "source": "#171717",
    "role": "surface"
  },
  {
    "variable": "--skin-border-9d8140",
    "source": "#9d8140",
    "role": "border"
  },
  {
    "variable": "--skin-shadow-000000ee",
    "source": "#000e",
    "role": "shadow"
  },
  {
    "variable": "--skin-accent-ffe6a344",
    "source": "#ffe6a344",
    "role": "accent"
  },
  {
    "variable": "--skin-shadow-000000bb",
    "source": "#000b",
    "role": "shadow"
  },
  {
    "variable": "--skin-muted-aaa79e",
    "source": "#aaa79e",
    "role": "muted"
  },
  {
    "variable": "--skin-muted-cbc7bd",
    "source": "#cbc7bd",
    "role": "muted"
  },
  {
    "variable": "--skin-muted-a5a39b",
    "source": "#a5a39b",
    "role": "muted"
  },
  {
    "variable": "--skin-border-333333",
    "source": "#333",
    "role": "border"
  },
  {
    "variable": "--skin-border-444444",
    "source": "#444",
    "role": "border"
  },
  {
    "variable": "--skin-surface-181818",
    "source": "#181818",
    "role": "surface"
  }
];

export const DEFAULT_PALETTE: Palette = {
  background: '#050505', surface: '#141414', raised: '#1c1c1c',
  control: '#292929', input: '#090909', header: '#080808', border: '#3b3b3b',
  text: '#ffffff', muted: '#b8b5ad', disabled: '#757575',
  accent: '#ffcd55', accentSoft: '#ffe6a3', onAccent: '#171717', shadow: '#000000',
  headerMenu: '#080808', headerButton: '#050505', headerButtonText: '#f2f0e9',
  headerButtonBorder: '#454545', headerButtonAccent: '#f3ce65', headerButtonHover: '#111111',
  odds: '#81ffff', error: '#f3a298',
  menuActiveText: '#ffcd55', menuActiveLine: '#ffcd55',
  sportSelectedBackground: '#292929', sportSelectedText: '#ffffff', sportSelectedBorder: '#ffe6a3',
  oddsSelectedBackground: '#ffcd55', oddsSelectedText: '#171717', oddsSelectedBorder: '#ffcd55',
  actionBackground: '#ffcd55', actionText: '#171717', actionBorder: '#ffcd55',
  chipBackground: '#ffe6a3', chipText: '#171717', chipBorder: '#ffe6a3',
  leagueText: '#ffe6a3', chipGradientTop: '#fff7c7', chipGradientBottom: '#939393',
};
export const DEFAULT_MOOD: Mood = {hue: 0, saturation: 0, lightness: 0};
export const DEFAULT_LOCKS = Object.fromEntries(COLOR_FIELDS.map(({key}) => [key, key === 'odds' || key === 'error'])) as ColorLocks;
export const DEFAULT_BUTTON_FILL: ButtonFill = {mode: 'original', angle: 0, strength: 100, stops: [{color: '#292929', position: 0}, {color: '#313131', position: 50}, {color: '#4c4c4c', position: 100}]};
export const DEFAULT_GOLD_ICON_TUNING: GoldIconTuning = {sport: {brightness: 100, contrast: 100, saturation: 100}, selectedSport: {brightness: 100, contrast: 100, saturation: 100}, service: {brightness: 100, contrast: 100, saturation: 100}};
export const DEFAULT_SNAPSHOT: Snapshot = {palette: DEFAULT_PALETTE, mood: DEFAULT_MOOD, locks: DEFAULT_LOCKS, menuStyle: 'metal', goldIconOutline: false, buttonFill: DEFAULT_BUTTON_FILL, oddsSelectedStyle: 'metal', creamDetails: 'original', goldIconTuning: DEFAULT_GOLD_ICON_TUNING, chipStyle: 'original'};

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const modulo = (value: number, divisor: number) => ((value % divisor) + divisor) % divisor;

function rgba(hex: string): [number, number, number, string] {
  const raw = hex.slice(1);
  const full = raw.length <= 4 ? raw.split('').map(c => c + c).join('') : raw;
  return [parseInt(full.slice(0, 2), 16) / 255, parseInt(full.slice(2, 4), 16) / 255,
    parseInt(full.slice(4, 6), 16) / 255, full.slice(6)];
}

function hsl(hex: string): [number, number, number] {
  const [r, g, b] = rgba(hex);
  const max = Math.max(r, g, b), min = Math.min(r, g, b), delta = max - min;
  const lightness = (max + min) / 2;
  if (delta === 0) return [0, 0, lightness];
  const saturation = delta / (1 - Math.abs(2 * lightness - 1));
  const hue = max === r ? modulo((g - b) / delta, 6) : max === g ? (b - r) / delta + 2 : (r - g) / delta + 4;
  return [hue * 60, saturation, lightness];
}

function fromHsl(hue: number, saturation: number, lightness: number, alpha = ''): string {
  const h = modulo(hue, 360) / 60, s = clamp(saturation), l = clamp(lightness);
  const c = (1 - Math.abs(2 * l - 1)) * s, x = c * (1 - Math.abs(h % 2 - 1)), m = l - c / 2;
  const rgb = h < 1 ? [c, x, 0] : h < 2 ? [x, c, 0] : h < 3 ? [0, c, x]
    : h < 4 ? [0, x, c] : h < 5 ? [x, 0, c] : [c, 0, x];
  return '#' + rgb.map(v => Math.round((v + m) * 255).toString(16).padStart(2, '0')).join('') + alpha;
}

// Preserve each original stop's lightness and alpha. Raster pixels and flag SVG
// fills are not CSS palette tokens and never enter this table.
export function recolor(source: string, role: ColorKey, target: string): string {
  if (target.toLowerCase() === DEFAULT_PALETTE[role]) return source.toLowerCase();
  const [sh, ss, sl] = hsl(source), [bh, bs, bl] = hsl(DEFAULT_PALETTE[role]), [th, ts, tl] = hsl(target);
  const hue = bs < .01 || ss < .01 ? th : th + sh - bh;
  return fromHsl(hue, ts + ss - bs, tl + sl - bl, rgba(source)[3]);
}

function adjust(hex: string, mood: Mood): string {
  if (mood.hue === 0 && mood.saturation === 0 && mood.lightness === 0) return hex;
  const [h, s, l] = hsl(hex);
  return fromHsl(h + mood.hue, s * (1 + mood.saturation / 100), l + mood.lightness / 100);
}

// Restrained shading around an authored color, without inherited silver stops.
function warmFill(color: string): string {
  return `linear-gradient(180deg, ${adjust(color, {hue: 0, saturation: 0, lightness: 3})} 0%, ${color} 52%, ${adjust(color, {hue: 0, saturation: 0, lightness: -3})} 100%)`;
}

export function effectivePalette(snapshot: Snapshot): Palette {
  const base = {...DEFAULT_PALETTE, ...snapshot.palette};
  const locks = {...DEFAULT_LOCKS, ...snapshot.locks};
  if (base.accentSoft === DEFAULT_PALETTE.accentSoft && base.accent !== DEFAULT_PALETTE.accent) {
    base.accentSoft = recolor(DEFAULT_PALETTE.accentSoft, 'accent', base.accent);
  }
  return Object.fromEntries(COLOR_FIELDS.map(({key}) => [key, locks[key] ? base[key] : adjust(base[key], snapshot.mood)])) as Palette;
}

export function paletteVariables(snapshot: Snapshot): Record<string, string> {
  const effective = effectivePalette(snapshot);
  const values: Record<string, string> = {};
  for (const {key} of COLOR_FIELDS) values[`--skin-${key}`] = effective[key];
  for (const link of COLOR_LINKS) values[link.variable] = recolor(link.source, link.role, effective[link.role]);
  const solid = snapshot.menuStyle === 'solid';
  const stops = ['#fff9e7', '#ffe59a', '#d2a03b', '#af7d24', '#f4dfad'];
  const positions = [0, 34, 58, 68, 100];
  values['--skin-menu-active-background'] = solid ? 'none' : 'linear-gradient(180deg, ' +
    stops.map((source, index) => `${recolor(source, 'menuActiveText', effective.menuActiveText)} ${positions[index]}%`).join(', ') + ')';
  values['--skin-menu-active-color'] = solid ? effective.menuActiveText : 'transparent';
  values['--skin-menu-active-shadow'] = solid ? 'none' : `drop-shadow(0 1px 0 ${values['--skin-shadow-000000b3']})`;
  values['--skin-menu-active-line-display'] = solid ? 'block' : 'none';
  values['--skin-gold-icon-filter'] = snapshot.goldIconOutline ? 'drop-shadow(0 1px 0 rgba(74, 52, 21, .75))' : 'none';
  for (const group of ['sport', 'selectedSport', 'service'] as const) {
    const tuning = snapshot.goldIconTuning[group];
    const correction = tuning.brightness === 100 && tuning.contrast === 100 && tuning.saturation === 100 ? '' :
      `brightness(${tuning.brightness}%) contrast(${tuning.contrast}%) saturate(${tuning.saturation}%)`;
    values[`--skin-gold-${group}-filter`] = [correction, snapshot.goldIconOutline ? values['--skin-gold-icon-filter'] : ''].filter(Boolean).join(' ') || 'none';
  }
  const warm = snapshot.creamDetails === 'warm';
  // Narrow, opt-in overrides. Legacy snapshots use the authored CSS fallbacks.
  values['--skin-action-fill'] = warm ? warmFill(effective.actionBackground) : 'initial';
  values['--skin-action-text'] = warm ? effective.actionText : 'initial';
  values['--skin-action-border'] = warm ? effective.actionBorder : 'initial';
  const customChip = snapshot.chipStyle !== 'original';
  const styledChip = warm || customChip;
  values['--skin-chip-fill'] = snapshot.chipStyle === 'solid' ? effective.chipBackground : snapshot.chipStyle === 'gradient' ?
    `linear-gradient(180deg, ${effective.chipGradientTop} 0%, ${effective.chipGradientBottom} 100%)` : warm ? warmFill(effective.chipBackground) : 'initial';
  values['--skin-chip-text'] = styledChip ? effective.chipText : 'initial';
  values['--skin-chip-border'] = styledChip ? effective.chipBorder : 'initial';
  values['--skin-action-hover-filter'] = warm ? 'brightness(1.035)' : 'initial';
  values['--skin-chip-inset'] = styledChip ? `inset 0 0 0 1px ${effective.chipBorder}` : 'initial';
  values['--skin-action-hover-shadow'] = warm ? `inset 0 0 0 1px ${effective.actionBorder}` : 'initial';
  values['--skin-action-disabled-fill'] = warm ? effective.control : 'initial';
  values['--skin-action-disabled-text'] = warm ? effective.disabled : 'initial';
  values['--skin-action-disabled-border'] = warm ? effective.border : 'initial';
  values['--skin-checked-fill'] = warm ? effective.actionBackground : 'initial';
  values['--skin-checked-thumb'] = warm ? effective.actionText : 'initial';
  const fill = snapshot.buttonFill;
  // The control role's whole-mood lock also protects the authored normal stops.
  values['--skin-normal-fill'] = fill.mode === 'original' ? 'initial' : fill.mode === 'solid' ? effective.control :
    `linear-gradient(${fill.angle}deg, ` + fill.stops.map(stop => {
      const color = snapshot.locks.control ? stop.color : adjust(stop.color, snapshot.mood);
      const from = rgba(effective.control), to = rgba(color), amount = fill.strength / 100;
      const mixed = '#' + from.slice(0, 3).map((channel, index) => Math.round(((channel as number) * (1 - amount) + (to[index] as number) * amount) * 255).toString(16).padStart(2, '0')).join('');
      return `${mixed} ${stop.position}%`;
    }).join(', ') + ')';
  values['--skin-odds-selected-fill'] = snapshot.oddsSelectedStyle === 'solid' ? effective.oddsSelectedBackground : snapshot.oddsSelectedStyle === 'warm' ? warmFill(effective.oddsSelectedBackground) :
    'linear-gradient(180deg, ' + ['#ffedc0', '#ffcd55', '#af800d'].map((source, index) =>
      `${recolor(source, 'oddsSelectedBackground', effective.oddsSelectedBackground)} ${index * 50}%`).join(', ') + ')';
  // Selected backgrounds can be unrelated to the overall accent; derive a visible
  // focus outline from each selected group's authored border/text independently.
  const focus = contrast(effective.accent, effective.control) >= 3 ? effective.accent : effective.text;
  values['--skin-focus-color'] = focus;
  values['--skin-odds-selected-focus'] = effective.oddsSelectedBackground === effective.accent && effective.oddsSelectedBorder === effective.accent && effective.oddsSelectedText === effective.onAccent ? focus :
    contrast(effective.oddsSelectedBorder, effective.oddsSelectedBackground) >= 3 ? effective.oddsSelectedBorder : effective.oddsSelectedText;
  values['--skin-header-focus-color'] = contrast(focus, effective.headerButton) >= 3 ? focus : effective.headerButtonText;
  return values;
}

export function paletteCss(snapshot: Snapshot): string {
  return '/* MERCURY skin-lab v6: effective CSS palette. Whole-mood exclusions: ' +
    COLOR_FIELDS.filter(({key}) => snapshot.locks?.[key] ?? DEFAULT_LOCKS[key]).map(({key}) => key).join(', ') + '. Images keep their pixels. */\n:root {\n' +
    Object.entries(paletteVariables(snapshot)).map(([key, value]) => `  ${key}: ${value};`).join('\n') + '\n}\n';
}

export function paletteJson(snapshot: Snapshot): string {
  return JSON.stringify({kind: 'mercury-skin-palette', version: 6, ...validateSnapshot(snapshot)}, null, 2);
}

const isObject = (value: unknown): value is Record<string, unknown> => !!value && typeof value === 'object' && !Array.isArray(value);

export function validateSnapshot(value: unknown): Snapshot {
  if (!isObject(value) || !isObject(value.palette) || !isObject(value.mood)) throw new Error('팔레트와 전체 색감 값이 필요합니다.');
  const keys = COLOR_FIELDS.map(field => field.key);
  const legacyKeys = keys.slice(0, 14);
  const suppliedPalette = value.palette;
  if (legacyKeys.some(key => !(key in suppliedPalette)) || Object.keys(suppliedPalette).some(key => !keys.includes(key as ColorKey))) {
    throw new Error('기존 14개 역할 색상이 필요하며 알 수 없는 항목은 사용할 수 없습니다.');
  }
  const palette = {} as Palette;
  for (const key of keys) {
    const color = key in suppliedPalette ? suppliedPalette[key] : DEFAULT_PALETTE[key];
    if (typeof color !== 'string' || !/^#[0-9a-f]{6}$/i.test(color)) throw new Error(`${COLOR_FIELDS.find(field => field.key === key)!.label}: #RRGGBB 형식으로 입력해 주세요.`);
    palette[key] = color.toLowerCase();
  }
  // Newly separated header roles inherit the previous role's accepted color.
  // Untouched legacy values produce the original new-role defaults exactly.
  const inherited: [ColorKey, ColorKey][] = [
    ['headerMenu', 'header'], ['headerButton', 'header'], ['headerButtonHover', 'header'],
    ['headerButtonText', 'text'], ['headerButtonBorder', 'border'], ['headerButtonAccent', 'accentSoft'],
    ['menuActiveText', 'accent'], ['menuActiveLine', 'accent'],
    ['sportSelectedBackground', 'control'], ['sportSelectedText', 'text'], ['sportSelectedBorder', 'accentSoft'],
    ['oddsSelectedBackground', 'accent'], ['oddsSelectedText', 'onAccent'], ['oddsSelectedBorder', 'accent'],
    ['actionBackground', 'accent'], ['actionText', 'onAccent'], ['actionBorder', 'accent'],
    ['chipBackground', 'accentSoft'], ['chipText', 'onAccent'], ['chipBorder', 'accentSoft'],
    ['leagueText', 'accentSoft'], ['chipGradientTop', 'accentSoft'], ['chipGradientBottom', 'control'],
  ];
  for (const [key, role] of inherited) {
    if (!(key in suppliedPalette)) palette[key] = recolor(DEFAULT_PALETTE[key], role, palette[role]);
  }
  if (Object.keys(value.mood).some(key => !['hue', 'saturation', 'lightness'].includes(key))) throw new Error('알 수 없는 전체 색감 항목이 있습니다.');
  const limits = {hue: 180, saturation: 100, lightness: 40};
  const mood = {} as Mood;
  for (const key of Object.keys(limits) as (keyof Mood)[]) {
    const number = value.mood[key];
    if (typeof number !== 'number' || !Number.isFinite(number) || Math.abs(number) > limits[key]) {
      throw new Error(`${key}: ${-limits[key]}부터 ${limits[key]} 사이의 숫자가 필요합니다.`);
    }
    mood[key] = number;
  }
  const locks = {...DEFAULT_LOCKS};
  if (value.locks !== undefined) {
    if (!isObject(value.locks) || Object.keys(value.locks).some(key => !keys.includes(key as ColorKey))) throw new Error('전체 색감 잠금 항목을 확인해 주세요.');
    for (const key of keys) {
      if (!(key in value.locks)) continue;
      if (typeof value.locks[key] !== 'boolean') throw new Error(`${key}: 잠금값은 true 또는 false여야 합니다.`);
      locks[key] = value.locks[key];
    }
  }
  for (const key of ['menuActiveText', 'menuActiveLine'] as const) {
    if (!isObject(value.locks) || !(key in value.locks)) locks[key] = locks.accent;
  }
  for (const [key, role] of inherited.filter(([key]) => keys.indexOf(key) >= 24)) {
    if (!isObject(value.locks) || !(key in value.locks)) locks[key] = locks[role];
  }
  // accentSoft used to derive from accent when left at its default. Reproduce
  // that inherited selected border before splitting it into an independent role.
  if (!('sportSelectedBorder' in suppliedPalette) && palette.accentSoft === DEFAULT_PALETTE.accentSoft && palette.accent !== DEFAULT_PALETTE.accent) {
    palette.sportSelectedBorder = recolor(DEFAULT_PALETTE.accentSoft, 'accent', palette.accent);
  }
  if (palette.accentSoft === DEFAULT_PALETTE.accentSoft && palette.accent !== DEFAULT_PALETTE.accent) {
    const soft = recolor(DEFAULT_PALETTE.accentSoft, 'accent', palette.accent);
    if (!('leagueText' in suppliedPalette)) palette.leagueText = soft;
    if (!('chipGradientTop' in suppliedPalette)) palette.chipGradientTop = recolor(DEFAULT_PALETTE.chipGradientTop, 'accentSoft', soft);
  }
  const menuStyle = value.menuStyle ?? 'metal';
  if (menuStyle !== 'metal' && menuStyle !== 'solid') throw new Error('활성 메뉴 표현은 metal 또는 solid여야 합니다.');
  const goldIconOutline = value.goldIconOutline ?? false;
  if (typeof goldIconOutline !== 'boolean') throw new Error('금색 아이콘 명암값은 true 또는 false여야 합니다.');
  const oddsSelectedStyle = value.oddsSelectedStyle ?? 'metal';
  if (!['metal', 'solid', 'warm'].includes(oddsSelectedStyle as string)) throw new Error('선택 배당 표현은 metal, solid 또는 warm이어야 합니다.');
  const creamDetails = value.creamDetails ?? 'original';
  if (creamDetails !== 'original' && creamDetails !== 'warm') throw new Error('크림 세부 표현은 original 또는 warm이어야 합니다.');
  const chipStyle = value.chipStyle === undefined ? 'original' : value.chipStyle;
  if (chipStyle !== 'original' && chipStyle !== 'solid' && chipStyle !== 'gradient') throw new Error('칩 배경 표현은 original, solid 또는 gradient여야 합니다.');
  // Missing chip settings retain the previous render. Seed optional gradient
  // colors from that palette, without changing the legacy mode or saved JSON.
  if (creamDetails === 'warm') {
    for (const [key, lightness] of [['chipGradientTop', 3], ['chipGradientBottom', -3]] as const) {
      if (!(key in suppliedPalette)) palette[key] = adjust(palette.chipBackground, {hue: 0, saturation: 0, lightness});
      if (!isObject(value.locks) || !(key in value.locks)) locks[key] = locks.chipBackground;
    }
  }
  const suppliedTuning = value.goldIconTuning ?? DEFAULT_GOLD_ICON_TUNING;
  const groups = ['sport', 'selectedSport', 'service'] as const;
  if (!isObject(suppliedTuning) || Object.keys(suppliedTuning).length !== groups.length || groups.some(group => !(group in suppliedTuning))) throw new Error('금색 PNG 보정 그룹을 확인해 주세요.');
  const goldIconTuning = {} as GoldIconTuning;
  for (const group of groups) {
    const tuning = suppliedTuning[group];
    if (!isObject(tuning) || Object.keys(tuning).length !== 3 || Object.keys(tuning).some(key => !['brightness', 'contrast', 'saturation'].includes(key))) throw new Error('금색 PNG 보정 항목을 확인해 주세요.');
    goldIconTuning[group] = {brightness: 100, contrast: 100, saturation: 100};
    for (const [key, min, max] of [['brightness', 60, 120], ['contrast', 80, 160], ['saturation', 60, 140]] as const) {
      const number = tuning[key];
      if (typeof number !== 'number' || !Number.isFinite(number) || number < min || number > max) throw new Error(`${group} ${key}: ${min}~${max}% 범위를 확인해 주세요.`);
      goldIconTuning[group][key] = number;
    }
  }
  const suppliedFill = value.buttonFill ?? {...DEFAULT_BUTTON_FILL, stops: DEFAULT_BUTTON_FILL.stops.map(stop => ({...stop, color: recolor(stop.color, 'control', palette.control)}))};
  if (!isObject(suppliedFill) || Object.keys(suppliedFill).some(key => !['mode', 'angle', 'strength', 'stops'].includes(key)) ||
      !['original', 'solid', 'gradient'].includes(suppliedFill.mode as string) || typeof suppliedFill.angle !== 'number' || !Number.isFinite(suppliedFill.angle) || suppliedFill.angle < 0 || suppliedFill.angle > 360 ||
      typeof suppliedFill.strength !== 'number' || !Number.isFinite(suppliedFill.strength) || suppliedFill.strength < 0 || suppliedFill.strength > 100 || !Array.isArray(suppliedFill.stops) || suppliedFill.stops.length !== 3) throw new Error('일반 버튼의 표현·각도·강도와 3개 색상 지점을 확인해 주세요.');
  const buttonFill: ButtonFill = {mode: suppliedFill.mode as ButtonFill['mode'], angle: suppliedFill.angle, strength: suppliedFill.strength, stops: suppliedFill.stops.map((stop: unknown) => {
    if (!isObject(stop) || Object.keys(stop).some(key => !['color', 'position'].includes(key)) || typeof stop.color !== 'string' || !/^#[0-9a-f]{6}$/i.test(stop.color) || typeof stop.position !== 'number' || !Number.isFinite(stop.position) || stop.position < 0 || stop.position > 100) throw new Error('그라데이션 지점은 #RRGGBB 색상과 0~100% 위치가 필요합니다.');
    return {color: stop.color.toLowerCase(), position: stop.position};
  })};
  if (buttonFill.stops.some((stop, index, all) => index > 0 && stop.position < all[index - 1].position)) throw new Error('그라데이션 위치는 작은 값부터 입력해 주세요.');
  return {palette, mood, locks, menuStyle, goldIconOutline, buttonFill, oddsSelectedStyle: oddsSelectedStyle as OddsSelectedStyle, creamDetails, goldIconTuning, chipStyle};
}

export function parsePaletteJson(text: string): Snapshot {
  let value: unknown;
  try { value = JSON.parse(text); } catch { throw new Error('JSON 형식이 올바르지 않습니다.'); }
  if (!isObject(value) || value.kind !== 'mercury-skin-palette' || ![1, 2, 3, 4, 5, 6].includes(value.version as number)) throw new Error('MERCURY 팔레트 v1~v6 파일을 선택해 주세요.');
  const fields = ['kind', 'version', 'palette', 'mood', 'locks', ...((value.version as number) >= 3 ? ['menuStyle', 'goldIconOutline'] : []), ...((value.version as number) >= 4 ? ['buttonFill', 'oddsSelectedStyle'] : []), ...((value.version as number) >= 5 ? ['creamDetails', 'goldIconTuning'] : []), ...(value.version === 6 ? ['chipStyle'] : [])];
  if (Object.keys(value).some(key => !fields.includes(key))) throw new Error('알 수 없는 파일 항목이 있습니다.');
  const fileKeys = COLOR_FIELDS.slice(0, value.version === 2 ? 22 : value.version === 3 ? 24 : value.version === 5 ? 36 : value.version === 6 ? COLOR_FIELDS.length : 30).map(field => field.key);
  if ((value.version as number) < 5 && value.oddsSelectedStyle === 'warm') throw new Error('절제된 선택 그라데이션은 v5 이상 형식이 필요합니다.');
  if (isObject(value.palette) && Object.keys(value.palette).some(key => !fileKeys.includes(key as ColorKey))) throw new Error('이 버전에서 지원하지 않는 색상 항목이 있습니다.');
  if (value.version !== 1 && (!isObject(value.palette) || Object.keys(value.palette).length !== fileKeys.length || fileKeys.some(key => !(key in (value.palette as Record<string, unknown>))) ||
    !isObject(value.locks) || Object.keys(value.locks).length !== fileKeys.length || fileKeys.some(key => !(key in (value.locks as Record<string, unknown>))))) throw new Error(`v${String(value.version)} 파일에는 모든 색상과 잠금 항목이 필요합니다.`);
  if ((value.version as number) >= 3 && (!('menuStyle' in value) || !('goldIconOutline' in value))) throw new Error('v3~v6 파일에는 메뉴 표현과 아이콘 명암 설정이 필요합니다.');
  if ((value.version as number) >= 4 && (!('buttonFill' in value) || !('oddsSelectedStyle' in value))) throw new Error('v4~v6 파일에는 일반 버튼과 선택 배당 표현이 필요합니다.');
  if ((value.version as number) >= 5 && (!('creamDetails' in value) || !('goldIconTuning' in value))) throw new Error('v5~v6 파일에는 크림 세부 표현과 금색 PNG 보정 설정이 필요합니다.');
  if (value.version === 6 && !('chipStyle' in value)) throw new Error('v6 파일에는 칩 배경 표현이 필요합니다.');
  return validateSnapshot(value);
}

function luminance(hex: string): number {
  const [r, g, b] = rgba(hex);
  const linear = (value: number) => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4;
  return .2126 * linear(r) + .7152 * linear(g) + .0722 * linear(b);
}

export function contrast(a: string, b: string): number {
  const values = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (values[0] + .05) / (values[1] + .05);
}
