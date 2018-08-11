import React from 'react';
import { CustomUrl } from 'components/import/customUrl';
import { getData, createComponentWithIntl } from '../helper';

test('<CustomUrl/>', () => {
  const props = {
    ...getData('themes'),
  };
  const tree = createComponentWithIntl(<CustomUrl {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
