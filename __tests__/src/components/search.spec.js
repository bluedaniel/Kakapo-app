import React from 'react';
import { Search } from 'components/import/search';
import { getData, createComponentWithIntl } from '../helper';

test('<Search/> render', () => {
  const props = {
    router: { location: { pathname: '/youtube' } },
    ...getData('search'),
  };
  const tree = createComponentWithIntl(<Search {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
