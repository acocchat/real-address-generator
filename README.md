# real-address-generator

- 这是一个基于 vercel 的真实地址生成器。您可以生成不同国家地图上真实的随机地址。
- [在线使用](https://real-address-generator-mu.vercel.app)

## vercel一键部署
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/acocchat/real-address-generator)


## 手动部署
- 安装依赖
```bash
npm install
```
- 安装 Vercel CLI
```bash
npm install -g vercel
```
- 启动本地开发服务器
```bash
npx vercel dev
```
- 访问 http://localhost:3000 测试应用

- 部署到 Vercel
```bash
npx vercel deploy --prod
```

## 可能遇到的问题
- 如果部署失败，尝试：
```bash
# 清除缓存重新部署
rm -rf .vercel
npx vercel deploy --prod
```

- 如果遇到依赖错误：
```bash
rm -rf node_modules
rm package-lock.json
npm install
```
- 如果遇到端口占用错误，可以指定端口：
```bash
npx vercel dev -p 3001
```

## 版权申明
- 版本来自 Adonis142857，由 acocchat 进行修改。
