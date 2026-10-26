'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { casinoProviders, matches, menuGroups, slotProviders, type Provider } from './raised-data';
import figmaAssets from './figma-assets.json';
const imageSizes: Record<string, { width: number; height: number }> = figmaAssets.sizes;

function GoldImage({ src, alt = '', className }: { src: string; alt?: string; className?: string }) {
  const size = (figmaAssets.sizes as Record<string, { width: number; height: number }>)[src];
  return <Image unoptimized loading="eager" src={src} {...size} alt={alt} className={className} />;
}

type Notice = { title: string; description: string; provider?: Provider };
type OpenNotice = (notice: Notice) => void;

function SportsCard({ match, openNotice }: { match: typeof matches[number]; openNotice: OpenNotice }) {
  const [selected, setSelected] = useState<Record<string, string>>({});
  const odds = (market: string, label: string, price: string, reverse = false) => (
    <button className={`raised-odds${reverse ? ' is-reversed' : ''}`} type="button" aria-label={`${match.home} ${market} ${label} ${price}`} aria-pressed={selected[market] === label} onClick={() => setSelected(current => ({ ...current, [market]: current[market] === label ? '' : label }))}>
      <span>{label}</span><b>{price}</b>
    </button>
  );
  return <article className="raised-match" aria-label={`${match.home} 대 ${match.away}`}>
    <div className="raised-match-meta"><time>{match.time}</time><h3>{match.league}</h3><button className="raised-market-count" type="button" aria-label={`${match.home} 마켓 ${match.count}`} onClick={() => openNotice({ title: `${match.home} vs ${match.away}`, description: `${match.league} · ${match.time}. 화면에 표시된 배당은 샘플이며 실제 베팅은 제공하지 않습니다.` })}>{match.count}</button></div>
    <div className="raised-matchup"><div><Image unoptimized loading="eager" src={match.homeLogo} {...imageSizes[match.homeLogo]} alt="" /><b>{match.home}</b></div><span>VS</span><div><b>{match.away}</b><Image unoptimized loading="eager" src={match.awayLogo} {...imageSizes[match.awayLogo]} alt="" /></div></div>
    <div className="raised-markets">
      <div className="raised-market-row">{odds('승패', '홈', match.result[0])}{match.result.length === 3 && odds('승패', '무', match.result[1])}{odds('승패', '원정', match.result[match.result.length - 1], true)}</div>
      <div className="raised-market-row">{odds('핸디캡', '홈', match.handicap[0])}<div className="raised-market-label"><span>{match.handicapName}</span><b>{match.handicap[1]}</b></div>{odds('핸디캡', '원정', match.handicap[2], true)}</div>
      <div className="raised-market-row">{odds('언더 / 오버', '언더', match.total[0])}<div className="raised-market-label"><span>언더 / 오버</span><b>{match.total[1]}</b></div>{odds('언더 / 오버', '오버', match.total[2], true)}</div>
    </div>
  </article>;
}

function ProviderCard({ provider, onClick }: { provider: Provider; onClick?: () => void }) {
  const contents = <><div className="raised-provider-art"><Image unoptimized loading="eager" src={provider.art} {...imageSizes[provider.art as keyof typeof imageSizes]} alt="" /><Image unoptimized loading="eager" className="raised-provider-logo" src={provider.logo} {...imageSizes[provider.logo as keyof typeof imageSizes]} alt="" /></div><div className="raised-provider-info"><h3 className="raised-gold-text">{provider.title}</h3><p>{provider.subtitle}</p></div></>;
  return onClick ? <button className="raised-provider" type="button" aria-label={`${provider.title} 게임 안내`} onClick={onClick}>{contents}</button> : <div className="raised-provider">{contents}</div>;
}

function ProviderSection({ id, title, providers, openNotice, arrows }: { id: string; title: string; providers: Provider[]; openNotice: OpenNotice; arrows: string[] }) {
  const viewport = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const scroll = (direction: number) => viewport.current?.scrollBy({ left: direction * 768, behavior: 'auto' });
  return <section className="raised-section" id={id} aria-labelledby={`${id}-title`}>
    <div className="raised-section-heading"><h2 id={`${id}-title`}>{title}</h2><button className="raised-view-all" type="button" aria-expanded={expanded} onClick={() => setExpanded(value => !value)}>{expanded ? '접기' : '전체보기'}</button><button className="raised-arrow" type="button" aria-label={`${title} 이전`} onClick={() => scroll(-1)} disabled={expanded}><Image unoptimized loading="eager" src={arrows[0]} alt="" width="24" height="24" /></button><button className="raised-arrow" type="button" aria-label={`${title} 다음`} onClick={() => scroll(1)} disabled={expanded}><Image unoptimized loading="eager" src={arrows[1]} alt="" width="24" height="24" /></button></div>
    <div ref={viewport} className={`raised-carousel${expanded ? ' is-expanded' : ''}`} aria-label={`${title} 게임 목록`}><div className="raised-provider-track">{providers.map(provider => <ProviderCard key={provider.title} provider={provider} onClick={() => openNotice({ title: provider.title, description: '게임 서비스가 연결되지 않은 미리보기입니다. 실제 게임은 실행되지 않습니다.', provider })} />)}</div></div>
  </section>;
}


