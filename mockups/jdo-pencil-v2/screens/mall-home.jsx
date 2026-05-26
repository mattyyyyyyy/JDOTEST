/* global React, StatusBar, Dock, Icon, ProductCard */

const { useState: useStateMH } = React;

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
        <span style={{ color: 'var(--color-text-muted)', fontSize: 20, marginRight: 8 }}>
          客服 4006000666 · v1.0
        </span>
        <button className="mall-iconbtn" title="购物车" onClick={() => onNav && onNav('mall-cart')}>
          <Icon name="cart" size={28} />
          <span className="badge">3</span>
        </button>
        <button className="mall-iconbtn" title="设置" onClick={() => onNav('mall-settings')}>
          <Icon name="settings" size={28} />
        </button>
      </div>
    </div>
  );
}

function MallRail({ active, onChange }) {
  const scenes = window.JDO_DATA.scenes;
  return (
    <div className="mall-rail">
      {scenes.map((c) => (
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

// ─── 时空推荐 hero card ─────────────────────────────────────────────────
function HeroRec({ rec, products, onNav, onJump }) {
  const items = rec.items.map((id) => products.find((p) => p.id === id)).filter(Boolean);
  return (
    <div className={'hero-rec hero-rec--' + rec.tone}>
      <div className="hero-rec-head">
        <div className="hero-rec-icon">
          <Icon name={rec.icon} size={26} sw={1.5} />
        </div>
        <div className="hero-rec-tag">{rec.tag}</div>
        <div className="hero-rec-stat">
          <div className="v">{rec.stat.v}</div>
          <div className="l">{rec.stat.l}</div>
        </div>
      </div>
      <div className="hero-rec-title">{rec.title}</div>
      <div className="hero-rec-sub">{rec.sub}</div>
      <div className="hero-rec-items">
        {items.map((p) => (
          <div key={p.id} className="hero-rec-item" onClick={() => onNav('mall-detail')}>
            <div className="img" style={{ backgroundImage: `url(${p.img})` }} />
            <div className="nm">{p.title}</div>
            <div className="pr">¥ {p.price.toFixed(p.price % 1 ? 1 : 0)}</div>
          </div>
        ))}
      </div>
      <button className="hero-rec-cta" onClick={() => onJump(rec.navScene)}>
        {rec.cta} <Icon name="chevR" size={20} />
      </button>
    </div>
  );
}

function MallHome({ onNav, cols }) {
  const [activeTab, setActiveTab] = useStateMH('mall');
  const [activeScene, setActiveScene] = useStateMH('fuel');
  const [subCat, setSubCat] = useStateMH('all');
  const products = window.JDO_DATA.products;
  const heroRecs = window.JDO_DATA.heroRecs;

  // For "全部商品", expose sub-category chips
  const subCats = [
    { id: 'all',     name: '全部' },
    { id: 'digital', name: '数码' },
    { id: 'food',    name: '食品' },
    { id: 'life',    name: '生活' },
    { id: 'apparel', name: '服饰' },
    { id: 'sports',  name: '运动' },
    { id: 'book',    name: '图书' },
    { id: 'mom',     name: '母婴' },
  ];

  const sceneProducts = products.filter((p) => p.scene === activeScene);
  const feed = activeScene === 'all'
    ? (subCat === 'all' ? sceneProducts : sceneProducts.filter((p) => p.cat === subCat))
    : sceneProducts;

  const scene = window.JDO_DATA.scenes.find((s) => s.id === activeScene);

  return (
    <>
      <StatusBar />
      <div className="app-stage">
        <MallTopBar activeTab={activeTab} onTab={setActiveTab} route="mall-home" onNav={onNav} />
        <div className="mall-body">
          <MallRail active={activeScene} onChange={setActiveScene} />
          <div className="mall-content">
            {/* Context strip — where am I, what time */}
            <div className="ctx-strip">
              <div className="ctx-item">
                <Icon name="location" size={22} sw={1.5} />
                <span>上海 · 浦东 · 张衡路</span>
              </div>
              <span className="ctx-sep" />
              <div className="ctx-item">
                <Icon name="car" size={22} sw={1.5} />
                <span>JDO X1 · 续航 468 km · 90%</span>
              </div>
              <span className="ctx-sep" />
              <div className="ctx-item">
                <Icon name="settings" size={22} sw={1.5} />
                <span>停车态 · 副驾乘客模式</span>
              </div>
              <span style={{ marginLeft: 'auto', color: 'var(--color-text-muted)', fontSize: 18, fontFamily: 'var(--font-mono)' }}>
                时空推荐基于你的位置 + 时段 + 日历
              </span>
            </div>

            {/* 时空推荐 hero — 2x2 grid */}
            <div className="hero-recs">
              {heroRecs.map((r) => (
                <HeroRec key={r.id} rec={r} products={products} onNav={onNav} onJump={setActiveScene} />
              ))}
            </div>

            {/* Sub-category chips for "全部商品" */}
            {activeScene === 'all' && (
              <div className="chips-row" style={{ marginTop: 4 }}>
                {subCats.map((c) => (
                  <button
                    key={c.id}
                    className={'chip-pill' + (subCat === c.id ? ' active' : '')}
                    onClick={() => setSubCat(c.id)}
                    style={{ height: 48, fontSize: 20 }}
                  >{c.name}</button>
                ))}
              </div>
            )}

            {/* Scene products section */}
            <div className="section-bar">
              <h3>
                {scene?.name} · 为你精选
              </h3>
              <span className="sub">{scene?.desc}</span>
              <span className="more" onClick={() => onNav('mall-category')}>
                查看全部 <Icon name="chevR" size={20} />
              </span>
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
