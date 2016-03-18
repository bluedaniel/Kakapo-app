/* eslint-env mocha */
/* eslint no-console:0 */
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { newSoundClass } from 'classes/';
import { getData } from '../../helper';
import { ImportKakapoItem as KakapoItem } from 'components/';

const soundProp = (props = {}) => {
  const obj = { ...newSoundClass, source: 'file', progress: 1, ...props };
  return { sound: Object.keys(obj).reduce((newObj, _e) => {
    newObj[_e] = obj[_e] === null ? 'wind' : obj[_e];
    return newObj;
  }, {}) };
};

function setup(props = {}) {
  const propData = {
    ...getData('sounds', { full: true }),
    ...getData('intl'),
    ...props
  };
  const wrapper = shallow(<KakapoItem {...propData} />);
  return {
    props,
    wrapper
  };
}

describe('<KakapoItem/>', () => {
  it('renders as a <div> with className equals `kakapo-item disabled`', () => {
    const { wrapper } = setup(soundProp());
    expect(wrapper.type()).to.eql('div');
    expect(wrapper.prop('className')).to.eql('kakapo-item disabled');
  });

  it('when given unique file renders className equals `kakapo-item`', () => {
    const { wrapper } = setup(soundProp({ file: 'someNewFile' }));
    expect(wrapper.type()).to.eql('div');
    expect(wrapper.prop('className')).to.eql('kakapo-item');
  });
});
