const names = ['home', 'live', 'slots', 'notice'];
const titles = ['おすすめゲーム', 'ライブカジノ', 'スロットゲーム', 'お知らせ'];
const world = document.querySelector('#world');
const stage = document.querySelector('#stage');
const pageHost = document.querySelector('#page-host');
const headerHost = document.querySelector('#header-host');
const navHost = document.querySelector('#navigation-host');
const modal = document.querySelector('#modal');
const content = document.querySelector('#modal-content');
const scenes = new Map();
let current = '';
let notices = [];
let noticePage = 1;
let account = '';
let lastFocus;
let toastTimer;
let featured = [];
let totoroMotion;
let stopCrestLight;
let stopActiveLiveCard;
let nextFrameLightId = 0;
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

document.addEventListener('visibilitychange', () => {
  if (document.hidden) stopActiveLiveCard?.();
});

function buttonize(node, label, action) {
  const button = document.createElement('button');
  for (const attr of node.attributes) if (!['href','role','tabindex'].includes(attr.name)) button.setAttribute(attr.name, attr.value);
  button.type = 'button';
  button.setAttribute('aria-label', label);
  button.append(...node.childNodes);
  node.replaceWith(button);
  button.addEventListener('click', action);
  return button;
}
function escapeHtml(text) { const span = document.createElement('span'); span.textContent = text; return span.innerHTML; }
function toast(text) {
  const status = document.querySelector('#status'); status.textContent = text; status.classList.add('visible');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => status.classList.remove('visible'), 3500);
}
function resize() {
  const scale = Math.min(innerWidth / 1920, innerHeight / 1080);
  const mobile = innerWidth <= 760;
  world.classList.toggle('mobile', mobile);
  stage.style.setProperty('--scene-scale', mobile ? Math.max(.34, innerWidth / 960) : scale);
  stage.style.setProperty('--vertical-space', `${mobile?0:(innerHeight/scale-1080)/2}px`);
  stage.style.setProperty('--hero-scale', Math.min((innerWidth-24)/720,.66));
  stage.style.setProperty('--service-scale', Math.min((innerWidth-16)/528,.72));
  document.querySelectorAll('.card-slot').forEach(slot=>{const child=slot.firstElementChild;if(child)child.style.setProperty('--card-scale',mobile?slot.clientWidth/Number(slot.dataset.width):1);});
  world.style.setProperty('--desktop-scale', scale);
}
function openModal(title, body) {
  stopActiveLiveCard?.();
  lastFocus = document.activeElement;
  content.innerHTML = `<button type="button" class="modal-close" aria-label="閉じる">×</button><img class="modal-brand" src="assets/figma-home-imgSourceHeaderLogo.png" alt="TOTORO WORLD"><h1 id="modal-title">${escapeHtml(title)}</h1>${body}`;
  content.querySelector('.modal-close').onclick = () => modal.close();
  if (!modal.open) modal.showModal();
  content.querySelector('input,textarea,button:not(.modal-close)')?.focus();
}
modal.addEventListener('close', () => lastFocus?.focus());
modal.addEventListener('click', event => { if (event.target === modal) { const r=modal.getBoundingClientRect(); if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom) modal.close(); } });
function login(mode = 'login') {
  if (account && mode === 'login') {
    openModal('マイアカウント', `<p class="modal-copy">${escapeHtml(account)} さん</p><p class="demo-note">デモクレジット：0</p><button class="primary" id="logout">ログアウト</button>`);
    content.querySelector('#logout').onclick=()=>{account='';updateAccount();modal.close();toast('ログアウトしました');}; return;
  }
  const register=mode==='register';
  openModal(register?'会員登録':'ログイン', `<form id="account-form"><label>ユーザーID<input name="user" autocomplete="off" placeholder="デモ用のユーザーID" required maxlength="24"></label><label>パスワード<span class="password-field"><input name="password" type="password" autocomplete="off" placeholder="デモ用のパスワード" required minlength="4"><button type="button" id="show-password" aria-label="パスワードを表示">表示</button></span></label>${register?'<label>パスワード確認<input name="confirm" type="password" required minlength="4" autocomplete="off"></label>':''}<p class="form-error" role="alert"></p><button class="primary" type="submit">${register?'登録してはじめる':'ログイン'}</button></form><div class="modal-links"><button id="switch-account">${register?'ログインへ戻る':'会員登録'}</button><button id="reset-password">パスワードをお忘れの方</button></div><p class="demo-note">ローカルデモです。入力内容は送信・保存されません。</p>`);
  const form=content.querySelector('form');
  content.querySelector('#show-password').onclick=event=>{const input=form.elements.password;input.type=input.type==='password'?'text':'password';event.target.textContent=input.type==='password'?'表示':'非表示';};
  content.querySelector('#switch-account').onclick=()=>login(register?'login':'register');
  content.querySelector('#reset-password').onclick=()=>support('パスワードのお問い合わせ');
  form.onsubmit=event=>{event.preventDefault();if(register&&form.elements.password.value!==form.elements.confirm.value){form.querySelector('.form-error').textContent='パスワードが一致しません。';return;}account=form.elements.user.value.trim();if(!account){form.querySelector('.form-error').textContent='ユーザーIDを入力してください。';return;}updateAccount();modal.close();toast(`${account} さん、ようこそ`);};
}
function updateAccount() {
  const paragraphs=headerHost.querySelector('[data-name="Account / guest credits"]')?.querySelectorAll('p');
  if(paragraphs?.length){paragraphs[0].textContent=account?'デモクレジット':'保有クレジット';paragraphs[1].textContent=account?'0':'ログイン後に確認';}
  const entry=headerHost.querySelector('[data-name="Entry / login button"]');
  if(entry){entry.setAttribute('aria-label',account?'マイアカウント':'ログイン');entry.querySelector('p').textContent=account?'マイページ':'ログイン';}
}
function wallet(type) {
  if(!account){login();return;}
  openModal(type, `<p class="modal-copy">デモクレジット <strong>0</strong></p><form><label>金額<input type="number" name="amount" min="1" step="1" placeholder="金額を入力" required></label><button class="primary" type="submit">確認</button></form><p class="demo-note">画面確認用のデモです。実際の入出金は行われません。</p>`);
  content.querySelector('form').onsubmit=event=>{event.preventDefault();const amount=Number(event.target.elements.amount.value);openModal(`${type}の確認`,`<p class="modal-copy">${amount.toLocaleString('ja-JP')} クレジット</p><p class="demo-note">デモのため申請・送金は行われません。</p><button class="primary" id="done">閉じる</button>`);content.querySelector('#done').onclick=()=>modal.close();};
}
function support(title='お問い合わせ') {
  openModal(title, '<form><label>件名<input name="subject" required placeholder="お問い合わせの件名"></label><label>内容<textarea name="message" required rows="4" placeholder="内容を入力してください"></textarea></label><button type="submit" class="primary">内容を確認</button></form><p class="demo-note">入力内容は外部に送信されません。</p>');
  content.querySelector('form').onsubmit=e=>{e.preventDefault();openModal('お問い合わせの確認',`<h2>${escapeHtml(e.target.elements.subject.value)}</h2><p class="message-preview">${escapeHtml(e.target.elements.message.value)}</p><p class="demo-note">ローカルデモのため、送信は行われません。</p><button class="primary" id="done">閉じる</button>`);content.querySelector('#done').onclick=()=>modal.close();};
}
function messages() { if(!account){login();return;}openModal('メール','<p class="modal-copy">新しいメッセージはありません。</p><p class="demo-note">トトロワールドへようこそ。</p>'); }
function gamePreview(title,image) {
  openModal(title, `<img class="game-preview" src="${image}" alt="${escapeHtml(title)}"><p class="demo-note">ゲーム画面のプレビューです。実際のゲームには接続していません。</p><button class="primary" id="back-lobby">ロビーへ戻る</button>`);
  content.querySelector('#back-lobby').onclick=()=>modal.close();
}
function gameLobby(title,logo) {
  openModal(title, `${logo?`<img class="provider-preview" src="${logo}" alt="${escapeHtml(title)}">`:''}<div class="game-options">${featured.map((game,i)=>`<button class="game-option" data-game="${i}"><img src="${game.image}" alt=""><span>${escapeHtml(game.title)}</span></button>`).join('')}</div><p class="demo-note">ローカルデモ · ゲームを選ぶとプレビューが開きます。</p>`);
  content.querySelectorAll('[data-game]').forEach(button=>button.onclick=()=>{const g=featured[Number(button.dataset.game)];gamePreview(g.title,g.image);});
}
function wireHeader(header) {
  header.classList.add('world-header');
  buttonize(header.querySelector('[data-name="Image / Compact TOTORO WORLD wordmark"]'),'ホームへ',()=>navigate('home'));
  const actions=[()=>wallet('入金'),()=>wallet('出金'),messages,()=>support()];
  header.querySelectorAll('[data-name^="Service / "]').forEach((el,i)=>buttonize(el,el.textContent.trim(),actions[i]));
  buttonize(header.querySelector('[data-name="Notice / woodland ticker"]'),'お知らせを読む',()=>navigate('notice'));
  buttonize(header.querySelector('[data-name="Entry / login button"]'),'ログイン',()=>login());
  headerHost.append(header);
}
function drawNavigation(name) {
  const nav = scenes.get(name).navigation.cloneNode(true);
  nav.classList.add('world-dock');
  [...nav.children].forEach((el, i) => {
    const button = buttonize(el, titles[i], () => {
      const keyboardFocus = button.matches(':focus-visible');
      navigate(names[i]);
      // Finish the press on the selected button after the dock is redrawn.
      const selected = navHost.querySelector('[aria-current="page"]');
      selected.classList.add('dock-hit');
      if (keyboardFocus) selected.focus({preventScroll:true});
    });
    const frame = document.createElement('div');
    frame.className = 'dock-frame';
    frame.append(...button.querySelectorAll(':scope > [data-name^="Button skin slice / "]'));
    button.prepend(frame);
    button.querySelector('[data-name^="Image / icon-"]').classList.add('dock-symbol');
    button.addEventListener('animationend', event => {
      if (event.animationName === 'dock-confirm') button.classList.remove('dock-hit');
    });
    button.setAttribute('aria-current', names[i] === name ? 'page' : 'false');
  });
  navHost.replaceChildren(nav);
}
function drawNotices(section) {
  const panel=section.querySelector('.notice-board');
  if(!panel)return;
  panel.innerHTML=`<div class="notice-rows">${notices.slice((noticePage-1)*5,noticePage*5).map(n=>`<button type="button" class="notice-row" data-article="${n.id}"><span>${escapeHtml(n.title)}</span><time>${n.date}</time><span class="notice-arrow" aria-hidden="true"><img src="assets/figma-home-imgSourceIconArrow.png" alt=""></span></button>`).join('')}</div><nav class="pagination" aria-label="お知らせのページ">${[1,2,3,4].map(n=>`<button type="button" aria-label="${n}ページ" ${n===noticePage?'aria-current="page"':''} data-page="${n}">${n}</button>`).join('')}</nav>`;
  panel.querySelectorAll('[data-page]').forEach(b=>b.onclick=()=>{noticePage=Number(b.dataset.page);drawNotices(section);});
  panel.querySelectorAll('[data-article]').forEach(b=>b.onclick=()=>{
    const article=notices.find(n=>n.id===Number(b.dataset.article));
    panel.innerHTML=`<button type="button" class="back-list">‹ 戻る</button><h2 class="article-title">${escapeHtml(article.title)}</h2><time class="article-date">${article.date}</time><div class="article-body">${escapeHtml(article.body)}</div>`;
    const back=panel.querySelector('.back-list');back.onclick=()=>drawNotices(section);back.focus({preventScroll:true});
  });
}
function wrapCard(button) {
  const width=Number(button.className.match(/w-\[([\d.]+)px\]/)?.[1]);
  const height=Number(button.className.match(/h-\[([\d.]+)px\]/)?.[1]);
  const slot=document.createElement('div');slot.className='card-slot';slot.dataset.width=width;slot.dataset.height=height;
  slot.style.setProperty('--card-ratio',`${width} / ${height}`);
  if(width>300)slot.classList.add('wide-slot');
  if(height>500)slot.classList.add('tall-slot');
  button.replaceWith(slot);slot.append(button);return slot;
}
function wireFeaturedTilt(button) {
  button.classList.add('tilt-card');
  const face=document.createElement('div');
  face.className='featured-face';
  face.append(...button.childNodes);
  button.append(face);

  const artwork=face.querySelector('[data-name="Game / artwork"], [data-name="Provider / supplied artwork"]');
  const surface=document.createElement('div');
  surface.className='prism-surface';
  surface.append(artwork.querySelector('img'));
  artwork.append(surface);

  // Each card keeps its own light while the previous card fades out.
  const lighting=document.createElementNS('http://www.w3.org/2000/svg','svg');
  lighting.setAttribute('width','0');lighting.setAttribute('height','0');
  lighting.setAttribute('aria-hidden','true');lighting.style.position='absolute';
  const filter=document.querySelector('#woodland-crest-light').cloneNode(true);
  filter.id=`woodland-frame-light-${++nextFrameLightId}`;
  filter.querySelector('feFuncA').remove();
  lighting.append(filter);face.append(lighting);
  const lightMatrix=filter.querySelector('feColorMatrix');
  // The landscape cards reuse the same source in eight cropped frame slices.
  face.querySelectorAll('img[src$="SourceGameCardFrame.png"]').forEach(frame=>{
    const glint=document.createElement('span');
    glint.className=frame.className+' featured-frame-glint';
    glint.style.maskImage=`url("${frame.getAttribute('src')}")`;
    frame.after(glint);
    const normal=new Image();
    normal.alt='';normal.setAttribute('aria-hidden','true');
    normal.className=frame.className+' featured-frame-normal';
    normal.style.filter=`url(#${filter.id})`;
    normal.onload=()=>glint.replaceWith(normal);
    normal.src='assets/woodland-card-normal.png';
  });

  let pendingFrame=0;
  let pointerX,pointerY;
  function paint() {
    pendingFrame=0;
    const rect=button.getBoundingClientRect();
    const x=Math.max(-1,Math.min(1,2*(pointerX-rect.left)/rect.width-1));
    const y=Math.max(-1,Math.min(1,2*(pointerY-rect.top)/rect.height-1));
    const radius=Math.max(1,Math.hypot(x,y));
    const lx=.87*x-.16,ly=-.87*y+.22,lz=.88;
    const length=Math.hypot(lx,ly,lz);
    const row=`${2*lx/length} ${2*ly/length} ${2*lz/length} 0 ${-(lx+ly+lz)/length}`;
    lightMatrix.setAttribute('values',`${row} ${row} ${row} 0 0 0 1 0`);
    face.style.setProperty('--tilt-x',`${16*y/radius}deg`);
    face.style.setProperty('--tilt-y',`${-16*x/radius}deg`);
    face.style.setProperty('--light-x',`${50+50*x}%`);
    face.style.setProperty('--light-y',`${50+50*y}%`);
    face.style.setProperty('--prism-spectrum-x',`${50+(42*x+18*y)/radius}%`);
    button.classList.add('tracking-light');
  }
  function track(event) {
    if(event.pointerType==='touch'||!event.isPrimary)return;
    pointerX=event.clientX;
    pointerY=event.clientY;
    if(!pendingFrame)pendingFrame=requestAnimationFrame(paint);
  }
  function release() {
    cancelAnimationFrame(pendingFrame);
    pendingFrame=0;
    button.classList.remove('tracking-light');
  }
  button.addEventListener('pointerenter',track);
  button.addEventListener('pointermove',track);
  button.addEventListener('pointerleave',release);
  button.addEventListener('pointercancel',release);
  button.addEventListener('click',release);
}
function wireLiveCard(button) {
  const still = button.querySelector('.live-character-media img');
  let video;
  let pointerInside = false;
  button.classList.add('live-card');

  // Reuse each rail's exact alpha silhouette and exported crop for the sweep.
  for (const frame of button.querySelectorAll('[data-name^="Frame / "] img')) {
    const sweep = document.createElement('span');
    sweep.className = frame.className + ' live-frame-sweep';
    sweep.style.maskImage = `url("${frame.getAttribute('src')}")`;
    frame.after(sweep);
  }

  function stop() {
    button.classList.remove('live-highlighted', 'live-playing');
    if (video) {
      video.pause();
      if (video.readyState) video.currentTime = 0;
    }
    if (stopActiveLiveCard === stop) stopActiveLiveCard = undefined;
  }

  function start() {
    if (modal.open || button.closest('[inert]') || document.hidden || stopActiveLiveCard === stop) return;
    stopActiveLiveCard?.();
    stopActiveLiveCard = stop;
    button.classList.add('live-highlighted');
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!video) {
      video = document.createElement('video');
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.setAttribute('aria-hidden', 'true');
      video.addEventListener('playing', () => {
        if (!video.paused && stopActiveLiveCard === stop) button.classList.add('live-playing');
      });
      video.addEventListener('error', () => button.classList.remove('live-playing'));
      video.src = still.dataset.motionSrc;
      still.after(video);
    }
    video.play().catch(() => {}); // Keep the still visible if playback is unavailable.
  }

  button.addEventListener('pointerenter', event => {
    if (event.pointerType === 'touch') return;
    pointerInside = true;
    start();
  });
  button.addEventListener('pointerleave', () => {
    pointerInside = false;
    if (!button.matches(':focus-visible')) stop();
  });
  button.addEventListener('focus', () => { if (button.matches(':focus-visible')) start(); });
  button.addEventListener('blur', () => { if (!pointerInside) stop(); });
}
const additionalFeaturedGames = [
  ['01-acorn-sprouts', '月夜の芽吹き', 'ツキヨ・スプラウト'],
  ['02-mei-grass-tunnel', 'メイと草のトンネル', 'メイ・グラス・トレイル'],
  ['03-wind-over-rice-fields', '風わたる田んぼ道', 'ライスフィールド・ブリーズ'],
  ['04-catbus-forest-run', '森を駆けるネコバス', 'ネコバス・フォレストラン'],
  ['05-moonlit-ocarina', '月明かりのオカリナ', 'ムーンライト・オカリナ'],
  ['06-grannys-garden', 'おばあちゃんの畑', 'グランマ・ガーデン'],
  ['07-rainy-veranda', '雨音の縁側', 'レイニー・ベランダ'],
  ['08-totoros-nap', 'トトロのお昼寝', 'トトロ・ナップタイム'],
  ['09-dew-garden', 'しずくの小さな庭', 'しずくのガーデン'],
  ['10-homeward-dusk', '夕暮れの帰り道', 'サンセット・ホーム']
];

