import React from 'react';
import renderer from 'react-test-renderer';
import Checkbox from 'components/ui/checkbox/checkbox';

test('<Checkbox/>', () => {
  const props = {
    checked: false,
    dispatch: e => e,
    handleChange: () => 'checkbox changed!',
    label: 'testLabel',
    name: 'testName',
  };
  const tree = renderer.create(<Checkbox {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
