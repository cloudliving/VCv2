### 项目所需

* `FrozenUI` `FlexibleJS` `Gulp`
* `又拍云` (项目资源 `CDN` 化，`WebP` 自动判断切图)

---

### 项目介绍

* 针对框架做了极简优化，清楚多余组件
* 针对不同`dpr`、`WebP`支持度、`REM`自适应做了适配

---

### 项目须知

* 添加了类名：`clearfix` (清楚浮动)
* 添加了类名：`flex-img` (自适应图片)
* 添加了属性：`data-img` (自动切适配图)，需要自动切图的img标签不要加入src属性，防止浏览器二次请求，如下所示
* ` <img data-img="projectname/picname.png"> `
* 默认字体: `华文黑体` (一律统一使用框架CSS内置定义字体)
* 添加了Snippet：`tmpl` 生成页面模版
* 添加了Snippet：`apic` 生成图片模版

---

### 项目整体规范

* 严格按照项目模版编写代码

---

### HTML规范

- **[强制]** `四格` 缩进 (不允许其他缩进形式) 
- **[强制]** `ID`，`class` 命名必须全小写，过长用 `-` 连接 
- **[强制]** `ID` 命名必须唯一
- **[强制]** `title` 必须和页面名称对应
- **[强制]** `body` 必须设置和页面名相同的 `class` 值
- **[建议]** 每行不得超过 `120` 个字符
- **[建议]** 标签使用必须符合标签嵌套规则

---

### CSS规范

- **[强制]** `四格` 缩进(不允许其他缩进形式) 
- **[强制]** 属性定义后必须以分号结尾 
- **[强制]** 选择器与 `{` 之间必须包含空格 
- **[强制]** `RGB` 颜色必须使用 `十六进制`，如 `rgba(255, 255, 255, 0)`
- **[强制]** 当一个规则包含多个选择器时，每个选择器声明必须独占一行
- **[强制]** 按钮，小图片，生成 `SVG` 后转 `iconfont` 使用，减小请求数，移动端只需引入 `ttf`
- **[强制]** 每个选择器前必须加上对应的页面的 `body` 的 `class`
- **[建议]** 尽量少使用CSS高级选择器与通配选择器，尽量使用 `class` 选择器

---

### JS规范

- **[强制]** `四格` 缩进(不允许其他缩进形式) 
- **[强制]** 命名方式一律使用 `驼峰式` 
- **[强制]** 避免移动端 `300ms` 延迟，使用 `tap` 事件 
- **[建议]** 避免频繁触发事件如：`scroll/resize/touchmove`

---

### 额外须知

- 新增两个 `Sublime Snippets` [用法参照](http://www.bluesdream.com/blog/sublime-text-snippets-function.html) [下载链接](http://cloudliving-img.b0.upaiyun.com/static/Home/dist/dev/snippets.zip)
- 新增一个 `Sublime Plugin` [下载链接](http://cloudliving-img.b0.upaiyun.com/static/Home/dist/dev/cssrem.zip)
- 最终完成的项目中不会再有额外的 `js` ，`img` 文件夹，只保留 `build` 文件夹，其中 `css` 文件夹中的所有样式会在汇总后合并、压缩、保存到 `又拍云` 中，然后移除该文件夹；对于脚本文件的处理方法，一律内嵌到页面中，不做单独的脚本文件进行维护，方便后端进行开发
- `Gulp` 会自动替换 `HTML` 页面中的本地地址为线上地址，本地开发默认使用 `dist` 做资源文件