function wireFeaturedGames(section) {
  const viewport = section.querySelector('[data-name="Carousel / cards"]');
  const artwork = '[data-name="Game / artwork"] img';
  const originalCards = [...viewport.children];
  const newCards = additionalFeaturedGames.map(([file, japanese, subtitle]) => {
    const card = originalCards[0].cloneNode(true);
    card.dataset.name = `Game / ${file}`;
    card.removeAttribute('data-node-id');
    card.querySelectorAll('[data-node-id]').forEach(el => el.removeAttribute('data-node-id'));
    card.querySelector(artwork).src = `assets/featured/${file}.png`;
    const [heading, caption] = card.querySelectorAll('p');
    heading.textContent = japanese;
    caption.textContent = subtitle;
    return card;
  });

  const cards = [...newCards, ...originalCards];
  const pages = [];
  const pageSize = 5;
  for (let start = 0; start < cards.length; start += pageSize) {
    const page = document.createElement('div');
    page.className = 'featured-page';
    page.inert = start !== 0;
    for (const card of cards.slice(start, start + pageSize)) {
      const title = card.querySelector('p').textContent;
      const image = card.querySelector(artwork).getAttribute('src');
      const button = buttonize(card, title, () => gamePreview(title, image));
      button.classList.add('game-card');
      wireFeaturedTilt(button);
      page.append(wrapCard(button));
    }
    pages.push(page);
  }
  viewport.classList.add('featured-cards');
  viewport.replaceChildren(...pages);

  let currentPage = 0;
  let steps = 0;
  let sliding = false;
  async function turnPage(step) {
    steps += step;
    if (sliding) return;
    sliding = true;
    while (steps && viewport.isConnected && !viewport.closest('[inert]')) {
      const direction = Math.sign(steps);
      steps -= direction;
      const outgoing = pages[currentPage];
      currentPage = (currentPage + direction + pages.length) % pages.length;
      const incoming = pages[currentPage];
      outgoing.inert = true;
      incoming.inert = false;
      if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
        outgoing.classList.add('sliding-out');
        const timing = {duration: 450, easing: 'cubic-bezier(.25,.1,.25,1)'};
        const leave = outgoing.animate([{transform: 'translateX(0)'}, {transform: `translateX(${-direction * 100}%)`}], timing);
        const enter = incoming.animate([{transform: `translateX(${direction * 100}%)`}, {transform: 'translateX(0)'}], timing);
        await Promise.allSettled([leave.finished, enter.finished]);
        outgoing.classList.remove('sliding-out');
      }
    }
    sliding = false;
  }

  for (const arrow of section.querySelectorAll('[data-name^="P29 / Controls / Arrow "]')) {
    const next = arrow.dataset.name.endsWith('Right');
    const label = next ? '次のおすすめゲーム5件' : '前のおすすめゲーム5件';
    const button = buttonize(arrow, label, () => turnPage(next ? 1 : -1));
    button.classList.add('carousel-arrow');
    if (next) button.classList.add('arrow-right');
  }
}

