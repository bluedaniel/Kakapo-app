import React from 'react';
import { ImportSearch as Search } from 'components/';
import { getData, createComponentWithIntl } from '../helper';

test('<Search/> render', () => {
  const props = {
    location: { pathname: '/youtube' },
    ...getData('search'),
  };
  const tree = createComponentWithIntl(<Search {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
