/* global React, ReactDOM, IVIHome, MallHome, MallCategory, MallDetail, MallCart, MallCheckout, useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakSelect */

const { useState: useStateApp, useEffect: useEffectApp } = React;

const APP_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "dark",
  "cols": 4,
  "initialScreen": "ivi"
}/*EDITMODE-END*/;

const SCREEN_LABELS = {
  'ivi':           '01 IVI Home',
  'mall-home':     '02 Mall Home',
  'mall-category': '03 Mall Category',
  'mall-detail':   '04 Mall Detail',
  'mall-cart':     '05 Mall Cart',
  'mall-checkout': '06 Mall Checkout',
};

function App() {
  const [t, setTweak] = useTweaks(APP_DEFAULTS);
  const [route, setRoute] = useStateApp(SCREEN_LABELS[APP_DEFAULTS.initialScreen] ? APP_DEFAULTS.initialScreen : 'ivi');

  useEffectApp(() => {
    const canvas = document.querySelector('.canvas');
    if (canvas) canvas.setAttribute('data-theme', t.theme);
    document.documentElement.setAttribute('data-theme', t.theme);
  }, [t.theme]);

  const onNav = (next) => setRoute(next);

  return (
    <div className="canvas" data-theme={t.theme} data-screen-label={SCREEN_LABELS[route] || route}>
      {route === 'ivi'           && <IVIHome onNav={onNav} />}
      {route === 'mall-home'     && <MallHome onNav={onNav} cols={t.cols} />}
      {route === 'mall-category' && <MallCategory onNav={onNav} cols={t.cols} />}
      {route === 'mall-detail'   && <MallDetail onNav={onNav} />}
      {route === 'mall-cart'     && <MallCart onNav={onNav} />}
      {route === 'mall-checkout' && <MallCheckout onNav={onNav} />}

      <TweaksPanel title="Tweaks">
        <TweakSection label="主题">
          <TweakRadio
            label="配色"
            value={t.theme}
            onChange={(v) => setTweak('theme', v)}
            options={[
              { value: 'dark',  label: '深色' },
              { value: 'light', label: '浅色' },
            ]}
          />
        </TweakSection>
        <TweakSection label="商品网格">
          <TweakRadio
            label="每行列数"
            value={String(t.cols)}
            onChange={(v) => setTweak('cols', Number(v))}
            options={[
              { value: '3', label: '3' },
              { value: '4', label: '4' },
              { value: '5', label: '5' },
            ]}
          />
        </TweakSection>
        <TweakSection label="跳转">
          <TweakSelect
            label="当前页面"
            value={route}
            onChange={(v) => setRoute(v)}
            options={[
              { value: 'ivi',           label: '01 · 车机首页' },
              { value: 'mall-home',     label: '02 · 商城首页' },
              { value: 'mall-category', label: '03 · 分类 / 搜索' },
              { value: 'mall-detail',   label: '04 · 商品详情' },
              { value: 'mall-cart',     label: '05 · 购物车' },
              { value: 'mall-checkout', label: '06 · 确认订单' },
            ]}
          />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
