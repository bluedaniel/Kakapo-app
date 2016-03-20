/* eslint-env mocha */
/* eslint no-console:0 */
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Map } from 'immutable';
import { getData } from '../../helper';
import { newSoundClass } from 'classes/';
import { SoundList } from 'components/';

function setup(props = {}) {
  const propData = {
    ...getData('sounds'),
    ...getData('themes'),
    ...getData('intl'),
    ...props
  };
  return { props, wrapper: shallow(<SoundList {...propData} />) };
}

function randomSounds(count) {
  let arr = new Map();
  for (let i = 0; i < count; i++) {
    const obj = { ...newSoundClass, progress: i > 2 ? 1 : 0.5, editing: i > 2 };
    arr = arr.set(i, Object.keys(obj).reduce((newObj, _e) => {
      newObj[_e] = obj[_e] === null ? `test${i}` : obj[_e];
      return newObj;
    }, {}));
  }
  return arr;
}

describe('<SoundList/>', () => {
  it('renders null if no sounds', () => {
    const { wrapper } = setup();
    expect(wrapper.html()).to.eql('<div></div>');
  });

  describe('When given props', () => {
    it('renders as a <section>', () => {
      const { wrapper } = setup({ sounds: randomSounds(4) });
      expect(wrapper.type()).to.eql('section');
    });

    it('should only render sounds with `progress` === 1', () => {
      const { wrapper } = setup({ sounds: randomSounds(8) });
      expect(wrapper.find('.sound-item-wrap').length).to.eql(5);
    });
  });
});
