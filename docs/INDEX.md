# 文档索引 INDEX

> 本仓库所有结论性文档的目录。每次新增 / 修改 / 废弃文档都必须同步更新这里。
> 协作铁律见根目录 [`CLAUDE.md`](../CLAUDE.md)。

---

## 📌 入口文档（必读）

- [CLAUDE.md](../CLAUDE.md) — 项目协作铁律 · Accepted · 2026-05-25
- [docs/PRD.md](./PRD.md) — 产品需求文档 v0.3 · Draft · 2026-05-25

## 📐 架构设计 architecture/

> 系统级架构说明、技术栈总览。

_暂无（首份待 ADR-0001 ~ 0003 落地后产出）_

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

> 技术选型对比、可行性分析。

_暂无_

## 🖼 图示 diagrams/（仓库根目录）

| 文件 | 用途 | 最后更新 |
|---|---|---|
| [information-architecture.excalidraw](../diagrams/information-architecture.excalidraw) | 信息架构图（IA） | 2026-05-25 |
| _system-architecture.excalidraw_ | 系统技术架构图（待生成） | — |

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
