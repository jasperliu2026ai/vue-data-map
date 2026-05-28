<script setup lang="ts">
import { computed, toRef } from 'vue';
import type { DataMapSchema, DataMapTheme } from '../types';
import MetricCard from './MetricCard.vue';
import ChartPanel from './ChartPanel.vue';
import { useTheme } from '../useTheme';

const props = withDefaults(defineProps<{
  schema: DataMapSchema;
  theme?: DataMapTheme;
}>(), {
  theme: () => ({ mode: 'light' })
});

const themeRef = toRef(props, 'theme');
const resolvedTheme = useTheme(computed(() => themeRef.value));

const cssVars = computed(() => ({
  '--vdm-bg': resolvedTheme.value.background,
  '--vdm-card': resolvedTheme.value.cardBackground,
  '--vdm-text': resolvedTheme.value.textColor,
  '--vdm-muted': resolvedTheme.value.mutedColor,
  '--vdm-primary': resolvedTheme.value.primary,
  '--vdm-danger': resolvedTheme.value.danger
}));
</script>

<template>
  <div class="vdm-root" :class="[`vdm-root--${resolvedTheme.mode}`]" :style="cssVars">
    <header v-if="schema.title || schema.subtitle" class="vdm-header">
      <h2 v-if="schema.title" class="vdm-header__title">{{ schema.title }}</h2>
      <p v-if="schema.subtitle" class="vdm-header__subtitle">{{ schema.subtitle }}</p>
    </header>

    <section v-if="schema.metrics && schema.metrics.length" class="vdm-metrics">
      <MetricCard
        v-for="(m, i) in schema.metrics"
        :key="m.id ?? i"
        :metric="m"
        :accent="resolvedTheme.palette[i % resolvedTheme.palette.length]"
      />
    </section>

    <section v-if="schema.widgets && schema.widgets.length" class="vdm-grid">
      <div
        v-for="(w, i) in schema.widgets"
        :key="w.id ?? i"
        class="vdm-grid__cell"
        :style="{ gridColumn: `span ${Math.max(1, Math.min(12, w.span || 6))}` }"
      >
        <ChartPanel :widget="w" :theme="resolvedTheme" />
      </div>
    </section>
  </div>
</template>
