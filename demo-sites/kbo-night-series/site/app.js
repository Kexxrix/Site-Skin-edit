const pages = ['home', 'live', 'slots', 'notice'];
const titles = ['추천게임', '라이브 카지노', '슬롯게임', '공지사항'];
const teams = {
  kia: 'KIA 타이거즈', lg: 'LG 트윈스', doosan: '두산 베어스', lotte: '롯데 자이언츠', hanwha: '한화 이글스',
  samsung: '삼성 라이온즈', ssg: 'SSG 랜더스', kt: 'KT 위즈', kiwoom: '키움 히어로즈', nc: 'NC 다이노스'
};
// Reuse the full-size Figma home emblems in the switcher.
const teamEmblems = {
  kia: 'assets/figma/125d29e802fd7ce083e0bcd8.png',
  lg: 'assets/figma/dde1a4d0bc81d5a6a44c2de0.png',
  doosan: 'assets/figma/6218cb26709af48a6d3130ff.png',
  lotte: 'assets/figma/446f6161b6cf3c54de1208ce.png',
  hanwha: 'assets/figma/bfd9f7790f91e139b016dab5.png',
  samsung: 'assets/figma/6ef490b65c4b62ed6a9e0c7e.png',
  ssg: 'assets/figma/f1ab1d52d1110fb9e7d2ea8c.png',
  kt: 'assets/figma/8f30afb83b45557f6bf31fd7.png',
  kiwoom: 'assets/figma/55716b4399c27c11c1772e38.png',
  nc: 'assets/figma/fe936da5ecbb7a25659f375b.png'
};
const allStarGroups = {
  '드림 올스타': ['ssg', 'samsung', 'kt', 'lotte', 'doosan'],
  '나눔 올스타': ['lg', 'hanwha', 'nc', 'kia', 'kiwoom']
};
const teamOrder = Object.values(allStarGroups).flat();
const world = document.querySelector('#world');
const stage = document.querySelector('#stage');
const pageHost = document.querySelector('#page-host');
const headerHost = document.querySelector('#header-host');
const teamTrigger = headerHost.querySelector('.team-trigger');
const navHost = document.querySelector('#navigation-host');
const menuHost = document.querySelector('#team-menu-host');
const modal = document.querySelector('#modal');
const content = document.querySelector('#modal-content');
const templates = new Map();
const images = new Map();
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
let team = 'kia';
try { const saved = localStorage.getItem('kbo-night-series-team'); if (Object.hasOwn(teams, saved)) team = saved; } catch {}
let page = pages.includes(location.hash.slice(1)) ? location.hash.slice(1) : 'home';
let renderTicket = 0;
let requestedTeam = team;
let finishPageMotion = () => {};
let finishSkinMotion = () => {};
let lightId = 0;
let stopFlagMotion = () => {};
let account = '';
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
      const image = new Image(); image.onload = () => resolve(); image.onerror = () => { images.delete(url); reject(new Error(`Missing image: ${url}`)); }; image.src = url;
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
  if (location.hash !== '#' + name) location.hash = name;
  else if (name !== page && world.getAttribute('aria-busy') === 'false') render(name, requestedTeam);
}
function closeTeamMenu(focus = false) {
  if (!menuHost.childElementCount) return;
  menuHost.replaceChildren();
  teamTrigger.setAttribute('aria-expanded', 'false');
  if (focus) teamTrigger.focus({preventScroll: true});
}
function updateTeamTrigger(key) {
  teamTrigger.querySelector('.trigger-emblem').src = teamEmblems[key];
  teamTrigger.querySelector('.trigger-label').textContent = teams[key];
  teamTrigger.setAttribute('aria-label', '구단 스킨 선택 · ' + teams[key]);
}
function selectTeam(key, focusTrigger = false) {
  closeTeamMenu(focusTrigger);
  if (key === requestedTeam) return;
  history.replaceState(null, '', '#home');
  render('home', key);
}
function openTeamMenu() {
  if (menuHost.childElementCount) { closeTeamMenu(true); return; }
  const menu = document.createElement('div');
  menu.id = 'team-menu'; menu.className = 'team-menu'; menu.setAttribute('role', 'menu');
  menu.setAttribute('aria-label', 'KBO 구단 선택'); menu.setAttribute('aria-describedby', 'switcher-keys');
  menu.style.left = (teamTrigger.offsetLeft + teamTrigger.offsetWidth / 2) + 'px';
  for (const [groupName, clubs] of Object.entries(allStarGroups)) {
    const grid = document.createElement('div'); grid.className = 'club-grid';
    grid.setAttribute('role', 'group'); grid.setAttribute('aria-label', groupName);
    const heading = document.createElement('h2'); heading.textContent = groupName; grid.append(heading);
    for (const key of clubs) {
      const button = document.createElement('button'); button.type = 'button'; button.dataset.team = key;
      button.setAttribute('role', 'menuitemradio'); button.setAttribute('aria-label', teams[key]);
      button.setAttribute('aria-checked', String(key === requestedTeam)); button.tabIndex = key === requestedTeam ? 0 : -1;
      const emblem = new Image(); emblem.src = teamEmblems[key]; emblem.alt = ''; emblem.draggable = false;
      const label = document.createElement('span'); label.textContent = teams[key];
      button.append(emblem, label); button.addEventListener('click', () => selectTeam(key, true)); grid.append(button);
    }
    menu.append(grid);
  }
  const hint = document.createElement('p'); hint.id = 'switcher-keys'; hint.className = 'switcher-keys';
  hint.textContent = '← → 구단 전환　 Esc 닫기'; menu.append(hint);
  menu.addEventListener('keydown', event => {
    if (!['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return;
    const options = [...menu.querySelectorAll('[role="menuitemradio"]')];
    const index = options.indexOf(event.target);
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? options.length - 1 : (index + options.length / 2) % options.length;
    event.preventDefault();
    options.forEach((node, i) => { node.tabIndex = i === next ? 0 : -1; });
    options[next].focus();
  });
  menuHost.replaceChildren(menu); teamTrigger.setAttribute('aria-expanded', 'true');
  menu.querySelector('[aria-checked="true"]').focus({preventScroll: true});
}
teamTrigger.addEventListener('click', openTeamMenu);
teamTrigger.addEventListener('keydown', event => {
  if (event.key === 'ArrowDown') {
    event.preventDefault();
    if (!menuHost.childElementCount) openTeamMenu();
  }
});
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
  const brand = headerHost.querySelector('.brand-button img').getAttribute('src');
  content.innerHTML = `<button type="button" class="modal-close" aria-label="닫기">×</button><img class="modal-brand" src="${brand}" alt="KBO NIGHT SERIES"><h1 id="modal-title">${escapeHtml(title)}</h1>${body}`;
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
    openModal('내 계정', `<p class="modal-copy">${escapeHtml(account)}님</p><p class="demo-note">데모 크레딧 0</p><button class="primary" id="logout">로그아웃</button>`);
    content.querySelector('#logout').onclick = () => { account = ''; updateAccount(); modal.close(); toast('로그아웃했습니다.'); }; return;
  }
  const register = mode === 'register';
  openModal(register ? '회원가입' : '로그인', `<form id="account-form"><label>아이디<input name="user" autocomplete="off" placeholder="데모용 아이디" required maxlength="24"></label><label>비밀번호<span class="password-field"><input name="password" type="password" autocomplete="off" placeholder="데모용 비밀번호" required minlength="4"><button type="button" id="show-password" aria-label="비밀번호 표시">표시</button></span></label>${register ? '<label>비밀번호 확인<input name="confirm" type="password" required minlength="4" autocomplete="off"></label>' : ''}<p class="form-error" role="alert"></p><button class="primary" type="submit">${register ? '가입하기' : '로그인'}</button></form><div class="modal-links"><button id="switch-account">${register ? '로그인으로 돌아가기' : '회원가입'}</button><button id="reset-password">비밀번호 찾기</button></div><p class="demo-note">화면 체험용 계정입니다. 데모용 아이디와 비밀번호를 입력해 주세요.</p>`);
  const form = content.querySelector('form');
  content.querySelector('#show-password').onclick = event => { const input = form.elements.password; input.type = input.type === 'password' ? 'text' : 'password'; event.target.textContent = input.type === 'password' ? '표시' : '숨기기'; };
  content.querySelector('#switch-account').onclick = () => login(register ? 'login' : 'register');
  content.querySelector('#reset-password').onclick = () => support('비밀번호 문의');
  form.onsubmit = event => {
    event.preventDefault();
    if (register && form.elements.password.value !== form.elements.confirm.value) { form.querySelector('.form-error').textContent = '비밀번호가 일치하지 않습니다.'; return; }
    account = form.elements.user.value.trim(); if (!account) { form.querySelector('.form-error').textContent = '아이디를 입력해 주세요.'; return; }
    updateAccount(); modal.close(); toast(`${account} 님, 환영합니다.`);
  };
}
function updateAccount() {
  headerHost.querySelector('.account-credit').textContent = account ? '0' : '로그인 후 확인';
  const entry = headerHost.querySelector('.login-button');
  entry.setAttribute('aria-label', account ? '내 계정' : '로그인'); entry.querySelector('p').textContent = account ? '내 계정' : '로그인';
}
function wallet(type) {
  if (!account) { login(); return; }
  openModal(type, `<p class="modal-copy">데모 크레딧 <strong>0</strong></p><form><label>금액<input type="number" name="amount" min="1" step="1" placeholder="금액 입력" required></label><button class="primary" type="submit">확인</button></form><p class="demo-note">충전·환전 화면을 체험할 수 있습니다.</p>`);
  content.querySelector('form').onsubmit = event => { event.preventDefault(); const amount = Number(event.target.elements.amount.value); openModal(`${type} 확인`, `<p class="modal-copy">${amount.toLocaleString('ko-KR')} 크레딧</p><p class="demo-note">데모 금액을 확인했습니다.</p><button class="primary" id="done">닫기</button>`); content.querySelector('#done').onclick = () => modal.close(); };
}
function support(title = '문의') {
  openModal(title, '<form><label>제목<input name="subject" required placeholder="문의 제목"></label><label>내용<textarea name="message" required rows="4" placeholder="문의 내용을 입력해 주세요"></textarea></label><button type="submit" class="primary">내용 확인</button></form><p class="demo-note">데모용 문의 내용을 입력해 주세요.</p>');
  content.querySelector('form').onsubmit = event => { event.preventDefault(); openModal('문의 내용 확인', `<h2>${escapeHtml(event.target.elements.subject.value)}</h2><p class="message-preview">${escapeHtml(event.target.elements.message.value)}</p><p class="demo-note">데모 문의 미리보기입니다.</p><button class="primary" id="done">닫기</button>`); content.querySelector('#done').onclick = () => modal.close(); };
}
function messages() { if (!account) { login(); return; } openModal('쪽지', '<p class="modal-copy">받은 쪽지가 없습니다.</p>'); }
function gamePreview(title, image) {
  openModal(title, `<img class="game-preview" src="${image}" alt="${escapeHtml(title)}"><p class="demo-note">게임 미리보기입니다.</p><button class="primary" id="back-lobby">닫기</button>`);
  content.querySelector('#back-lobby').onclick = () => modal.close();
}
function gameLobby(title, logo) {
  openModal(title, `${logo ? `<img class="provider-preview" src="${logo}" alt="${escapeHtml(title)}">` : ''}<div class="game-options">${featured.map((game, i) => `<button class="game-option" data-game="${i}"><img src="${game.image}" alt=""><span>${escapeHtml(game.title)}</span></button>`).join('')}</div><p class="demo-note">게임을 선택하면 미리보기가 열립니다.</p>`);
  content.querySelectorAll('[data-game]').forEach(button => button.onclick = () => { const game = featured[Number(button.dataset.game)]; gamePreview(game.title, game.image); });
}
// Keep each exported image and its text together when it becomes an interactive control.
function designOffset(node, axis) {
  const token = [...node.classList].find(name => name.startsWith(axis + '-['));
  return token ? parseFloat(token.slice(axis.length + 2)) : 0;
}
function groupPlateLayers(plate, count) {
  const x = designOffset(plate, 'left'), y = designOffset(plate, 'top');
  for (let i = 0; i < count; i++) {
    const layer = plate.nextElementSibling;
    layer.style.left = (designOffset(layer, 'left') - x) + 'px';
    layer.style.top = (designOffset(layer, 'top') - y) + 'px';
    plate.append(layer);
  }
}
function groupPlate(plate, count, action, label) {
  groupPlateLayers(plate, count);
  return buttonize(plate, label, action);
}
function wireHeader(header) {
  header.classList.add('world-header');
  const plate = name => header.querySelector('[data-name="' + name + '"]');
  groupPlate(plate('KBO NIGHT SERIES 로고'), 0, () => navigate('home'), '추천게임으로 이동').classList.add('brand-button');
  groupPlate(plate('안내 · 이미지'), 2, () => navigate('notice'), '공지사항 보기').classList.add('ticker-button');
  const services = document.createElement('div'); services.className = 'services';
  const actions = [
    ['deposit', '충전', () => wallet('충전')], ['withdraw', '환전', () => wallet('환전')],
    ['mail', '쪽지', messages], ['support', '문의', () => support()]
  ];
  actions.forEach(([name, label, action]) => {
    const button = groupPlate(plate(name + ' · 이미지'), 1, action, label);
    services.append(button);
  });
  header.append(services);
  groupPlate(plate('로그인 · 이미지'), 1, () => login(), '로그인').classList.add('login-button');
  [...header.querySelectorAll('p')].find(p => p.textContent === '로그인 후 확인').classList.add('account-credit');
  // The interactive trigger stays mounted when a scene replaces its exported header.
  const exportedTrigger = plate('구단 스킨 · 이미지');
  exportedTrigger.nextElementSibling.remove();
  exportedTrigger.remove();
  const previous = headerHost.querySelector('.world-header');
  if (previous) previous.replaceWith(header); else headerHost.prepend(header);
  teamTrigger.hidden = false;
  updateAccount();
}
function wireNavigation(nav) {
  const dock = navHost.firstElementChild;
  nav.classList.add('world-dock');
  titles.forEach((label, index) => {
    const plate = nav.querySelector('[data-name="' + label + ' · 이미지"]');
    groupPlateLayers(plate, 2);
    const button = dock?.children[index] ?? buttonize(plate, label, event => {
      event.currentTarget.classList.add('dock-hit');
      navigate(pages[index]);
    });
    if (dock) {
      // Keep the pressed button and its face mounted through pointerup.
      button.querySelector('.dock-face').replaceChildren(...plate.childNodes);
    } else {
      const face = document.createElement('span'); face.className = 'dock-face';
      face.append(...button.childNodes); button.append(face);
      button.dataset.page = pages[index];
      button.addEventListener('animationend', event => { if (event.animationName === 'dock-confirm') button.classList.remove('dock-hit'); });
    }
    const image = button.querySelector('img'); image.classList.add('dock-frame');
    addFrameLight(image, 'dock-sweep');
    button.classList.remove('dock-hit');
    button.removeAttribute('aria-busy');
    if (pages[index] === page) button.setAttribute('aria-current', 'page');
    else button.removeAttribute('aria-current');
  });
  if (dock) { dock.dataset.name = nav.dataset.name; nav.remove(); }
  else navHost.append(nav);
}
function groupTitle(scene) {
  const image = scene.querySelector(':scope > [data-name*="타이틀"][class*="w-[520px]"]');
  const title = document.createElement('div'); title.className = image.className + ' section-title';
  const x = designOffset(image,'left'), y = designOffset(image,'top');
  scene.insertBefore(title,image);
  const first = image.nextElementSibling, second = first.nextElementSibling;
  for (const layer of [image,first,second]) {
    layer.style.left = (designOffset(layer,'left') - x) + 'px';
    layer.style.top = (designOffset(layer,'top') - y) + 'px';
    title.append(layer);
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
  const face = document.createElement('div'); face.className = 'card-face';
  face.append(...button.childNodes); button.append(face);
  let lightMatrix;
  for (const frame of face.querySelectorAll('[data-name*="프레임"] img')) {
    if (live) { addFrameLight(frame, 'live-frame-sweep'); continue; }
    const lighting = document.querySelector('#frame-normal-light').content.cloneNode(true);
    const filter = lighting.querySelector('filter'); filter.id = `frame-light-${++lightId}`;
    lightMatrix = filter.querySelector('feColorMatrix');
    face.append(lighting);
    const normal = new Image(); normal.alt = ''; normal.className = frame.className + ' card-frame-normal';
    normal.style.filter = `url(#${filter.id})`;
    normal.src = `hover/${frame.getAttribute('src').split('/').pop().replace(/\.\w+$/, '')}-normal.png`;
    frame.after(normal);
  }
  if (!live) {
    const surface = face.firstElementChild;
    const artwork = surface.querySelector('img');
    surface.classList.add('prism-surface');
    surface.style.maskImage = `url("${artwork.getAttribute('src')}")`;
  }
  let pending = 0, pointerX, pointerY;
  function paint() {
    pending = 0;
    const rect = button.getBoundingClientRect();
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
function featuredCards(root) {
  const carousel = root.querySelector('[data-name="캐러셀 패널"]').parentElement;
  return [...carousel.children].filter(node => node.querySelector('p'));
}
function extractFeatured(home) {
  return featuredCards(home).map(card => ({title:card.querySelector('p').textContent, image:card.querySelector('img').getAttribute('src')}));
}
function wireHome(scene) {
  const panel = scene.querySelector('[data-name="캐러셀 패널"]').parentElement;
  panel.classList.add('featured-panel');
  const hero = document.createElement('div'); hero.className = 'hero';
  const player = scene.querySelector(':scope > [data-name^="선수 ·"]');
  const logo = scene.querySelector(':scope > [data-name*="구단 엠블럼"]');
  const title = scene.querySelector(':scope > [data-name^="타이틀 ·"]');
  player.classList.add('hero-player'); logo.classList.add('hero-mark'); title.classList.add('hero-title');
  logo.querySelector('img').alt = teams[team]; player.querySelector('img').alt = player.dataset.name.replace('선수 · ','');
  scene.prepend(hero); hero.append(player,logo,title);
  const grid = document.createElement('div'); grid.className = 'featured-grid';
  const cards = featuredCards(scene).map((node, index) => {
    const game = featured[index];
    const button = buttonize(node, `${index + 1}위 ${game.title}`, () => gamePreview(game.title, game.image));
    button.classList.add('game-card'); button.dataset.rank = String(index + 1);
    const frame = button.querySelector('[data-name="건메탈 프레임"] img');
    button.style.setProperty('--edition-frame-mask', `url("${frame.getAttribute('src')}")`);
    wireCardMotion(button); return wrapCard(button);
  });
  for (let index = 0; index < cards.length; index++) grid.append(cards[(index + featuredOffset) % cards.length]);
  panel.append(grid);
  for (const [name, direction] of [['이전', -1], ['다음', 1]]) {
    buttonize(panel.querySelector('[data-name="' + name + '"]'), name + ' 추천게임', () => {
      featuredOffset = (featuredOffset + direction + cards.length) % cards.length;
      if (direction > 0) grid.append(grid.firstElementChild); else grid.prepend(grid.lastElementChild);
      if (!reduceMotion.matches) grid.animate([{opacity:.45, translate:direction * 20 + 'px 0'}, {opacity:1,translate:'0 0'}], {duration:450,easing:'ease-out'});
    }).classList.add('carousel-arrow');
  }
}
function wireProviders(scene) {
  const live = page === 'live';
  const panel = scene.querySelector(live ? '[data-name="제공사 카드 · NPB 그리드"]' : '[data-name="제공사 · 5 + 5 + 4"]');
  panel.classList.add(live ? 'live-grid' : 'slot-grid');
  [...panel.children].forEach(node => {
    const label = node.querySelector('p')?.textContent; if (!label) return;
    const logo = node.querySelector('[data-name^="제공사 로고"] img')?.getAttribute('src');
    const button = buttonize(node,label,() => gameLobby(label,logo)); button.classList.add('provider-card');
    wireCardMotion(button,live); wrapCard(button);
  });
  if (live) return;
  panel.parentElement.classList.add('slots-panel');
  const categories = scene.querySelector('[data-name="인기게임"]').parentElement;
  categories.classList.add('slot-categories'); panel.before(categories);
  const activeTeam = team === 'lg' ? 'kia' : team;
  const buttons = [...categories.children].map((node,index) => {
    const button = buttonize(node,node.textContent.trim(),() => { category = index; selectCategory(); });
    const image = button.querySelector('img');
    const initial = image.getAttribute('src');
    image.dataset.idle = index === 0 ? 'categories/idle-0.png' : initial;
    image.dataset.active = index === 0 ? initial : 'categories/' + activeTeam + '-' + index + '.png';
    return button;
  });
  function selectCategory() {
    buttons.forEach((button,index) => {
      const selected = index === category;
      button.setAttribute('aria-pressed', String(selected));
      const image = button.querySelector('img');
      image.src = selected ? image.dataset.active : image.dataset.idle;
    });
  }
  selectCategory();
}
async function transitionTeamFlag(nextTeam, applyScene, ticket) {
  const cover = document.createElement('div');
  cover.className = 'skin-flag-cover'; cover.dataset.team = nextTeam; cover.setAttribute('aria-hidden', 'true');
  const image = new Image(); image.alt = ''; image.src = `flags/${nextTeam}.webp`; cover.append(image);
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
function animatePageChange(old, scene, oldBackground, background, direction) {
  old.classList.add('leaving'); old.inert = true; old.setAttribute('aria-hidden', 'true');
  pageHost.prepend(old);
  background.before(oldBackground);
  const motions = [
    old.animate([{transform: 'translateY(0)', opacity: 1}, {transform: `translateY(${-direction * 1080}px)`, opacity: .15}], {duration: 380, easing: 'cubic-bezier(.65,0,.35,1)', fill: 'forwards'}),
    scene.animate([{transform: `translateY(${direction * 1080}px)`, opacity: .4}, {transform: 'translateY(0)', opacity: 1}], {duration: 460, easing: 'cubic-bezier(.22,1,.36,1)'}),
    oldBackground.animate([{opacity: 1}, {opacity: 0}], {duration: 700, easing: 'ease', fill: 'forwards'}),
    background.animate([{opacity: 0}, {opacity: 1}], {duration: 700, easing: 'ease'})
  ];
  const finish = () => { motions.forEach(animation => animation.cancel()); old.remove(); oldBackground.remove(); };
  finishPageMotion = finish;
  motions[0].finished.then(() => old.remove()).catch(() => {});
  return Promise.allSettled(motions.map(animation => animation.finished)).then(() => {
    finish();
    if (finishPageMotion === finish) finishPageMotion = () => {};
  });
}
async function render(nextPage = page, nextTeam = team) {
  const ticket = ++renderTicket; world.setAttribute('aria-busy', 'true'); closeTeamMenu(false);
  requestedTeam = nextTeam;
  updateTeamTrigger(nextTeam);
  finishPageMotion();
  finishSkinMotion();
  for (const button of navHost.querySelectorAll('button')) {
    if (button.dataset.page === nextPage) button.setAttribute('aria-busy', 'true');
    else button.removeAttribute('aria-busy');
  }
  const switchingSkin = nextTeam !== team && pageHost.querySelector('.scene') && !reduceMotion.matches;
  const switchingPage = nextPage !== page && nextTeam === team && pageHost.querySelector('.scene') && !reduceMotion.matches;
  const direction = pages.indexOf(nextPage) >= pages.indexOf(page) ? 1 : -1;
  try {
    const [scene, home] = await Promise.all([template(`screens/${nextTeam}-${nextPage}.html`), template(`screens/${nextTeam}-home.html`)]);
    await Promise.all([preload(scene), preload(home)]); if (ticket !== renderTicket) return;

    const applyScene = async () => {
      if (ticket !== renderTicket) return;
      const oldScene = switchingPage && pageHost.querySelector('.scene');
      const backgrounds = document.querySelector('#backgrounds');
      const oldBackground = backgrounds.firstElementChild;
      if (team !== nextTeam) { category = 0; featuredOffset = 0; }
      page = nextPage; team = nextTeam; document.body.dataset.team = team; world.dataset.page = page;
      try { localStorage.setItem('kbo-night-series-team', team); } catch {}
      scene.classList.add('scene'); scene.dataset.scene = page; scene.style.background = 'transparent';
      scene.querySelectorAll(':scope > [data-name^="이동 ·"], :scope > [data-name="팀 선택 · 열기"]').forEach(node => node.remove());
      const header = scene.querySelector('[data-name="헤더 강철 패널"]').parentElement;
      const nav = scene.querySelector('[data-name="추천게임 · 이미지"]').parentElement;
      wireHeader(header); wireNavigation(nav); groupTitle(scene);
      const background = scene.querySelector(':scope > [data-name^="배경 ·"], :scope > [data-name="야구장 배경 · 이미지"]');
      background.classList.add('background-layer'); background.dataset.ballpark = team + '-' + page;
      const flagLayer = document.createElement('div'); flagLayer.className = 'background-layer team-flag-background';
      const flagImage = new Image(); flagImage.alt = ''; flagImage.src = 'flags/' + team + '.webp'; flagLayer.append(flagImage);
      stopFlagMotion(); stopFlagMotion = () => {};
      backgrounds.replaceChildren(background,flagLayer);
      featured = extractFeatured(home);
      if (page === 'home') wireHome(scene);
      if (page === 'live' || page === 'slots') wireProviders(scene);
      if (page === 'notice') {
        const board = scene.querySelector('[data-name="공지 목록 · 5행"]').parentElement;
        board.classList.add('notice-board');
        KboNotices.mount(board,team);
      }
      if (ticket !== renderTicket) return;
      pageHost.replaceChildren(scene);
      resize();
      const decoded = Promise.all([...world.querySelectorAll('img')].map(image => image.decode()));
      const motion = oldScene && !reduceMotion.matches ? animatePageChange(oldScene, scene, oldBackground, background, direction) : null;
      await decoded;
      if (ticket !== renderTicket) return;
      stopFlagMotion = animateTeamFlag(flagLayer, reduceMotion);
      document.title = `${titles[pages.indexOf(page)]} | ${teams[team]} | KBO NIGHT SERIES`;
      document.querySelector('meta[name="theme-color"]').content = getComputedStyle(document.body).getPropertyValue('--base').trim();
      await motion;
    };
    if (switchingSkin) {
      await transitionTeamFlag(nextTeam, applyScene, ticket);
    } else await applyScene();
    if (ticket === renderTicket) world.setAttribute('aria-busy', 'false');
  } catch (error) {
    if (ticket !== renderTicket) return;
    requestedTeam = team; updateTeamTrigger(team);
    navHost.querySelector('[aria-busy]')?.removeAttribute('aria-busy');
    world.setAttribute('aria-busy', 'false'); console.error(error);
    if (!pageHost.querySelector('.scene')) pageHost.innerHTML = '<p class="load-error">화면을 불러오지 못했습니다. 새로고침해 주세요.</p>';
    else toast('화면을 불러오지 못했습니다. 다시 시도해 주세요.');
  }
}
addEventListener('resize', resize);
addEventListener('hashchange', () => render(pages.includes(location.hash.slice(1)) ? location.hash.slice(1) : 'home', requestedTeam));
reduceMotion.addEventListener('change', () => { if (reduceMotion.matches) { finishPageMotion(); finishSkinMotion(); } });
if (!pages.includes(location.hash.slice(1))) history.replaceState(null, '', '#home');
render();
