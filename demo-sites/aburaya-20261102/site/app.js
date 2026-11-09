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
const noticeViews = new Map();
let noticePage = 1;
let account = '';
let lastFocus;
let toastTimer;
let featured = [];
let stopActiveLiveCard;
let stopEmblemLight;
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
  content.innerHTML = `<button type="button" class="modal-close" aria-label="閉じる">×</button><img class="modal-brand" src="assets/home-imgImageCompactAburayaWordmark.png" alt="ABURAYA"><h1 id="modal-title">${escapeHtml(title)}</h1>${body}`;
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
function messages() { if(!account){login();return;}openModal('メール','<p class="modal-copy">新しいメッセージはありません。</p><p class="demo-note">油屋へようこそ。</p>'); }
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
  buttonize(header.querySelector('[data-name="Image / compact ABURAYA wordmark"]'),'ホームへ',()=>navigate('home'));
  const actions=[()=>wallet('入金'),()=>wallet('出金'),messages,()=>support()];
  header.querySelectorAll('[data-name^="Service / "]').forEach((el,i)=>buttonize(el,el.textContent.trim(),actions[i]));
  buttonize(header.querySelector('[data-name="Notice / bathhouse ticker"]'),'お知らせを読む',()=>navigate('notice'));
  buttonize(header.querySelector('[data-name="Entry / login button"]'),'ログイン',()=>login());
  headerHost.append(header);
}
function drawNavigation(name) {
  const nav=scenes.get(name).navigation.cloneNode(true);
  nav.classList.add('world-dock');
  [...nav.children].forEach((el,i)=>{
    const b=buttonize(el,titles[i],()=>{
      const keyboardFocus=b.matches(':focus-visible');
      navigate(names[i]);
      // Navigation replaces the dock. Finish the press on the visible button.
      const selected=navHost.querySelector('[aria-current="page"]');
      selected.classList.add('dock-hit');
      if(keyboardFocus)selected.focus({preventScroll:true});
    });
    b.firstElementChild.classList.add('dock-frame');
    b.querySelector('[data-name^="Image / icon-"]').classList.add('dock-symbol');
    b.addEventListener('animationend',event=>{
      if(event.animationName==='dock-confirm')b.classList.remove('dock-hit');
    });
    b.setAttribute('aria-current',names[i]===name?'page':'false');
  });
  navHost.replaceChildren(nav);
}
function showNotice(section,view=`page-${noticePage}`,focus=false) {
  const board=section.querySelector('.notice-board');
  board.replaceChildren(noticeViews.get(view).cloneNode(true));
  const panel=board.firstElementChild;
  panel.classList.add(view.startsWith('page')?'notice-list':'notice-article');
  panel.querySelectorAll('[data-name^="Post / "]').forEach((el,i)=>{
    el.type='button';el.setAttribute('aria-label',el.querySelector('p').textContent);
    el.onclick=()=>showNotice(section,`article-${(noticePage-1)*5+i+1}`,true);
  });
  panel.querySelectorAll('[data-name^="Go to page "]').forEach(el=>{
    const page=Number(el.dataset.name.split(' ').at(-1));
    const b=buttonize(el,`${page}ページ`,()=>{noticePage=page;showNotice(section,`page-${page}`,true);});
    if(page===noticePage)b.setAttribute('aria-current','page');
  });
  const back=panel.querySelector('[data-name="Back / notice list"]');
  if(back){back.type='button';back.onclick=()=>showNotice(section,`page-${noticePage}`,true);}
  if(focus)(back||panel.querySelector('[aria-current="page"]'))?.focus({preventScroll:true});
}
function wrapCard(button) {
  const width=Number(button.className.match(/w-\[([\d.]+)px\]/)?.[1]);
  const height=Number(button.className.match(/h-\[([\d.]+)px\]/)?.[1]);
  const slot=document.createElement('div');
  slot.className='card-slot';slot.dataset.width=width;
  slot.style.setProperty('--card-ratio',`${width} / ${height}`);
  if(width>height)slot.classList.add('wide-slot');
  if(height>500)slot.classList.add('tall-slot');
  button.replaceWith(slot);slot.append(button);return slot;
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
  ['01-chihiro-red-bridge', '赤い橋を渡って', 'ACROSS THE RED BRIDGE'],
  ['02-spirit-ferry', '神々の渡し船', 'FERRY OF THE SPIRITS'],
  ['03-no-face-lanterns', '灯りの下のカオナシ', 'NO-FACE BY LANTERNLIGHT'],
  ['04-haku-garden', '庭のおにぎり', 'RICE BALLS WITH HAKU'],
  ['05-yubaba-study', '湯婆婆の手紙', "YUBABA'S LETTER"],
  ['06-soot-sprites', 'ススワタリと金平糖', 'SOOT SPRITES & STAR CANDY'],
  ['07-river-spirit-bath', '河の神の湯浴み', "THE RIVER SPIRIT'S BATH"],
  ['08-zeniba-tea', '銭婆のお茶会', "TEA AT ZENIBA'S"],
  ['09-flooded-platform', '夕映えの停車場', 'STATION AT DUSK'],
  ['10-farewell-haku', 'ハクとの別れ', 'FAREWELL TO HAKU']
];

