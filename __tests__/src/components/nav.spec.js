import React from 'react';
import renderer from 'react-test-renderer';
import { Nav } from 'components/';
import { getData } from '../helper';

test('<Nav/> render', () => {
  const props = {
    ...getData('themes'),
    ...getData('intl')
  };
  const tree = renderer.create(<Nav {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
