import type { App } from 'vue';
import DataMap from './components/DataMap.vue';
import MetricCard from './components/MetricCard.vue';
import ChartPanel from './components/ChartPanel.vue';
import './style.css';

export { DataMap, MetricCard, ChartPanel };
export * from './types';
export { buildOption } from './optionBuilders';

export default {
  install(app: App) {
    app.component('DataMap', DataMap);
    app.component('MetricCard', MetricCard);
    app.component('ChartPanel', ChartPanel);
  }
};
