/*eslint-env mocha */
/*eslint no-console:0 */
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { fromJS, List } from 'immutable';
import mapValues from 'lodash/mapValues';
import { getFakeStore, getFakeData, getReactIntlContext } from '__tests__/helper';
import { youtubeItemClass } from 'classes/';
import Youtube from '../youtube';
import YoutubeListItem from '../youtubeListItem';

function setup(props={}) {
  const storeData = { ...getFakeData('search'), soundActions: {}, ...props };
  const wrapper = shallow(<Youtube store={getFakeStore(storeData)}/>, {
    context: getReactIntlContext()
  }).shallow().shallow();
  return {
    props,
    wrapper
  };
}

function randomSounds(count) {
  let arr = new List();
  for (let i = 0; i < count; i++) {
    arr = arr.set(i, mapValues({ ...youtubeItemClass, ...{
      videoId: i,
      viewCount: i,
      duration: 0
    } }, e => typeof e === 'function' ? `test${i}` : e));
  }
  return arr;
}

describe('<Youtube/>', () => {
  it('renders as a <div> with className equals `modal-inner`', () => {
    const { wrapper } = setup();
    expect(wrapper.type()).to.eql('div');
    expect(wrapper.prop('className')).to.eql('modal-inner');
  });

  it('renders correct number of YouTube items', () => {
    const { wrapper } = setup({ search: fromJS({ youtube: randomSounds(5) }) });
    expect(wrapper.find(YoutubeListItem).length).to.eql(5);
  });

  describe('When mounted', () => {
    it.skip('focus on input should change state', () => {
      const { wrapper } = setup();
      wrapper.find('.input__field').simulate('focus');
      expect(wrapper.state('focused')).to.eql('input-yt');
    });

    it.skip('should subscribe to RxJS autocomplete stream', () => {

    });
  });
});