let nextBrassLightId = 0;
function addBrassLight(target) {
  const lighting = document.getElementById('featured-brass-light').content.cloneNode(true);
  const filter = lighting.querySelector('filter');
  filter.id = 'featured-brass-' + ++nextBrassLightId;
  target.append(lighting);
  return filter;
}

function normalLightValues(x, y, z) {
  // Dot the decoded surface normal (2 * RGB - 1) with the light direction.
  const length = Math.hypot(x, y, z);
  const row = `${2 * x / length} ${2 * y / length} ${2 * z / length} 0 ${-(x + y + z) / length}`;
  return `${row} ${row} ${row} 0 0 0 1 0`;
}

function lightHeroEmblem(section) {
  const artwork = section.querySelector('[data-name="Image / main ABURAYA emblem"] img');
  const filter = addBrassLight(artwork.parentElement);
  const matrix = filter.querySelector('feColorMatrix');
  matrix.setAttribute('values', normalLightValues(-.60, .43, .75));
  // The map's alpha is strongest on brass. Keep the paper and wood response soft.
  const finish = document.createElementNS(matrix.namespaceURI, 'feFuncA');
  finish.setAttribute('type', 'gamma');
  finish.setAttribute('exponent', '1.38');
  filter.querySelector('feComponentTransfer').append(finish);

  const normal = new Image();
  normal.alt = '';
  normal.className = artwork.className + ' hero-emblem-relief';
  normal.style.filter = `url(#${filter.id})`;
  normal.src = 'assets/hero-emblem-normal.png';
  artwork.after(normal);

  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const start = performance.now();
  const maxAngle = Math.atan2(.60, .43);
  const reach = Math.hypot(.60, .43);
  let frame, lastPaint = -Infinity;
  function paint(now) {
    if (now - lastPaint >= 1000 / 24) {
      // One 24-second round trip at constant elevation keeps flat surfaces steady.
      const travel = -Math.cos((now - start) * 2 * Math.PI / 24000 + Math.PI / 3);
      const angle = maxAngle * travel;
      matrix.setAttribute('values', normalLightValues(reach * Math.sin(angle), reach * Math.cos(angle), .75));
      artwork.parentElement.style.setProperty('--emblem-highlight-x', `${50 + 38 * travel}%`);
      lastPaint = now;
    }
    frame = requestAnimationFrame(paint);
  }
  function syncMotion() {
    cancelAnimationFrame(frame);
    if (!reduced.matches) frame = requestAnimationFrame(paint);
  }
  syncMotion();
  reduced.addEventListener('change', syncMotion);
  return () => {
    cancelAnimationFrame(frame);
    reduced.removeEventListener('change', syncMotion);
  };
}

function wireCardTilt(button, normalSrc) {
  const face = document.createElement('div');
  face.className = 'featured-face';
  face.append(...button.childNodes);
  button.append(face);

  // Match the frame image's exported crop, including its transparent center.
  const frame = face.querySelector('[data-name="Image / thin lacquer and brass frame"] img, [data-name="Frame / lacquer and brass"] img');
  const glint = document.createElement('span');
  glint.className = frame.className + ' featured-frame-glint';
  glint.style.maskImage = `url("${frame.getAttribute('src')}")`;
  frame.after(glint);

  // Keep the fading card's light independent of the next hovered card.
  const filter = addBrassLight(face);
  const lightMatrix = filter.querySelector('feColorMatrix');
  const normal = new Image();
  normal.alt = '';
  normal.className = frame.className + ' featured-frame-normal';
  normal.style.filter = `url(#${filter.id})`;
  normal.onload = () => glint.replaceWith(normal);
  normal.src = normalSrc;

  let pendingFrame = 0;
  let pointerX, pointerY;
  function paint() {
    pendingFrame = 0;
    const rect = button.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, 2 * (pointerX - rect.left) / rect.width - 1));
    const y = Math.max(-1, Math.min(1, 2 * (pointerY - rect.top) / rect.height - 1));
    const radius = Math.max(1, Math.hypot(x, y));
    lightMatrix.setAttribute('values', normalLightValues(.87 * x - .16, -.87 * y + .22, .88));
    face.style.setProperty('--tilt-x', `${16 * y / radius}deg`);
    face.style.setProperty('--tilt-y', `${-16 * x / radius}deg`);
    face.style.setProperty('--light-x', `${50 + 50 * x}%`);
    face.style.setProperty('--light-y', `${50 + 50 * y}%`);
    face.style.setProperty('--prism-spectrum-x', `${50 + (42 * x + 18 * y) / radius}%`);
    button.classList.add('tracking-light');
  }
  function track(event) {
    if (event.pointerType === 'touch' || !event.isPrimary) return;
    pointerX = event.clientX;
    pointerY = event.clientY;
    if (!pendingFrame) pendingFrame = requestAnimationFrame(paint);
  }
  function release() {
    cancelAnimationFrame(pendingFrame);
    pendingFrame = 0;
    button.classList.remove('tracking-light');
  }
  button.addEventListener('pointerenter', track);
  button.addEventListener('pointermove', track);
  button.addEventListener('pointerleave', release);
  button.addEventListener('pointercancel', release);
  button.addEventListener('click', release);
}