export function RaisedHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('입금신청');
  const [notice, setNotice] = useState<Notice | null>(null);
  const assets = figmaAssets.images;
  const serviceNotice = (title: string) => setNotice({ title, description: '현재 디자인 미리보기에서는 이 서비스를 이용할 수 없습니다.' });
  const navigateMenu = (label: string) => {
    setActiveMenu(label);
    const target = label === '라이브카지노' ? 'casino' : label === '슬롯' ? 'slots' : ['국내형', '해외형', 'E스포츠', '인플레이'].includes(label) ? 'sports' : null;
    if (target) {
      document.getElementById(target)?.scrollIntoView({ block: 'start' });
      setMenuOpen(false);
    } else serviceNotice(label);
  };
  const menuLabels = menuGroups.flatMap(group => group.items.map(([label]) => label));
  const iconFor = (label: string) => {
    const index = menuLabels.indexOf(label);
    const key = index === 0 ? 'imgP19AssetsGoldIconDeposit' : index === 1 ? 'imgIcon' : `imgIcon${index - 1}`;
    return assets[key as keyof typeof assets];
  };
  const benefits = [
    { title: '페이백 포인트', display: 'PAYBACK', action: '내 지갑 바로가기', photo: assets.imgPhotoCurrentImage, mask: assets.imgPhotoForegroundRestore, className: 'payback', node: '1303:11620' },
    { title: '회원 이벤트', display: 'EVENTS', action: '이벤트 보기', photo: assets.imgPhotoCurrentImage1, mask: assets.imgPhotoForegroundRestore1, className: 'events', node: '1303:11621' },
    { title: '데일리 리워드', display: 'REWARD', action: '리워드 보기', photo: assets.imgPhotoCurrentImage2, mask: assets.imgPhotoForegroundRestore2, className: 'reward', node: '1303:11622' },
  ];
  const partnerNames = [
    'Evolution', 'AsiaGaming', 'Castar', 'Betgames', 'BigGaming', 'DreamGaming', 'WmCasino', 'VivoGaming',
    'PragmaticPlay', 'PlayNGo', 'Yggdrasil', 'RedTiger', 'RelaxGaming', 'Wazdan', 'Hacksaw',
    'Netent', 'Microgaming', 'Habanero', 'PgSoft', 'Bng', 'BlueprintGaming', 'Cq9', 'ElkStudios',
  ];
  const partnerBreaks = [0, 8, 15, 23];
  return <div className={`raised-page${menuOpen ? ' is-menu-open' : ''}`} data-theme="black" data-figma-node="1303:11608">
    <header className="raised-header">
      <div className="raised-header-art" aria-hidden="true"><GoldImage src={assets.imgGeneratedGoldFlow03ImageOverlay} /></div>
      <div className="raised-header-fade" aria-hidden="true" />
      <div className="raised-brand"><Link href="/" aria-label="ALDEBARAN 홈"><GoldImage src={assets.imgLogo} alt="ALDEBARAN" /></Link></div>
      <button className="raised-menu-toggle" type="button" aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'} aria-expanded={menuOpen} aria-controls="raised-sidebar" onClick={() => setMenuOpen(value => !value)}><span /><span /><span /></button>
      <div className="raised-notice">
        <GoldImage src={assets.imgP19AssetsHeaderIconMegaphone} /><span className="raised-notice-label">공지</span><span className="raised-notice-separator" />
        <div className="raised-notice-viewport"><p className="raised-notice-message">서비스 점검 및 이벤트 안내는 공지사항에서 확인해 주세요.</p></div>
      </div>
      <nav className="raised-quick-links" aria-label="회원 바로가기">
        {[['출석체크', 'CalendarCheck'], ['배팅내역', 'ReceiptText'], ['고객지원 · 텔레그램', 'Telegram']].map(([label, icon]) => <button type="button" key={label} onClick={() => serviceNotice(label)}><GoldImage src={assets[`imgP19AssetsHeaderIcon${icon}` as keyof typeof assets]} />{label}</button>)}
      </nav>
      <div className="raised-member-access">
        <button className="raised-account" type="button" onClick={() => serviceNotice('로그인')}>로그인</button>
        <button className="raised-account is-primary" type="button" onClick={() => serviceNotice('회원가입')}>회원가입</button>
        <button className="raised-account is-anonymous" type="button" onClick={() => serviceNotice('무기명 회원가입')}>무기명 회원가입</button>
      </div>
    </header>
    <div className="raised-shell">
      <div className="raised-sidebar-rail">
        <aside className="raised-sidebar" id="raised-sidebar" aria-label="주요 메뉴">
          <div className="raised-menu-scroll">
            {menuGroups.map(group => <nav className="raised-menu-group" key={group.title} aria-label={group.title}><h2>{group.title}</h2><div className="raised-menu-items">{group.items.map(([label]) => <button className={`raised-menu-item${activeMenu === label ? ' is-selected' : ''}`} type="button" key={label} aria-pressed={activeMenu === label} onClick={() => navigateMenu(label)}><GoldImage className="raised-menu-icon" src={iconFor(label)} /><span>{label}</span><GoldImage className="raised-menu-grip" src={assets.imgGrip} /></button>)}</div></nav>)}
          </div>
          <div className="raised-view-switcher" aria-label="디자인 색상">
            {['black', 'white', 'black-video', 'white-video'].map((name, index) => <button key={name} className={`raised-view-swatch swatch-${name}`} type="button" aria-label={['블랙 골드 화면', '화이트 디자인 안내', '블랙 그라데이션 디자인 안내', '화이트 그라데이션 디자인 안내'][index]} onClick={() => index === 0 ? document.querySelector('.raised-main')?.scrollTo({ top: 0 }) : setNotice({ title: '디자인 색상', description: '이 페이지는 지정된 BlackGold · Paperlogy 화면의 미리보기입니다.' })} />)}
          </div>
          <p className="raised-credit">TITAN SOLUSION</p>
        </aside>
      </div>
      <main className="raised-main" aria-label="BlackGold · Paperlogy 로비">
        <section className="raised-benefits" aria-label="회원 혜택">
          {benefits.map(benefit => <button className={`raised-benefit ${benefit.className}`} data-figma-node={benefit.node} key={benefit.title} type="button" aria-label={`${benefit.title} · ${benefit.action}`} onClick={() => serviceNotice(benefit.title)}>
            <span className="benefit-photo"><GoldImage src={benefit.photo} /></span>
            <span className="benefit-readability" />
            <span className="benefit-display" aria-hidden="true">{benefit.display}</span>
            <span className="benefit-portrait" style={{ maskImage: `url("${benefit.mask}")` }}><GoldImage src={benefit.photo} /></span>
            <span className="benefit-lower-shade" />
            <span className="benefit-title">{benefit.title}</span>
            <span className="benefit-entry"><span>{benefit.action}</span><GoldImage src={assets.imgToneInk} /></span>
          </button>)}
        </section>
        <section className="raised-section raised-gateways" aria-labelledby="raised-gateways-title">
          <h2 id="raised-gateways-title">콘텐츠 바로가기</h2>
          <div className="raised-gateway-grid">{['라이브 카지노', '슬롯', '스포츠', '인플레이'].map((title, index) => <a className="raised-gateway" href={`#${['casino', 'slots', 'sports', 'sports'][index]}`} aria-label={title} key={title}>
            <div className="raised-artwork"><GoldImage src={assets[(index === 0 ? 'imgArtwork' : `imgArtwork${index}`) as keyof typeof assets]} /></div>
            <span className="raised-gateway-shade" />
            <GoldImage className="raised-gateway-title" src={assets[(index === 0 ? 'img' : `img${index}`) as keyof typeof assets]} alt={title} />
          </a>)}</div>
        </section>
        <section className="raised-section raised-sports" id="sports" aria-labelledby="raised-sports-title"><div className="raised-section-heading"><h2 id="raised-sports-title">⚽ 스포츠</h2><button className="raised-view-all" type="button" onClick={() => serviceNotice('스포츠 전체보기')}>전체보기</button></div><div className="raised-sports-grid">{matches.map(match => <SportsCard key={match.id} match={match} openNotice={setNotice} />)}</div></section>
        <ProviderSection id="casino" title="🎥 라이브 카지노" providers={casinoProviders} arrows={[assets.imgFrame, assets.imgFrame1]} openNotice={setNotice} />
        <ProviderSection id="slots" title="🎰 슬롯 로비" providers={slotProviders} arrows={[assets.imgFrame, assets.imgFrame1]} openNotice={setNotice} />
        <footer className="raised-partners" aria-label="게임 파트너">{partnerBreaks.slice(0, -1).map((start, row) => <div className="raised-partner-row" key={row}>{partnerNames.slice(start, partnerBreaks[row + 1]).map(name => <div className="raised-partner-logo" key={name}><GoldImage src={assets[`imgLogo${name}` as keyof typeof assets]} alt={name.replace(/([a-z])([A-Z])/g, '$1 $2')} /></div>)}</div>)}</footer>
      </main>
    </div>
    <Dialog open={notice !== null} onOpenChange={open => { if (!open) setNotice(null); }}><DialogContent className="raised-dialog" showCloseButton={false}><DialogTitle>{notice?.title}</DialogTitle>{notice?.provider && <ProviderCard provider={notice.provider} />}<DialogDescription>{notice?.description}</DialogDescription><DialogClose className="raised-dialog-close">닫기</DialogClose></DialogContent></Dialog>
  </div>;
}
