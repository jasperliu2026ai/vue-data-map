# vue-data-map

[![npm](https://img.shields.io/npm/v/vue-data-map.svg)](https://www.npmjs.com/package/vue-data-map)
[![license](https://img.shields.io/npm/l/vue-data-map.svg)](./LICENSE)

A configurable **Vue 3** data dashboard component — KPI cards + multi-type charts + China heat map — powered by ECharts. One schema in, full dashboard out.

> 一份 schema 即可渲染一整页带指标卡、多种图表与中国地图的运营看板，支持深浅色主题、响应式 12 栅格布局。

## ✨ Features

- 📊 **7 chart types** built-in shorthand: `bar` · `line` · `pie` · `gauge` · `radar` · `scatter` · `map` (+ `custom` 任意 ECharts option)
- 🎯 **KPI metrics strip** with delta arrows, sparklines, accent bars
- 🌗 **Light / Dark theme** + customizable palette
- 📐 **12-column responsive grid**, mobile-friendly
- 🔌 **ECharts is a peerDependency** — no double bundling
- 📦 **~13 KB ESM** (gzip ~3.8 KB), TypeScript-first

## 📦 Install

```bash
npm i vue-data-map echarts
# or
pnpm add vue-data-map echarts
```

> `vue` 与 `echarts` 是 peerDependencies，请确保你的项目已安装。

## 🚀 Quick Start

```vue
<script setup lang="ts">
import { DataMap, type DataMapSchema } from 'vue-data-map';
import 'vue-data-map/style.css';

// If you use the China map widget, register it once at app boot:
import * as echarts from 'echarts';
import chinaJson from '@/assets/china.json'; // download from https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json
echarts.registerMap('china', chinaJson);

const schema: DataMapSchema = {
  title: '销售运营数据看板',
  subtitle: '统计周期：2026-Q2',
  metrics: [
    { label: '总销售额', value: '¥ 3,128,450', delta: 0.124, spark: [120,132,101,134,90,230,210,256] },
    { label: '订单总数', value: 18452, delta: 0.082 },
    { label: '客单价',   value: '¥ 169.5', delta: -0.021 }
  ],
  widgets: [
    {
      type: 'line', title: '月度营收', span: 8,
      data: {
        categories: ['1月','2月','3月','4月','5月'],
        series: [{ name: '营收', data: [210, 230, 270, 245, 320], area: true }]
      }
    },
    {
      type: 'pie', title: '渠道占比', span: 4,
      data: { series: [{ name: '官网', value: 40 }, { name: '抖音', value: 35 }, { name: '京东', value: 25 }] }
    }
  ]
};
</script>

<template>
  <DataMap :schema="schema" :theme="{ mode: 'light' }" />
</template>
```

## 📚 API

### `<DataMap>` Props

| Prop     | Type             | Default          | Description |
|----------|------------------|------------------|-------------|
| `schema` | `DataMapSchema`  | required         | Dashboard definition |
| `theme`  | `DataMapTheme`   | `{ mode: 'light' }` | Theme override |

### `DataMapSchema`

```ts
interface DataMapSchema {
  title?: string;
  subtitle?: string;
  metrics?: MetricItem[];
  widgets?: ChartWidget[];
}

interface MetricItem {
  label: string;
  value: string | number;
  unit?: string;
  delta?: number;          // e.g. 0.123 → +12.3%
  trend?: 'up' | 'down' | 'flat';
  description?: string;
  color?: string;          // accent override
  spark?: number[];        // tiny inline trend
}

interface ChartWidget {
  type: 'bar' | 'line' | 'pie' | 'gauge' | 'map' | 'radar' | 'scatter' | 'custom';
  title?: string;
  subtitle?: string;
  span?: number;           // 1..12 grid columns, default 6
  minHeight?: number;      // px, default 280
  data?: any;              // shorthand payload (see below)
  option?: EChartsOption;  // OR pass a full ECharts option (overrides data)
}
```

### Shorthand `data` payloads

| `type`    | Shape |
|-----------|-------|
| `bar` / `line` | `{ categories: string[]; series: { name: string; data: number[]; area?: boolean }[] }` |
| `pie`     | `{ series: { name: string; value: number }[] }` |
| `gauge`   | `{ value: number; max?: number; name?: string }` |
| `radar`   | `{ indicator: { name: string; max: number }[]; series: { name: string; value: number[] }[] }` |
| `scatter` | `{ series: { name: string; data: [number, number][]; symbolSize?: number }[] }` |
| `map`     | `{ mapName: string; data: { name: string; value: number }[]; min?: number; max?: number }` |
| `custom`  | use `option` instead |

### Theme

```ts
interface DataMapTheme {
  mode?: 'light' | 'dark';
  primary?: string;
  danger?: string;
  background?: string;
  cardBackground?: string;
  textColor?: string;
  mutedColor?: string;
}
```

## 🗺️ Using the China map

`vue-data-map` ships **without** any GeoJSON to keep bundle size minimal. Register the map you need once at app startup:

```ts
import * as echarts from 'echarts';
import chinaJson from './assets/china.json';
echarts.registerMap('china', chinaJson);
```

Then use `mapName: 'china'` in your widget. Recommended GeoJSON source: <https://datav.aliyun.com/portal/school/atlas/area_selector>.

> ⚠️ Province names in the DataV GeoJSON include suffixes like `北京市` / `广东省` / `内蒙古自治区` — your data items must use the same names.

## 🧩 Plugin install

```ts
import { createApp } from 'vue';
import DataMap from 'vue-data-map';
import 'vue-data-map/style.css';

createApp(App).use(DataMap).mount('#app');
// now <DataMap />, <MetricCard />, <ChartPanel /> are globally registered
```

## 📄 License

MIT © [jasperliu2026ai](https://github.com/jasperliu2026ai)
