/* eslint-env mocha */
/* eslint no-console:0 */
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { newSoundClass } from 'classes/';
import { getData } from '../../helper';
import { SoundItem } from 'components/';

function setup(props = {}) {
  const propData = {
    ...getData('themes'),
    ...getData('intl'),
    soundActions: {},
    ...props
  };
  return { props, wrapper: shallow(<SoundItem {...propData} />) };
}

const soundProp = (props = {}) => {
  const obj = { ...newSoundClass, source: 'file', progress: 1, ...props };
  return { sound: Object.keys(obj).reduce((newObj, _e) => {
    newObj[_e] = obj[_e] === null ? 'wind' : obj[_e];
    return newObj;
  }, {}) };
};

const defaultClassName = 'item waves-effect waves-block';
const youtubeTestId = '7ccQyyCLtx8';

describe('<SoundItem/>', () => {
  it('renders as a <div> with className equals `item waves-effect waves-block paused`', () => {
    const { wrapper } = setup(soundProp());
    expect(wrapper.type()).to.eql('div');
    expect(wrapper.prop('className')).to.eql(`${defaultClassName} paused`);
  });

  it('without image should render `no-image`', () => {
    const { wrapper } = setup(soundProp({ source: 'youtubeStream', img: '' }));
    expect(wrapper.find('.no-image').length).to.eql(1);
  });

  it('should render 3 icons', () => {
    const { wrapper } = setup(soundProp());
    expect(wrapper.find('.icon-share')).to.have.length(1);
    expect(wrapper.find('.icon-edit')).to.have.length(1);
    expect(wrapper.find('.icon-delete')).to.have.length(1);
  });

  describe('When YouTube added', () => {
    it('className `youtube-stream` is added', () => {
      const { wrapper } = setup(soundProp({ source: 'youtubeStream' }));
      expect(wrapper.prop('className')).to.eql(`${defaultClassName} paused youtube-stream`);
    });

    it('should render only 2 icons', () => {
      const { wrapper } = setup(soundProp({ source: 'youtubeStream' }));
      expect(wrapper.find('.icon-edit')).to.have.length(0);
    });

    it(`video container '#video-${youtubeTestId}.youtube-video' is added`, () => {
      const { wrapper } = setup(soundProp({ file: youtubeTestId, source: 'youtubeStream' }));
      expect(wrapper.find('.youtube-video')).to.have.length(1);
      expect(wrapper.find('.youtube-video').prop('id')).to.eql(`video-${youtubeTestId}`);
    });
  });

  describe('When playing', () => {
    it('className equals `item waves-effect waves-block playing`', () => {
      const { wrapper } = setup(soundProp({ playing: true }));
      expect(wrapper.prop('className')).to.eql(`${defaultClassName} playing`);
    });
  });
});
