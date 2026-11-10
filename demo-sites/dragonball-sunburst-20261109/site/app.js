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
const additionalFeaturedGames = [
  ['06-android-18', '人造人間18号の反撃', 'ANDROID 18 STRIKES BACK'],
  ['07-vegeta', 'ベジータの閃光', "VEGETA'S FINAL FLASH"],
  ['08-gohan', '悟飯の雷光', "GOHAN'S THUNDER"],
  ['09-trunks', '未来を守る剣', 'SWORD OF THE FUTURE'],
  ['10-piccolo', 'ピッコロの修行', "PICCOLO'S TRAINING"],
  ['11-krillin', 'クリリンの気円斬', "KRILLIN'S DESTRUCTO DISC"],
  ['12-bulma', 'ブルマのドラゴンレーダー', "BULMA'S DRAGON RADAR"],
  ['13-frieza', 'フリーザの最終形態', "FRIEZA'S FINAL FORM"],
  ['14-cell', '完全体セルの挑戦', "PERFECT CELL'S CHALLENGE"],
  ['15-buu', '魔人ブウのおやつ', "BUU'S SWEET BREAK"],
];
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;


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
  const width = document.documentElement.clientWidth;
  const scale = Math.min(width / 1920, innerHeight / 1080);
  const mobile = innerWidth <= 760;
  world.classList.toggle('mobile', mobile);
  stage.style.setProperty('--scene-scale', mobile ? Math.max(.34, innerWidth / 960) : scale);
  stage.style.setProperty('--vertical-space', `${mobile?0:(innerHeight/scale-1080)/2}px`);
  stage.style.setProperty('--hero-scale', Math.min((width-24)/720,.66));
  stage.style.setProperty('--dock-scale', (width-16)/776);
  stage.style.setProperty('--service-scale', Math.min((width-24)/532,.72));
  document.querySelectorAll('.card-slot').forEach(slot=>{const child=slot.firstElementChild;if(child)child.style.setProperty('--card-scale',mobile?slot.clientWidth/Number(slot.dataset.width):1);});
  document.querySelectorAll('.featured-grid [data-name^="Artwork / card_"] img').forEach(paintFeaturedArtwork);
  world.style.setProperty('--desktop-scale', scale);
}
function openModal(title, body) {
  stopActiveLiveCard?.();
  lastFocus = document.activeElement;
  content.innerHTML = `<button type="button" class="modal-close" aria-label="閉じる">×</button><img class="modal-brand" src="assets/home-imgBrandDragonBallZGeneratedPng.png" alt="DragonBall Z"><h1 id="modal-title">${escapeHtml(title)}</h1>${body}`;
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
  headerHost.querySelector('.account-credit').textContent=account?'0':'ログイン後に確認';
  const entry=headerHost.querySelector('[data-name="P31 / Button / primary login"]');
  entry.setAttribute('aria-label',account?'マイアカウント':'ログイン');
  entry.querySelector('p').textContent=account?'マイページ':'ログイン';
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
function messages() { if(!account){login();return;}openModal('メール','<p class="modal-copy">新しいメッセージはありません。</p><p class="demo-note">ドラゴンボールの世界へようこそ。</p>'); }
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
  buttonize(header.querySelector('[data-name="Brand / header"]'),'ホームへ',()=>navigate('home'));
  const services=document.createElement('div');services.className='services';
  const actions=[()=>wallet('入金'),()=>wallet('出金'),messages,()=>support()];
  header.querySelectorAll(':scope > [data-name^="Action / "]').forEach((el,i)=>{
    const b=buttonize(el,el.textContent.trim(),actions[i]);b.style.setProperty('--action-index',i);services.append(b);
  });
  header.append(services);
  const ticker=document.createElement('div');ticker.className='header-ticker';
  const surface=header.querySelector('[data-name="Notice / capsule surface"]');
  const tickerParts=[surface,surface.nextElementSibling,surface.nextElementSibling.nextElementSibling,surface.nextElementSibling.nextElementSibling.nextElementSibling];
  tickerParts.forEach(el=>ticker.append(el));header.append(ticker);
  buttonize(ticker,'お知らせを読む',()=>navigate('notice'));
  const credit=[...header.querySelectorAll(':scope > div')].find(el=>el.textContent.trim()==='ログイン後に確認');
  credit.classList.add('account-credit');
  buttonize(header.querySelector('[data-name="P31 / Button / primary login"]'),'ログイン',()=>login());
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
    b.querySelector('[data-name^="P31 / Icon /"],[data-name="Navigation / icon"]').classList.add('dock-symbol');
    const skin=b.querySelector('.dock-frame img');
    const sweep=document.createElement('span');
    sweep.className=skin.className+' dock-sweep';
    sweep.style.maskImage='url("assets/hover/dock-gold-mask.png")';
    skin.after(sweep);
    b.addEventListener('animationend',event=>{
      if(event.animationName==='dock-confirm')b.classList.remove('dock-hit');
    });
    b.setAttribute('aria-current',names[i]===name?'page':'false');
  });
  navHost.replaceChildren(nav);
}
function showNotice(section,view=`page-${noticePage}`,focus=false) {
  const board=section.querySelector('.notice-board');board.replaceChildren(noticeViews.get(view).cloneNode(true));
  const panel=board.firstElementChild;panel.className+=' '+(view.startsWith('page')?'notice-list':'notice-article');
  panel.querySelectorAll('[data-name="Posts / five rows"] > *').forEach((el,i)=>buttonize(el,el.querySelector('p').textContent,()=>showNotice(section,`article-${(noticePage-1)*5+i+1}`,true)));
  panel.querySelectorAll('[data-name="Pagination / pages 1 to 4"] > *').forEach((el,i)=>{
    const page=i+1;const b=buttonize(el,`${page}ページ`,()=>{noticePage=page;showNotice(section,`page-${page}`,true);});
    if(page===noticePage)b.setAttribute('aria-current','page');
  });
  const back=panel.querySelector('[data-name^="Back to page"]');
  if(back){back.type='button';back.onclick=()=>showNotice(section,`page-${noticePage}`,true);}
  if(focus)(back||panel.querySelector('[aria-current="page"]'))?.focus({preventScroll:true});
}
function wrapCard(button) {
  const width=Number(button.className.match(/w-\[([\d.]+)px\]/)?.[1]);
  const height=Number(button.className.match(/h-\[([\d.]+)px\]/)?.[1]);
  const slot=document.createElement('div');slot.className='card-slot';slot.dataset.width=width;
  slot.style.setProperty('--card-ratio',`${width} / ${height}`);
  if(width>height)slot.classList.add('wide-slot');
  if(height>500)slot.classList.add('tall-slot');
  button.replaceWith(slot);slot.append(button);return slot;
}
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

