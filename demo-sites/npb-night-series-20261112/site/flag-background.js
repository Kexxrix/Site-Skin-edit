// Team flag motion for page backdrops and skin transitions; the PNG is the static fallback.
function animateTeamFlag(layer, motionPreference) {
  const source = layer.querySelector('img');
  const canvas = document.createElement('canvas');
  canvas.className = 'flag-cloth';
  canvas.setAttribute('aria-hidden', 'true');
  const maskedBackdrop = layer.classList.contains('team-flag-background');
  const gl = canvas.getContext('webgl', {alpha: maskedBackdrop, premultipliedAlpha: true, antialias: false, depth: false, powerPreference: 'low-power'});
  if (!gl) return () => {};

  const shaders = [];
  const program = gl.createProgram();
  const buffer = gl.createBuffer();
  const texture = gl.createTexture();
  let frame = 0, elapsed = 0, previous = 0, lastDraw = 0, disposed = false;
  function compile(type, code) {
    const shader = gl.createShader(type); shaders.push(shader);
    gl.shaderSource(shader, code); gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader));
    gl.attachShader(program, shader);
  }
  function releaseResources() {
    gl.deleteTexture(texture); gl.deleteBuffer(buffer); gl.deleteProgram(program);
    shaders.forEach(shader => gl.deleteShader(shader));
  }
  try {
    compile(gl.VERTEX_SHADER, `
      attribute vec2 position;
      varying vec2 uv;
      void main() { uv = position * .5 + .5; gl_Position = vec4(position, 0., 1.); }
    `);
    compile(gl.FRAGMENT_SHADER, `
      precision mediump float;
      uniform sampler2D flag;
      uniform vec2 cover;
      uniform vec2 offset;
      uniform vec2 fadeSpace;
      uniform float time;
      varying vec2 uv;
      void main() {
        vec2 p = (uv - .5) * cover * .95 + .5 + offset;
        // Broad folds travel from the restrained hoist side towards the fly.
        float freeEdge = .28 + .72 * smoothstep(0., 1., p.x);
        float a = p.x * 11.5 + p.y * 1.6 - time * 1.55;
        float b = p.x * 20.5 - p.y * 3.1 - time * 2.0 + .6 * sin(time * .37);
        float swell = .8 + .2 * sin(time * .45 + p.y * 2.);
        vec2 fold = vec2(.016 * sin(a + .8) + .004 * sin(b), .034 * sin(a) + .009 * sin(b));
        vec2 sampleUV = clamp(p + fold * freeEdge * swell, .001, .999);
        vec3 color = texture2D(flag, sampleUV).rgb;
        float slopeX = freeEdge * (.9 * cos(a) + .3 * cos(b)) * swell;
        float slopeY = freeEdge * (.12 * cos(a) - .09 * cos(b));
        vec3 normal = normalize(vec3(-slopeX, -slopeY, 1.));
        vec3 light = normalize(vec3(-.45, .55, 1.));
        float diffuse = max(dot(normal, light), 0.);
        float sheen = pow(max(dot(reflect(-light, normal), vec3(0.,0.,1.)), 0.), 22.);
        float shade = .4 + .66 * diffuse - .11 * sin(a) * freeEdge;
        // Match the backdrop's screen-space CSS fade inside the WebGL surface.
        // A transition cover uses fadeSpace = (0, 0), keeping it fully opaque.
        float x = uv.x * fadeSpace.x + fadeSpace.y;
        float alpha = 1. - .1 * clamp((x - .33) / .07, 0., 1.)
                         - .4 * clamp((x - .40) / .095, 0., 1.)
                         - .4 * clamp((x - .495) / .095, 0., 1.)
                         - .1 * clamp((x - .59) / .07, 0., 1.);
        alpha = clamp(alpha, 0., 1.);
        vec3 shaded = clamp(color * shade + vec3(.055 * sheen), 0., 1.);
        gl_FragColor = vec4(shaded * alpha, alpha);
      }
    `);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program));
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
  } catch (error) {
    releaseResources();
    return () => {};
  }

  const time = gl.getUniformLocation(program, 'time');
  const cover = gl.getUniformLocation(program, 'cover');
  const offset = gl.getUniformLocation(program, 'offset');
  const fadeSpace = gl.getUniformLocation(program, 'fadeSpace');
  function draw() {
    gl.uniform1f(time, elapsed);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }
  function resize() {
    const layerRect = layer.getBoundingClientRect();
    const {width, height} = layerRect;
    if (!width || !height || disposed) return;
    // Cap the background's GPU workload independently of the foreground UI.
    const ratio = Math.min(devicePixelRatio || 1, 1.5, 1920 / width, 1080 / height);
    canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
    gl.viewport(0, 0, canvas.width, canvas.height);
    const aspect = width / height, imageAspect = source.naturalWidth / source.naturalHeight;
    const cropX = Math.min(1, aspect / imageAspect), cropY = Math.min(1, imageAspect / aspect);
    const placement = getComputedStyle(source).objectPosition.split(' ').map(value => parseFloat(value) / 100);
    gl.uniform2f(cover, cropX, cropY);
    gl.uniform2f(offset, (placement[0] - .5) * (1 - cropX), (placement[1] - .5) * (1 - cropY));
    const canvasRect = canvas.getBoundingClientRect();
    gl.uniform2f(fadeSpace, maskedBackdrop ? canvasRect.width / width : 0, maskedBackdrop ? (canvasRect.left - layerRect.left) / width : 0);
    draw();
  }
  function tick(now) {
    if (disposed || document.hidden || motionPreference.matches) { frame = 0; previous = 0; return; }
    if (previous) elapsed += Math.min((now - previous) / 1000, .05);
    previous = now;
    if (now - lastDraw >= 1000 / 30) { draw(); lastDraw = now; }
    frame = requestAnimationFrame(tick);
  }
  function syncMotion() {
    cancelAnimationFrame(frame); frame = 0; previous = 0;
    if (!disposed && !document.hidden && !motionPreference.matches) frame = requestAnimationFrame(tick);
  }
  function contextLost(event) {
    event.preventDefault();
    stop();
  }
  const observer = new ResizeObserver(resize);
  function stop() {
    if (disposed) return;
    disposed = true; cancelAnimationFrame(frame); observer.disconnect();
    document.removeEventListener('visibilitychange', syncMotion);
    motionPreference.removeEventListener('change', syncMotion);
    canvas.removeEventListener('webglcontextlost', contextLost);
    layer.classList.remove('flag-ready'); canvas.remove();
    if (!gl.isContextLost()) {
      releaseResources();
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    }
  }
  layer.append(canvas); resize(); layer.classList.add('flag-ready');
  observer.observe(layer);
  document.addEventListener('visibilitychange', syncMotion);
  motionPreference.addEventListener('change', syncMotion);
  canvas.addEventListener('webglcontextlost', contextLost);
  syncMotion();
  return stop;
}
