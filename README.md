# lflg04.github.io

我的个人博客站点，基于 [Astro](https://astro.build) + [Fuwari](https://github.com/saicaca/fuwari) 模板构建，托管于 GitHub Pages。

## 本地开发

```bash
pnpm install && pnpm add sharp    # 安装依赖
pnpm dev                          # 启动开发服务器 → http://localhost:4321
pnpm new-post "文章标题"           # 新建文章
pnpm build                        # 构建静态站点至 dist/
```

## 发布

推送至 `main` 分支，GitHub Actions 自动部署到 [lflg04.github.io](https://lflg04.github.io)。
