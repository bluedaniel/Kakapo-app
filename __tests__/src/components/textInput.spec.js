import React from 'react';
import TextInput from 'components/ui/textInput/textInput';
import { createComponentWithIntl } from '../helper';

function setup(props = {}) {
  const propData = {
    name: 'test',
    placeholder: 'without.translation',
    ...props,
  };
  return {
    props,
    tree: createComponentWithIntl(<TextInput {...propData} />).toJSON(),
  };
}

test('<TextInput/> render', () => {
  const { tree } = setup();
  expect(tree).toMatchSnapshot();
});

test('<TextInput/> correct value', () => {
  const { tree } = setup({ value: 42 });
  expect(tree).toMatchSnapshot();
});

test('<TextInput/> correct translation', () => {
  const { tree } = setup({ placeholder: 'nav.settings' });
  expect(tree).toMatchSnapshot();
});

test('<TextInput/> loading spinner', () => {
  const { tree } = setup({ spinner: true });
  expect(tree).toMatchSnapshot();
});
