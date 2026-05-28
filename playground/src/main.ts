import { createApp } from 'vue';
import * as echarts from 'echarts';
import App from './App.vue';
import chinaJson from './assets/china.json';

// Register the China map once for all map widgets
echarts.registerMap('china', chinaJson as any);

createApp(App).mount('#app');
