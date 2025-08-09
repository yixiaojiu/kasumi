export interface PilgrimageItem {
  realImageUrl: string;
  animeImageUrl: string;
  description?: string;
  shootDate?: string;
  location?: string;
}

// 每个动画维度下的数据分组
export interface PilgrimageAnimeGroup {
  anime: string; // 动画标题/系列名
  items: PilgrimageItem[];
}
