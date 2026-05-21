# 📚 家教系统 · 双端首页

<a href="https://uniapp.dcloud.net.cn/" target="_blank"><img src="https://img.shields.io/badge/Uni--app-3.0+-3C7EFF?logo=vue.js&logoColor=3C7EFF" alt="Uni-app"></a>
<a href="https://vuejs.org/" target="_blank"><img src="https://img.shields.io/badge/Vue-3.4+-42B883?logo=vue.js&logoColor=42B883" alt="Vue"></a>
<a href="https://www.typescriptlang.org/" target="_blank"><img src="https://img.shields.io/badge/TypeScript-4.9+-3178C6?logo=typescript&logoColor=3178C6" alt="TypeScript"></a>
<a href="https://vitejs.dev/" target="_blank"><img src="https://img.shields.io/badge/Vite-5.2-646CFF?logo=vite&logoColor=646CFF" alt="Vite"></a>
<a href="https://sass-lang.com/" target="_blank"><img src="https://img.shields.io/badge/Sass-1.99+-CC6699?logo=sass&logoColor=CC6699" alt="Sass"></a>

**本项目使用：**

<a href="https://uniapp.dcloud.net.cn/" target="_blank"><img src="https://img.shields.io/badge/Uni--app-3.0.0-3C7EFF?logo=vue.js&logoColor=3C7EFF" alt="Uni-app"></a>
<a href="https://vuejs.org/" target="_blank"><img src="https://img.shields.io/badge/Vue-3.4.21-42B883?logo=vue.js&logoColor=42B883" alt="Vue"></a>
<a href="https://www.typescriptlang.org/" target="_blank"><img src="https://img.shields.io/badge/TypeScript-4.9.4-3178C6?logo=typescript&logoColor=3178C6" alt="TypeScript"></a>
<a href="https://vitejs.dev/" target="_blank"><img src="https://img.shields.io/badge/Vite-5.2.8-646CFF?logo=vite&logoColor=646CFF" alt="Vite"></a>
<a href="https://sass-lang.com/" target="_blank"><img src="https://img.shields.io/badge/Sass-1.99.0-CC6699?logo=sass&logoColor=CC6699" alt="Sass"></a>

> **面向微信小程序场景的家教平台双端首页**，覆盖学生端（找兼职、课程、收入）与家长端（找老师、需求、订单）。采用 **Uni-app + Vue3 Composition API** 组件化开发，Mock 数据与页面分离，支持 H5 预览与微信小程序编译，全部入口可点击跳转。

---

## ✨ 项目亮点

### 📱 双端首页完整交付

- **学生端首页**：顶栏（标题 / 城市切换 / 消息）、搜索、公告轮播、Banner、四宫格导航、推荐兼职列表、筛选、查看更多、下拉刷新
- **家长端首页**：同上结构，另含「家长必读」模块与推荐老师列表
- **入口页**：双端切换，便于评审与本地调试

### 🧩 组件化与规范开发

- 页面只负责组装与状态，业务数据全部来自 `src/mock/`
- 逻辑抽离至 `composables`（`useHomeData`、`usePullRefresh`、`useFilterList`）
- 布局统一 **Flex + rpx**，设计基准 **750rpx**，符合笔试 UI 规范

### 🎨 简约移动端 UI

- 主色 `#3678FF`，页面背景 `#F5F7FA`，卡片圆角 `16rpx`
- 热门 / 急聘：`JobStatusBadge` 渐变角标，独立一行不遮挡信息
- 老师认证：`VerifiedBadge` 横向「平台认证」标签

### ⚡ 可运行、可交互

- `npm install` 后即可 `npm run dev:h5` 运行
- 功能导航、搜索、消息、公告、Banner、卡片详情、报名 / 预约等均有对应子页面与反馈

---

## 🚀 功能特性

| 模块 | 学生端 | 家长端 |
|------|--------|--------|
| 顶栏 | 城市切换、消息中心 | 同左 |
| 搜索 | 兼职关键词搜索 | 老师关键词搜索 |
| Banner | 活动详情页 | 活动详情页 |
| 功能导航 | 找兼职 / 我的课程 / 我的收入 / 教学资源 | 找老师 / 我的需求 / 课程管理 / 我的订单 |
| 列表 | 推荐兼职 + 筛选 | 推荐老师 + 筛选 |
| 特色模块 | — | 家长必读 |
| 交互 | 下拉刷新、查看更多、报名 | 下拉刷新、查看更多、预约 |

---

