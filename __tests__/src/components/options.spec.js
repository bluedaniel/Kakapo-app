import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { ImportOptions } from 'components/';
import { getData } from '../helper';

test('<Options/> render', () => {
  const props = {
    ...getData('intl')
  };
  const tree = renderer
    .create(
      <MemoryRouter>
        <ImportOptions {...props} />
      </MemoryRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
