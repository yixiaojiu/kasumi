import type { FC } from 'react';
import useSWR from 'swr';
import './index.css';
import { Loading, ShowError } from '../common';
import { difficultyColorList, difficultyList, musicClearInfoList } from './constants';
import type { BangDreamData } from './types';

interface BangDreamProps {
  api: string;
  LoadingComponet?: typeof Loading;
  ErrorComponent?: typeof ShowError;
}

const BangDream: FC<BangDreamProps> = ({ api, LoadingComponet = Loading, ErrorComponent = ShowError }) => {
  const { data, error, isLoading } = useSWR<BangDreamData>('bangdream', async () => {
    const response = await fetch(api);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data.data;
  });

  if (error) {
    return <ErrorComponent error={error} />;
  }

  return (
    <LoadingComponet isLoading={isLoading}>
      <div className="kasumi-container">
        <div className="kasumi-header">
          <h2 className="kasumi-username">{data?.profile?.userName}</h2>
          <p className="kasumi-level">等级 {data?.profile?.rank}</p>
          <p className="kasumi-introduction-text">{data?.profile?.introduction}</p>
          <p className="kasumi-user-id">{data?.profile?.userId}</p>
        </div>

        {/* 乐曲完成情况 */}
        {musicClearInfoList.map(musicClearInfo => (
          <div key={musicClearInfo.key} className="kasumi-section">
            <h2 className="kasumi-section-title">{musicClearInfo.title}</h2>
            <div className="kasumi-difficulty-grid">
              {difficultyList.map((difficulty, index) => (
                <div key={difficulty} className="kasumi-difficulty-item">
                  <div className="kasumi-difficulty-tag" style={{ backgroundColor: difficultyColorList[index] }}>
                    {difficulty}
                  </div>
                  <span className="kasumi-difficulty-value">
                    {data?.userMusicClearInfo?.[musicClearInfo.key]?.[difficulty]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* 乐队等级 */}
        <div className="kasumi-section">
          <h2 className="kasumi-section-title">乐队等级</h2>
          <div className="kasumi-band-grid">
            {data?.bandRankList?.map(bandRank => (
              <div key={bandRank.img} className="kasumi-band-item">
                <img alt="band avatar" loading="lazy" className="kasumi-band-avatar" src={bandRank.img} />
                <div className="kasumi-band-level">{bandRank.rank}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 角色等级 */}
        <div className="kasumi-section">
          <h2 className="kasumi-section-title">角色等级</h2>
          <div className="kasumi-character-grid">
            {data?.userCharacterRank.map(character => (
              <div key={character.img} className="kasumi-character-item">
                <img alt="character avatar" loading="lazy" className="kasumi-character-avatar" src={character.img} />
                <div className="kasumi-character-level">{character.rank}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </LoadingComponet>
  );
};

export default BangDream;
