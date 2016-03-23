import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { spy } from 'sinon';
import { getData, mockEvent } from '../../helper';
import { notifyActions, soundActions } from 'actions/';
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

const sound = { ...soundProp() };

describe('<SoundEdit/>', () => {
  it('renders as a <div> with className equals `item editing`', () => {
    const { wrapper } = setup(sound);
    expect(wrapper.type()).to.eql('div');
    expect(wrapper.prop('className')).to.eql('item editing');
  });

  it('should render 2 inputs', () => {
    const { wrapper } = setup(sound);
    expect(wrapper.find(TextInput)).to.have.length(2);
  });

  it('dispatch `handleCancel` when cancel is clicked', () => {
    const dispatch = spy();
    const action = soundActions.soundsEdit(sound, null);
    const { wrapper } = setup({ sound, dispatch });
    wrapper.find('.button').at(0).simulate('click', mockEvent);
    expect(dispatch.calledOnce).to.equal(true);
    expect(dispatch.args[0][0].type).to.equal(action.type);
    expect(dispatch.args[0][0].data).to.equal(action.data);
  });

  it.skip('dispatch `handleSubmit` when form is submitted', () => {
    const dispatch = spy();
    const { wrapper } = setup({ sound, dispatch });
    wrapper.find('form').simulate('submit', { ...mockEvent,
      target: { getElementsByTagName: () => ({}) }
    });
    console.log(dispatch.args[0][0]);
    expect(dispatch.calledOnce).to.equal(true);
    expect(dispatch.args[0][0]).to.equal(notifyActions.send('sd'));
  });
});
