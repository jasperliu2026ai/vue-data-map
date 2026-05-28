<script setup lang="ts">
import { computed } from 'vue';
import type { MetricItem } from '../types';

const props = defineProps<{ metric: MetricItem; accent?: string }>();

const trend = computed(() => {
  if (props.metric.trend) return props.metric.trend;
  const d = props.metric.delta;
  if (d === undefined || d === null) return undefined;
  if (d > 0) return 'up';
  if (d < 0) return 'down';
  return 'flat';
});

const deltaText = computed(() => {
  const d = props.metric.delta;
  if (d === undefined || d === null) return '';
  const sign = d > 0 ? '+' : '';
  return `${sign}${(d * 100).toFixed(1)}%`;
});

const sparkPath = computed(() => {
  const data = props.metric.spark;
  if (!data || data.length < 2) return '';
  const w = 88;
  const h = 28;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  return data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * h;
    return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
});
</script>

<template>
  <div class="vdm-metric" :style="{ '--vdm-accent': metric.color || accent }">
    <div class="vdm-metric__bar" />
    <div class="vdm-metric__body">
      <div class="vdm-metric__label">{{ metric.label }}</div>
      <div class="vdm-metric__value-row">
        <span class="vdm-metric__value">{{ metric.value }}</span>
        <span v-if="metric.unit" class="vdm-metric__unit">{{ metric.unit }}</span>
      </div>
      <div class="vdm-metric__meta">
        <span
          v-if="trend"
          class="vdm-metric__delta"
          :class="`vdm-metric__delta--${trend}`"
        >
          <svg v-if="trend === 'up'" width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><path d="M5 1l4 6H1z"/></svg>
          <svg v-else-if="trend === 'down'" width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><path d="M5 9l4-6H1z"/></svg>
          <svg v-else width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><rect x="1" y="4.5" width="8" height="1.5"/></svg>
          {{ deltaText }}
        </span>
        <span v-if="metric.description" class="vdm-metric__desc">{{ metric.description }}</span>
      </div>
    </div>
    <svg v-if="sparkPath" class="vdm-metric__spark" viewBox="0 0 88 28" preserveAspectRatio="none">
      <path :d="sparkPath" fill="none" stroke="var(--vdm-accent)" stroke-width="1.6" />
    </svg>
  </div>
</template>
