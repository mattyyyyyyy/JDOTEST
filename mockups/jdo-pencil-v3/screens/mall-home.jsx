/* global React, StatusBar, Dock, Icon, ProductCard */

const { useState: useStateMH, useEffect: useEffectMH } = React;

function MallTopBar({ activeTab, onTab, route, onNav }) {
  return (
    <div className="mall-topbar">
      <div className="mall-search" onClick={() => onNav('mall-search')}>
        <Icon name="mic" size={26} />
        <span style={{ flex: 1 }}>请在此输入 · 试试说"我要买玻璃水"</span>
        <Icon name="search" size={26} />
      </div>
      <div className="mall-tabs">
        <span className={'mall-tab' + (activeTab === 'mall' ? ' active' : '')} onClick={() => onTab('mall')}>商城</span>
        <span className={'mall-tab' + (activeTab === 'mine' ? ' active' : '')} onClick={() => onNav('mall-profile')}>我的</span>
      </div>
      <div className="mall-actions">
        <button className="mall-iconbtn" title="购物车" onClick={() => onNav && onNav('mall-cart')}>
          <Icon name="cart" size={28} />
          <span className="badge">3</span>
        </button>
      </div>
    </div>
  );
}

function MallRail({ active, onChange }) {
  const cats = window.JDO_DATA.categories;
  return (
    <div className="mall-rail">
      {cats.map((c) => (
        <button
          key={c.id}
          className={'rail-tile' + (active === c.id ? ' active' : '')}
          onClick={() => onChange(c.id)}
        >
          <span className="ricon"><Icon name={c.icon} size={48} sw={1.5} /></span>
          <span className="rname">{c.name}</span>
        </button>
      ))}
    </div>
  );
}

