/* global React, StatusBar, Dock, Icon, ProductCard */

const { useState: useStateMH } = React;

function MallTopBar({ activeTab, onTab, route, onNav }) {
  return (
    <div className="mall-topbar">
      <div className="mall-search" onClick={() => onNav('mall-category')}>
        <Icon name="mic" size={26} />
        <span style={{ flex: 1 }}>请在此输入 · 试试说"我要买玻璃水"</span>
        <Icon name="search" size={26} />
      </div>
      <div className="mall-tabs">
        <span className={'mall-tab' + (activeTab === 'mall' ? ' active' : '')} onClick={() => onTab('mall')}>商城</span>
        <span className={'mall-tab' + (activeTab === 'mine' ? ' active' : '')} onClick={() => onTab('mine')}>我的</span>
      </div>
      <div className="mall-actions">
        <span style={{ color: 'var(--color-text-muted)', fontSize: 20, marginRight: 8 }}>
          客服 4006000666 · v1.0
        </span>
        <button className="mall-iconbtn" title="购物车" onClick={() => onNav && onNav('mall-category')}>
          <Icon name="cart" size={28} />
          <span className="badge">3</span>
        </button>
        <button className="mall-iconbtn" title="设置">
          <Icon name="settings" size={28} />
        </button>
      </div>
    </div>
  );
}

function MallRail({ active, onChange }) {
  const cats = window.JDO_DATA.categories;
  return (
    <div className="mall-rail">
      {cats.map(c => (
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

function MallHome({ onNav, cols }) {
  const [activeTab, setActiveTab] = useStateMH('mall');
  const [activeCat, setActiveCat] = useStateMH('rec');
  const products = window.JDO_DATA.products;
  const banners = window.JDO_DATA.banners;

  const flashProducts = products.filter(p => p.tagKind === 'red').slice(0, 4);
  const feed = activeCat === 'rec'
    ? products.slice(0, 24)
    : activeCat === 'flash'
      ? products.filter(p => p.tagKind === 'red')
      : products.filter(p => p.cat === activeCat);

  return (
    <>
      <StatusBar />
      <div className="app-stage">
        <MallTopBar activeTab={activeTab} onTab={setActiveTab} route="mall-home" onNav={onNav} />
        <div className="mall-body">
          <MallRail active={activeCat} onChange={setActiveCat} />
          <div className="mall-content">
            {/* Hero row */}
            <div className="hero-row">
              <div className="hero-flash">
                <div>
                  <div className="tag">
                    <Icon name="bolt" size={22} /> 限时秒杀 · FLASH SALE
                  </div>
                  <h2 style={{ marginTop: 12 }}>9 点场 · 车主直降</h2>
                  <p>每日 06 / 09 / 12 / 18 / 21 整点开抢</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
                  <div className="timer">
                    距离结束
                    <span className="seg">00</span>:
                    <span className="seg">42</span>:
                    <span className="seg">17</span>
                  </div>
                  <button className="cta" onClick={() => { setActiveCat('flash'); }}>
                    去抢购 <Icon name="chevR" size={22} />
                  </button>
                </div>
                <div className="grid-thumbs">
                  {flashProducts.slice(0, 4).map(p => (
                    <div key={p.id} className="thumb" style={{ backgroundImage: `url(${p.img})` }} />
                  ))}
                </div>
              </div>
              <div className="hero-side">
                <div className="hero-banner b-blue">
                  <h3>车主权益日</h3>
                  <p>充电 95 折 · 油卡满 100 减 8</p>
                  <div className="img" style={{ backgroundImage: `url(${banners[0].img})` }} />
                </div>
                <div className="hero-banner b-emerald">
                  <h3>附近自提</h3>
                  <p>500m 内 18 家 · 下单送达车上</p>
                  <div className="img" style={{ backgroundImage: `url(${banners[1].img})` }} />
                </div>
              </div>
            </div>

            {/* Recommendation grid */}
            <div className="section-bar">
              <h3>{window.JDO_DATA.categories.find(c => c.id === activeCat)?.name || '推荐'} · 为你精选</h3>
              <span className="sub">基于车主常买 · 已为您过滤大件</span>
              <span className="more" onClick={() => onNav('mall-category')}>
                查看全部 <Icon name="chevR" size={20} />
              </span>
            </div>

            <div className="prod-scroll">
              <div className="prod-grid" style={{ '--cols': cols }}>
                {feed.map(p => <ProductCard key={p.id} p={p} />)}
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
