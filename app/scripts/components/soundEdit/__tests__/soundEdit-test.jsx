/*eslint-env mocha */
/*eslint no-console:0 */
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { mapValues } from 'lodash';
import { getData } from '__tests__/helper';
import { newSoundClass } from 'classes/';
import SoundEdit from '../soundEdit';

function setup(props={}) {
  const propData = {
    ...getData('themes'),
    ...getData('intl'),
    soundActions: {},
    ...props
  };
  const wrapper = shallow(<SoundEdit {...propData}/>);
  return {
    props,
    wrapper
  };
}

let soundProp = (props={}) => ({
  sound: mapValues({ ...newSoundClass, ...{
    source: 'file',
    progress: 1
  }, ...props }, e => e === null ? `wind` : e)
});

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
});
