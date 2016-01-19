/*eslint-env mocha */
/*eslint no-console:0 */
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import mapValues from 'lodash/mapValues';
import { getFakeStore, getReactIntlContext } from '__tests__/helper';
import { youtubeItemClass } from 'classes/';
import YoutubeListItem from '../youtubeListItem';

function setup(props={}) {
  const storeData = { soundActions: {}, ...props };
  const wrapper = shallow(<YoutubeListItem sound={randomSound()} store={getFakeStore(storeData)}/>, {
    context: getReactIntlContext()
  }).shallow().shallow();

  return {
    props,
    wrapper
  };
}

function randomSound() {
  return mapValues({ ...youtubeItemClass, ...{
    videoId: '7ccQyyCLtx8',
    viewCount: 1,
    duration: '0',
    img: 'test'
  } }, e => typeof e === 'function' ? `test` : e);
}

describe('<YoutubeListItem/>', () => {
  it('renders as a <div> with className equals `youtube-item`', () => {
    const { wrapper } = setup();
    expect(wrapper.type()).to.eql('div');
    expect(wrapper.prop('className')).to.eql('youtube-item');
  });

  // it('renders correct display of duration', () => {
  //   const { wrapper } = setup();
  //   expect(wrapper.find('.view-count').text()).to.eql('0');
  // });
  //
  // describe('When mounted', () => {
  //   it.skip('focus on input should change state', () => {
  //     const { wrapper } = setup();
  //     wrapper.find('.input__field').simulate('focus');
  //     expect(wrapper.state('focused')).to.eql('input-yt');
  //   });
  //
  //   it.skip('should subscribe to RxJS autocomplete stream', () => {
  //
  //   });
  // });
});
