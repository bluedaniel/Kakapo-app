import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { fromJS, List } from 'immutable';
import { getData } from '../../helper';
import { newSoundClass } from 'classes/';
import { ImportKakapo as Kakapo, ImportKakapoItem as KakapoItem } from 'components/';

function setup(props = {}) {
  const propData = {
    ...getData('search'),
    soundActions: {},
    ...getData('intl'),
    dispatch: (e) => e,
    ...props
  };
  return { props, wrapper: shallow(<Kakapo {...propData} />) };
}

function randomSounds(count) {
  let arr = new List();
  for (let i = 0; i < count; i++) {
    const obj = { ...newSoundClass, source: 'file', progress: 1 };
    arr = arr.set(i, Object.keys(obj).reduce((newObj, _e) => {
      newObj[_e] = typeof obj[_e] === 'function' ? `test${i}` : obj[_e];
      return newObj;
    }, {}));
  }
  return arr;
}

describe('<Kakapo/>', () => {
  it('renders as a <div> with className equals `kakapo`', () => {
    const { wrapper } = setup();
    expect(wrapper.type()).to.eql('div');
    expect(wrapper.prop('className')).to.eql('kakapo');
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
