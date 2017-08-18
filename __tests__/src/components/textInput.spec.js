import React from 'react';
import renderer from 'react-test-renderer';
import TextInput from 'components/ui/textInput/textInput';
import { getData } from '../helper';

function setup(props = {}) {
  const propData = {
    name: 'test',
    placeholder: 'without.translation',
    ...getData('intl'),
    ...props
  };
  return { props, tree: renderer.create(<TextInput {...propData} />).toJSON() };
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
