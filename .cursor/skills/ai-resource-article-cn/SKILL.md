---
name: ai-resource-article-cn
description: Write Chinese introductory articles about AI tools and resources. Reads documentation from user-provided links, researches public reviews/popularity/history via web search, and produces fair, objective markdown articles with no AI writing smell. Use when the user asks to write, draft, or introduce an AI tool/resource/project in Chinese.
---

# AI Resource Article Writer (Chinese)

Write medium-length (4000–8000 Chinese characters) tech-blog-style introductory articles about AI resources. Output is publish-ready markdown for the foxuscode platform.

All generated articles are saved to the `articles/` folder in the project root. Create the folder if it doesn't exist.

## Workflow

Copy this checklist and track progress:

```
Task Progress:
- [ ] Step 1: Gather inputs (doc links + resource name)
- [ ] Step 2: Read documentation
- [ ] Step 3: Research background (reviews, history, popularity)
- [ ] Step 4: Build outline
- [ ] Step 5: Draft article
- [ ] Step 6: De-AI polish pass
- [ ] Step 7: Final review & save
```

### Step 1: Gather Inputs

Ask the user for:
- **Resource name**: The AI tool/library/platform to introduce
- **Documentation links**: One or more URLs to official docs
- **Audience hint** (optional): Developers? Researchers? General tech enthusiasts?
- **Any angle or focus** (optional): Specific features, use cases, or comparisons

### Step 2: Read Documentation

Use `WebFetch` or `ref_read_url` to read each provided documentation link. Extract:
- What the resource does (core value proposition)
- Key features and capabilities
- Architecture or technical approach (if relevant)
- Getting started / usage basics
- Pricing model (free/open-source/paid)
- Ecosystem: integrations, plugins, community

### Step 3: Research Background

Use `WebSearch` to find supplementary information. Search for:
- `"{resource name}" review` — public reviews and opinions
- `"{resource name}" vs` — comparisons with alternatives
- `"{resource name}" GitHub stars` or popularity metrics
- `"{resource name}" history` or `"{resource name}" story` — origin story, founding team
- `"{resource name}" 使用体验` — Chinese-language user experiences
- `"{resource name}" 教程` — Chinese tutorials (signals community adoption)

Collect:
- Community size indicators (GitHub stars, npm downloads, Discord members, etc.)
- Notable adopters or use cases
- Public sentiment (strengths and criticisms)
- Founding story or notable milestones
- Comparison positioning vs. alternatives

### Step 4: Build Outline

Draft an outline following the article structure below. Share it with the user for approval before writing. Adjust sections based on what's interesting about this particular resource — don't force every section if the material doesn't warrant it.

### Step 5: Draft Article

Write the full article in Chinese following the structure and writing rules below.

### Step 6: De-AI Polish Pass

Re-read the entire draft and apply the "Eliminate AI Smell" checklist (see below). This is the most important quality step.

### Step 7: Final Review & Save

- Verify all facts against source documentation
- Ensure links are working
- Check character count is in the 4000–8000 range
- Save to `articles/{resource-name}-introduction.md` (create the `articles/` folder if it doesn't exist)

> **Note**: AI tools and resources evolve rapidly — features, pricing, and APIs can change at any time. Add a disclaimer near the top of the article (e.g., "本文信息基于撰写时的公开资料，产品功能和定价可能随时调整，请以官方最新文档为准。") so readers know to verify against current official sources.

---

## Article Structure

Not every article needs all sections. Pick what fits.

```
# {引人注目的标题}

{开头段落：用一个具体场景、数据点或小故事引入，不要用空泛的时代背景}

## {resource} 是什么

{一两段话讲清楚它解决什么问题、核心做法是什么}

## 怎么来的

{项目背景、创始团队、关键时间节点，讲得像在聊天}

## 核心能力

{挑 3-5 个最值得说的特性展开，每个配简短代码/截图/示例}

## 上手体验

{快速开始的步骤，或者典型使用流程，让读者有画面感}

## 社区和生态

{GitHub 数据、社区活跃度、谁在用、有哪些集成}

## 横向对比（可选）

{和同类工具简要比较，列表或表格，点到为止}

## 不足和局限

{客观说几个缺点或局限，引用真实用户反馈}

## 适合谁用

{总结适用场景和目标用户}

## 参考链接

{官网、文档、GitHub、引用来源}
```

---

## Writing Rules

### Voice and Tone

- **Tech blog, not textbook.** Write like a senior developer sharing a discovery with a colleague over coffee.
- **Fair and balanced.** Cover both strengths and weaknesses. Never sound like marketing copy.
- **Concrete over abstract.** Use specific numbers, examples, and scenarios instead of vague praise.
- **First-person sparingly.** Occasional "我们" or "笔者" is fine; don't overdo it.

### Eliminate AI Smell

This is critical. Run through this checklist on every draft:

**Banned phrases** — rewrite or delete if found:

| Banned | Why | Alternative approach |
|--------|-----|---------------------|
| 在当今…时代 | Cliché AI opener | Start with a concrete scenario |
| 值得注意的是 | Overused filler | Just state the point directly |
| 总而言之 / 综上所述 | Formulaic conclusion | Use a specific takeaway instead |
| 不仅…而且 / 既…又 | Overused parallel structure | Vary sentence patterns |
| 毋庸置疑 / 毫无疑问 | Empty intensifier | Remove or provide evidence |
| 应运而生 | AI cliché | Describe the actual origin |
| 赋能 / 助力 | Corporate buzzwords | Say what it actually does |
| 一站式 / 全方位 | Marketing fluff | Be specific about scope |
| 旨在 | Overly formal | Use 目标是 / 想要 / 为了 |
| 提供了强大的… | Vague praise | Name the specific capability |

**Structural anti-patterns to avoid:**

- Don't start with "随着…的发展" or any grand historical sweep
- Don't end every section with a summary sentence
- Don't use exactly 3 bullet points for everything — vary list lengths
- Don't make every paragraph the same length
- Don't use the same sentence pattern more than twice in a row
- Don't over-structure with too many subheadings for short content

**Positive signals of natural writing:**

- Mix short punchy sentences with longer explanatory ones
- Use colloquial connectors: 说白了、换句话说、举个例子、话说回来
- Include specific numbers and dates instead of "很多" or "大量"
- Rhetorical questions occasionally: 那问题来了，xxx 到底好在哪？
- Personal-sounding observations: 试了一下，确实比想象中顺滑
- Light humor or informal asides where appropriate
- Abrupt section openings (don't always ease in with context)

### Formatting

- Use markdown headers, code blocks, tables, and links
- Code examples should be minimal and runnable
- Tables for feature comparisons
- Bold for key terms on first mention
- Links should point to real, working URLs
- No emojis unless the resource itself uses them prominently
- Keep paragraphs to 3-5 sentences maximum

### Citations and Sources

- Link to official documentation for technical claims
- Attribute community opinions (e.g., "Reddit 上有用户提到…", "一位 GitHub contributor 指出…")
- Use a "参考链接" section at the end for all sources
- Don't fabricate quotes or statistics — only use what was found in research

---

## Example Prompt Interaction

**User**: Help me write an article about Cursor, here are the docs: https://docs.cursor.com

**Agent workflow**:
1. Read docs.cursor.com via WebFetch
2. Search: "Cursor AI editor review", "Cursor vs Copilot", "Cursor IDE GitHub stars", "Cursor AI 使用体验"
3. Build outline, present to user
4. Draft article in Chinese
5. Run de-AI polish pass
6. Save to `articles/cursor-introduction.md`
