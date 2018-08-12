import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { map } from 'ramda';
import { notifyActions, soundActions } from 'actions/';
import { SoundEdit } from 'components/';
import { newSoundObj } from 'utils/';
import { getData, createComponentWithIntl, mockEvent } from '../helper';

Enzyme.configure({ adapter: new Adapter() });

function setup(props = {}) {
  const propData = {
    ...getData('themes'),
    soundActions: {},
    ...props,
  };
  const comp = <SoundEdit {...propData} />;
  return {
    props,
    wrapper: shallow(comp),
    tree: createComponentWithIntl(comp).toJSON(),
  };
}

const soundProp = (props = {}) => {
  const obj = { ...newSoundObj, source: 'file', progress: 1, ...props };
  return { sound: map(x => (x === null ? 'wind' : x), obj) };
};

const sound = { ...soundProp() };

test('<SoundEdit/> render', () => {
  const { tree } = setup(sound);
  expect(tree).toMatchSnapshot();
});

test('<SoundEdit/> handleCancel', () => {
  const dispatch = jest.fn();
  const action = soundActions.edit(sound, null);
  const { wrapper } = setup({ sound, dispatch });
  wrapper
    .find('.button')
    .at(0)
    .simulate('click', mockEvent);
  expect(dispatch).toBeCalled();
  expect(dispatch.mock.calls[0][0]).toEqual(action);
});

test('<SoundEdit/> handleSubmit empty', () => {
  const dispatch = jest.fn();
  const action = notifyActions.send('Please fill out all fields');
  const { wrapper } = setup({ sound, dispatch });
  wrapper.find('form').simulate('submit', {
    ...mockEvent,
    target: { getElementsByTagName: () => ({}) },
  });
  expect(dispatch).toBeCalled();
  expect(dispatch.mock.calls[0][0].type).toBe(action.type);
  expect(dispatch.mock.calls[0][0].data).toBe(action.data);
});

test('<SoundEdit/> handleSubmit filled', () => {
  const dispatch = jest.fn();
  const action = soundActions.edit(sound, { name: 'hi' });
  const { wrapper } = setup({ sound, dispatch });
  wrapper.find('form').simulate('submit', {
    ...mockEvent,
    target: { getElementsByTagName: () => [{ name: 'name', value: 'hi' }] },
  });
  expect(dispatch).toBeCalled();
  expect(dispatch.mock.calls[0][0]).toEqual(action);
});
