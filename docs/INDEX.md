# 文档索引 INDEX

> 本仓库所有结论性文档的目录。每次新增 / 修改 / 废弃文档都必须同步更新这里。
> 协作铁律见根目录 [`CLAUDE.md`](../CLAUDE.md)。

---

## 📌 入口文档（必读）

- [CLAUDE.md](../CLAUDE.md) — 项目协作铁律 · Accepted · 2026-05-25
- [docs/PRD.md](./PRD.md) — 产品需求文档 v0.4 · Draft · 2026-05-26
- [mockups/index.html](../mockups/index.html) — **11 屏高保真原型总览**（浏览器打开即看）· v1.0 · 2026-05-26
- [docs/feature-spec.md](./feature-spec.md) — **详细功能清单 v1.0 · 路由命名 / 功能拆解 / 状态机 / 接口 / 验收 checklist 的权威源** · Draft · 2026-05-26

## 📐 架构设计 architecture/

> 系统级架构说明、技术栈总览。

_暂无（首份待 ADR-0001 ~ 0003 落地后产出）_

## 🎨 设计 design/

> UI / UX 设计规范、页面视觉布局、设计 token、设计系统。

| 文档 | 摘要 | 状态 | 日期 |
|---|---|---|---|
| [design-system.md](./design/design-system.md) | **设计系统 v1.0 · 系统级 token 与组件契约的单一真相**（颜色 / 字号 / 间距 / 动效 / 行车态降级 / 横屏适配） | Draft | 2026-05-26 |
| [page-spec.md](./design/page-spec.md) | **UI 视觉层权威源** · 设计调性 + 12 页区块布局（含行车态首页 + 地址簿）+ mock 字段 + 首批 5 页建议 · 路由已与 feature-spec 对齐 | Draft | 2026-05-26 |

## 🖥 高保真静态原型 mockups/（仓库根目录）

| 文件 | 用途 | 最后更新 |
|---|---|---|
| [index.html](../mockups/index.html) | **总览导航 · 11 屏缩略图 + 跳文档** | 2026-05-26 |
| [home.html](../mockups/home.html) | 首页（停车态）· Hero / 分类 / 再买 / 秒杀 / 推荐 | 2026-05-26 |
| [category.html](../mockups/category.html) | 分类页 · 左 sticky 一级 + 商品 grid | 2026-05-26 |
| [search.html](../mockups/search.html) | 搜索 · 大输入 + 巨型语音 + 联想 | 2026-05-26 |
| [product-detail.html](../mockups/product-detail.html) | 商品详情 · 横屏左右 60/40 分栏 | 2026-05-26 |
| [cart.html](../mockups/cart.html) | 购物车 · 表格化 + sticky 玻璃合计 | 2026-05-26 |
| [checkout.html](../mockups/checkout.html) | 结算 · 含「送到车上」差异化配送 | 2026-05-26 |
| [payment.html](../mockups/payment.html) | 支付 · 大二维码 + 88px 巨额价 | 2026-05-26 |
| [order-detail.html](../mockups/order-detail.html) | 订单详情 · 64px 取货码 + 物流时间线 | 2026-05-26 |
| [profile.html](../mockups/profile.html) | 个人中心 · 数据卡 + 设置 + Demo 速度模拟器 | 2026-05-26 |
| [login.html](../mockups/login.html) | 车机扫码登录 · 左 pitch + 右 440px QR | 2026-05-26 |
| [driving-home.html](../mockups/driving-home.html) | **行车态首页（核心差异化）** · 3 张巨卡 + 120px 主按钮 | 2026-05-26 |
| [styles/tokens.css](../mockups/styles/tokens.css) | CSS 变量，与 design-system.md §1 一致 | 2026-05-26 |
| [styles/base.css](../mockups/styles/base.css) | reset + 全局基础样式 | 2026-05-26 |
| [styles/components.css](../mockups/styles/components.css) | 通用组件样式 | 2026-05-26 |

> 路由命名以 [feature-spec.md](./feature-spec.md) 为准，不一致时改 page-spec / mockups。
> 这些 mockups 是 React 实装的视觉对照基准。`packages/design-tokens` 落地时直接从 `mockups/styles/tokens.css` 迁移。

## 📋 架构决策记录 decisions/

> ADR 按 NNNN 递增编号。状态：Proposed → Accepted → Superseded。

| 编号 | 标题 | 状态 | 日期 |
|---|---|---|---|
| [ADR-0001](./decisions/ADR-0001-frontend-framework.md) | 前端框架（React 18 + Vite + TypeScript） | Accepted | 2026-05-25 |
| [ADR-0002](./decisions/ADR-0002-backend-runtime.md) | 后端运行时与框架（Node.js 20 + Fastify + zod） | Accepted | 2026-05-25 |
| [ADR-0003](./decisions/ADR-0003-database-and-orm.md) | 数据库 + ORM（PostgreSQL 16 + Prisma 5 + Redis 7） | Accepted | 2026-05-25 |
| [ADR-0004](./decisions/ADR-0004-driving-state-source.md) | 行车态车速数据源协议（URL 参数 mock + JS Bridge 抽象） | Accepted | 2026-05-25 |
| [ADR-0005](./decisions/ADR-0005-deployment-strategy.md) | 部署方案（Vercel 前端 + Railway/Render 后端） | Accepted | 2026-05-25 |
| [ADR-0006](./decisions/ADR-0006-monorepo-tool.md) | monorepo 工具选型（pnpm + Turborepo） | Accepted | 2026-05-25 |
| [ADR-0007](./decisions/ADR-0007-ui-library-and-design-system.md) | UI 库 / 设计系统起点（自研 tokens + Tailwind + Radix Primitives） | Accepted | 2026-05-25 |

> **依赖顺序**：ADR-0006 → 0001 / 0002 / 0003 → 0007 → 0004 → 0005。
> 详见 PRD.md §起手 Coding 计划 / 开干前必须先定的 ADR。

## 🔍 调研报告 research/

> 技术选型对比、竞品调研、可行性分析。

| 文档 | 摘要 | 状态 | 日期 |
|---|---|---|---|
| [competitor-analysis.md](./research/competitor-analysis.md) | 7 家车厂竞品（NIO / 理想 / 问界 / Tesla / 小鹏 / 小米 / Polestar）+ AAOS / NHTSA / HarmonyOS HMI 规范 + 给我们 Demo 的设计建议 | Draft | 2026-05-26 |

## 🖼 图示 diagrams/（仓库根目录）

| 文件 | 用途 | 最后更新 |
|---|---|---|
| [information-architecture.excalidraw](../diagrams/information-architecture.excalidraw) | 信息架构图（IA） | 2026-05-25 |
| [system-architecture.excalidraw](../diagrams/system-architecture.excalidraw) | 系统技术架构图 | 2026-05-25 |

---

## 文档状态约定

- **Draft** — 初稿，仍在打磨
- **Accepted** — 已对齐确认，可作为后续工作依据
- **Superseded by X** — 已被新文档取代，保留供追溯
- **Pending** — 占位中，尚未撰写

## 维护规则

1. 新增文档时，先在本文件登记，再写正文（防止文档孤儿）
2. 改动状态时，同步更新本文件的状态列与日期列
3. ADR 编号一旦分配不重复使用（Superseded 也保留原编号）