function lightCrest(section) {
  const crest = section.querySelector('[data-name="Image / TOTORO WORLD / main crest"]');
  const artwork = crest.querySelector('img');
  const matrix = document.querySelector('#woodland-crest-light feColorMatrix');
  const normal = artwork.cloneNode();
  normal.src = 'assets/hero-emblem-normal.png';
  normal.alt = '';
  normal.setAttribute('aria-hidden', 'true');
  const glint = normal.cloneNode();
  normal.classList.add('crest-relief');
  glint.classList.add('crest-glint');
  artwork.after(normal, glint);
  crest.classList.add('woodland-crest');

  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const start = performance.now();
  const reach = Math.hypot(.60, .43);
  const maxAngle = Math.atan2(.60, .43);
  let frame;
  let lastPaint = -Infinity;

  function updateLight(now) {
    // Decode the normal map from RGB, then take its dot product with the light.
    const travel = -Math.cos((now - start) * 2 * Math.PI / 24000 + Math.PI / 3);
    const angle = maxAngle * travel;
    const x = reach * Math.sin(angle);
    const y = reach * Math.cos(angle);
    const z = .75;
    const length = Math.hypot(x, y, z);
    const row = `${2*x/length} ${2*y/length} ${2*z/length} 0 ${-(x+y+z)/length}`;
    matrix.setAttribute('values', `${row} ${row} ${row} 0 0 0 1 0`);
    glint.style.setProperty('--crest-highlight-x', `${50 + 38 * travel}%`);
  }

  function paint(now) {
    if (now - lastPaint >= 1000 / 24) {
      updateLight(now);
      lastPaint = now;
    }
    frame = requestAnimationFrame(paint);
  }

  function syncMotion() {
    cancelAnimationFrame(frame);
    if (!reduced.matches && !document.hidden) frame = requestAnimationFrame(paint);
  }

  updateLight(start);
  syncMotion();
  reduced.addEventListener('change', syncMotion);
  document.addEventListener('visibilitychange', syncMotion);
  return () => {
    cancelAnimationFrame(frame);
    reduced.removeEventListener('change', syncMotion);
    document.removeEventListener('visibilitychange', syncMotion);
  };
}

