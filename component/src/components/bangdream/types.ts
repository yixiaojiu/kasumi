interface Profile {
  userId: string;
  userName: string;
  rank: number;
  introduction: string;
}

interface BandRank {
  img: string;
  rank: number;
}

export interface MusicCount {
  special: number;
  normal: number;
  expert: number;
  hard: number;
  easy: number;
}

interface UserMusicClearInfo {
  clearedMusicCount: MusicCount;
  fullComboMusicCount: MusicCount;
  allPerfectMusicCount: MusicCount;
}

interface CharacterRank {
  img: string;
  rank: number;
}

export interface BangDreamData {
  profile: Profile;
  bandRankList: BandRank[];
  userMusicClearInfo: UserMusicClearInfo;
  userCharacterRank: CharacterRank[];
}
