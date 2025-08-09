import { ReactNode } from 'react';

export interface PilgrimageItem {
  realImageUrl: string;
  animeImageUrl: string;
  description?: ReactNode;
  shootDate?: ReactNode;
  location?: ReactNode;
}

// 每个动画维度下的数据分组
export interface PilgrimageAnimeGroup {
  anime: string; // 动画标题/系列名
  items: PilgrimageItem[];
}
