# 车机端电商平台 · 协作公约

> 本项目允许多个 Claude 实例并行推进。任何 agent 在编辑任何文件前 MUST 完成 **§开工三件套**。
> 修订记录：v2 (2026-05-26) — 重写为多 agent 原生版本，前一版语义全部保留并整合。

---

## 🔒 第一原则

**任何调研、对比、讨论、对齐结论必须以文档形式落到 `docs/`，未落文件不算结论。**

下一轮会话不接受"上次说过"，只认仓库。这是防止反复调研、结论漂移、上下文丢失的唯一手段。

判断口诀：**如果这段对话在 3 天后还有人需要知道，就必须写下来**。

---

## 🚦 开工三件套（任何编辑前 MUST 按顺序完成）

```
① Read CLAUDE.md            ← 本文，公约
② Read docs/INDEX.md         ← 看 Active Workstreams + Ownership Zones
③ Append docs/INDEX.md       ← 在 §Active Workstreams 加一行登记
   §Active Workstreams         格式：agent-id | 工作范围 | 起始 | 涉及文件
```

**违反后果**：撞车 / 覆盖别人工作 / 产生孤儿文件。已发生 5 次，不接受第 6 次。

---

## 📝 何时必须写文档

| 触发场景 | 落到 |
|---|---|
| 用户讨论需求、确认范围 | `docs/PRD.md`（升版本号）+ INDEX 同步 |
| 任何技术选型对比 | `docs/research/<topic>.md` + 结论收敛到 ADR |
| 任何架构 / 产品决策被确认 | `docs/decisions/ADR-NNNN-*.md`（模板见附录）|
| 架构 / 流程 / IA 图被生成或修改 | `diagrams/` 保留源文件（.excalidraw 等）+ INDEX 引用 |
| 新约束 / 偏好 / 业务规则被提出 | 追加 PRD 或新 ADR，INDEX 同步 |

**调研型任务的额外步骤**：先去 `docs/research/` 检索是否已有结论，已有则直接引用，没有再开新调研。

---

## 🗺 Ownership Zones

完整表见 [`docs/INDEX.md` §Ownership Zones](./docs/INDEX.md)。改文件前先看路径所属：

- **别人 zone** → 先到对应文档底部留 comment 协调
- **自己 zone / 无人 zone** → 直接干
- **append-only 协作区**（见下节）→ 永远只增不改/删别人内容

---

## 🔀 冲突处理 SOP

发现仓库里有 untracked / 非本 agent 写的新文件时：

1. **不要直接 commit**，先 `Read docs/INDEX.md §Active Workstreams` 查是否他人 in-progress
2. 别 agent 在做 → 等 或 coordinate
3. 历史遗留 → 登记到 INDEX，commit 用 `docs(reconcile): integrate orphan ...`
4. 与本 agent 工作冲突 → reconcile commit，明示「以谁为准」+ 更新 INDEX

**结论变更时**：旧 ADR 不删，改为 Superseded；新 ADR 中写 `Supersedes ADR-XXXX`。

---

## 📎 Append-Only 协作区

以下文件由多 agent 共享维护，**只增加自己的行，不修改/删除别人的行**：

- `docs/INDEX.md` §Active Workstreams
- `docs/INDEX.md` §Recent Activity
- 任何 `docs/worklog/agent-*.md`（若启用）

其它文档允许覆写，但 **大段重写前必须先在 §Active Workstreams 登记意图**，给其它 agent 看到的机会。

---

## ✍ Commit 自报家门

在 commit message 末尾加（非强制，但便于 git log 排查冲突）：

```
agent: claude-<short-context>
```

---

## 📁 仓库结构

```
studio/
├── CLAUDE.md                     # 本文，项目协作公约
├── docs/
│   ├── INDEX.md                  # 实时仪表盘 + 文档目录（必读）
│   ├── PRD.md                    # 产品需求文档
│   ├── feature-spec.md           # 派活看板 / 路由/接口/状态机权威源
│   ├── design/
│   │   ├── design-system.md      # 设计 token 单一真相
│   │   ├── page-spec.md          # 视觉布局权威源
│   │   └── interaction-patterns.md  # 模式 / 状态矩阵 / 决策树
│   ├── decisions/                # ADR-NNNN-*.md
│   ├── research/                 # 调研报告 <topic>.md
│   └── architecture/             # 系统级架构说明（待填）
├── diagrams/                     # excalidraw / svg 源文件
├── mockups/                      # 静态高保真 HTML 原型
├── apps/h5/                      # 前端（per ADR-0001 · 待落地）
├── services/api/                 # 后端（per ADR-0002 · 待落地）
├── packages/                     # 共享包（per ADR-0006）
├── tools/                        # 种子数据 / mock / e2e
└── infra/                        # docker-compose / Dockerfile
```

---

## 📌 锁定结论（不要再问）

- **运行形态**：车机内嵌 H5 / WebView
- **业务范围**：通用全品类电商
- **阶段策略**：先做通用 Demo，不绑定具体车厂
- **起手顺序**：PRD → IA → 技术架构 → UI → 前端 → 后端 → 部署
- **沟通语言**：中文
- **目标分辨率**：1920×720 / 1920×1080 / 2560×1440 / **2560×1600**（新增）
- **技术栈**：7 个 ADR 全 Accepted，详见 [`docs/decisions/`](./docs/decisions/)

---

## 附录 · ADR 模板

文件命名：`ADR-NNNN-<kebab-case-title>.md`（NNNN 四位递增）

```markdown
# ADR-NNNN: <决策标题>

- 状态：Proposed / Accepted / Superseded by ADR-XXXX
- 日期：YYYY-MM-DD
- 决策者：<who>

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
