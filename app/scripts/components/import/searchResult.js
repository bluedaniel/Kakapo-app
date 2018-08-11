import React from 'react';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import { push } from 'connected-react-router';
import { soundActions } from 'actions/';

export default ({ i, service, sound, dispatch }) => {
  const handleClick = () => {
    let actionParams;
    if (service === 'youtube') {
      actionParams = {
        file: sound.videoId,
        img: sound.img,
        link: `https://www.youtube.com/watch?v=${sound.videoId}`,
        name: sound.name,
        source: 'youtubeStream',
        tags: sound.tags,
      };
    }
    if (service === 'soundcloud') {
      actionParams = sound.scId;
    }
    dispatch(soundActions.addSound(service, actionParams));
    dispatch(push('/'));
  };

  const viewCountId =
    service === 'youtube' ? 'youtube.views' : 'soundcloud.plays';

  return (
    <div
      className={`${service}-item`}
      role="button"
      tabIndex={i}
      onClick={handleClick}
      key={sound.videoId}
    >
      <div className="thumbnail">
        <img src={sound.img} alt={sound.name} />
        <span className="duration">{sound.duration}</span>
      </div>
      <span className="title">
        {sound.name}
        <span className="view-count">
          <FormattedNumber value={sound.viewCount} />{' '}
          <FormattedMessage id={viewCountId} />
        </span>
      </span>
    </div>
  );
};
