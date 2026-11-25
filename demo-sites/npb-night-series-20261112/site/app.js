const pages = ['home', 'live', 'slots', 'notice'];
const titles = ['おすすめゲーム', 'ライブカジノ', 'スロットゲーム', 'お知らせ'];
const teams = {giants: '読売ジャイアンツ', tigers: '阪神タイガース', hawks: '福岡ソフトバンクホークス', dragons: '中日ドラゴンズ', fighters: '北海道日本ハムファイターズ', carp: '広島東洋カープ', baystars: '横浜DeNAベイスターズ', swallows: '東京ヤクルトスワローズ', lions: '埼玉西武ライオンズ', marines: '千葉ロッテマリーンズ', buffaloes: 'オリックス・バファローズ', eagles: '東北楽天ゴールデンイーグルス'};
const teamFlags = {giants: 'assets/giants-flag-trial.png', tigers: 'assets/tigers-flag.png', hawks: 'assets/hawks-flag.png', dragons: 'assets/dragons-flag.png', fighters: 'assets/fighters-flag.png', carp: 'assets/carp-flag.png', baystars: 'assets/baystars-flag.png', swallows: 'assets/swallows-flag.png', lions: 'assets/lions-flag.png', marines: 'assets/marines-flag.png', buffaloes: 'assets/buffaloes-flag.png', eagles: 'assets/eagles-flag.png'};
const leagues = {
  'セントラル・リーグ': ['giants', 'tigers', 'dragons', 'carp', 'baystars', 'swallows'],
  'パシフィック・リーグ': ['hawks', 'fighters', 'lions', 'marines', 'buffaloes', 'eagles']
};
const teamOrder = Object.values(leagues).flat();
const clubNames = {giants:'ジャイアンツ', tigers:'タイガース', dragons:'ドラゴンズ', carp:'カープ', baystars:'ベイスターズ', swallows:'スワローズ', hawks:'ホークス', fighters:'ファイターズ', lions:'ライオンズ', marines:'マリーンズ', buffaloes:'バファローズ', eagles:'イーグルス'};
const world = document.querySelector('#world');
const stage = document.querySelector('#stage');
const pageHost = document.querySelector('#page-host');
const headerHost = document.querySelector('#header-host');
const navHost = document.querySelector('#navigation-host');
const menuHost = document.querySelector('#team-menu-host');
const modal = document.querySelector('#modal');
const content = document.querySelector('#modal-content');
const templates = new Map();
const images = new Map();
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
let team = 'giants';
try { const saved = localStorage.getItem('npb-night-series-team'); if (saved in teams) team = saved; } catch {}
let page = pages.includes(location.hash.slice(1)) ? location.hash.slice(1) : 'home';
let renderTicket = 0;
let menuTicket = 0;
let requestedTeam = team;
let skinTransition;
let finishPageMotion = () => {};
let finishSkinMotion = () => {};
let lightId = 0;
let stopFlagMotion = () => {};
let account = '';
let noticePage = 1;
let noticeView = 'page-1';
let category = 0;
let featuredOffset = 0;
let featured = [];
let lastFocus;
let toastTimer;

