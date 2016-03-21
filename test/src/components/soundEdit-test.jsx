import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { getData } from '../../helper';
import { newSoundClass } from 'classes/';
import { SoundEdit } from 'components/';
import { TextInput } from 'components/ui';

function setup(props = {}) {
  const propData = {
    ...getData('themes'),
    ...getData('intl'),
    soundActions: {},
    ...props
  };
  return { props, wrapper: shallow(<SoundEdit {...propData} />) };
}

const soundProp = (props = {}) => {
  const obj = { ...newSoundClass, source: 'file', progress: 1, ...props };
  return { sound: Object.keys(obj).reduce((newObj, _e) => {
    newObj[_e] = obj[_e] === null ? 'wind' : obj[_e];
    return newObj;
  }, {}) };
};

describe('<SoundEdit/>', () => {
  it('renders as a <div> with className equals `item editing`', () => {
    const { wrapper } = setup(soundProp());
    expect(wrapper.type()).to.eql('div');
    expect(wrapper.prop('className')).to.eql('item editing');
  });

  it('should render 2 inputs', () => {
    const { wrapper } = setup(soundProp());
    expect(wrapper.find(TextInput)).to.have.length(2);
  });
});