function wireCardTilt(button, normalSrc) {
  button.classList.add('tilt-card');
  const face = document.createElement('div');
  face.className = 'featured-face';
  face.append(...button.childNodes);
  button.append(face);

  // Match the frame image's exported crop, including its transparent center.
  const frame = face.querySelector('[data-name^="Frame /"] img');
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
    if(!button.classList.contains('tracking-light')) {
      button.classList.add('tracking-light');
      const artwork=button.querySelector('[data-name^="Artwork / card_"] img');
      if(artwork)paintFeaturedArtwork(artwork);
    }
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
    const artwork=button.querySelector('[data-name^="Artwork / card_"] img');
    if(artwork)paintFeaturedArtwork(artwork);
  }
  button.addEventListener('pointerenter', track);
  button.addEventListener('pointermove', track);
  button.addEventListener('pointerleave', release);
  button.addEventListener('pointercancel', release);
  button.addEventListener('click', release);
}

let stopActiveLiveCard;
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
  button.addEventListener('pointercancel', () => { pointerInside = false; stop(); });
  button.addEventListener('focus', () => { if (button.matches(':focus-visible')) start(); });
  button.addEventListener('blur', () => { if (!pointerInside) stop(); });
}
document.addEventListener('visibilitychange',()=>{if(document.hidden)stopActiveLiveCard?.();});

