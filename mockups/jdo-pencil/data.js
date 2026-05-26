// Shared data for the mall: categories, products, banners.
// Images are public Unsplash photo URLs (small size for quick load).

window.JDO_DATA = (function () {
  const u = (id, w = 600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;

  const categories = [
    { id: 'rec',     name: '推荐', icon: 'sparkles' },
    { id: 'flash',   name: '秒杀', icon: 'bolt' },
    { id: 'car',     name: '车品', icon: 'car' },
    { id: 'digital', name: '数码', icon: 'headphones' },
    { id: 'food',    name: '食品', icon: 'cookie' },
    { id: 'life',    name: '生活', icon: 'leaf' },
    { id: 'apparel', name: '服饰', icon: 'shirt' },
    { id: 'sports',  name: '运动', icon: 'dumbbell' },
    { id: 'travel',  name: '出行', icon: 'luggage' },
    { id: 'book',    name: '图书', icon: 'book' },
    { id: 'mom',     name: '母婴', icon: 'baby' },
    { id: 'service', name: '服务', icon: 'wrench' },
  ];

  const products = [
    // 车品
    { id: 'p1',  cat: 'car',     img: u('photo-1503376780353-7e6692767b70'),    title: '车载香薰 持久车内固体香膏 高级木香调',                price: 39.0,   ori: 89,   tag: '秒杀', tagKind: 'red',   sold: 1.2,   star: 4.9 },
    { id: 'p2',  cat: 'car',     img: u('photo-1607860108855-64acf2078ed9'),    title: '玻璃水四季通用 防冻除胶 6瓶/箱',                       price: 29.9,   ori: 59,   tag: '车主必备', tagKind: 'mint', sold: 3.4,   star: 4.8 },
    { id: 'p3',  cat: 'car',     img: u('photo-1597844808531-72732dee06d4'),    title: 'PD 100W 车载快充 双口 type-c 适配主流车型',          price: 79.0,   ori: 129,  tag: '新品', tagKind: 'cyan',  sold: 0.8,   star: 4.7 },
    { id: 'p4',  cat: 'car',     img: u('photo-1542362567-b07e54358753'),       title: '4K 行车记录仪 前后双录 夜视增强',                     price: 599,    ori: 899,  tag: '限时', tagKind: 'red',   sold: 0.5,   star: 4.6 },
    { id: 'p5',  cat: 'car',     img: u('photo-1492144534655-ae79c964c9d7'),    title: '全包围 TPE 汽车脚垫 易清洁防滑',                       price: 268,    ori: 498,  tag: '热销', tagKind: 'gold',  sold: 1.6,   star: 4.9 },
    { id: 'p6',  cat: 'car',     img: u('photo-1605559424843-9e4c228bf1c2'),    title: '车载迷你吸尘器 大吸力无线 60W',                       price: 99.0,   ori: 199,  tag: '会员', tagKind: 'gold',  sold: 2.1,   star: 4.7 },

    // 数码
    { id: 'p7',  cat: 'digital', img: u('photo-1546435770-a3e426bf472b'),       title: '主动降噪蓝牙耳机 入耳式无线运动通话',                 price: 199,    ori: 399,  tag: '直降 50%', tagKind: 'red', sold: 5.2, star: 4.8 },
    { id: 'p8',  cat: 'digital', img: u('photo-1572569511254-d8f925fe2cbb'),    title: '10000mAh 磁吸无线快充充电宝 PD 22.5W',                price: 129,    ori: 199,  tag: '车机配套', tagKind: 'mint', sold: 1.8, star: 4.7 },
    { id: 'p9',  cat: 'digital', img: u('photo-1608043152269-423dbba4e7e1'),    title: '便携蓝牙音箱 IPX7 防水 户外大音量',                    price: 249,    ori: 349,  tag: '新品', tagKind: 'cyan',  sold: 0.9, star: 4.6 },
    { id: 'p10', cat: 'digital', img: u('photo-1593642632559-0c6d3fc62b89'),    title: 'USB-C 编织数据线 60W 1.5m 三色可选',                  price: 19.9,   ori: 49,   tag: '凑单', tagKind: 'mint',  sold: 4.5, star: 4.9 },
    { id: 'p11', cat: 'digital', img: u('photo-1625948515291-69613efd103f'),    title: 'AR 增强 HUD 抬头显示 即插即用',                       price: 458,    ori: 698,  tag: '黑科技', tagKind: 'cyan', sold: 0.4, star: 4.5 },
    { id: 'p12', cat: 'digital', img: u('photo-1505740420928-5e560c06d30e'),    title: '一年保修 入耳式有线耳机 高保真',                       price: 39,     ori: 79,   tag: '低价', tagKind: 'mint',  sold: 2.6, star: 4.7 },

    // 食品
    { id: 'p13', cat: 'food',    img: u('photo-1606312619070-d48b4c652a52'),    title: '每日坚果混合装 25g×30 包 营养零食',                   price: 69.0,   ori: 129,  tag: '车上零食', tagKind: 'mint', sold: 8.2, star: 4.9 },
    { id: 'p14', cat: 'food',    img: u('photo-1481391319762-47dff72954d9'),    title: '黑巧克力 70% 可可 100g×4 块',                          price: 49.9,   ori: 89,   tag: '热销', tagKind: 'gold',  sold: 3.0, star: 4.8 },
    { id: 'p15', cat: 'food',    img: u('photo-1559056199-641a0ac8b55e'),       title: '原产地咖啡豆 中度烘焙 500g',                          price: 99.0,   ori: 158,  tag: '会员', tagKind: 'gold',  sold: 1.4, star: 4.7 },
    { id: 'p16', cat: 'food',    img: u('photo-1571997478779-2adcbbe9ab2f'),    title: '潮汕牛肉干 原切风干 麻辣味 250g',                     price: 79.0,   ori: 129,  tag: '秒杀', tagKind: 'red',   sold: 2.2, star: 4.8 },
    { id: 'p17', cat: 'food',    img: u('photo-1559181567-c3190ca9959b'),       title: '冷压初榨橄榄油 750ml 礼盒装',                          price: 129,    ori: 199,  tag: '送礼', tagKind: 'cyan',  sold: 0.6, star: 4.6 },
    { id: 'p18', cat: 'food',    img: u('photo-1551024601-bec78aea704b'),       title: '手工法式马卡龙 12 枚礼盒 送女友',                     price: 89.0,   ori: 149,  tag: '新品', tagKind: 'cyan',  sold: 1.1, star: 4.5 },

    // 生活
    { id: 'p19', cat: 'life',    img: u('photo-1556228852-80b6e5eeff06'),       title: '三层抽纸 4 层加厚 27 包整箱 家庭装',                   price: 39.9,   ori: 69,   tag: '日用', tagKind: 'mint',  sold: 6.6, star: 4.9 },
    { id: 'p20', cat: 'life',    img: u('photo-1571781926291-c477ebfd024b'),    title: '声波电动牙刷 IPX7 防水 4 刷头',                        price: 199,    ori: 399,  tag: '直降', tagKind: 'red',   sold: 2.4, star: 4.7 },
    { id: 'p21', cat: 'life',    img: u('photo-1556228720-195a672e8a03'),       title: '氨基酸洗发水 控油蓬松 500ml',                          price: 49.9,   ori: 99,   tag: '回购', tagKind: 'gold',  sold: 3.8, star: 4.8 },
    { id: 'p22', cat: 'life',    img: u('photo-1583947215259-38e31be8751f'),    title: '香氛挂件 持久车内家居两用 法式调',                     price: 35.0,   ori: 69,   tag: '车上香薰', tagKind: 'cyan', sold: 1.0, star: 4.6 },

    // 服饰
    { id: 'p23', cat: 'apparel', img: u('photo-1542291026-7eec264c27ff'),       title: '休闲运动鞋 透气网面 男女同款',                         price: 299,    ori: 459,  tag: '新品', tagKind: 'cyan',  sold: 1.7, star: 4.8 },
    { id: 'p24', cat: 'apparel', img: u('photo-1572635196237-14b3f281503f'),    title: '偏光太阳镜 开车防紫外线 男女款',                       price: 159,    ori: 299,  tag: '驾驶必备', tagKind: 'mint', sold: 2.0, star: 4.7 },

    // 出行
    { id: 'p25', cat: 'travel',  img: u('photo-1553062407-98eeb64c6a62'),       title: '20 寸登机箱 静音万向轮 PC 材质',                       price: 399,    ori: 699,  tag: '限时', tagKind: 'red',   sold: 0.8, star: 4.7 },
    { id: 'p26', cat: 'travel',  img: u('photo-1581605405669-fcdf81165afa'),    title: '便携保温壶 24h 保温 大容量 700ml',                     price: 129,    ori: 199,  tag: '车上', tagKind: 'mint',  sold: 1.5, star: 4.8 },

    // 运动
    { id: 'p27', cat: 'sports',  img: u('photo-1571902943202-507ec2618e8f'),    title: '专业瑜伽垫 加厚防滑 双面 NBR',                          price: 89.0,   ori: 169,  tag: '促销', tagKind: 'red',   sold: 1.3, star: 4.6 },
    { id: 'p28', cat: 'sports',  img: u('photo-1517649763962-0c623066013b'),    title: '智能跳绳 计数蓝牙 健身减脂',                          price: 79.0,   ori: 159,  tag: '新品', tagKind: 'cyan',  sold: 0.7, star: 4.5 },

    // 图书
    { id: 'p29', cat: 'book',    img: u('photo-1544947950-fa07a98d237f'),       title: '深度工作 4 小时高效法则 精装版',                       price: 35,     ori: 59,   tag: '热卖', tagKind: 'gold',  sold: 2.5, star: 4.9 },

    // 母婴
    { id: 'p30', cat: 'mom',     img: u('photo-1515488042361-ee00e0ddd4e4'),    title: '车载儿童安全座椅 0-12 岁可调',                         price: 1299,   ori: 1699, tag: '安全', tagKind: 'cyan',  sold: 0.3, star: 4.9 },
  ];

  const banners = [
    { id: 'b1', tone: 'blue',    title: '车主权益日',  sub: '充电 95 折 · 油卡满减',   img: u('photo-1593941707882-a5bba14938c7', 300) },
    { id: 'b2', tone: 'emerald', title: '附近自提',    sub: '500m 内 18 家自提点',     img: u('photo-1488521787991-ed7bbaae773c', 300) },
  ];

  return { categories, products, banners };
})();
