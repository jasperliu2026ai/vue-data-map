<script setup lang="ts">
import { ref, computed } from 'vue';
import { DataMap } from 'vue-data-map';
import type { DataMapSchema, DataMapTheme } from 'vue-data-map';

const mode = ref<'light' | 'dark'>('light');
const theme = computed<DataMapTheme>(() => ({ mode: mode.value }));

const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

const schema = computed<DataMapSchema>(() => ({
  title: '销售运营数据看板',
  subtitle: '统计周期：2026-01-01 ~ 2026-05-28 · 实时刷新',
  metrics: [
    { label: '总销售额', value: '¥ 3,128,450', unit: 'CNY', delta: 0.124, description: '环比上月', spark: [120, 132, 101, 134, 90, 230, 210, 256, 248, 320] },
    { label: '订单总数', value: 18452, delta: 0.082, description: '环比上月', spark: [60, 72, 65, 88, 80, 102, 116, 124, 130, 142] },
    { label: '客单价', value: '¥ 169.5', delta: -0.021, description: '环比上月', spark: [180, 174, 170, 168, 172, 169, 165, 168, 169, 170] },
    { label: '活跃用户', value: '52.6K', delta: 0.196, description: '环比上月', color: '#27AE60', spark: [30, 36, 42, 48, 50, 52, 55, 58, 60, 64] },
    { label: '退款率', value: '1.42%', delta: -0.038, description: '同比下降', color: '#FF7A00', spark: [2.1, 1.9, 1.8, 1.7, 1.65, 1.6, 1.55, 1.5, 1.45, 1.42] }
  ],
  widgets: [
    {
      type: 'line',
      title: '月度营收 vs 利润',
      subtitle: '近 12 个月趋势',
      span: 7,
      data: {
        categories: months,
        series: [
          { name: '营收', data: [210, 230, 270, 245, 320, 380, 410, 425, 460, 490, 520, 565], area: true },
          { name: '利润', data: [40, 45, 58, 50, 75, 92, 105, 110, 125, 138, 152, 168], area: true }
        ]
      }
    },
    {
      type: 'pie',
      title: '渠道收入占比',
      span: 5,
      data: {
        series: [
          { name: '官网', value: 1245 },
          { name: '小程序', value: 826 },
          { name: '抖音', value: 540 },
          { name: '京东', value: 348 },
          { name: '其他', value: 169 }
        ]
      }
    },
    {
      type: 'bar',
      title: '品类销售额 TOP6',
      subtitle: '单位：万元',
      span: 5,
      data: {
        categories: ['电子', '美妆', '食品', '家居', '服饰', '母婴'],
        series: [
          { name: '本月', data: [842, 612, 526, 480, 412, 365] },
          { name: '上月', data: [780, 590, 510, 460, 405, 340] }
        ]
      }
    },
    {
      type: 'map',
      title: '全国销售热力',
      subtitle: '按省份订单量分布',
      span: 7,
      minHeight: 380,
      data: {
        mapName: 'china',
        min: 0,
        max: 1500,
        data: [
          { name: '北京市', value: 1280 },
          { name: '上海市', value: 1320 },
          { name: '天津市', value: 480 },
          { name: '重庆市', value: 620 },
          { name: '河北省', value: 540 },
          { name: '山西省', value: 320 },
          { name: '内蒙古自治区', value: 260 },
          { name: '辽宁省', value: 470 },
          { name: '吉林省', value: 290 },
          { name: '黑龙江省', value: 310 },
          { name: '江苏省', value: 1180 },
          { name: '浙江省', value: 1240 },
          { name: '安徽省', value: 580 },
          { name: '福建省', value: 720 },
          { name: '江西省', value: 410 },
          { name: '山东省', value: 950 },
          { name: '河南省', value: 690 },
          { name: '湖北省', value: 720 },
          { name: '湖南省', value: 640 },
          { name: '广东省', value: 1480 },
          { name: '广西壮族自治区', value: 380 },
          { name: '海南省', value: 220 },
          { name: '四川省', value: 870 },
          { name: '贵州省', value: 280 },
          { name: '云南省', value: 360 },
          { name: '西藏自治区', value: 90 },
          { name: '陕西省', value: 510 },
          { name: '甘肃省', value: 220 },
          { name: '青海省', value: 110 },
          { name: '宁夏回族自治区', value: 140 },
          { name: '新疆维吾尔自治区', value: 260 },
          { name: '香港特别行政区', value: 380 },
          { name: '澳门特别行政区', value: 110 },
          { name: '台湾省', value: 240 }
        ]
      }
    },
    {
      type: 'gauge',
      title: '本月目标完成度',
      span: 4,
      data: { value: 78.6, max: 100, name: '已完成' }
    },
    {
      type: 'radar',
      title: '客户体验多维评分',
      span: 4,
      data: {
        indicator: [
          { name: '商品质量', max: 100 },
          { name: '物流速度', max: 100 },
          { name: '客服响应', max: 100 },
          { name: '价格满意', max: 100 },
          { name: '售后服务', max: 100 },
          { name: '品牌信任', max: 100 }
        ],
        series: [
          { value: [92, 85, 88, 78, 86, 90], name: '本月' },
          { value: [88, 82, 80, 76, 80, 86], name: '上月' }
        ]
      }
    },
    {
      type: 'scatter',
      title: '客户分布：消费金额 × 频次',
      span: 4,
      data: {
        series: [
          {
            name: '高价值',
            symbolSize: 16,
            data: [[80, 12], [120, 18], [95, 14], [150, 22], [200, 28], [180, 25]]
          },
          {
            name: '潜力',
            symbolSize: 12,
            data: [[40, 6], [55, 8], [62, 10], [48, 7], [70, 9], [35, 5], [60, 8]]
          }
        ]
      }
    }
  ]
}));
</script>

<template>
  <div class="demo-shell">
    <div class="demo-toolbar">
      <h1>vue-data-map <small>· Live Preview</small></h1>
      <button @click="mode = mode === 'light' ? 'dark' : 'light'">
        切换 {{ mode === 'light' ? '深色' : '浅色' }}模式
      </button>
    </div>
    <DataMap :schema="schema" :theme="theme" />
  </div>
</template>
