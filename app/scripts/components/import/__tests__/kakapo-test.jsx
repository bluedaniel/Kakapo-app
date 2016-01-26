/*eslint-env mocha */
/*eslint no-console:0 */
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { fromJS, List } from 'immutable';
import { mapValues } from 'lodash';
import { getFakeStore, getFakeData, getReactIntlContext } from '__tests__/helper';
import { newSoundClass } from 'classes/';
import Kakapo from '../kakapo';
import KakapoItem from '../kakapoItem';

function setup(props={}) {
  const storeData = { ...getFakeData('search'), soundActions: {}, ...props };
  const wrapper = shallow(<Kakapo store={getFakeStore(storeData)}/>, {
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
    arr = arr.set(i, mapValues({ ...newSoundClass, ...{
      source: 'file',
      progress: 1
    } }, e => typeof e === 'function' ? `test${i}` : e));
  }
  return arr;
}

describe('<Kakapo/>', () => {
  it('renders as a <div> with className equals `modal-inner`', () => {
    const { wrapper } = setup();
    expect(wrapper.type()).to.eql('div');
    expect(wrapper.prop('className')).to.eql('modal-inner');
  });

  it('renders correct number of SoudCloud items', () => {
    const { wrapper } = setup({ search: fromJS({ kakapofavs: randomSounds(5) }) });
    expect(wrapper.find(KakapoItem).length).to.eql(5);
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
