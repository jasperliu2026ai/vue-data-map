import type { EChartsOption } from 'echarts';
import type { ChartWidget } from './types';

/**
 * Build sensible default ECharts options from shorthand `data` payloads.
 * If the user supplies `option`, we just return it untouched.
 */
export function buildOption(widget: ChartWidget, isDark: boolean): EChartsOption {
  if (widget.option) return widget.option;

  const axisLine = isDark ? '#3a3f55' : '#e6e8ee';
  const axisLabel = isDark ? '#9ba3b4' : '#6a7180';
  const splitLine = isDark ? '#2a2e3f' : '#f0f2f7';

  const baseGrid = { left: 40, right: 24, top: 40, bottom: 32, containLabel: true };
  const baseTooltip = { trigger: 'axis' as const };

  switch (widget.type) {
    case 'bar': {
      const { categories = [], series = [] } = widget.data || {};
      return {
        grid: baseGrid,
        tooltip: baseTooltip,
        legend: { top: 4, textStyle: { color: axisLabel } },
        xAxis: {
          type: 'category',
          data: categories,
          axisLine: { lineStyle: { color: axisLine } },
          axisLabel: { color: axisLabel }
        },
        yAxis: {
          type: 'value',
          axisLine: { show: false },
          axisLabel: { color: axisLabel },
          splitLine: { lineStyle: { color: splitLine } }
        },
        series: series.map((s: any) => ({
          type: 'bar',
          name: s.name,
          data: s.data,
          itemStyle: { borderRadius: [6, 6, 0, 0] },
          barMaxWidth: 24
        }))
      };
    }

    case 'line': {
      const { categories = [], series = [] } = widget.data || {};
      return {
        grid: baseGrid,
        tooltip: baseTooltip,
        legend: { top: 4, textStyle: { color: axisLabel } },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: categories,
          axisLine: { lineStyle: { color: axisLine } },
          axisLabel: { color: axisLabel }
        },
        yAxis: {
          type: 'value',
          axisLine: { show: false },
          axisLabel: { color: axisLabel },
          splitLine: { lineStyle: { color: splitLine } }
        },
        series: series.map((s: any) => ({
          type: 'line',
          name: s.name,
          smooth: true,
          showSymbol: false,
          areaStyle: s.area ? { opacity: 0.18 } : undefined,
          lineStyle: { width: 2.5 },
          data: s.data
        }))
      };
    }

    case 'pie': {
      const { series = [] } = widget.data || {};
      return {
        tooltip: { trigger: 'item' },
        legend: { bottom: 0, textStyle: { color: axisLabel } },
        series: [{
          type: 'pie',
          radius: ['45%', '70%'],
          avoidLabelOverlap: true,
          itemStyle: { borderRadius: 6, borderColor: isDark ? '#1c2030' : '#fff', borderWidth: 2 },
          label: { color: axisLabel },
          labelLine: { lineStyle: { color: axisLine } },
          data: series
        }]
      };
    }

    case 'gauge': {
      const { value = 0, max = 100, name = '' } = widget.data || {};
      return {
        series: [{
          type: 'gauge',
          progress: { show: true, width: 14 },
          axisLine: { lineStyle: { width: 14, color: [[1, splitLine]] } },
          axisTick: { show: false },
          splitLine: { distance: -18, length: 8, lineStyle: { color: axisLabel } },
          axisLabel: { color: axisLabel, distance: -28, fontSize: 11 },
          pointer: { show: false },
          anchor: { show: false },
          max,
          detail: {
            valueAnimation: true,
            formatter: '{value}%',
            color: isDark ? '#fff' : '#1f2330',
            fontSize: 28,
            offsetCenter: [0, '8%']
          },
          title: { offsetCenter: [0, '78%'], color: axisLabel, fontSize: 13 },
          data: [{ value, name }]
        }]
      };
    }

    case 'radar': {
      const { indicator = [], series = [] } = widget.data || {};
      return {
        tooltip: {},
        legend: { top: 4, textStyle: { color: axisLabel } },
        radar: {
          indicator,
          axisName: { color: axisLabel },
          splitLine: { lineStyle: { color: splitLine } },
          splitArea: { areaStyle: { color: ['transparent'] } },
          axisLine: { lineStyle: { color: splitLine } }
        },
        series: [{ type: 'radar', data: series, areaStyle: { opacity: 0.2 }, lineStyle: { width: 2 } }]
      };
    }

    case 'scatter': {
      const { series = [] } = widget.data || {};
      return {
        grid: baseGrid,
        tooltip: { trigger: 'item' },
        legend: { top: 4, textStyle: { color: axisLabel } },
        xAxis: {
          type: 'value',
          axisLine: { lineStyle: { color: axisLine } },
          axisLabel: { color: axisLabel },
          splitLine: { lineStyle: { color: splitLine } }
        },
        yAxis: {
          type: 'value',
          axisLine: { lineStyle: { color: axisLine } },
          axisLabel: { color: axisLabel },
          splitLine: { lineStyle: { color: splitLine } }
        },
        series: series.map((s: any) => ({
          type: 'scatter',
          name: s.name,
          symbolSize: s.symbolSize || 14,
          data: s.data
        }))
      };
    }

    case 'map': {
      const { mapName = 'china', data = [], min = 0, max = 100 } = widget.data || {};
      return {
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c}'
        },
        visualMap: {
          left: 16,
          bottom: 16,
          min,
          max,
          calculable: true,
          inRange: { color: ['#e6f0ff', '#7B5BF1'] },
          textStyle: { color: axisLabel }
        },
        series: [{
          type: 'map',
          map: mapName,
          roam: true,
          zoom: 1.1,
          label: { show: false },
          itemStyle: {
            areaColor: isDark ? '#262a3c' : '#f5f7fb',
            borderColor: isDark ? '#3a3f55' : '#dadfeb'
          },
          emphasis: {
            label: { show: true, color: isDark ? '#fff' : '#1f2330' },
            itemStyle: { areaColor: '#FFB547' }
          },
          data
        }]
      };
    }

    default:
      return {};
  }
}
