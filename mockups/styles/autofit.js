/**
 * Viewport Autofit — Desktop Preview Mode Only
 *
 * 车机环境下屏幕宽度 ≥ 设计宽度，页面本就按车机尺寸设计，
 * 不需要任何缩放。此脚本仅在桌面浏览器预览时（窗口宽度 < 设计宽度）
 * 才启用自动缩放 + 浮动控件，车机环境下完全不注入任何东西。
 */
(function () {
  // iframe 里（index.html 缩略图），不执行
  if (window.self !== window.top) return;

  // ── 读设计宽度 ──
  var meta = document.querySelector('meta[name="viewport"]');
  var designWidth = 1920;
  if (meta) {
    var m = meta.content.match(/width=(\d+)/);
    if (m) designWidth = parseInt(m[1], 10);
  }

  // ── 车机环境：窗口足够宽，不需要缩放，直接退出 ──
  if (window.innerWidth >= designWidth) return;

  // ── 以下是桌面预览模式 ──
  var currentScale = 1;
  var autofit = true;
  var MIN_SCALE = 0.15;
  var MAX_SCALE = 1.5;
  var STEP = 0.1;

  function applyScale(s) {
    s = Math.max(MIN_SCALE, Math.min(MAX_SCALE, s));
    currentScale = s;
    document.body.style.transform = 'scale(' + s + ')';
    document.body.style.transformOrigin = 'top left';
    document.body.style.width = (designWidth / s) + 'px';
    document.body.style.minWidth = (designWidth / s) + 'px';
    document.body.style.overflowX = 'hidden';
    var pctBtn = document.getElementById('z-pct');
    if (pctBtn) pctBtn.textContent = Math.round(s * 100) + '%';
    var fitBtn = document.getElementById('z-fit');
    if (fitBtn) fitBtn.style.opacity = autofit ? '1' : '0.5';
  }

  function autoFit() {
    autofit = true;
    applyScale(window.innerWidth / designWidth);
  }

  // ── 浮动控件 ──
  var bar = document.createElement('div');
  bar.id = 'zoom-bar';
  bar.innerHTML =
    '<button id="z-fit" title="自适应">⟺</button>' +
    '<button id="z-out" title="缩小">−</button>' +
    '<button id="z-pct" title="当前缩放">100%</button>' +
    '<button id="z-in" title="放大">+</button>' +
    '<button id="z-raw" title="原始大小 100%">1:1</button>';

  var css = document.createElement('style');
  css.textContent = `
    #zoom-bar {
      position: fixed; top: 16px; right: 16px; z-index: 9999;
      display: flex; gap: 6px; align-items: center;
      padding: 6px 10px;
      background: rgba(20, 22, 26, 0.88);
      backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 12px;
      font-family: "Manrope", "Noto Sans SC", system-ui, sans-serif;
      font-size: 14px; font-weight: 600; color: #F1F5F9;
      box-shadow: 0 8px 24px rgba(0,0,0,0.40);
      user-select: none;
      transition: opacity 0.3s;
    }
    #zoom-bar:hover { opacity: 1 !important; }
    #zoom-bar button {
      height: 36px; min-width: 36px; padding: 0 8px;
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.10);
      border-radius: 8px;
      color: #F1F5F9; font-size: 14px; font-weight: 600;
      cursor: pointer; display: grid; place-items: center;
      transition: all 0.15s ease;
    }
    #zoom-bar button:hover { background: rgba(255,255,255,0.12); border-color: rgba(255,255,255,0.20); }
    #zoom-bar button:active { transform: scale(0.92); }
    #zoom-bar #z-fit { color: #5EEAD4; border-color: rgba(94,234,212,0.30); }
    #zoom-bar #z-raw { color: #94A3B8; font-size: 12px; }
    #zoom-bar #z-pct { min-width: 52px; font-family: "JetBrains Mono", monospace; font-size: 13px; }
  `;
  document.head.appendChild(css);
  document.body.appendChild(bar);

  document.getElementById('z-fit').addEventListener('click', autoFit);
  document.getElementById('z-in').addEventListener('click', function () {
    autofit = false;
    applyScale(currentScale + STEP);
  });
  document.getElementById('z-out').addEventListener('click', function () {
    autofit = false;
    applyScale(currentScale - STEP);
  });
  document.getElementById('z-raw').addEventListener('click', function () {
    autofit = false;
    applyScale(1);
  });

  // ── 初始自适应 + resize ──
  autoFit();
  window.addEventListener('resize', function () {
    // 窗口拉大到车机宽度时，自动退出缩放模式
    if (window.innerWidth >= designWidth) {
      document.body.style.transform = '';
      document.body.style.width = '';
      document.body.style.minWidth = '';
      document.body.style.overflowX = '';
      bar.remove();
      css.remove();
      return;
    }
    if (autofit) autoFit();
  });

  // ── 键盘快捷键 ──
  document.addEventListener('keydown', function (e) {
    if (e.key === '+' || e.key === '=') { autofit = false; applyScale(currentScale + STEP); e.preventDefault(); }
    if (e.key === '-' || e.key === '_') { autofit = false; applyScale(currentScale - STEP); e.preventDefault(); }
    if (e.key === '0') { autoFit(); e.preventDefault(); }
    if (e.key === '1') { autofit = false; applyScale(1); e.preventDefault(); }
  });
})();