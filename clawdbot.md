## Clawdbot 简介：把“能聊天的 AI”变成“能干活的助手”

Clawdbot 是一个**开源的个人 AI 助手**：你把它运行在自己的电脑/服务器上，用 WhatsApp、Telegram、Slack、Discord、Signal、iMessage 等你已经在用的聊天工具和它对话，让它在你的机器上执行任务。官网对它的定位很直接：*“The AI that actually does things.”* [1]

本文只使用可核查的公开信息与引用，文末给出全部来源链接。

## 这是什么（用一句话说清楚）

Clawdbot 解决的问题不是“再做一个聊天机器人”，而是：**让你用消息对话的方式，远程指挥一台始终在线的‘个人助理电脑’**。

它的官方仓库为 `clawdbot/clawdbot`，采用 **MIT License**（版权声明显示为 2025 Peter Steinberger）[2] [3]。

## 核心结构：Agent + Gateway

第三方评测与官方 README 在结构上给出了一致的描述：

- **Agent**：LLM 驱动的智能体，运行在你的机器上（或你指定的网关主机上），能使用工具、访问文件系统、执行命令等（取决于你怎么授权）。
- **Gateway（网关）**：把“消息渠道/客户端”与 agent 连接起来的控制平面。官方 README 直说：**Gateway 是控制平面，产品本体是助手** [2]；MacStories 也用“agent + gateway”来解释它为何能嵌入 Telegram、iMessage 等消息入口 [4]。

这种设计的结果是：你不一定要安装一个新应用，反而能把“助手”放进你原本就习惯的沟通界面里。

## 它能做什么（基于官方描述）

- **多渠道接入**：WhatsApp、Telegram、Slack、Discord、Google Chat、Signal、iMessage、WebChat 等 [2]
- **本机执行**：读写文件、运行 shell 命令、执行脚本（取决于权限与策略）[1] [2]
- **浏览器控制**：可以浏览网页、填表、提取信息等 [1]
- **记忆与可定制**：官方文档将记忆/会话/配置作为核心概念，并给出完整的“从零到可用”流程 [5]
- **技能/插件与自动化**：可通过 skills/plugins 扩展能力；支持后台运行与自动化触发（如 cron）[1] [5]

## 真实用例：别人拿它做了什么（来自公开文章）

你可以把 Clawdbot 理解为“能自我扩展、能动手”的数字助理。公开评测文章里出现过一些具体例子：

- **用 Telegram 和它对话，同时让它联动你的工具**：MacStories 作者让它接入 Notion、Todoist、Spotify、Gmail 等，并让助手通过 Telegram 收发文字与语音（语音回复使用 ElevenLabs）[4]
- **用 cron 做自动化**：同一篇文章提到用 cron 检查 RSS、触发任务创建等，把原先依赖 Zapier 的自动化迁移到本机 [4]
- **把“让它做事”当作默认假设**：StarryHope 收集到的社区用法包括批量退订邮件、处理报销材料、甚至代表用户给保险公司发邮件（也因此提示需要谨慎配置权限与审核）[7]

## 官方推荐的上手路径（最少绕路）

官方文档给出的建议是：直接用 CLI onboarding 向导完成模型鉴权、网关配置、聊天渠道接入、默认安全策略、工作区与技能等 [5]。

上手时有几个硬信息很关键：

- **运行时要求**：Node ≥ 22 [5] [2]
- **Windows 运行建议**：官方文档建议通过 WSL2（原生 Windows “更问题多、工具兼容性更差”）[5]
- **健康检查**：文档提供 `status / health / security audit` 等命令，用于验证端到端状态 [5]

如果你只想抓住主线，官方 README 的最短路径是：

```bash
npm install -g clawdbot@latest
clawdbot onboard --install-daemon
```

（以上命令来自官方仓库 README；完整流程与渠道配置仍建议按文档走）[2] [5]

## 定制与更新：把“你的东西”放在 repo 外

官方文档在 Setup 页强调：为了“可更新、可长期使用”，个性化配置与工作区应该放到 repo 外面，例如：

- 工作区：`~/clawd`
- 配置：`~/.clawdbot/clawdbot.json`

文档的表述是 “Tailoring lives outside the repo” [6]。这类约定对长期使用很重要：你可以频繁升级 Clawdbot，而不必反复手工合并自己的个性化改动。

## 安全默认值：把 DM 当作不可信输入

Clawdbot 连接的是真实消息渠道，所以官方 README 把安全当作默认前提：对未知发件人的私信默认使用 **pairing（配对码）**策略，未批准前不会处理消息；并建议用 `doctor` 暴露风险配置 [2]。

第三方文章也专门提醒了风险：当一个 agent 可以“代你执行动作”时，你需要认真对待权限、误操作与提示注入的边界问题 [7]。

## 真实评价与舆论风向（公开引用）

### 可量化热度

截至本文撰写时，`clawdbot/clawdbot` 在 GitHub 上显示约 **4.7 万+ stars、5.6k forks**（实时变化）[2]。

### 媒体长评怎么评价

- **MacStories（Federico Viticci）**：作者称 Clawdbot 是一个 “tinkerer’s laboratory”，并认为它展示了“个人 AI 助手”在 2026 年可以达到的形态：助手运行在你自己的机器上，通过 Telegram 这样的消息入口交互，同时具备强定制与自我扩展能力 [4]。
- **StarryHope（Jim Mendenhall）**：作者从“开发者买 Mac mini 当 AI agent 服务器”的趋势切入，强调了它把模型能力与本机权限结合后所带来的体验，但也提醒了“给 AI 键鼠/系统权限”意味着必须谨慎配置与信任边界 [7]。

## 谁适合试一试

- **你想要“能执行”的助手**：不仅回答问题，还能在你的机器上跑命令、写脚本、做自动化（并且你愿意管理权限）[1] [2]
- **你在意可控性**：希望配置与工作区是可审查、可版本化的文件/目录，而不是黑盒服务端状态 [6]
- **你愿意为安全付出成本**：理解消息输入不可信，愿意启用 pairing、最小权限、必要时隔离/沙箱等策略 [2] [5]

## 参考资料（Sources）

[1] [Clawdbot 官网](https://clawd.bot/)

[2] [GitHub 仓库（含 README 与 star/fork 展示）](https://github.com/clawdbot/clawdbot)

[3] [LICENSE（MIT，版权声明）](https://github.com/clawdbot/clawdbot/blob/main/LICENSE)

[4] [MacStories：*Clawdbot Showed Me What the Future of Personal AI Assistants Looks Like*](https://www.macstories.net/stories/clawdbot-showed-me-what-the-future-of-personal-ai-assistants-looks-like/)

[5] [官方文档：Getting started](https://docs.clawd.bot/start/getting-started)

[6] [官方文档：Setup](https://docs.clawd.bot/start/setup)

[7] [StarryHope：*The Lobster Takeover: Why Developers Are Buying Mac Minis to Run Their Own AI Agents*](https://www.starryhope.com/minipcs/clawdbot-mac-mini-ai-agent-trend/)

<!-- Shortcut reference links for in-text citations like [1], [2], etc. -->
[1]: https://clawd.bot/
[2]: https://github.com/clawdbot/clawdbot
[3]: https://github.com/clawdbot/clawdbot/blob/main/LICENSE
[4]: https://www.macstories.net/stories/clawdbot-showed-me-what-the-future-of-personal-ai-assistants-looks-like/
[5]: https://docs.clawd.bot/start/getting-started
[6]: https://docs.clawd.bot/start/setup
[7]: https://www.starryhope.com/minipcs/clawdbot-mac-mini-ai-agent-trend/