## 🛠️ 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Uni-app | 3.0.x | 跨端框架，适配微信小程序与 H5 |
| Vue | 3.4.21 | 视图层，**Composition API**（`<script setup>`） |
| TypeScript | 4.9.x | 类型检查（`vue-tsc`） |
| Vite | 5.2.8 | 构建与开发服务器 |
| Sass | 1.99.x | 主题变量与组件样式 |

---

## 📁 项目总览结构

```plaintext
Family-Education/
├── src/
│   ├── App.vue                 # 应用入口
│   ├── main.ts
│   ├── pages.json              # 页面路由注册
│   ├── manifest.json           # 应用配置
│   ├── uni.scss                # 全局 uni 变量
│   ├── common/
│   │   └── theme.scss          # 设计规范（颜色、圆角、阴影）
│   ├── utils/
│   │   ├── router.ts           # 路由常量 ROUTES、go / goWithQuery
│   │   └── storage.ts          # 城市、报名、预约、消息已读
│   ├── composables/
│   │   ├── useHomeData.ts      # 模拟异步加载首页数据
│   │   ├── usePullRefresh.ts   # 下拉刷新
│   │   └── useFilterList.ts    # 列表筛选
│   ├── mock/                   # Mock 数据（禁止在页面硬编码）
│   ├── components/             # 可复用 UI 组件
│   └── pages/
│       ├── index/              # 双端入口
│       ├── student/            # 学生端首页 + 子页面
│       ├── parent/             # 家长端首页 + 子页面
│       └── common/             # 消息、公告、文章、活动
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

---

## 🏃 快速开始

### 环境要求

- Node.js >= 16
- npm >= 8

### 安装依赖

```bash
git clone <your-repo-url>
cd Family-Education
npm install
```

### 启动开发

```bash
# H5 预览（推荐）
npm run dev:h5
# 或
npm start
```

浏览器打开终端输出的地址（如 `http://localhost:5173`），在入口页选择 **学生端首页** 或 **家长端首页**。

### 微信小程序

```bash
npm run dev:mp-weixin
```

使用微信开发者工具导入项目下的 `dist/dev/mp-weixin` 目录预览。

### 类型检查与构建

```bash
npm run type-check    # TypeScript 检查
npm run build:h5      # H5 生产构建
npm run build:mp-weixin
```

---

## 🔍 核心实现说明

### 1. 分层架构

```plaintext
pages（页面组装）
    ↓ composables（加载 / 刷新 / 筛选）
    ↓ components（纯展示 + 轻交互）
    ↓ mock（业务数据）
```

页面内**禁止**硬编码兼职、老师等业务列表；通过 `fetchHomeData()` 统一拉取 Mock。

### 2. 首页数据加载

```typescript
// composables/useHomeData.ts — 模拟 600ms 网络延迟
const { data, loading, error, load } = useHomeData(fetchHomeData)
```

### 3. 路由与本地状态

- 路由：`src/utils/router.ts` 集中管理 `ROUTES`
- 本地持久化：已报名兼职、已预约老师、已读消息、所选城市（`storage.ts`）

### 4. 「查看更多」交互

| 按钮状态 | 行为 |
|----------|------|
| 查看更多（还有 N 条） | 在首页展开当前筛选下的全部条目 |
| 查看全部列表 → | 跳转完整列表页（如找兼职 / 找老师） |

---

## 一、项目运行方式

### 1. 环境要求

| 项 | 要求 |
|----|------|
| Node.js | >= 16 |
| npm | >= 8 |
| 系统 | Windows / macOS / Linux 均可 |

### 2. 安装步骤

```bash
# 进入项目根目录
cd Family-Education

# 安装依赖（提交要求：执行 npm install 后须可运行）
npm install
```

### 3. 开发运行

| 命令 | 说明 |
|------|------|
| `npm run dev:h5` | H5 开发模式，浏览器预览 |
| `npm start` | 同 `dev:h5` |
| `npm run dev:mp-weixin` | 编译到微信小程序 |

启动后在浏览器访问控制台打印的本地地址，默认从 **入口页** 进入，再选择学生端或家长端首页。

### 4. 生产构建

```bash
npm run build:h5          # 输出 dist/build/h5
npm run build:mp-weixin   # 输出 dist/build/mp-weixin
```

### 5. 验证清单

- [ ] `npm install` 无报错
- [ ] H5 可打开入口页、学生端、家长端
- [ ] 四宫格导航均可进入子页面
- [ ] 下拉刷新、搜索、消息、Banner 可点击

---

## 二、项目目录结构说明

