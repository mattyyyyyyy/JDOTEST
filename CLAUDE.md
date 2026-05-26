# 车机端电商平台 · 项目协作规则

## 🔒 铁律：调研与讨论必须本地化

**任何调研、技术对比、方案讨论、对齐结论，都必须以文档形式落到本仓库中，成为结论文件。**

未落到文件的对话**不算结论**。下一轮会话不得依赖"上次说过"，只认仓库里的文档。

### 为什么

- 防止同一个问题被反复调研
- 防止多轮讨论间结论漂移、互相矛盾
- 防止换会话/换上下文后丢失关键决策
- 让任何时间点接手的人（包括下一轮 Claude）可以仅凭仓库还原全部判断依据

## 📁 文档资产结构

```
studio/
├── CLAUDE.md                              # 本文件，项目规则
├── docs/
│   ├── INDEX.md                           # 全部文档索引（必读）
│   ├── PRD.md                             # 产品需求文档
│   ├── architecture/                      # 架构设计文档
│   │   ├── tech-stack.md                  # 技术栈选型
│   │   └── system-overview.md             # 系统架构
│   ├── decisions/                         # 架构/产品决策记录（ADR）
│   │   └── ADR-NNNN-<short-title>.md
│   └── research/                          # 调研报告
│       └── <topic>.md
└── diagrams/                              # 所有图示文件（excalidraw / svg / png）
```

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

文件名：`ADR-NNNN-<kebab-case-title>.md`（NNNN 四位递增，例：ADR-0001-frontend-framework.md）

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

## 🗂 INDEX.md 维护

`docs/INDEX.md` 是所有文档的目录，**每次新增 / 修改 / 废弃文档时必须同步更新**。
INDEX.md 一行一条：`- [标题](相对路径) — 一句话摘要 · 状态 · 最后更新日期`。

## 🚦 工作流约束

1. **新一轮会话开始时**：必须先读 `CLAUDE.md` 和 `docs/INDEX.md`，了解当前结论状态再发言
2. **调研型问题**：先在 `docs/research/` 检索是否已有结论，已有则直接引用，没有再开新调研
3. **得出结论时**：先写文档，再向用户确认；不要"先口头说，回头再写"
4. **结论变更时**：旧 ADR 不删除，改为 Superseded 状态，新 ADR 中 `Supersedes ADR-XXXX`
5. **图文件**：源文件（.excalidraw / .pen 等）保留在 `diagrams/`，不要只保留截图

## 🤝 多 agent 协作公约（本项目可能并行跑多个 Claude session）

**前提**：本项目允许并行运行多个 Claude 实例同时推进。下面 4 条是硬规则。

### 公约 1 · 开工三件套（任何编辑前必做）
1. `Read CLAUDE.md`（这个文件）
2. `Read docs/INDEX.md` 看 **Active Workstreams** 表
3. 在 INDEX.md 的 Active Workstreams **append 一行**登记你要做什么：`agent-id | 工作范围 | 起始时间 | 预计涉及文件`

**违反后果**：撞车、覆盖别人的工作、产生孤儿文件。已经发生过 5 次，不接受第 6 次。

### 公约 2 · Ownership Zones（按目录分工，先看再动）
INDEX.md 维护一张 Ownership Zones 表。**改文件前先看你要改的路径在不在别人 zone 里**。

- 别人 zone 里 → coordinate（先到对应文档底部加 comment 说要改什么）
- 自己 zone 里 → 直接干
- 无人 zone（自由区）→ 直接干

### 公约 3 · 冲突检测 SOP（发现孤儿文件时）
如果发现仓库里有 untracked / 非本 agent 写的新文件：

1. **不要直接 commit** —— 先 `Read docs/INDEX.md` 看是否他人 work-in-progress
2. 如果是别 agent 在做 → 等或 coordinate
3. 如果是过去遗留 → 加入 INDEX，commit 时注明 `docs(reconcile): integrate orphan ...`
4. 如果与本 agent 工作冲突 → 触发 reconcile commit，明示「以谁为准」+ 更新 INDEX

### 公约 4 · Append-Only 协作区
以下文件由多 agent 共享维护，必须 **append-only**（增行不改/删别人行）：

- `docs/INDEX.md` § Active Workstreams 表
- `docs/INDEX.md` § Recent Activity 时间线（如启用）
- 任何 `docs/worklog/agent-*.md`（如启用）

其它文档允许覆写，但 **大段重写前必须先在 INDEX 登记** 自己的意图，给其它 agent 看到的机会。

### 自我标识

每个 agent 在 commit 时尽量在 commit message 末尾加自报家门：
```
agent: claude-<short-context>
```
（不强制，但有助于 git log 排查冲突）

## 📌 当前结论摘要（避免反复确认）

> 详情见 docs/INDEX.md 与各 ADR

- 运行形态：车机内嵌 H5 / WebView（已锁定）
- 业务范围：通用全品类电商（已锁定）
- 阶段策略：先做通用 Demo，不绑定具体车厂（已锁定）
- 起手顺序：PRD → IA → 技术架构 → UI → 前端 → 后端 → 部署（已锁定）
