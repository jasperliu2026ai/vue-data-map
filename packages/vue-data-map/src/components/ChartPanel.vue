<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch, computed } from 'vue';
import * as echarts from 'echarts';
import type { ChartWidget } from '../types';
import { buildOption } from '../optionBuilders';
import type { ResolvedTheme } from '../useTheme';

const props = defineProps<{ widget: ChartWidget; theme: ResolvedTheme }>();

const root = ref<HTMLDivElement | null>(null);
let instance: echarts.ECharts | null = null;
let resizeObserver: ResizeObserver | null = null;

const isDark = computed(() => (props.widget.theme || props.theme.mode) === 'dark');

function render() {
  if (!instance) return;
  const option = buildOption(props.widget, isDark.value);
  // Inject color palette (only when widget hasn't supplied its own)
  if (!option.color) {
    option.color = props.theme.palette;
  }
  if (!option.textStyle) {
    option.textStyle = { color: props.theme.textColor };
  }
  instance.setOption(option, true);
}

onMounted(() => {
  if (!root.value) return;
  instance = echarts.init(root.value, undefined, { renderer: 'canvas' });
  render();
  resizeObserver = new ResizeObserver(() => instance?.resize());
  resizeObserver.observe(root.value);
});

onBeforeUnmount(() => {
  resizeObserver?.disconnect();
  instance?.dispose();
  instance = null;
});

watch(() => [props.widget.option, props.widget.data, props.widget.type, props.theme.mode], render, { deep: true });
</script>

<template>
  <div class="vdm-panel" :style="{ minHeight: (widget.minHeight || 280) + 'px' }">
    <div v-if="widget.title || widget.subtitle" class="vdm-panel__header">
      <h3 v-if="widget.title" class="vdm-panel__title">{{ widget.title }}</h3>
      <span v-if="widget.subtitle" class="vdm-panel__subtitle">{{ widget.subtitle }}</span>
    </div>
    <div ref="root" class="vdm-panel__chart" />
  </div>
</template>
