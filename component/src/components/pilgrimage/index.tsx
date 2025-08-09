import clsx from 'clsx';
import { type FC, useMemo, useState } from 'react';
import './index.css';
import Select from '../common/select';

import type { PilgrimageAnimeGroup, PilgrimageItem } from './types';

export interface PilgrimageProps {
  // 分组后的数据：每个动画及其对应的 items
  animes: PilgrimageAnimeGroup[];
  className?: string;
}

const Pilgrimage: FC<PilgrimageProps> = ({ animes, className }) => {
  const animeOptions = useMemo(() => (animes ?? []).map(g => g.anime), [animes]);
  const [selectedAnime, setSelectedAnime] = useState<string>(animeOptions[0] ?? '');

  const currentItems: PilgrimageItem[] = useMemo(() => {
    const group = (animes ?? []).find(g => g.anime === selectedAnime) ?? animes?.[0];
    return group?.items ?? [];
  }, [animes, selectedAnime]);

  return (
    <div className={clsx('kasumi-pilgrimage', className)}>
      {animeOptions.length > 0 ? (
        <div className="kasumi-pilgrimage-toolbar">
          <Select
            options={animeOptions.map(name => ({ label: name, value: name }))}
            value={selectedAnime}
            onChange={setSelectedAnime}
          />
        </div>
      ) : null}
      <section className="kasumi-pilgrimage-cards">
        {currentItems?.map(item => (
          <article
            key={`${item.realImageUrl}-${item.animeImageUrl}-${item.shootDate ?? ''}-${item.location ?? ''}`}
            className="kasumi-pilgrimage-card"
          >
            <div className="kasumi-pilgrimage-images">
              <figure className="kasumi-pilgrimage-frame">
                <img loading="lazy" src={item.realImageUrl} />
              </figure>
              <figure className="kasumi-pilgrimage-frame">
                <img loading="lazy" src={item.animeImageUrl} />
              </figure>
            </div>
            <div className="kasumi-pilgrimage-content">
              {item.description ? <p className="kasumi-pilgrimage-desc">{item.description}</p> : null}
              <div className="kasumi-pilgrimage-meta">
                {item.shootDate ? <span>{item.shootDate}</span> : null}
                {item.location ? (
                  <>
                    <span className="kasumi-pilgrimage-dot" />
                    <span>{item.location}</span>
                  </>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};

export default Pilgrimage;
