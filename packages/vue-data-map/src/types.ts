import type { EChartsOption } from 'echarts';

export type ChartType = 'bar' | 'line' | 'pie' | 'gauge' | 'map' | 'radar' | 'scatter' | 'custom';

export type Trend = 'up' | 'down' | 'flat';

export interface MetricItem {
  /** Stable key */
  id?: string;
  /** Title shown above the value */
  label: string;
  /** Primary number (string allows pre-formatted values like "¥ 1,234") */
  value: string | number;
  /** Optional unit shown after the value */
  unit?: string;
  /** Compare-to-previous percentage (e.g. 0.123 → +12.3%). Sign drives the up/down arrow. */
  delta?: number;
  /** Optional explicit trend; otherwise inferred from delta sign */
  trend?: Trend;
  /** Optional accent color for the side bar */
  color?: string;
  /** Optional secondary description */
  description?: string;
  /** Optional tiny sparkline series */
  spark?: number[];
}

export interface ChartWidget {
  /** Stable key */
  id?: string;
  /** Card title */
  title?: string;
  /** Optional subtitle / caption */
  subtitle?: string;
  /** Chart kind */
  type: ChartType;
  /**
   * For built-in types we accept lightweight shorthand, but you can always pass
   * a fully-fledged ECharts option via `option`. When both are provided,
   * `option` wins.
   */
  data?: any;
  /** Pass an ECharts option object directly */
  option?: EChartsOption;
  /** Card span on a 12-col grid (default 6) */
  span?: number;
  /** Min height in px (default 280) */
  minHeight?: number;
  /** Optional theme override per widget (light | dark) */
  theme?: 'light' | 'dark';
}

export interface DataMapSchema {
  /** Optional dashboard title shown in the header */
  title?: string;
  /** Optional dashboard subtitle / time range hint */
  subtitle?: string;
  /** Top KPI strip */
  metrics?: MetricItem[];
  /** Chart widgets, rendered in a 12-column responsive grid */
  widgets?: ChartWidget[];
}

export interface DataMapTheme {
  /** light or dark surface */
  mode?: 'light' | 'dark';
  /** Primary accent color, used for KPI/up trends */
  primary?: string;
  /** Down/danger color */
  danger?: string;
  /** Background color of the dashboard */
  background?: string;
  /** Card background */
  cardBackground?: string;
  /** Text color */
  textColor?: string;
  /** Muted text color */
  mutedColor?: string;
}