function buttonize(node, label, action) {
  const button = document.createElement('button');
  for (const attr of node.attributes) if (!['href', 'role', 'tabindex'].includes(attr.name)) button.setAttribute(attr.name, attr.value);
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
  clearTimeout(toastTimer); toastTimer = setTimeout(() => status.classList.remove('visible'), 3000);
}
async function template(path) {
  if (!templates.has(path)) templates.set(path, fetch(path).then(response => {
    if (!response.ok) throw new Error(`Unable to load ${path}: ${response.status}`);
    return response.text();
  }).then(html => {
    const node = document.createElement('template'); node.innerHTML = html; return node.content.firstElementChild;
  }).catch(error => { templates.delete(path); throw error; }));
  return (await templates.get(path)).cloneNode(true);
}
async function preload(root) {
  const urls = [...root.querySelectorAll('img')].map(image => image.getAttribute('src'));
  for (const node of root.querySelectorAll('[style*="url("]')) {
    for (const match of node.getAttribute('style').matchAll(/url\(["']?([^"')]+)["']?\)/g)) urls.push(match[1]);
  }
  await Promise.all([...new Set(urls)].map(url => {
    if (!images.has(url)) images.set(url, new Promise((resolve, reject) => {
      const image = new Image(); image.onload = resolve; image.onerror = () => { images.delete(url); reject(new Error(`Missing image: ${url}`)); }; image.src = url;
    }));
    return images.get(url);
  }));
}
function resize() {
  const scale = Math.min(document.documentElement.clientWidth / 1920, innerHeight / 1080);
  stage.style.setProperty('--scene-scale', scale);
  stage.style.setProperty('--vertical-space', `${(innerHeight / scale - 1080) / 2}px`);
}
function navigate(name) {
  closeTeamMenu(false);
  if (name === page) return;
  location.hash = name;
}
function closeTeamMenu(focus = false) {
  menuTicket++;
  if (!menuHost.childElementCount) return;
  menuHost.replaceChildren();
  const trigger = headerHost.querySelector('.team-trigger');
  trigger?.setAttribute('aria-expanded', 'false');
  if (focus) trigger?.focus({preventScroll: true});
}
async function selectTeam(key, focusTrigger = false) {
  closeTeamMenu(focusTrigger);
  if (key === requestedTeam) return;
  history.replaceState(null, '', '#home');
  await render('home', key);
  if (focusTrigger && requestedTeam === key && document.activeElement === document.body) {
    headerHost.querySelector('.team-trigger')?.focus({preventScroll: true});
  }
}
async function openTeamMenu() {
  if (menuHost.childElementCount) { closeTeamMenu(true); return; }
  const ticket = ++menuTicket;
  // The exported menu contains the original emblems in both source and optimized builds.
  const source = await template('screens/giants-dropdown.html');
  if (ticket !== menuTicket) return;
  const menu = document.createElement('div');
  menu.id = 'team-menu'; menu.className = 'team-menu'; menu.setAttribute('role', 'menu');
  menu.setAttribute('aria-label', 'チームスキン'); menu.setAttribute('aria-describedby', 'switcher-keys');
  const trigger = headerHost.querySelector('.team-trigger');
  menu.style.left = (trigger.offsetLeft + trigger.offsetWidth / 2) + 'px';
  for (const [league, clubs] of Object.entries(leagues)) {
    const group = document.createElement('div'); group.className = 'league-grid';
    group.setAttribute('role', 'group'); group.setAttribute('aria-label', league);
    const heading = document.createElement('h2'); heading.textContent = league; group.append(heading);
    for (const key of clubs) {
      const exportName = key === 'baystars' ? 'BayStars' : key[0].toUpperCase() + key.slice(1);
      const image = source.querySelector(`[data-name="Team menu / option ${exportName}"] [data-name="Option / emblem"] img`);
      const button = document.createElement('button'); button.type = 'button'; button.dataset.team = key;
      button.setAttribute('role', 'menuitemradio'); button.setAttribute('aria-label', teams[key]); button.title = teams[key];
      button.setAttribute('aria-checked', String(key === requestedTeam)); button.tabIndex = key === requestedTeam ? 0 : -1;
      const emblem = new Image(); emblem.src = image.getAttribute('src'); emblem.alt = ''; emblem.draggable = false;
      const label = document.createElement('span'); label.textContent = clubNames[key];
      button.append(emblem, label); button.addEventListener('click', () => selectTeam(key, true)); group.append(button);
    }
    menu.append(group);
  }
  const hint = document.createElement('p'); hint.id = 'switcher-keys'; hint.className = 'switcher-keys';
  hint.textContent = '← → チーム切替　　Esc 閉じる'; menu.append(hint);
  menu.addEventListener('keydown', event => {
    if (!['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return;
    const options = [...menu.querySelectorAll('[role="menuitemradio"]')];
    const index = options.indexOf(event.target);
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? options.length - 1 : (index + leagues['セントラル・リーグ'].length) % options.length;
    event.preventDefault();
    options.forEach((node, i) => { node.tabIndex = i === next ? 0 : -1; });
    options[next].focus();
  });
  menuHost.replaceChildren(menu); trigger.setAttribute('aria-expanded', 'true');
  menu.querySelector('[aria-checked="true"]').focus({preventScroll: true});
}
document.addEventListener('pointerdown', event => {
  if (!menuHost.contains(event.target) && !event.target.closest('.team-trigger')) closeTeamMenu(false);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') { closeTeamMenu(true); return; }
  if (!['ArrowLeft', 'ArrowRight'].includes(event.key) || event.defaultPrevented || event.isComposing ||
      event.ctrlKey || event.altKey || event.metaKey || event.shiftKey || modal.open ||
      event.target.isContentEditable || event.target.closest?.('input,textarea,select,[role="slider"]')) return;
  const option = event.target.closest?.('[role="menuitemradio"]');
  const current = teamOrder.indexOf(option?.dataset.team || requestedTeam);
  const next = (current + (event.key === 'ArrowRight' ? 1 : -1) + teamOrder.length) % teamOrder.length;
  event.preventDefault();
  selectTeam(teamOrder[next], Boolean(option || event.target.closest?.('.team-trigger')));
});
document.addEventListener('focusin', event => {
  if (menuHost.childElementCount && !menuHost.contains(event.target) && !event.target.closest('.team-trigger')) closeTeamMenu(false);
});

function openModal(title, body) {
  closeTeamMenu(false); lastFocus = document.activeElement;
  const brand = headerHost.querySelector('[data-name="Image / NPB NIGHT SERIES · custom masthead"] img').getAttribute('src');
  content.innerHTML = `<button type="button" class="modal-close" aria-label="閉じる">×</button><img class="modal-brand" src="${brand}" alt="NPB NIGHT SERIES"><h1 id="modal-title">${escapeHtml(title)}</h1>${body}`;
  content.querySelector('.modal-close').onclick = () => modal.close();
  if (!modal.open) modal.showModal();
  content.querySelector('input,textarea,button:not(.modal-close)')?.focus();
}
modal.addEventListener('close', () => { if (lastFocus?.isConnected) lastFocus.focus(); });
modal.addEventListener('click', event => {
  if (event.target === modal) { const r = modal.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) modal.close(); }
});
function login(mode = 'login') {
  if (account && mode === 'login') {
    openModal('マイアカウント', `<p class="modal-copy">${escapeHtml(account)} さん</p><p class="demo-note">デモクレジット：0</p><button class="primary" id="logout">ログアウト</button>`);
    content.querySelector('#logout').onclick = () => { account = ''; updateAccount(); modal.close(); toast('ログアウトしました'); }; return;
  }
  const register = mode === 'register';
  openModal(register ? '会員登録' : 'ログイン', `<form id="account-form"><label>ユーザーID<input name="user" autocomplete="off" placeholder="デモ用のユーザーID" required maxlength="24"></label><label>パスワード<span class="password-field"><input name="password" type="password" autocomplete="off" placeholder="デモ用のパスワード" required minlength="4"><button type="button" id="show-password" aria-label="パスワードを表示">表示</button></span></label>${register ? '<label>パスワード確認<input name="confirm" type="password" required minlength="4" autocomplete="off"></label>' : ''}<p class="form-error" role="alert"></p><button class="primary" type="submit">${register ? '登録してはじめる' : 'ログイン'}</button></form><div class="modal-links"><button id="switch-account">${register ? 'ログインへ戻る' : '会員登録'}</button><button id="reset-password">パスワードをお忘れの方</button></div><p class="demo-note">ローカルデモです。入力内容は送信・保存されません。</p>`);
  const form = content.querySelector('form');
  content.querySelector('#show-password').onclick = event => { const input = form.elements.password; input.type = input.type === 'password' ? 'text' : 'password'; event.target.textContent = input.type === 'password' ? '表示' : '非表示'; };
  content.querySelector('#switch-account').onclick = () => login(register ? 'login' : 'register');
  content.querySelector('#reset-password').onclick = () => support('パスワードのお問い合わせ');
  form.onsubmit = event => {
    event.preventDefault();
    if (register && form.elements.password.value !== form.elements.confirm.value) { form.querySelector('.form-error').textContent = 'パスワードが一致しません。'; return; }
    account = form.elements.user.value.trim(); if (!account) { form.querySelector('.form-error').textContent = 'ユーザーIDを入力してください。'; return; }
    updateAccount(); modal.close(); toast(`${account} さん、ようこそ`);
  };
}
function updateAccount() {
  headerHost.querySelector('.account-credit').textContent = account ? '0' : 'ログイン後に確認';
  const entry = headerHost.querySelector('.login-button');
  entry.setAttribute('aria-label', account ? 'マイアカウント' : 'ログイン'); entry.querySelector('p').textContent = account ? 'マイページ' : 'ログイン';
}
function wallet(type) {
  if (!account) { login(); return; }
  openModal(type, `<p class="modal-copy">デモクレジット <strong>0</strong></p><form><label>金額<input type="number" name="amount" min="1" step="1" placeholder="金額を入力" required></label><button class="primary" type="submit">確認</button></form><p class="demo-note">画面確認用のデモです。実際の入出金は行われません。</p>`);
  content.querySelector('form').onsubmit = event => { event.preventDefault(); const amount = Number(event.target.elements.amount.value); openModal(`${type}の確認`, `<p class="modal-copy">${amount.toLocaleString('ja-JP')} クレジット</p><p class="demo-note">デモのため申請・送金は行われません。</p><button class="primary" id="done">閉じる</button>`); content.querySelector('#done').onclick = () => modal.close(); };
}
function support(title = 'お問い合わせ') {
  openModal(title, '<form><label>件名<input name="subject" required placeholder="お問い合わせの件名"></label><label>内容<textarea name="message" required rows="4" placeholder="内容を入力してください"></textarea></label><button type="submit" class="primary">内容を確認</button></form><p class="demo-note">入力内容は外部に送信されません。</p>');
  content.querySelector('form').onsubmit = event => { event.preventDefault(); openModal('お問い合わせの確認', `<h2>${escapeHtml(event.target.elements.subject.value)}</h2><p class="message-preview">${escapeHtml(event.target.elements.message.value)}</p><p class="demo-note">ローカルデモのため、送信は行われません。</p><button class="primary" id="done">閉じる</button>`); content.querySelector('#done').onclick = () => modal.close(); };
}
function messages() { if (!account) { login(); return; } openModal('メール', '<p class="modal-copy">新しいメッセージはありません。</p>'); }
function gamePreview(title, image) {
  openModal(title, `<img class="game-preview" src="${image}" alt="${escapeHtml(title)}"><p class="demo-note">ゲーム画面のプレビューです。実際のゲームには接続していません。</p><button class="primary" id="back-lobby">ロビーへ戻る</button>`);
  content.querySelector('#back-lobby').onclick = () => modal.close();
}
function gameLobby(title, logo) {
  openModal(title, `${logo ? `<img class="provider-preview" src="${logo}" alt="${escapeHtml(title)}">` : ''}<div class="game-options">${featured.map((game, i) => `<button class="game-option" data-game="${i}"><img src="${game.image}" alt=""><span>${escapeHtml(game.title)}</span></button>`).join('')}</div><p class="demo-note">ローカルデモ · ゲームを選ぶとプレビューが開きます。</p>`);
  content.querySelectorAll('[data-game]').forEach(button => button.onclick = () => { const game = featured[Number(button.dataset.game)]; gamePreview(game.title, game.image); });
}
function wireHeader(header) {
  header.classList.add('world-header');
  buttonize(header.querySelector('[data-name="NPB / Brand / neutral wordmark"]'), 'ホームへ', () => navigate('home')).classList.add('brand-button');
  const actions = {'入金': () => wallet('入金'), '出金': () => wallet('出金'), 'メール': messages, '問合せ': () => support(), 'ログイン': () => login()};
  const services = document.createElement('div'); services.className = 'services';
  for (const [index, label] of Object.keys(actions).entries()) {
    const node = header.querySelector(`[data-name="NPB / Account / ${label}"]`) || header.querySelector(`[data-name="Account / ${index}"]`);
    const button = buttonize(node, label, actions[label]);
    if (index < 4) { button.style.setProperty('--service-index', index); services.append(button); } else button.classList.add('login-button');
  }
  header.append(services);
  const credit = [...header.children].find(node => node.textContent.trim() === 'ログイン後に確認'); credit.classList.add('account-credit');
  const ticker = document.createElement('button'); ticker.type = 'button'; ticker.className = 'header-ticker'; ticker.setAttribute('aria-label', 'お知らせを読む'); ticker.onclick = () => navigate('notice'); header.append(ticker);
  const trigger = buttonize(header.querySelector('[data-name="Team menu / trigger"]'), `スキン変更：${teams[team]}`, openTeamMenu); trigger.classList.add('team-trigger');
  trigger.setAttribute('aria-haspopup', 'menu'); trigger.setAttribute('aria-expanded', String(menuHost.childElementCount > 0));
  trigger.setAttribute('aria-controls', 'team-menu'); trigger.setAttribute('aria-keyshortcuts', 'ArrowLeft ArrowRight');
  trigger.onkeydown = event => { if (event.key === 'ArrowDown') { event.preventDefault(); if (!menuHost.childElementCount) openTeamMenu(); } };
  headerHost.replaceChildren(header); updateAccount();
}
function wireNavigation(nav) {
  nav.classList.add('world-dock');
  [...nav.children].forEach((node, index) => {
    const button = buttonize(node, titles[index], () => {
      const keyboard = button.matches(':focus-visible');
      navigate(pages[index]);
      if (pages[index] === page) button.classList.add('dock-hit');
      if (keyboard) navHost.dataset.restoreFocus = 'true';
    });
    const frame = button.querySelector('[data-name="Dock / outer plate"]');
    frame.classList.add('dock-frame');
    button.querySelector('[data-name="Dock / icon"]').classList.add('dock-symbol');
    addFrameLight(frame.querySelector('img'), 'dock-sweep');
    button.addEventListener('animationend', event => { if (event.animationName === 'dock-confirm') button.classList.remove('dock-hit'); });
    if (pages[index] === page) button.setAttribute('aria-current', 'page');
  });
  navHost.replaceChildren(nav);
  if (navHost.dataset.restoreFocus) {
    nav.querySelector('[aria-current="page"]')?.focus({preventScroll: true});
    delete navHost.dataset.restoreFocus;
  }
}
function addFrameLight(frame, className) {
  const light = document.createElement('span');
  light.className = frame.className + ' ' + className;
  light.style.maskImage = `url("${frame.getAttribute('src')}")`;
  frame.after(light);
}
function wireCardMotion(button, live = false) {
  button.classList.add(live ? 'live-card' : 'tilt-card');
  const viewport = live ? button.closest('.live-viewport') : null;
  const face = document.createElement('div'); face.className = 'card-face';
  face.append(...button.childNodes); button.append(face);
  let lightMatrix;
  for (const frame of face.querySelectorAll('[data-name="Card / generated metal frame"] img,[data-name^="Frame /"] img')) {
    if (live) { addFrameLight(frame, 'live-frame-sweep'); continue; }
    const lighting = document.querySelector('#frame-normal-light').content.cloneNode(true);
    const filter = lighting.querySelector('filter'); filter.id = `frame-light-${++lightId}`;
    lightMatrix = filter.querySelector('feColorMatrix');
    face.append(lighting);
    const normal = new Image(); normal.alt = ''; normal.className = frame.className + ' card-frame-normal';
    normal.style.filter = `url(#${filter.id})`;
    normal.src = frame.getAttribute('src').replace('assets/', 'assets/hover/').replace('.png', '-normal.png');
    frame.after(normal);
  }
  if (!live) face.querySelector('[data-name="Card / neutral material"],[data-name="Image / baseball editorial"]')?.classList.add('prism-surface');
  let pending = 0, pointerX, pointerY;
  function paint() {
    pending = 0;
    const rect = button.getBoundingClientRect();
    if (viewport) {
      const bounds = viewport.getBoundingClientRect();
      const edgeX = rect.width * .075, edgeY = rect.height * .075;
      const originX = rect.left - bounds.left < edgeX ? 'left' : bounds.right - rect.right < edgeX ? 'right' : 'center';
      const originY = rect.top - bounds.top < edgeY ? 'top' : bounds.bottom - rect.bottom < edgeY ? 'bottom' : 'center';
      face.style.transformOrigin = originX + ' ' + originY;
    }
    const x = Math.max(-1, Math.min(1, 2 * (pointerX - rect.left) / rect.width - 1));
    const y = Math.max(-1, Math.min(1, 2 * (pointerY - rect.top) / rect.height - 1));
    const radius = Math.max(1, Math.hypot(x, y));
    if (lightMatrix) {
      const lx = .87 * x - .16, ly = -.87 * y + .22, lz = .88;
      const length = Math.hypot(lx, ly, lz);
      const row = `${2 * lx / length} ${2 * ly / length} ${2 * lz / length} 0 ${-(lx + ly + lz) / length}`;
      lightMatrix.setAttribute('values', `${row} ${row} ${row} 0 0 0 1 0`);
    }
    face.style.setProperty('--tilt-x', `${16 * y / radius}deg`);
    face.style.setProperty('--tilt-y', `${-16 * x / radius}deg`);
    face.style.setProperty('--light-x', `${50 + 50 * x}%`);
    face.style.setProperty('--light-y', `${50 + 50 * y}%`);
    face.style.setProperty('--prism-spectrum-x', `${50 + (42 * x + 18 * y) / radius}%`);
    button.classList.add('tracking-light');
  }
  function track(event) {
    if (reduceMotion.matches || event.pointerType === 'touch' || !event.isPrimary) return;
    pointerX = event.clientX; pointerY = event.clientY;
    if (!pending) pending = requestAnimationFrame(paint);
  }
  function release() { cancelAnimationFrame(pending); pending = 0; button.classList.remove('tracking-light'); }
  button.addEventListener('pointerenter', track); button.addEventListener('pointermove', track);
  for (const event of ['pointerleave', 'pointercancel', 'click', 'blur']) button.addEventListener(event, release);
}
function wrapCard(button) {
  const slot = document.createElement('div'); slot.className = 'card-slot';
  button.replaceWith(slot); slot.append(button); return slot;
}
function extractFeatured(home) {
  return [...home.querySelectorAll('[data-name^="Featured / Slot"]')].map(card => ({title: [...card.querySelectorAll('p')].find(p => !/^\d+$/.test(p.textContent.trim())).textContent, image: card.querySelector('[data-name="Card / neutral material"] img').getAttribute('src')}));
}
function wireHome(scene) {
  const hero = scene.querySelector('[data-name="Hero / club mark and player"]'); hero.classList.add('hero');
  const player = hero.querySelector('[data-name="Hero / full-body player composition"]') || hero.querySelector('[data-name$="editorial cutout"],[data-name$="original photograph"]');
  player.classList.add('hero-player');
  const panel = scene.querySelector('[data-name="Home / featured games carousel"]'); panel.classList.add('featured-panel');
  const grid = document.createElement('div'); grid.className = 'featured-grid';
  const cards = [...panel.querySelectorAll('[data-name^="Featured / Slot"]')].map((node, index) => {
    const button = buttonize(node, featured[index].title, () => gamePreview(featured[index].title, featured[index].image));
    button.classList.add('game-card');
    button.dataset.rank = String(index + 1);
    const frame = button.querySelector('[data-name="Card / generated metal frame"] img');
    button.style.setProperty('--edition-frame-mask', `url("${frame.getAttribute('src')}")`);
    wireCardMotion(button); return wrapCard(button);
  });
  for (let index = 0; index < cards.length; index++) grid.append(cards[(index + featuredOffset) % cards.length]);
  panel.append(grid);
  for (const [name, direction, label] of [['previous', -1, '前のおすすめゲーム'], ['next', 1, '次のおすすめゲーム']]) {
    buttonize(panel.querySelector(`[data-name="Carousel / ${name}"]`), label, () => {
      featuredOffset = (featuredOffset + direction + cards.length) % cards.length;
      if (direction > 0) grid.append(grid.firstElementChild); else grid.prepend(grid.lastElementChild);
      if (!reduceMotion.matches) grid.animate([{opacity: .45, translate: `${direction * 20}px 0`}, {opacity: 1, translate: '0 0'}], {duration: 450, easing: 'ease-out'});
    }).classList.add('carousel-arrow');
  }
}
function wireProviders(scene) {
  const panel = scene.querySelector(page === 'live' ? '[data-name="Live / provider panel and card grid"]' : '[data-name="Providers / 5 + 5 + 4"]');
  panel.classList.add(page === 'live' ? 'live-grid' : 'slot-grid');
  const cards = page === 'live' ? panel.querySelector('.live-cards') : panel;
  [...cards.children].forEach(node => {
    const label = node.querySelector('p')?.textContent; if (!label) return;
    const logo = node.querySelector('[data-name^="Provider / existing"] img')?.getAttribute('src');
    const button = buttonize(node, label, () => gameLobby(label, logo));
    button.classList.add('provider-card');
    wireCardMotion(button, page === 'live');
    if (page === 'slots') wrapCard(button);
  });
  if (page === 'slots') {
    scene.querySelector('[data-name="Slots / provider panel"]').classList.add('slots-panel');
    const categories = scene.querySelector('[data-name^="Category /"]').parentElement; categories.classList.add('slot-categories');
    categories.parentElement.prepend(categories);
    const buttons = [...categories.children].map((node, index) => {
      const button = buttonize(node, node.textContent.trim(), () => { category = index; selectCategory(); });
      button.querySelector('[data-name="Selected / team highlight"]')?.remove(); return button;
    });
    const selectCategory = () => buttons.forEach((button, index) => button.setAttribute('aria-pressed', String(index === category)));
    selectCategory();
  }
}
async function showNotice(board, view = noticeView, focus = false) {
  noticeView = view;
  const root = await template(`notices/${view}.html`);
  const article = view.startsWith('article'); root.classList.add(article ? 'notice-article' : 'notice-list');
  if (!article) {
    root.querySelectorAll('[data-name="Posts / five rows"] > *').forEach((node, index) => buttonize(node, node.querySelector('p').textContent, () => showNotice(board, `article-${(noticePage - 1) * 5 + index + 1}`, true)));
    root.querySelectorAll('[data-name="Pagination / pages 1 to 4"] > *').forEach((node, index) => {
      const button = buttonize(node, `${index + 1}ページ`, () => { noticePage = index + 1; showNotice(board, `page-${noticePage}`, true); });
      if (noticePage === index + 1) button.setAttribute('aria-current', 'page');
    });
  } else {
    const node = [...root.children].find(child => child.textContent.trim() === '戻る');
    buttonize(node, '一覧へ戻る', () => showNotice(board, `page-${noticePage}`, true)).classList.add('notice-back');
  }
  board.replaceChildren(root);
  if (focus) root.querySelector(article ? '.notice-back' : '[aria-current="page"]')?.focus({preventScroll: true});
}
async function transitionTeamFlag(nextTeam, applyScene, ticket) {
  const cover = document.createElement('div');
  cover.className = 'skin-flag-cover'; cover.dataset.team = nextTeam; cover.setAttribute('aria-hidden', 'true');
  const image = new Image(); image.alt = ''; image.src = teamFlags[nextTeam]; cover.append(image);
  await image.decode();
  if (ticket !== renderTicket) return;
  if (reduceMotion.matches) { await applyScene(); return; }
  const started = performance.now();
  stage.append(cover);
  const stop = animateTeamFlag(cover, reduceMotion);
  const motions = [];
  const finish = () => { motions.forEach(animation => animation.cancel()); stop(); cover.remove(); };
  finishSkinMotion = finish;
  try {
    const reveal = cover.animate([{clipPath: 'inset(0 100% 0 0)'}, {clipPath: 'inset(0 0% 0 0)'}], {duration: 220, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'both'});
    reveal.id = 'skin-flag-cover'; motions.push(reveal);
    await reveal.finished.catch(() => {});
    if (ticket !== renderTicket) return;
    const applied = applyScene();
    if (ticket !== renderTicket || reduceMotion.matches || !cover.isConnected) { await applied; return; }
    // Include the scene swap and flag setup in the 580 ms wipe.
    const remaining = Math.max(0, 580 - (performance.now() - started));
    const dissolve = cover.animate([{opacity: 1}, {opacity: 0}], {duration: remaining, easing: 'ease-in-out', fill: 'both'});
    dissolve.id = 'skin-flag-dissolve'; motions.push(dissolve);
    await Promise.all([applied, dissolve.finished.catch(() => {}).then(() => cover.remove())]);
  } finally {
    finish();
    if (finishSkinMotion === finish) finishSkinMotion = () => {};
  }
}
async function render(nextPage = page, nextTeam = team) {
  const ticket = ++renderTicket; world.setAttribute('aria-busy', 'true'); closeTeamMenu(false);
  requestedTeam = nextTeam;
  skinTransition?.skipTransition();
  finishPageMotion();
  finishSkinMotion();
  document.documentElement.removeAttribute('data-page-transition');
  const switchingSkin = nextTeam !== team && pageHost.querySelector('.scene') && !reduceMotion.matches;
  const switchingPage = nextPage !== page && nextTeam === team && pageHost.querySelector('.scene') && !reduceMotion.matches;
  const direction = pages.indexOf(nextPage) >= pages.indexOf(page) ? 1 : -1;
  try {
    const [scene, home] = await Promise.all([template(`screens/${nextTeam}-${nextPage}.html`), template(`screens/${nextTeam}-home.html`)]);
    const homeBackground = scene.querySelector('[data-name="Background / common ballpark photograph"] img');
    if (homeBackground) {
      const stadium = await template(`screens/${nextTeam}-notice.html`);
      homeBackground.src = stadium.querySelector('[data-name="Background / generated team ballpark"] img').getAttribute('src');
      homeBackground.style.opacity = '1';
    }
    const flagLayer = document.createElement('div');
    flagLayer.dataset.name = 'Background / Team flag overlay';
    flagLayer.className = 'team-flag-background';
    const flagImage = new Image(); flagImage.alt = ''; flagImage.src = teamFlags[nextTeam];
    flagLayer.append(flagImage);
    scene.querySelector('[data-name="Background / dock shade"]').before(flagLayer);
    await Promise.all([preload(scene), preload(home)]); if (ticket !== renderTicket) return;
    if (nextPage === 'notice') await template(`notices/${page !== 'notice' || team !== nextTeam ? 'page-1' : noticeView}.html`);
    const applyScene = async () => {
    if (ticket !== renderTicket) return;
    if (nextPage === 'notice' && (page !== 'notice' || team !== nextTeam)) {
      noticePage = 1;
      noticeView = 'page-1';
    }
    page = nextPage; team = nextTeam; document.body.dataset.team = team; world.dataset.page = page;
    try { localStorage.setItem('npb-night-series-team', team); } catch {}
    scene.classList.add('scene'); scene.dataset.scene = page; scene.style.background = 'transparent';
    scene.querySelector('[data-name*="section hotspot"]')?.remove();
    const header = scene.querySelector('[data-name="Header / panel"]').parentElement;
    const nav = scene.querySelector('[data-name="Dock / outer plate"]').parentElement.parentElement;
    wireHeader(header); wireNavigation(nav);
    const backgrounds = [...scene.children].filter(node => /^(Background \/|Readability \/)/.test(node.dataset.name || ''));
    for (const node of backgrounds) node.classList.add(node.dataset.name === 'Background / dock shade' ? 'background-dock-shade' : 'background-layer');
    stopFlagMotion(); stopFlagMotion = () => {};
    document.querySelector('#backgrounds').replaceChildren(...backgrounds);
    featured = extractFeatured(home);
    if (page === 'home') wireHome(scene);
    if (page === 'live' || page === 'slots') wireProviders(scene);
    if (page === 'notice') { const board = scene.querySelector('[data-name="Notice / reading panel"]').parentElement; board.classList.add('notice-board'); await showNotice(board); }
    if (ticket !== renderTicket) return;
    pageHost.replaceChildren(scene);
    // Wait for the newly inserted image elements before taking the transition snapshot.
    await Promise.all([...world.querySelectorAll('img')].map(image => image.decode()));
    if (ticket !== renderTicket) return;
    stopFlagMotion = animateTeamFlag(flagLayer, reduceMotion);
    document.title = `${titles[pages.indexOf(page)]} | ${teams[team]} | NPB NIGHT SERIES`;
    document.querySelector('meta[name="theme-color"]').content = getComputedStyle(document.body).getPropertyValue('--base').trim();
    resize();
    };
    if (switchingSkin) {
      await transitionTeamFlag(nextTeam, applyScene, ticket);
    } else if (switchingPage && document.startViewTransition) {
        document.documentElement.setAttribute('data-page-transition', '');
        document.documentElement.style.setProperty('--page-direction', direction);
        const scale = Number(stage.style.getPropertyValue('--scene-scale'));
        document.documentElement.style.setProperty('--page-travel', `${1080 * scale}px`);
      const transition = document.startViewTransition(applyScene);
      skinTransition = transition;
      await transition.updateCallbackDone;
      await transition.finished;
      if (ticket === renderTicket) document.documentElement.removeAttribute('data-page-transition');
    } else if (switchingPage) {
      const old = pageHost.querySelector('.scene');
      await applyScene();
      if (ticket !== renderTicket) return;
      old.classList.add('leaving'); old.inert = true; old.setAttribute('aria-hidden', 'true');
      pageHost.prepend(old);
      const motions = [
        old.animate([{transform: 'translateY(0)', opacity: 1}, {transform: `translateY(${-direction * 1080}px)`, opacity: .15}], {duration: 380, easing: 'cubic-bezier(.65,0,.35,1)', fill: 'forwards'}),
        scene.animate([{transform: `translateY(${direction * 1080}px)`, opacity: .4}, {transform: 'translateY(0)', opacity: 1}], {duration: 460, easing: 'cubic-bezier(.22,1,.36,1)'}),
        document.querySelector('#backgrounds').animate([{opacity: .4}, {opacity: 1}], {duration: 700, easing: 'ease'})
      ];
      const finish = () => { motions.forEach(animation => animation.cancel()); old.remove(); };
      finishPageMotion = finish;
      motions[0].finished.then(() => old.remove()).catch(() => {});
      await Promise.allSettled(motions.map(animation => animation.finished));
      finish();
      if (finishPageMotion === finish) finishPageMotion = () => {};
    } else await applyScene();
    if (ticket === renderTicket) world.setAttribute('aria-busy', 'false');
  } catch (error) {
    if (ticket !== renderTicket) return;
    document.documentElement.removeAttribute('data-page-transition');
    requestedTeam = team;
    world.setAttribute('aria-busy', 'false'); console.error(error);
    if (!pageHost.querySelector('.scene')) pageHost.innerHTML = '<p class="load-error">画面を読み込めませんでした。ページを再読み込みしてください。</p>';
    else toast('画面を読み込めませんでした。もう一度お試しください。');
  }
}
addEventListener('resize', resize);
addEventListener('hashchange', () => render(pages.includes(location.hash.slice(1)) ? location.hash.slice(1) : 'home', requestedTeam));
reduceMotion.addEventListener('change', () => { if (reduceMotion.matches) { skinTransition?.skipTransition(); finishPageMotion(); finishSkinMotion(); } });
if (!pages.includes(location.hash.slice(1))) history.replaceState(null, '', '#home');
render();
