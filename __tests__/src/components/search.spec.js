import React from 'react';
import renderer from 'react-test-renderer';
import { ImportSearch as Search } from 'components/';
import { getData } from '../helper';

test('<Search/> render', () => {
  const props = {
    location: { pathname: '/youtube' },
    ...getData('intl'),
    ...getData('search')
  };
  const tree = renderer.create(<Search {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
