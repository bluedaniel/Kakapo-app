import React, { PropTypes } from 'react';
import { soundActions } from 'actions/';

export default function SearchResult({ service, sound, intl, dispatch }, { router }) {
  const handleClick = () => {
    let actionParams;
    if (service === 'youtube') {
      actionParams = {
        file: sound.videoId,
        img: sound.img,
        link: `https://www.youtube.com/watch?v=${sound.videoId}`,
        name: sound.name,
        source: 'youtubeStream',
        tags: sound.tags
      };
    }
    if (service === 'soundcloud') {
      actionParams = sound.scId;
    }
    dispatch(soundActions.addSound(service, actionParams));
    router.push('/');
  };

  const viewCountId = service === 'youtube' ? 'youtube.views' : 'soundcloud.plays';

  return (
    <div className={`${service}-item`} onClick={handleClick}>
      <div className="thumbnail">
        <img src={sound.img} role="presentation" />
        <span className="duration">
          {sound.duration}
        </span>
      </div>
      <span className="title">
        {sound.name}
        <span className="view-count">
          {intl.formatNumber(sound.viewCount)} {intl.formatMessage({ id: viewCountId })}
        </span>
      </span>
    </div>
  );
}

SearchResult.contextTypes = { router: PropTypes.object };