```plaintext
Family-Education/
├── src/
│   ├── common/
│   │   └── theme.scss              # UI 规范变量
│   ├── components/                 # 见「三、组件说明」
│   │   ├── HomeHeader.vue
│   │   ├── SearchBar.vue
│   │   ├── NoticeBar.vue
│   │   ├── HomeBanner.vue
│   │   ├── QuickStats.vue
│   │   ├── FunctionGrid.vue
│   │   ├── FilterTabs.vue
│   │   ├── JobCard.vue
│   │   ├── JobStatusBadge.vue
│   │   ├── TeacherCard.vue
│   │   ├── VerifiedBadge.vue
│   │   ├── SectionTitle.vue
│   │   ├── ViewMoreButton.vue
│   │   ├── ParentMustRead.vue
│   │   ├── PageNavbar.vue
│   │   ├── EmptyState.vue
│   │   └── LoadingView.vue
│   ├── composables/
│   │   ├── useHomeData.ts
│   │   ├── usePullRefresh.ts
│   │   └── useFilterList.ts
│   ├── mock/                       # 见「四、mock 数据说明」
│   │   ├── jobs.ts
│   │   ├── teachers.ts
│   │   ├── banners.ts
│   │   ├── nav.ts
│   │   ├── notices.ts
│   │   ├── filters.ts
│   │   ├── stats.ts
│   │   ├── courses.ts
│   │   ├── income.ts
│   │   ├── resources.ts
│   │   ├── messages.ts
│   │   ├── requirements.ts
│   │   ├── orders.ts
│   │   ├── articles.ts
│   │   ├── lookup.ts
│   │   └── index.ts
│   ├── pages/                      # 见「五、页面结构说明」
│   │   ├── index/index.vue
│   │   ├── student/
│   │   │   ├── home.vue
│   │   │   ├── jobs.vue
│   │   │   ├── courses.vue
│   │   │   ├── income.vue
│   │   │   ├── resources.vue
│   │   │   ├── job-detail.vue
│   │   │   └── search.vue
│   │   ├── parent/
│   │   │   ├── home.vue
│   │   │   ├── teachers.vue
│   │   │   ├── requirements.vue
│   │   │   ├── courses.vue
│   │   │   ├── orders.vue
│   │   │   ├── teacher-detail.vue
│   │   │   └── search.vue
│   │   └── common/
│   │       ├── messages.vue
│   │       ├── notice.vue
│   │       ├── article-detail.vue
│   │       └── banner-detail.vue
│   ├── utils/
│   │   ├── router.ts
│   │   └── storage.ts
│   ├── App.vue
│   ├── main.ts
│   ├── pages.json
│   └── manifest.json
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

**目录职责简述：**

| 目录 | 职责 |
|------|------|
| `components/` | 可复用 UI，不含业务硬编码 |
| `composables/` | 可复用逻辑，避免堆在单页面 |
| `mock/` | 全部业务静态数据 |
| `pages/` | 页面级组装与路由 |
| `utils/` | 路由跳转与本地存储 |

---

## 三、组件说明

> 笔试交付必含项（含建议拆分组件）

| 组件 | 文件 | 职责说明 |
|------|------|----------|
| `HomeHeader` | `HomeHeader.vue` | 渐变顶栏：标题、口号、城市切换（ActionSheet）、消息入口（跳转消息中心）、默认插槽放搜索栏 |
| `SearchBar` | `SearchBar.vue` | 搜索占位 + 按钮，跳转学生/家长搜索页 |
| `NoticeBar` | `NoticeBar.vue` | 公告标签 + 垂直轮播 + 跳转公告详情 |
| `HomeBanner` | `HomeBanner.vue` | Swiper 轮播，点击进活动详情 |
| `QuickStats` | `QuickStats.vue` | 三栏数据概览（今日新增、好评率等） |
| `FunctionGrid` | `FunctionGrid.vue` | 四宫格功能入口，读取 `nav.ts` 的 `path` 跳转 |
| `FilterTabs` | `FilterTabs.vue` | 横向筛选标签（全部 / 学科 / 上门等） |
| `JobCard` | `JobCard.vue` | 兼职卡片：发布者、价格、标签、距离、时间、报名 |
| `JobStatusBadge` | `JobStatusBadge.vue` | 热门 / 急聘渐变角标 |
| `TeacherCard` | `TeacherCard.vue` | 老师卡片：评分、认证、标签、距离、预约 |
| `VerifiedBadge` | `VerifiedBadge.vue` | 平台认证渐变标签 |
| `SectionTitle` | `SectionTitle.vue` | 区块标题 + 可选「查看更多」 |
| `ViewMoreButton` | `ViewMoreButton.vue` | 首页展开更多 / 跳转列表页 |
| `ParentMustRead` | `ParentMustRead.vue` | 家长必读文章列表（仅家长端） |
| `PageNavbar` | `PageNavbar.vue` | 子页面顶栏与返回 |
| `EmptyState` | `EmptyState.vue` | 空数据 / 错误态 |
| `LoadingView` | `LoadingView.vue` | 首页初次加载动画 |

**组件依赖关系（首页）：**

```plaintext
home.vue
├── HomeHeader → SearchBar
├── NoticeBar
├── HomeBanner
├── QuickStats
├── FunctionGrid
├── SectionTitle
├── FilterTabs
├── JobCard / TeacherCard（列表）
├── ViewMoreButton
└── ParentMustRead（仅家长端）
```

---

## 四、mock 数据说明

（含：兼职列表、老师列表、Banner、功能导航、标签、价格、距离、时间、评分）

### 数据文件一览

| 文件 | 类型 | 数量 | 说明 |
|------|------|------|------|
| `jobs.ts` | 学生兼职列表 | **12 条** | 含 tags、price、distance、time、isHot、isUrgent |
| `teachers.ts` | 老师列表 | **10 条** | 含 tags、price、distance、time、**rating** |
| `banners.ts` | Banner | 各 **3** 条 | 学生端 / 家长端轮播 |
| `nav.ts` | 功能导航 | 各 **4** 项 | 含跳转路径 `path` |
| `notices.ts` | 公告 | 各 **3** 条 | 首页滚动公告 |
| `filters.ts` | 筛选标签 | — | 学科、学段、上门、线上 |
| `stats.ts` | 概览统计 | — | 首页 QuickStats |
| `courses.ts` | 课程 | 5 + 4 条 | 学生我的课程 / 家长课程管理 |
| `income.ts` | 收入 | 8 条 | 学生我的收入 |
| `resources.ts` | 教学资源 | 8 条 | 学生教学资源 |
| `messages.ts` | 消息 | 8 条 | 消息中心 |
| `requirements.ts` | 需求 | 5 条 | 家长我的需求 |
| `orders.ts` | 订单 | 6 条 | 家长我的订单 |
| `articles.ts` | 文章 | 5 条 | 家长必读 |
| `lookup.ts` | 查询 | — | 按 id 查详情 |

### 字段规范（笔试要求对照）

| 要求字段 | 兼职 `JobItem` | 老师 `TeacherItem` |
|----------|----------------|-------------------|
| 课程标签 | `tags[]` | `tags[]` |
| 价格 | `price` + `priceUnit` | `price` + `priceUnit` |
| 距离 | `distance` | `distance` |
| 时间 | `time` | `time` |
| 评分 | — | `rating` |

### 使用方式

```typescript
// ✅ 正确：页面从 mock 引入
import { jobList, studentNavItems } from '@/mock'

