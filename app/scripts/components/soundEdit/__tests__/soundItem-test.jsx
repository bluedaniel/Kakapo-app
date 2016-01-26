/*eslint-env mocha */
/*eslint no-console:0 */
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { mapValues } from 'lodash';
import { newSoundClass } from 'classes/';
import SoundEdit from '../soundEdit';
import { getFakeData, getReactIntlContext } from '__tests__/helper';

function setup(props={}) {
  const storeData = { ...getFakeData('themes'), soundActions: {} };
  const wrapper = shallow(<SoundEdit sound={props} { ...storeData }/>, {
    context: getReactIntlContext()
  }).shallow();
  return {
    props,
    wrapper
  };
}

let soundProp = (props={}) => mapValues({ ...newSoundClass, ...{
  source: 'file',
  progress: 1
}, ...props }, e => e === null ? `wind` : e);

let defaultClassName = 'item waves-effect waves-block';
let youtubeTestId = '7ccQyyCLtx8';

describe('<SoundEdit/>', () => {
  it('renders as a <div> with className equals `item editing`', () => {
    const { wrapper } = setup(soundProp());
    expect(wrapper.type()).to.eql('div');
    expect(wrapper.prop('className')).to.eql(`item editing`);
  });

  it('should render 2 inputs', () => {
    const { wrapper } = setup(soundProp());
    expect(wrapper.find('.input')).to.have.length(2);
  });

  // describe('When YouTube added', () => {
  //   it('className `youtube-stream` is added', () => {
  //     const { wrapper } = setup(soundProp({ source: 'youtubeStream' }));
  //     expect(wrapper.prop('className')).to.eql(`${defaultClassName} paused youtube-stream`);
  //   });
  //
  //   it('should render only 2 icons', () => {
  //     const { wrapper } = setup(soundProp({ source: 'youtubeStream' }));
  //     expect(wrapper.find('.icon-share')).to.have.length(1);
  //     expect(wrapper.find('.icon-trash')).to.have.length(1);
  //   });
  //
  //   it('video container with className `youtube-video` and id `video-' + youtubeTestId + '` is added', () => {
  //     const { wrapper } = setup(soundProp({ file: youtubeTestId, source: 'youtubeStream' }));
  //     expect(wrapper.find('.youtube-video')).to.have.length(1);
  //     expect(wrapper.find('.youtube-video').prop('id')).to.eql(`video-${youtubeTestId}`);
  //   });
  // });
  //
  // describe('When playing', () => {
  //   it('className equals `item waves-effect waves-block playing`', () => {
  //     const { wrapper } = setup(soundProp({ playing: true }));
  //     expect(wrapper.prop('className')).to.eql(`${defaultClassName} playing`);
  //   });
  // });

});