// ─── Generic crossfade slot ──────────────────────────────────────────
function SlideSlot({ slides, interval, render, dotsAlign = 'left' }) {
  const [i, setI] = useStateMH(0);
  const n = slides.length;
  useEffectMH(() => {
    if (n <= 1) return;
    const t = setInterval(() => setI((x) => (x + 1) % n), interval);
    return () => clearInterval(t);
  }, [n, interval]);
  return (
    <div className="slot-stage">
      {slides.map((s, idx) => (
        <div key={idx} className={'slot-slide' + (i === idx ? ' active' : '')}>
          {render(s)}
        </div>
      ))}
      {n > 1 && (
        <div className={'slot-dots ' + (dotsAlign === 'right' ? 'right' : 'left')}>
          {slides.map((_, idx) => (
            <span
              key={idx}
              className={'slot-dot' + (i === idx ? ' active' : '')}
              onClick={(e) => { e.stopPropagation(); setI(idx); }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function MallHome({ onNav, cols }) {
  const [activeTab, setActiveTab] = useStateMH('mall');
  const [activeCat, setActiveCat] = useStateMH('energy');
  const products = window.JDO_DATA.products;
  const heroRecs = window.JDO_DATA.heroRecs;

  const feed = products.filter((p) => p.cat === activeCat);

  // Left big — official marketing (rotates every 6s)
  const officialSlides = [
    {
      tone: 'gold', icon: 'star',
      tag: '车主权益日 · 5/26 限时',
      title: '黄金车主 95 折 · 油卡满 100-8',
      sub: '加油 / 充电 / 养护 全场叠加 · 双倍积分中',
      chips: ['加油 -3%', '充电 -5%', '养护立减 ¥ 30', '双倍积分'],
      stat: { v: '8 折起', l: '车主直降' },
      cta: '立即参与',
      navScene: 'energy',
      img: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=600&q=70',
    },
    {
      tone: 'cyan', icon: 'bolt',
      tag: '充值返现 · 限时 7 天',
      title: '加油卡充 ¥ 500 · 立返 ¥ 12',
      sub: '中石化 / 中石油双品牌通用 · 每月一次',
      chips: ['¥100 返 ¥3', '¥300 返 ¥8', '¥500 返 ¥12', '¥1000 返 ¥30'],
      stat: { v: '¥ 12', l: '立返 / ¥500' },
      cta: '去充值',
      navScene: 'energy',
      img: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=600&q=70',
    },
    {
      tone: 'blue', icon: 'location',
      tag: '附近自提 · 500m 起',
      title: '500m 内 18 家自提点 · 送达车上',
      sub: '骑手抵达停车点 · 平均 32 分钟 · 不收上门费',
      chips: ['张江店 280m', '罗森 420m', '丰巢 680m', '6 家 24h'],
      stat: { v: '18 家', l: '500m 内' },
      cta: '查看地图',
      navScene: 'eat',
      img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=70',
    },
  ];

  // Right top — driving context (location + noon, 4.5s)
  const recsTop = [
    heroRecs.find((r) => r.id === 'rec-svc-area'),
    heroRecs.find((r) => r.id === 'rec-noon'),
  ];
  // Right bottom — driving context (consumption + calendar, 5.5s)
  const recsBottom = [
    heroRecs.find((r) => r.id === 'rec-low'),
    heroRecs.find((r) => r.id === 'rec-night'),
  ];

  // Renderers
  const renderMarketing = (m) => (
    <div className={'hero-flash hero-flash--' + m.tone}>
      <div className="hf-header">
        <div className="tag">
          <Icon name={m.icon} size={22} /> {m.tag}
        </div>
        <h2>{m.title}</h2>
        <p>{m.sub}</p>
      </div>
      <div className="hf-foot">
        <div className="hf-chips">
          {m.chips.map((c) => <span key={c} className="hf-chip">{c}</span>)}
        </div>
        <div className="hf-actions">
          <div className="hf-stat">
            <span className="v">{m.stat.v}</span>
            <span className="l">{m.stat.l}</span>
          </div>
          <button className="cta" onClick={() => setActiveCat(m.navScene)}>
            {m.cta} <Icon name="chevR" size={22} />
          </button>
        </div>
      </div>
      <div
        className="hf-img"
        style={{ backgroundImage: `url(${m.img})` }}
      />
    </div>
  );

  const renderRec = (r) => (
    <div
      className={'hero-banner hero-banner--' + r.tone}
      onClick={() => setActiveCat(r.navScene)}
    >
      <div className="hb-tag">
        <Icon name={r.icon} size={18} sw={2} /> {r.tag}
      </div>
      <h3>{r.title}</h3>
      <p>{r.sub}</p>
      <div className="hb-bottom">
        <div className="hb-stat">
          <span className="v">{r.stat.v}</span>
          <span className="l">{r.stat.l}</span>
        </div>
        <button className="hb-cta" onClick={(e) => { e.stopPropagation(); setActiveCat(r.navScene); }}>
          {r.cta} <Icon name="chevR" size={18} />
        </button>
      </div>
      <div className="hb-img" style={{
        backgroundImage: `url(${products.find((p) => p.id === r.items[0])?.img})`
      }} />
    </div>
  );

  return (
    <>
      <StatusBar />
      <div className="app-stage">
        <MallTopBar activeTab={activeTab} onTab={setActiveTab} route="mall-home" onNav={onNav} />

        {/* Hero row — full width, sits below topbar */}
        <div className="mall-hero-section">
          <div className="hero-row">
            <div className="hero-big">
              <SlideSlot slides={officialSlides} interval={6000} render={renderMarketing} dotsAlign="left" />
            </div>
            <div className="hero-side">
              <div className="hero-small">
                <SlideSlot slides={recsTop} interval={4500} render={renderRec} dotsAlign="right" />
              </div>
              <div className="hero-small">
                <SlideSlot slides={recsBottom} interval={5500} render={renderRec} dotsAlign="right" />
              </div>
            </div>
          </div>
        </div>

        <div className="mall-body">
          <MallRail active={activeCat} onChange={setActiveCat} />
          <div className="mall-content">

            {/* Recommendation grid */}
            <div className="section-bar">
              <h3>{window.JDO_DATA.categories.find((c) => c.id === activeCat)?.name || '推荐'} · 为你精选</h3>
              <span className="sub">基于车主常买 · 已为您过滤大件</span>
            </div>

            <div className="prod-scroll">
              <div className="prod-grid" style={{ '--cols': cols }}>
                {feed.map((p) => <ProductCard key={p.id} p={p} onNav={onNav} />)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dock route="mall-home" onNav={onNav} />
    </>
  );
}

window.MallHome = MallHome;