// ❌ 错误：在 .vue 模板中写死业务数组
```

首页通过 `useHomeData(() => ({ jobs: [...jobList], ... }))` 模拟接口延迟加载。

---

## 五、页面结构说明

### 1. 入口页 `pages/index/index`

双端入口卡片，分别 `navigateTo` 学生端 / 家长端首页。

### 2. 学生端首页 `pages/student/home`

自上而下模块：

| 序号 | 模块 | 对应组件 / 数据 |
|------|------|----------------|
| 1 | 顶部导航栏 | `HomeHeader`：标题、城市切换、消息 |
| 2 | 搜索 | `SearchBar` |
| 3 | 公告 | `NoticeBar` ← `studentNotices` |
| 4 | Banner 宣传区 | `HomeBanner` ← `studentBanners` |
| 5 | 数据概览 | `QuickStats` |
| 6 | 功能导航区 | `FunctionGrid` ← `studentNavItems` |
| 7 | 推荐兼职列表 | `SectionTitle` + `FilterTabs` + `JobCard` |
| 8 | 查看更多 | `ViewMoreButton` |
| 9 | 下拉刷新 | `scroll-view` + `usePullRefresh` |

**功能导航跳转：**

| 入口 | 目标页面 |
|------|----------|
| 找兼职 | `pages/student/jobs` |
| 我的课程 | `pages/student/courses` |
| 我的收入 | `pages/student/income` |
| 教学资源 | `pages/student/resources` |

### 3. 家长端首页 `pages/parent/home`

| 序号 | 模块 | 说明 |
|------|------|------|
| 1 | 顶部导航栏 | 同学生端结构 |
| 2 | 搜索 | 跳转家长搜索页 |
| 3 | 公告 + Banner | `parentNotices` / `parentBanners` |
| 4 | 功能导航区 | 找老师 / 我的需求 / 课程管理 / 我的订单 |
| 5 | 推荐老师列表 | `TeacherCard` + 筛选 |
| 6 | 家长必读 | `ParentMustRead` |
| 7 | 查看更多 + 下拉刷新 | 同学生端 |

### 4. 子页面一览

| 端 | 页面 | 路径 | 作用 |
|----|------|------|------|
| 通用 | 消息中心 | `common/messages` | 消息列表、标记已读 |
| 通用 | 公告详情 | `common/notice` | 公告正文 |
| 通用 | 文章详情 | `common/article-detail` | 家长必读详情 |
| 通用 | 活动详情 | `common/banner-detail` | Banner 活动说明 |
| 学生 | 找兼职 | `student/jobs` | 完整兼职列表 |
| 学生 | 兼职详情 | `student/job-detail` | 详情、报名、收藏 |
| 学生 | 搜索 | `student/search` | 关键词搜索兼职 |
| 学生 | 课程/收入/资源 | `student/courses` 等 | 对应四宫格 |
| 家长 | 找老师 | `parent/teachers` | 完整老师列表 |
| 家长 | 老师详情 | `parent/teacher-detail` | 详情、预约、咨询 |
| 家长 | 搜索/需求/课程/订单 | `parent/*` | 对应四宫格 |

---

## 六、本次开发内容说明

### 1. 完成范围

- ✅ **学生端首页**：顶栏、Banner、功能导航（找兼职 / 我的课程 / 我的收入 / 教学资源）、推荐兼职列表、兼职卡片、查看更多、下拉刷新
- ✅ **家长端首页**：顶栏、Banner、功能导航（找老师 / 我的需求 / 课程管理 / 我的订单）、推荐老师列表、老师卡片、家长必读、查看更多、下拉刷新
- ✅ **基础组件**：按笔试建议拆分 8+ 个核心组件，并扩展搜索、筛选、角标、认证等
- ✅ **Mock 数据**：独立目录维护，含标签、价格、距离、时间、评分等字段
- ✅ **可运行工程**：`npm install` 后即可 `npm run dev:h5` 正常访问全部页面

### 2. 技术规范落实

| 笔试要求 | 落实情况 |
|----------|----------|
| Uni-app + Vue3 | ✅ `uni-preset-vue` + Vite |
| Composition API | ✅ 全部页面 `<script setup lang="ts">` |
| 组件化开发 | ✅ `components/` + `composables/` |
| Mock 数据 | ✅ `src/mock/`，页面无硬编码列表 |
| 移动端适配 | ✅ 全量 `rpx`，设计基准 750 |
| Flex / Grid 布局 | ✅ 列表、导航、卡片均为 Flex |
| 禁止逻辑堆单页 | ✅ 刷新、筛选、加载已抽离 composable |
| 页面可正常运行 | ✅ 已 `type-check` + `build:h5` 验证 |

### 3. UI 规范落实

| 规范项 | 取值 |
|--------|------|
| 主色 | `#3678FF` |
| 页面背景 | `#F5F7FA` |
| 卡片背景 | `#FFFFFF` |
| 标题 / 正文 / 辅助字 | `#333` / `#666` / `#999` |
| 卡片圆角 | `16rpx` |
| 主按钮圆角 | `40rpx` |

### 4. 交互与体验增强

- 城市切换写入本地存储，跨页一致
- 兼职报名、老师预约状态持久化
- 消息中心支持标记已读
- 首页「查看更多」先展开再「查看全部列表」跳转专页
- 热门 / 急聘、平台认证视觉参考 BOSS 直聘风格，避免遮挡正文

### 5. 交付物清单

- [x] 完整项目源码
- [x] 学生端首页源码（`pages/student/home.vue` 及子页）
- [x] 家长端首页源码（`pages/parent/home.vue` 及子页）
- [x] 基础组件（`src/components/`）
- [x] Mock 数据（`src/mock/`）
- [x] README.md（本文档，含运行方式、目录、组件、Mock、页面结构、开发说明）

---

## 📦 常用脚本

| 命令 | 说明 |
|------|------|
| `npm install` | 安装依赖 |
| `npm run dev:h5` | H5 开发 |
| `npm run dev:mp-weixin` | 微信小程序开发 |
| `npm run type-check` | TS 类型检查 |
| `npm run build:h5` | H5 构建 |

---

## 📄 许可证

本项目为家教系统笔试作品，仅供学习与评审使用。

---

**如果本项目对你有帮助，欢迎给一个 ⭐ Star！**