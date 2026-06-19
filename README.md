# lflg04.github.io

我的个人博客站点，基于 [Astro](https://astro.build) + [Fuwari](https://github.com/saicaca/fuwari) 模板构建，托管于 GitHub Pages。

## 本地开发

```bash
pnpm install                      # 安装依赖
pnpm dev                          # 启动开发服务器 → http://localhost:4321
pnpm new-post "文章标题"           # 新建文章
pnpm build                        # 构建静态站点至 dist/
pnpm preview                      # 预览构建产物
```

## 页面

- **/about/** — 关于我
- **/archive/** — 文章归档
- **/projects/** — 项目与实验集合，包含可玩小游戏

### Games

在 `/games/` 下可直接在浏览器中游玩：

- **2048** — 经典数字合并游戏，滑动方块拼出 2048 (/games/2048/)
- **Make 24** — 24 点算术游戏，用四个数字和 +−×÷ 凑出 24 (/games/make-24/)

## 发布

推送至 `main` 分支，GitHub Actions 自动部署到 [lflg04.github.io](https://lflg04.github.io)。
