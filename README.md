# vue-data-map

> Vue 3 + ECharts 数据看板组件 — KPI 卡、多种图表、中国地图，一份 schema 即可渲染整页运营看板。

This is the **monorepo** for the [`vue-data-map`](./packages/vue-data-map) package.

## Layout

```
vue-data-map/
├─ packages/
│  └─ vue-data-map/         # The published npm package
└─ playground/              # Vite live demo (the preview you saw)
```

## Develop

```bash
npm install
npm run dev            # 启动 playground 预览 → http://127.0.0.1:5173
npm run build          # 构建 packages/vue-data-map/dist
```

## Demo screenshots

A full sales-operations dashboard rendered from a single schema:

- 5 KPI cards with sparklines
- Line / Pie / Bar / Gauge / Radar / Scatter / China map
- Light / Dark theme switch

## License

[MIT](./packages/vue-data-map/LICENSE)
