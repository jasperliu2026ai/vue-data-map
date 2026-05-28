import { computed, type ComputedRef } from 'vue';
import type { DataMapTheme } from './types';

export interface ResolvedTheme {
  mode: 'light' | 'dark';
  primary: string;
  danger: string;
  background: string;
  cardBackground: string;
  textColor: string;
  mutedColor: string;
  palette: string[];
}

const LIGHT: ResolvedTheme = {
  mode: 'light',
  primary: '#7B5BF1',
  danger: '#E5484D',
  background: '#F5F7FB',
  cardBackground: '#FFFFFF',
  textColor: '#1F2330',
  mutedColor: '#6A7180',
  palette: ['#7B5BF1', '#FF7A00', '#27AE60', '#2D9CDB', '#FFB547', '#E5484D', '#9C6ADE', '#00B8A9']
};

const DARK: ResolvedTheme = {
  mode: 'dark',
  primary: '#9C82FF',
  danger: '#FF6B6F',
  background: '#10131F',
  cardBackground: '#1C2030',
  textColor: '#F1F3F8',
  mutedColor: '#9BA3B4',
  palette: ['#9C82FF', '#FFB547', '#3DDC97', '#4FB6F7', '#FF7A00', '#FF6B6F', '#C49AFF', '#1ADBC8']
};

export function useTheme(theme: ComputedRef<DataMapTheme | undefined>): ComputedRef<ResolvedTheme> {
  return computed<ResolvedTheme>(() => {
    const t = theme.value || {};
    const base = t.mode === 'dark' ? DARK : LIGHT;
    return {
      ...base,
      ...Object.fromEntries(Object.entries(t).filter(([, v]) => v !== undefined))
    } as ResolvedTheme;
  });
}