function wireScene(section,name) {
  if(name==='home') {
    stopCrestLight = lightCrest(section);
    wireFeaturedGames(section);
  }
  if(name==='live') {const grid=document.createElement('div');grid.className='live-grid';section.querySelectorAll('[data-name^="Live provider / "]').forEach(el=>{const title=el.querySelector('p')?.textContent||el.dataset.name.split('/')[1].trim();const logo=el.querySelector('[data-name="Provider / original logo"] img')?.getAttribute('src');const button=buttonize(el,title,()=>gameLobby(title,logo));button.classList.add('provider-card');wireLiveCard(button);grid.append(wrapCard(button));});section.append(grid);}
  if(name==='slots') {
    section.querySelectorAll('[data-name^="Provider / "]').forEach(el=>{if(!el.querySelector('[data-name="Provider / original logo / FIT 164x68"]'))return;const title=el.dataset.name.split('/')[1].trim();const logo=el.querySelector('[data-name="Provider / original logo / FIT 164x68"] img').getAttribute('src');const button=buttonize(el,title,()=>gameLobby(title,logo));button.classList.add('provider-card');wireFeaturedTilt(button);wrapCard(button);});
    const categories = document.createElement('div');
    categories.className = 'slot-categories';
    section.querySelectorAll(':scope > [data-name^="Category / "]').forEach(el => {
      const title = el.dataset.name.split('/')[1].trim();
      const button = buttonize(el, title, () => gameLobby(title));
      button.classList.add('category-button');
      categories.append(button);
    });
    section.querySelector('[data-name^="Providers / "]').before(categories);
  }
  if(name==='notice')drawNotices(section);
}
function navigate(name,initial=false) {
  if(!names.includes(name))name='home';
  if(current===name)return;
  stopActiveLiveCard?.();
  stopCrestLight?.();
  stopCrestLight = undefined;
  const previous=current;current=name;
  const old=pageHost.querySelector('.scene:not(.leaving)');
  const next=scenes.get(name).page.cloneNode(true);next.className='scene';next.dataset.scene=name;next.setAttribute('aria-label',titles[names.indexOf(name)]);
  wireScene(next,name);pageHost.append(next);
  const direction=names.indexOf(name)>=names.indexOf(previous)?1:-1;
  if(old){old.classList.add('leaving');old.inert=true;if(reduceMotion)old.remove();else old.animate([{transform:'translateY(0)',opacity:1},{transform:`translateY(${-direction*1080}px)`,opacity:.15}],{duration:380,easing:'cubic-bezier(.65,0,.35,1)',fill:'forwards'}).finished.then(()=>old.remove()).catch(()=>old.remove());}
  if(!initial&&!reduceMotion)next.animate([{transform:`translateY(${direction*1080}px)`,opacity:.4},{transform:'translateY(0)',opacity:1}],{duration:460,easing:'cubic-bezier(.22,1,.36,1)'});
  document.querySelectorAll('.scene-background').forEach(bg=>bg.classList.toggle('active',bg.dataset.scene===name));
  world.dataset.page=name;totoroMotion?.setActive(name==='home');drawNavigation(name);history.replaceState(null,'',`#${name}`);
  resize();if(innerWidth<=760)window.scrollTo({top:0,behavior:'instant'});
  document.title=`${titles[names.indexOf(name)]} | TOTORO WORLD`;
}
function createLeafParticles() {
  const leaves=document.createElement('div');
  leaves.className='woodland-leaves';
  leaves.setAttribute('aria-hidden','true');
  const greens=[['#c0db69','#4e8836'],['#97c956','#337043'],['#b2cf65','#5b913a']];
  const random=(min,max)=>min+Math.random()*(max-min);
  leaves.innerHTML=Array.from({length:26},(_,i)=>{
    const depth=Math.random();
    const duration=17-depth*6;
    const [light,dark]=greens[i%greens.length];
    return `<span class="woodland-leaf-fall" style="--leaf-x:${random(0,100).toFixed(2)}%;--leaf-size:${(17+depth*14).toFixed(1)}px;--leaf-duration:${duration.toFixed(2)}s;--leaf-delay:${(-Math.random()*duration).toFixed(2)}s;--leaf-drift:${random(-100,170).toFixed(0)}px;--leaf-opacity:${(.52+depth*.4).toFixed(2)}">
      <span class="woodland-leaf-sway" style="--leaf-sway:${random(18,46).toFixed(0)}px;--leaf-sway-duration:${random(3.2,5.6).toFixed(2)}s;--leaf-sway-delay:${random(-5,0).toFixed(2)}s">
        <svg class="woodland-leaf" viewBox="0 0 32 34" focusable="false" style="--leaf-spin-duration:${random(3.8,7.2).toFixed(2)}s;--leaf-spin-delay:${random(-7,0).toFixed(2)}s;--leaf-spin-direction:${i%2?'reverse':'normal'};--leaf-axis:${random(.25,.65).toFixed(2)},1,${random(-.35,.35).toFixed(2)}">
          <defs><linearGradient id="woodland-leaf-${i}" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${light}"/><stop offset="1" stop-color="${dark}"/></linearGradient></defs>
          <path d="M5 27C1 18 3 5 29 2C30 17 22 31 5 27Z" fill="url(#woodland-leaf-${i})" stroke="${dark}" stroke-width=".6"/>
          <path d="M3 32C7 24 17 14 27 5M10 23L8 15M15 18L14 10M15 18L23 18M20 12L26 11" fill="none" stroke="${light}" stroke-width=".85" stroke-linecap="round" opacity=".85"/>
        </svg>
      </span>
    </span>`;
  }).join('');
  pageHost.after(leaves);
  const update=()=>{leaves.dataset.paused=String(document.hidden);};
  document.addEventListener('visibilitychange',update);
  update();
}
async function init() {
  const [responses,articles]=await Promise.all([Promise.all(names.map(name=>fetch(`screens/${name}.html${name==='live'?'?v=live-motion-2':''}`).then(r=>{if(!r.ok)throw Error('画面の読み込みに失敗しました');return r.text();}))),fetch('notices.json').then(r=>r.json())]);notices=articles;
  responses.forEach((html,i)=>{
    const doc=new DOMParser().parseFromString(html,'text/html');const root=doc.body.firstElementChild;const name=names[i];
    const background=root.firstElementChild;const image=background.querySelector('img').cloneNode(true);image.className='scene-background';image.dataset.scene=name;image.alt='';document.querySelector('#backgrounds').append(image);background.remove();
    if(name==='home')totoroMotion=createTotoroMotion(image);
    const header=root.querySelector('[data-name^="Header / "]');if(i===0)wireHeader(header);else header.remove();
    const navigation=root.querySelector('[data-name^="Navigation / "]');navigation.remove();
    root.querySelector('[data-name="Readability / dock horizon shade"]')?.remove();
    if(name==='home'){featured=[...root.querySelector('[data-name="Carousel / cards"]').children].map(el=>({title:el.querySelector('p').textContent,image:el.querySelector('[data-name="Game / artwork"] img').getAttribute('src')}));}
    if(name==='notice'){const board=root.lastElementChild;board.innerHTML='';board.className='notice-board';}
    scenes.set(name,{page:root,navigation});
  });
  createLeafParticles();resize();navigate(location.hash.slice(1)||'home',true);
}
addEventListener('resize',resize);
addEventListener('hashchange',()=>navigate(location.hash.slice(1)));
init().catch(error=>{console.error(error);pageHost.innerHTML='<p class="load-error">画面を読み込めませんでした。ページを再読み込みしてください。</p>';});