function paintFeaturedArtwork(image) {
  if(!image.complete||!image.naturalWidth||!image.isConnected)return;
  const card=image.closest('.game-card');
  const sceneScale=card?Math.max(1,card.getBoundingClientRect().width/card.offsetWidth):1;
  const hoverScale=card?.classList.contains('tracking-light')&&matchMedia('(any-hover:hover) and (prefers-reduced-motion:no-preference)').matches?1.29*1.045:1;
  const width=Math.round(image.clientWidth*sceneScale*hoverScale*devicePixelRatio);
  const height=Math.round(image.clientHeight*sceneScale*hoverScale*devicePixelRatio);
  if(!width||!height)return;
  let canvas=image.parentElement.querySelector('canvas');
  if(canvas&&canvas.width===width&&canvas.height===height)return;
  if(!canvas) {
    canvas=document.createElement('canvas');canvas.className=image.className;
    canvas.setAttribute('aria-hidden','true');
  }
  const context=canvas.getContext('2d');if(!context)return;
  canvas.width=width;canvas.height=height;
  // Sample at the displayed hover scale, returning to the original-size buffer at rest.
  context.imageSmoothingEnabled=true;context.imageSmoothingQuality='high';
  const scale=Math.max(width/image.naturalWidth,height/image.naturalHeight);
  const drawWidth=image.naturalWidth*scale,drawHeight=image.naturalHeight*scale;
  context.drawImage(image,(width-drawWidth)/2,(height-drawHeight)/2,drawWidth,drawHeight);
  if(!canvas.isConnected)image.after(canvas);
  image.style.visibility='hidden';
}
function wireFeaturedGames(panel) {
  panel.classList.add('featured-panel');
  const artwork='[data-name^="Artwork / card_"] img';
  const cards=[...panel.children].filter(el=>el.querySelector(artwork));
  for(const [file,japanese,english] of additionalFeaturedGames) {
    const card=cards[0].cloneNode(true);
    card.removeAttribute('data-node-id');
    card.querySelectorAll('[data-node-id]').forEach(el=>el.removeAttribute('data-node-id'));
    card.classList.add('additional-featured');
    card.querySelector(artwork).src=`assets/featured/${file}.png`;
    card.querySelector('[data-name="Frame / generated gold capsule PNG"] img').src='assets/featured/gold-frame.png';
    const [title,subtitle]=card.querySelectorAll('p');
    title.textContent=japanese;subtitle.textContent=english;
    cards.push(card);
  }
  const grid=document.createElement('div');grid.className='featured-grid';
  for(let start=0;start<cards.length;start+=5) {
    const page=document.createElement('div');page.className='featured-page';page.inert=start!==0;
    for(const card of cards.slice(start,start+5)) {
      const title=card.querySelector('p').textContent;const image=card.querySelector(artwork).getAttribute('src');
      card.querySelector(artwork).addEventListener('load',event=>paintFeaturedArtwork(event.target),{once:true});
      const button=buttonize(card,title,()=>gamePreview(title,image));button.classList.add('game-card');
      button.querySelector(artwork).parentElement.classList.add('prism-surface');
      wireCardTilt(button,card.classList.contains('additional-featured')?'assets/hover/additional-frame-normal.png':'assets/hover/featured-frame-normal.png');
      page.append(wrapCard(button));
    }
    grid.append(page);
  }
  panel.append(grid);
  const pages=grid.children;
  let currentPage=0,steps=0,sliding=false;
  async function turnPage(step) {
    steps+=step;if(sliding)return;sliding=true;
    while(steps&&panel.isConnected&&!panel.closest('[inert]')) {
      const direction=Math.sign(steps);steps-=direction;
      const outgoing=pages[currentPage];
      currentPage=(currentPage+direction+pages.length)%pages.length;
      const incoming=pages[currentPage];outgoing.inert=true;incoming.inert=false;
      if(!matchMedia('(prefers-reduced-motion: reduce)').matches) {
        outgoing.classList.add('sliding-out');
        const timing={duration:450,easing:'cubic-bezier(.25,.1,.25,1)'};
        const leave=outgoing.animate([{transform:'translateX(0)'},{transform:`translateX(${-direction*100}%)`}],timing);
        const enter=incoming.animate([{transform:`translateX(${direction*100}%)`},{transform:'translateX(0)'}],timing);
        await Promise.allSettled([leave.finished,enter.finished]);
        outgoing.classList.remove('sliding-out');
      }
    }
    sliding=false;
  }
  panel.querySelectorAll('[data-name^="Carousel / "]').forEach(el=>{el.type='button';el.classList.add('carousel-arrow');const next=el.dataset.name.endsWith('next');el.setAttribute('aria-label',next?'次のおすすめゲーム5件':'前のおすすめゲーム5件');el.onclick=()=>turnPage(next?1:-1);});
}
function wireScene(section,name) {
  if(name==='home')wireFeaturedGames(section.querySelector('[data-node-id="2572:2471"]'));
  if(name==='live') {
    const grid=document.createElement('div');grid.className='live-grid';
    [...section.children].filter(el=>el.querySelector('[data-name^="Provider / original gold logo"]')).forEach(el=>{
      const title=[...el.querySelectorAll('p')].at(-1).textContent;
      const logo=el.querySelector('[data-name^="Provider / original gold logo"] img').getAttribute('src');
      const b=buttonize(el,title,()=>gameLobby(title,logo));b.classList.add('provider-card');wireLiveCard(b);grid.append(wrapCard(b));
    });section.append(grid);
  }
  if(name==='slots') {
    const providers=section.querySelector('[data-name^="Providers / "]');
    [...providers.children].forEach(el=>{
      const title=[...el.querySelectorAll('p')].at(-1).textContent;
      const logo=el.querySelector('[data-name^="Provider / supplied logo"] img').getAttribute('src');
      const b=buttonize(el,title,()=>gameLobby(title,logo));b.classList.add('provider-card','slot-game-card');const slot=wrapCard(b);
      b.querySelectorAll('[data-name^="Provider / Dragon Ball artwork"]>div').forEach(surface=>surface.classList.add('prism-surface'));
      wireCardTilt(b,slot.classList.contains('wide-slot')?'assets/hover/slot-wide-frame-normal.png':'assets/hover/slot-frame-normal.png');
    });
    const categories=section.querySelector('[data-name^="Category / "]').parentElement;categories.classList.add('slot-categories');
    [...categories.children].forEach(el=>{const title=el.dataset.name.split('/').at(-1).trim();buttonize(el,title,()=>gameLobby(title));});providers.before(categories);
  }
  if(name==='notice')showNotice(section);
}
function navigate(name,initial=false) {
  if(!names.includes(name))name='home';if(current===name)return;
  stopActiveLiveCard?.();
  const previous=current;current=name;const old=pageHost.querySelector('.scene:not(.leaving)');
  const next=scenes.get(name).page.cloneNode(true);next.className='scene';next.dataset.scene=name;next.setAttribute('aria-label',titles[names.indexOf(name)]);
  wireScene(next,name);pageHost.append(next);
  const direction=names.indexOf(name)>=names.indexOf(previous)?1:-1;
  if(old){old.classList.add('leaving');old.inert=true;if(reduceMotion)old.remove();else old.animate([{transform:'translateY(0)',opacity:1},{transform:`translateY(${-direction*1080}px)`,opacity:.15}],{duration:380,easing:'cubic-bezier(.65,0,.35,1)',fill:'forwards'}).finished.then(()=>old.remove()).catch(()=>old.remove());}
  if(!initial&&!reduceMotion)next.animate([{transform:`translateY(${direction*1080}px)`,opacity:.4},{transform:'translateY(0)',opacity:1}],{duration:460,easing:'cubic-bezier(.22,1,.36,1)'});
  document.querySelectorAll('.scene-background').forEach(bg=>bg.classList.toggle('active',bg.dataset.scene===name));
  world.dataset.page=name;drawNavigation(name);history.replaceState(null,'',`#${name}`);resize();
  if(innerWidth<=760)window.scrollTo({top:0,behavior:'instant'});
  document.title=`${titles[names.indexOf(name)]} | DragonBall Z`;
}
async function fetchText(url) {const response=await fetch(url);if(!response.ok)throw Error(`画面の読み込みに失敗しました: ${url}`);return response.text();}
function parseRoot(html) {return new DOMParser().parseFromString(html,'text/html').body.firstElementChild;}
async function init() {
  const noticeNames=[...Array.from({length:4},(_,i)=>`page-${i+1}`),...Array.from({length:20},(_,i)=>`article-${i+1}`)];
  const [screens,notices]=await Promise.all([Promise.all(names.map(name=>fetchText(`screens/${name}.html${name==='live'?'?v=live-motion-20261110':''}`))),Promise.all(noticeNames.map(name=>fetchText(`notices/${name}.html`)))]);
  notices.forEach((html,i)=>noticeViews.set(noticeNames[i],parseRoot(html)));
  screens.forEach((html,i)=>{
    const root=parseRoot(html),name=names[i];
    const background=root.firstElementChild,image=background.querySelector('img').cloneNode(true);
    image.className='scene-background';image.dataset.scene=name;image.alt='';document.querySelector('#backgrounds').append(image);background.remove();
    const header=root.querySelector('[data-name^="Header / "]');if(i===0)wireHeader(header);else header.remove();
    const navigation=root.querySelector('[data-name^="Navigation / "]');navigation.remove();
    root.querySelector('[data-name="Readability / dock horizon"]')?.remove();
    if(name==='home')featured=[...root.querySelectorAll('[data-name^="Artwork / card_"]')].map(art=>({title:art.parentElement.parentElement.querySelector('p').textContent,image:art.querySelector('img').getAttribute('src')})).concat(additionalFeaturedGames.map(([file,title])=>({title,image:`assets/featured/${file}.png`})));
    if(name==='notice'){const board=root.lastElementChild;board.innerHTML='';board.className='notice-board';}
    scenes.set(name,{page:root,navigation});
  });resize();navigate(location.hash.slice(1)||'home',true);
}
addEventListener('resize',resize);addEventListener('hashchange',()=>navigate(location.hash.slice(1)));
init().catch(error=>{console.error(error);pageHost.innerHTML='<p class="load-error">画面を読み込めませんでした。ページを再読み込みしてください。</p>';});
