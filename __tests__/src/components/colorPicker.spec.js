import React from 'react';
import renderer from 'react-test-renderer';
import ColorPicker from 'components/ui/colorPicker/colorPicker';

test('<ColorPicker/>', () => {
  const props = {
    active: false,
    handleSwatch: () => 'checkbox changed!',
  };
  const tree = renderer.create(<ColorPicker {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
