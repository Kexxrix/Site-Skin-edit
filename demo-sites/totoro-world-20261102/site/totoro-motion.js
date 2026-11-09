/* Transparent, eyeless character. Eye pixels stay fixed; only the aperture closes. */
function createTotoroMotion(original) {
  const directory = 'assets/totoro-idle-v2/';
  const sources = ['forest-clean.png', 'totoro-eyeless.png', 'eyes-open.png', 'companions.png'];
  const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.classList.add('totoro-motion');
  svg.setAttribute('viewBox', '0 0 1672 941');
  svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  const character = extra => `<image href="${directory}totoro-eyeless.png" width="1122" height="1402" ${extra}/>`;
  const eyeSpecs = [
    { name: 'left', x: 395, y: 415, width: 88, height: 90, crop: '385 181 392 394' },
    { name: 'right', x: 690, y: 355, width: 98, height: 96, crop: '1333 155 430 423' }
  ];
  svg.innerHTML = `<defs>
    <mask id="totoro-body-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="1122" height="1402">
      <rect width="1122" height="1402" fill="white"/>
      <path d="M300 0H455V238L430 260H335Z M625 0H780V218L735 242H652Z" fill="black"/>
    </mask>
    <clipPath id="totoro-ear-left"><path d="M300 0H455V250L430 275H335Z"/></clipPath>
    <clipPath id="totoro-ear-right"><path d="M625 0H780V230L735 257H652Z"/></clipPath>
    ${eyeSpecs.map(eye => `<clipPath id="totoro-eye-${eye.name}-aperture"><path/></clipPath>`).join('')}
    <linearGradient id="totoro-foreground-fade" x1="0" y1="605" x2="0" y2="645" gradientUnits="userSpaceOnUse"><stop stop-color="black"/><stop offset="1" stop-color="white"/></linearGradient>
    <mask id="totoro-foreground" maskUnits="userSpaceOnUse" x="1070" y="605" width="515" height="110"><rect x="1070" y="605" width="515" height="110" fill="url(#totoro-foreground-fade)"/></mask>
  </defs>
  <g transform="translate(1085 149.5) scale(.3549)">
    <g data-totoro-part="body">
      <g data-totoro-part="ear-left">${character('clip-path="url(#totoro-ear-left)"')}</g>
      <g data-totoro-part="ear-right">${character('clip-path="url(#totoro-ear-right)"')}</g>
      ${character('mask="url(#totoro-body-mask)"')}
      ${eyeSpecs.map(eye => `<g data-totoro-part="eye-${eye.name}" data-blink="0">
        <g clip-path="url(#totoro-eye-${eye.name}-aperture)">
          <svg data-totoro-part="eye-${eye.name}-texture" x="${eye.x - eye.width / 2}" y="${eye.y - eye.height / 2}" width="${eye.width}" height="${eye.height}" viewBox="${eye.crop}" preserveAspectRatio="none"><image href="${directory}eyes-open.png" width="2149" height="732"/></svg>
        </g>
        <path data-totoro-part="eye-${eye.name}-lid" fill="none" stroke="#303126" stroke-width="3.4" stroke-linecap="round"/>
      </g>`).join('')}
    </g>
  </g>
  <g transform="translate(1339.5 506.55) scale(.15)">
    <g data-totoro-part="companions"><image href="${directory}companions.png" width="1448" height="1086"/></g>
  </g>
  <image href="${directory}forest-clean.png" width="1672" height="941" mask="url(#totoro-foreground)"/>`;
  original.after(svg);
  const part = name => svg.querySelector(`[data-totoro-part="${name}"]`);
  const body = part('body');
  const ears = [part('ear-left'), part('ear-right')];
  const companions = part('companions');
  let ready = false;
  let active = false;
  let frame = 0;
  let elapsed = 0;
  let previous = 0;
  const smooth = value => value * value * (3 - 2 * value);
  function blinkPulse(time, start) {
    const delta = time - start;
    if (delta < 0 || delta > .30) return 0;
    if (delta < .105) return smooth(delta / .105);
    if (delta < .14) return 1;
    return 1 - smooth((delta - .14) / .16);
  }
  function twitch(time, start) {
    const delta = time - start;
    return delta > 0 && delta < 1.1 ? Math.sin(delta / 1.1 * Math.PI * 2) * Math.sin(delta / 1.1 * Math.PI) : 0;
  }
  function paintEye(eye, blink) {
    const { x, y, width, height, name } = eye;
    const rx = width / 2 + 1;
    const ry = (height / 2 + 1) * (1 - blink);
    const k = .55228475;
    const curve = blink * 5;
    const top = `M${x - rx} ${y} C${x - rx} ${y - ry * k + curve} ${x - rx * k} ${y - ry + curve} ${x} ${y - ry + curve} C${x + rx * k} ${y - ry + curve} ${x + rx} ${y - ry * k + curve} ${x + rx} ${y}`;
    const bottom = `C${x + rx} ${y + ry * k + curve} ${x + rx * k} ${y + ry + curve} ${x} ${y + ry + curve} C${x - rx * k} ${y + ry + curve} ${x - rx} ${y + ry * k + curve} ${x - rx} ${y}Z`;
    svg.querySelector(`#totoro-eye-${name}-aperture path`).setAttribute('d', top + bottom);
    const lid = part(`eye-${name}-lid`);
    lid.setAttribute('d', top);
    lid.setAttribute('opacity', String(smooth(Math.min(1, blink * 4))));
    part(`eye-${name}`).dataset.blink = blink.toFixed(4);
  }
  function paint(time) {
    const breath = (1 - Math.cos(time * Math.PI * 2 / 4.2)) / 2;
    body.setAttribute('transform', `translate(560 1370) scale(${1 + breath * .012} ${1 + breath * .016}) translate(-560 -1370)`);
    const smallBreath = (1 - Math.cos(time * Math.PI * 2 / 3.6)) / 2;
    const smallSway = Math.sin(time * Math.PI * 2 / 5.4) * 1.2;
    companions.setAttribute('transform', `translate(750 995) rotate(${smallSway}) scale(${1 + smallBreath * .012} ${1 + smallBreath * .02}) translate(-750 -995)`);
    ears[0].setAttribute('transform', `rotate(${Math.sin(time * .72) * .65 + twitch(time % 13.3, 4.3) * 1.1} 394 275)`);
    ears[1].setAttribute('transform', `rotate(${-Math.sin(time * .61) * .55 + twitch(time % 15.1, 8.4) * 1.25} 700 250)`);
    const blink = Math.max(blinkPulse(time % 11.6, 2.6), blinkPulse(time % 11.6, 8.1));
    eyeSpecs.forEach(eye => paintEye(eye, blink));
  }
  function tick(now) {
    frame = 0;
    if (!active || !ready || document.hidden) return;
    if (motionPreference.matches) { paint(0); return; }
    if (!previous || now - previous >= 1000 / 30) {
      if (previous) elapsed += Math.min(now - previous, 100) / 1000;
      previous = now;
      paint(elapsed);
    }
    frame = requestAnimationFrame(tick);
  }
  function update() {
    const running = active && ready && !document.hidden && !motionPreference.matches;
    svg.classList.toggle('active', active && ready);
    if (motionPreference.matches && ready) paint(0);
    if (running && !frame) { previous = 0; frame = requestAnimationFrame(tick); }
    if (!running && frame) { cancelAnimationFrame(frame); frame = 0; previous = 0; }
  }
  document.addEventListener('visibilitychange', update);
  motionPreference.addEventListener('change', update);
  const images = sources.map(name => { const image = new Image(); image.src = directory + name; return image; });
  Promise.all(images.map(image => image.decode())).then(() => {
    ready = true;
    original.src = images[0].src;
    paint(0);
    update();
  }).catch(() => { /* Retain the original static scene if a separated asset fails to load. */ });
  return { setActive(value) { active = value; update(); } };
}
