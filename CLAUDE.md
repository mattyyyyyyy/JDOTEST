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

## 📌 当前结论摘要（避免反复确认）

> 详情见 docs/INDEX.md 与各 ADR

- 运行形态：车机内嵌 H5 / WebView（已锁定）
- 业务范围：通用全品类电商（已锁定）
- 阶段策略：先做通用 Demo，不绑定具体车厂（已锁定）
- 起手顺序：PRD → IA → 技术架构 → UI → 前端 → 后端 → 部署（已锁定）
