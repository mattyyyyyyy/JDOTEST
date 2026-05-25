# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

# 车机端电商平台 · 项目协作规则

## 📌 仓库当前状态（开始任何工作前先认清）

- 本仓库目前处于 **"文档先行、零代码"** 阶段，根目录下没有 `apps/`、`services/`、`packages/`，只有 `docs/` + `diagrams/` + 本 `CLAUDE.md`
- PRD（`docs/PRD.md`）已迭代到 **v0.3**，锁定了目录骨架、后端接入方案与 Week 0~2 的 Coding 计划
- `docs/INDEX.md` **在 CLAUDE.md 的规则里被多次引用，但当前仓库尚未创建**——任何新增的文档工作应当顺手补上它
- `diagrams/information-architecture.excalidraw` 是已交付的信息架构图，用 [excalidraw.com](https://excalidraw.com) 打开编辑
- 默认开发分支约定见环境注入的指令（当前会话为 `claude/claude-md-docs-QJJqC`）；**不要** 直接 push 到 `main`

## 🔒 铁律：调研与讨论必须本地化

**任何调研、技术对比、方案讨论、对齐结论，都必须以文档形式落到本仓库中，成为结论文件。**

未落到文件的对话**不算结论**。下一轮会话不得依赖"上次说过"，只认仓库里的文档。

### 为什么

- 防止同一个问题被反复调研
- 防止多轮讨论间结论漂移、互相矛盾
- 防止换会话/换上下文后丢失关键决策
- 让任何时间点接手的人（包括下一轮 Claude）可以仅凭仓库还原全部判断依据

## 📁 文档资产结构（现状 + 规划）

```
JDOTEST/                                   # 仓库根
├── CLAUDE.md                              # 本文件 · 项目协作规则
├── docs/
│   ├── INDEX.md                           # ⚠️ 规划中 · 全部文档索引（必读）—— 尚未创建
│   ├── PRD.md                             # ✅ 已存在 v0.3 · 产品需求文档
│   ├── architecture/                      # ⚠️ 规划中 · 架构设计文档（tech-stack、system-overview 等）
│   ├── decisions/                         # ⚠️ 规划中 · ADR 目录（ADR-NNNN-*.md）
│   └── research/                          # ⚠️ 规划中 · 调研报告
└── diagrams/
    └── information-architecture.excalidraw  # ✅ 已存在 · 信息架构图源文件
```

> 一旦开始建实际代码，按 PRD v0.3 第 167 行起的「目录骨架」补 `apps/h5`、`services/api`、`packages/*`、`tools/`、`infra/` —— **不要自创目录结构**。

## 📝 何时必须写文档

| 触发场景 | 必须落到 |
|---------|---------|
| 用户与我讨论需求、确认范围 | `docs/PRD.md`（更新版本号） |
| 任何技术选型对比（React vs Vue、MySQL vs PG…） | `docs/research/<topic>.md` + 结论汇入 ADR |
| 任何架构 / 选型 / 重大产品决策被确认 | `docs/decisions/ADR-NNNN-*.md` |
| 任何架构图、流程图、IA 图被生成或修改 | `diagrams/` 下保存源文件 + 在 INDEX.md 引用 |
| 用户在对话中给出新约束、新偏好、新业务规则 | 追加到 PRD 或新建 ADR，并在 INDEX.md 登记 |

**判断口诀**：如果这段对话在 3 天后还有人需要知道，就必须写下来。

## 📐 ADR（架构决策记录）格式

文件名：`ADR-NNNN-<kebab-case-title>.md`（NNNN 四位递增，例：`ADR-0001-frontend-framework.md`）

模板：

```markdown
# ADR-NNNN: <决策标题>

- 状态：Proposed / Accepted / Superseded by ADR-XXXX
- 日期：YYYY-MM-DD
- 决策者：用户 + Claude

## 背景 Context
为什么要做这个决策，遇到了什么问题。

## 决策 Decision
最终选定的方案，一句话讲清。

## 理由 Rationale
为什么选它，关键判断依据。

## 替代方案 Alternatives Considered
对比过哪些方案，各自优劣，为什么没选。

## 后果 Consequences
- 正面影响：
- 负面影响 / 代价：
- 后续需要做的事：
```

### 已在 PRD v0.3 中预留、待落地的 ADR

按依赖顺序落，**不要一次性大讨论**：

| 序号 | 主题 | 建议默认 |
|---|---|---|
| ADR-0006 | monorepo 工具 | pnpm workspaces + Turborepo |
| ADR-0001 | 前端框架 | React + Vite + TypeScript |
| ADR-0002 | 后端运行时与框架 | Node.js + Fastify 或 NestJS |
| ADR-0003 | 数据库 + ORM | PostgreSQL + Prisma |
| ADR-0007 | UI 库 / 设计系统起点 | 自研 design tokens + 按需抠现成组件 |
| ADR-0004 | 行车态车速数据源协议 | Demo 用 `?speed=20` URL 参数 mock |
| ADR-0005 | 部署方案 | 前端 Vercel + 后端 Railway/Render |

## 🗂 INDEX.md 维护

`docs/INDEX.md` 是所有文档的目录，**每次新增 / 修改 / 废弃文档时必须同步更新**。
INDEX.md 一行一条：`- [标题](相对路径) — 一句话摘要 · 状态 · 最后更新日期`。

> 当前 INDEX.md 尚未创建。下次写文档时一并创建，作为后续 onboarding 的入口。

## 🚦 工作流约束

1. **新一轮会话开始时**：必须先读 `CLAUDE.md` 与 `docs/PRD.md`（以及 `docs/INDEX.md`，如果已创建），了解当前结论状态再发言
2. **调研型问题**：先在 `docs/research/` 检索是否已有结论，已有则直接引用，没有再开新调研
3. **得出结论时**：先写文档，再向用户确认；不要"先口头说，回头再写"
4. **结论变更时**：旧 ADR 不删除，改为 Superseded 状态，新 ADR 中 `Supersedes ADR-XXXX`；PRD 升版本号（v0.3 → v0.4），不覆盖历史
5. **图文件**：源文件（.excalidraw / .pen 等）保留在 `diagrams/`，不要只保留截图
6. **沟通语言**：中文。提交信息、ADR、PRD、用户对话一律中文；代码标识符与英文术语保留英文

## 🧱 架构大图（Demo 阶段，详见 PRD v0.3）

- **形态**：H5 / WebView，一套代码同源跑车机横屏（1920×720 / 1920×1080 / 2560×1440 / 3840×1080）+ 手机/PC 演示
- **仓库**：单仓 monorepo（pnpm workspaces），后端是 **modular monolith**（按 domain 拆模块，不上微服务）
- **前端业务模块**（`apps/h5/src/modules/`）：`catalog` / `cart` / `order` / `payment` / `account` / `fulfillment`
- **前端平台层**（`apps/h5/src/platform/`）：`driving-context`（行车/停车感知，深模块⭐）/ `ivi-shell`（主题、栅格、安全策略）/ `bridge`（JS Bridge 抽象）
- **后端模块**（`services/api/src/modules/`）：与前端 domain 一一对应；`gateway` 做路由聚合 + 鉴权 + 限流；`db` / `cache` / `observability` 横切
- **共享包**（`packages/`）：`shared-types`（DTO）、`order-state-machine`（前后端共用纯函数）、`design-tokens`、`ui-components`、`api-contracts`（openapi.yaml 是接口真相之源）、`eslint-config`
- **包命名前缀**：`@jdo/*`（例：`@jdo/h5`、`@jdo/api`、`@jdo/order-state-machine`）

### 核心深模块（必须随实现写单测）

1. **DrivingContext** — `useDrivingMode()` 单一入口，UI 组件**禁止**自行判断车速
2. **CartStore** — 本地存储 + 服务端同步 + 登录前后合并 + 弱网降级
3. **OrderStateMachine** — 纯函数 `transition(state, event) => newState`，前后端共用
4. **PaymentSession** — 二维码生成 + 手机端轮询 + 超时 + 幂等重试 + 回调

### 关键合约（跨模块）

- **Cart → Order**：购物车结算生成 draft order，由 `order` 模块统一做库存锁定 + 价格再校验
- **Order → Payment**：订单创建即同步创建 PaymentSession；**禁止前端直接修改订单状态**
- **第三方支付回调**：统一进 `payment` 模块的回调 handler，订单状态变更只在此处发生
- **接口契约**：`packages/api-contracts/openapi.yaml` 是单一真相；前端 client 由 `openapi-typescript` 自动生成，**禁止手写 fetch**
- **错误格式**：`{ "code", "message", "details", "traceId" }`，URL 走 `/api/v1/`

## 🛠 常用命令（**待代码落地后生效**，来自 PRD v0.3「起手 Coding 计划」）

> ⚠️ 目前仓库还没有 `package.json` / `docker-compose.yml`，下列命令在 Week 0 脚手架 PR 落地之前都不可用。一旦看到对应文件出现，按以下规范使用。

```bash
# 安装依赖（一次性下完所有 workspace 包）
pnpm install

# 起本地依赖服务（PG + Redis）
docker compose -f infra/docker-compose.yml up -d

# 建表 + 灌种子数据
pnpm --filter @jdo/api db:migrate
pnpm --filter @jdo/api seed

# 并行启动前端 + 后端
pnpm dev
```

**本地端口约定**：

| 服务 | 地址 |
|---|---|
| 前端 H5 dev (vite) | `http://localhost:5173` |
| 后端 API | `http://localhost:3000` |
| Swagger UI | `http://localhost:3000/docs` |
| PostgreSQL | `localhost:5432` |
| Redis | `localhost:6379` |

**CI 四件套**（`.github/workflows/ci.yml` 落地后）：`lint` + `typecheck` + `test` + `build`。

**环境变量**：`.env.local` 不入仓；`.env.development` / `.env.production` 模板入仓；前端只读 `VITE_PUBLIC_*` 前缀变量。

## 🚫 Out of Scope（Demo 阶段不做）

直播带货、复杂营销（拼团/砍价/瓜分红包）、第三方商家入驻、真实支付（无牌照）、真实物流接入、车厂账号 SSO 真实接入、真机 WebView 适配、后台运营系统、副驾/后排身份识别、国际化、AR/VR/3D 商品展示。完整清单见 `docs/PRD.md` "Out of Scope" 节。

## 📌 当前结论摘要（避免反复确认）

> 详情见 `docs/PRD.md` v0.3；ADR 落地后转到 `docs/INDEX.md` 与各 ADR

- **运行形态**：车机内嵌 H5 / WebView（已锁定）
- **业务范围**：通用全品类电商（已锁定）
- **阶段策略**：先做通用 Demo，不绑定具体车厂（已锁定）
- **起手顺序**：PRD → IA → 技术架构 → UI → 前端 → 后端 → 部署（已锁定）
- **仓库形态**：单仓 monorepo + pnpm workspaces（PRD v0.3 锁定，待 ADR-0006 正式裁定）
- **后端形态**：modular monolith，**不上微服务**（PRD v0.3 锁定）
- **前端预选**：React + Vite + TS（待 ADR-0001）
- **后端预选**：Node.js（待 ADR-0002）
- **数据库预选**：PostgreSQL + Redis（待 ADR-0003）
- **车速数据源**：Demo 阶段用 `?speed=20` URL 参数 mock（待 ADR-0004）
- **支付**：Demo 阶段全 mock，不接真实通道
