import React from 'react';
import renderer from 'react-test-renderer';
import { ImportCustomUrl as CustomUrl } from 'components/';
import { getData } from '../helper';

test('<CustomUrl/>', () => {
  const props = {
    ...getData('intl'),
    ...getData('themes')
  };
  const tree = renderer.create(<CustomUrl {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
