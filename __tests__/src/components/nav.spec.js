import React from 'react';
import { Nav } from 'components/';
import { getData, createComponentWithIntl } from '../helper';

test('<Nav/> render', () => {
  const props = {
    ...getData('themes'),
  };
  const tree = createComponentWithIntl(<Nav {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
