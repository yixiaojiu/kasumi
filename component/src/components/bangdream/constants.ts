import { MusicCount } from './types';

export const difficultyList: Array<keyof MusicCount> = ['easy', 'normal', 'hard', 'expert', 'special'];

export const difficultyColorList = [
  //画难度时使用的配色
  '#8eb4fd',
  '#a6f692',
  '#fbdf8c',
  '#ff898b',
  '#f383cb',
];

export const musicClearInfoList = [
  {
    title: '完成歌曲数',
    key: 'clearedMusicCount',
  },
  {
    title: 'FullCombo 歌曲数',
    key: 'fullComboMusicCount',
  },
  {
    title: 'AllPerfect 歌曲数',
    key: 'allPerfectMusicCount',
  },
];