function wireFeaturedGames(panel) {
  panel.classList.add('featured-panel');
  const artwork = '[data-name="Game / artwork"] img';
  const cards = [...panel.children].filter(el => el.querySelector(artwork));
  for (const [file, japanese, english] of additionalFeaturedGames) {
    const card = cards[0].cloneNode(true);
    card.removeAttribute('data-node-id');
    card.querySelectorAll('[data-node-id]').forEach(el => el.removeAttribute('data-node-id'));
    card.querySelector(artwork).src = `assets/featured/${file}.png`;
    const [title, subtitle] = card.querySelectorAll('p');
    title.textContent = japanese;
    subtitle.textContent = english;
    cards.push(card);
  }

  const viewport = document.createElement('div');
  viewport.className = 'featured-cards';
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
      button.querySelector(artwork).parentElement.classList.add('prism-surface');
      wireCardTilt(button, 'assets/featured-frame-normal.png');
      page.append(wrapCard(button));
    }
    viewport.append(page);
  }
  panel.append(viewport);

  const pages = viewport.children;
  let currentPage = 0;
  let steps = 0;
  let sliding = false;
  async function turnPage(step) {
    steps += step;
    if (sliding) return;
    sliding = true;
    while (steps && panel.isConnected && !panel.closest('[inert]')) {
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
        const leave = outgoing.animate([{transform:'translateX(0)'}, {transform:`translateX(${-direction * 100}%)`}], timing);
        const enter = incoming.animate([{transform:`translateX(${direction * 100}%)`}, {transform:'translateX(0)'}], timing);
        await Promise.allSettled([leave.finished, enter.finished]);
        outgoing.classList.remove('sliding-out');
      }
    }
    sliding = false;
  }

  for (const arrow of panel.querySelectorAll('[data-name^="Arrow / "]')) {
    const next = arrow.dataset.name === 'Arrow / right';
    arrow.type = 'button';
    arrow.classList.add('carousel-arrow');
    arrow.setAttribute('aria-label', next ? '次のおすすめゲーム5件' : '前のおすすめゲーム5件');
    arrow.onclick = () => turnPage(next ? 1 : -1);
  }
}
function wireScene(section,name) {
  if(name==='home') {
    stopEmblemLight = lightHeroEmblem(section);
    wireFeaturedGames(section.querySelector('[data-node-id="1931:668"]'));
  }
  if(name==='live') {
    const grid=document.createElement('div');grid.className='live-grid';
    section.querySelectorAll('[data-name^="P30 / Live provider / "]').forEach(el=>{
      const title=el.dataset.name.split('/').at(-1).trim();
      const logo=el.querySelector('[data-name^="Provider / original gold logo"] img').getAttribute('src');
      const button=buttonize(el,title,()=>gameLobby(title,logo));button.classList.add('provider-card');
      wireLiveCard(button);
      grid.append(wrapCard(button));
    });
    section.append(grid);
  }
  if(name==='slots') {
    const providers=section.querySelector('[data-name^="Providers / "]');
    [...providers.children].forEach(el=>{
      const paragraphs=el.querySelectorAll('p');
      const title=paragraphs[paragraphs.length-1].textContent;
      const logo=el.querySelector('[data-name^="Provider / original gold logo"] img').getAttribute('src');
      const button=buttonize(el,title,()=>gameLobby(title,logo));
      button.classList.add('provider-card','slot-game-card');
      const slot=wrapCard(button);
      const artwork=button.querySelector('[data-name="Provider / supplied artwork"]');
      const surface=document.createElement('div');
      surface.className='prism-surface';
      surface.append(artwork.querySelector('img'));
      artwork.append(surface);
      wireCardTilt(button, slot.classList.contains('wide-slot')
        ? 'assets/slot-wide-frame-normal.png' : 'assets/featured-frame-normal.png');
    });
    const categories=section.querySelector('[data-name^="Category / "]').parentElement;
    categories.classList.add('slot-categories');
    [...categories.children].forEach(el=>{
      const title=el.dataset.name.split('/').at(-1).trim();
      const button=buttonize(el,title,()=>gameLobby(title));button.classList.add('category-button');
    });
    providers.before(categories);
  }
  if(name==='notice')showNotice(section);
}
function navigate(name,initial=false) {
  if(!names.includes(name))name='home';
  if(current===name)return;
  stopEmblemLight?.();
  stopEmblemLight = undefined;
  stopActiveLiveCard?.();
  const previous=current;current=name;
  const old=pageHost.querySelector('.scene:not(.leaving)');
  const next=scenes.get(name).page.cloneNode(true);
  next.className='scene';next.dataset.scene=name;next.setAttribute('aria-label',titles[names.indexOf(name)]);
  wireScene(next,name);pageHost.append(next);
  const direction=names.indexOf(name)>=names.indexOf(previous)?1:-1;
  if(old){
    old.classList.add('leaving');old.inert=true;
    if(reduceMotion)old.remove();
    else old.animate([{transform:'translateY(0)',opacity:1},{transform:`translateY(${-direction*1080}px)`,opacity:.15}],{duration:380,easing:'cubic-bezier(.65,0,.35,1)',fill:'forwards'}).finished.then(()=>old.remove()).catch(()=>old.remove());
  }
  if(!initial&&!reduceMotion)next.animate([{transform:`translateY(${direction*1080}px)`,opacity:.4},{transform:'translateY(0)',opacity:1}],{duration:460,easing:'cubic-bezier(.22,1,.36,1)'});
  document.querySelectorAll('.scene-background').forEach(bg=>bg.classList.toggle('active',bg.dataset.scene===name));
  world.dataset.page=name;drawNavigation(name);history.replaceState(null,'',`#${name}`);
  resize();if(innerWidth<=760)window.scrollTo({top:0,behavior:'instant'});
  document.title=`${titles[names.indexOf(name)]} | ABURAYA`;
}
async function fetchText(url) {
  const response=await fetch(url);
  if(!response.ok)throw Error(`画面の読み込みに失敗しました: ${url}`);
  return response.text();
}
function parseRoot(html) {return new DOMParser().parseFromString(html,'text/html').body.firstElementChild;}
async function init() {
  const noticeNames=[...Array.from({length:4},(_,i)=>`page-${i+1}`),...Array.from({length:20},(_,i)=>`article-${i+1}`)];
  const [screens,notices]=await Promise.all([
    Promise.all(names.map(name=>fetchText(`screens/${name}.html`))),
    Promise.all(noticeNames.map(name=>fetchText(`notices/${name}.html`)))
  ]);
  notices.forEach((html,i)=>noticeViews.set(noticeNames[i],parseRoot(html)));
  screens.forEach((html,i)=>{
    const root=parseRoot(html);const name=names[i];
    const background=root.firstElementChild;const image=background.querySelector('img').cloneNode(true);
    image.className='scene-background';image.dataset.scene=name;image.alt='';
    document.querySelector('#backgrounds').append(image);background.remove();
    const header=root.querySelector('[data-name^="Header / "]');if(i===0)wireHeader(header);else header.remove();
    const navigation=root.querySelector('[data-name^="Navigation / "]');navigation.remove();
    // All four Figma exports contain identical dock art. Reuse decoded images across clicks.
    navigation.querySelectorAll('img').forEach(img=>{
      img.setAttribute('src',img.getAttribute('src').replace(`assets/${name}-`,'assets/home-'));
    });
    root.querySelector('[data-name="Readability / dock horizon shade"]')?.remove();
    if(name==='home')featured=[...root.querySelectorAll('[data-name="Game / artwork"]')].map(art=>({title:art.parentElement.querySelector('p').textContent,image:art.querySelector('img').getAttribute('src')}));
    if(name==='notice'){const board=root.lastElementChild;board.innerHTML='';board.className='notice-board';}
    scenes.set(name,{page:root,navigation});
  });
  resize();navigate(location.hash.slice(1)||'home',true);
}
addEventListener('resize',resize);
addEventListener('hashchange',()=>navigate(location.hash.slice(1)));
init().catch(error=>{console.error(error);pageHost.innerHTML='<p class="load-error">画面を読み込めませんでした。ページを再読み込みしてください。</p>';});
