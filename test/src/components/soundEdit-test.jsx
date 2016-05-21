import React from 'react';
import { shallow } from 'enzyme';
import test from 'tape';
import { spy } from 'sinon';
import { getData, mockEvent } from '../helper';
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

test('<SoundEdit/> render', t => {
  t.plan(2);
  const { wrapper } = setup(sound);
  t.equals(wrapper.type(), 'div');
  t.equals(wrapper.prop('className'), 'item editing');
});

test('<SoundEdit/> render 2 inputs', t => {
  t.plan(1);
  const { wrapper } = setup(sound);
  t.equals(wrapper.find(TextInput).length, 2);
});

test('<SoundEdit/> handleCancel', t => {
  t.plan(2);
  const dispatch = spy();
  const action = soundActions.soundsEdit(sound, null);
  const { wrapper } = setup({ sound, dispatch });
  wrapper.find('.button').at(0).simulate('click', mockEvent);
  t.equals(dispatch.calledOnce, true);
  t.deepEqual(dispatch.args[0][0], action);
});

test('<SoundEdit/> handleSubmit empty', t => {
  t.plan(3);
  const dispatch = spy();
  const action = notifyActions.send('Please fill out all fields');
  const { wrapper } = setup({ sound, dispatch });
  wrapper.find('form').simulate('submit', { ...mockEvent,
    target: { getElementsByTagName: () => ({}) }
  });
  t.equals(dispatch.calledOnce, true);
  t.equals(dispatch.args[0][0].type, action.type);
  t.equals(dispatch.args[0][0].data, action.data);
});

test('<SoundEdit/> handleSubmit filled', t => {
  t.plan(2);
  const dispatch = spy();
  const action = soundActions.soundsEdit(sound, { name: 'hi' });
  const { wrapper } = setup({ sound, dispatch });
  wrapper.find('form').simulate('submit', { ...mockEvent,
    target: { getElementsByTagName: () => ([ { name: 'name', value: 'hi' } ]) }
  });
  t.equals(dispatch.calledOnce, true);
  t.deepEqual(dispatch.args[0][0], action);
});
