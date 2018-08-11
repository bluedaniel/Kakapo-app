import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { ImportOptions } from 'components/';
import { createComponentWithIntl } from '../helper';

test('<Options/> render', () => {
  const props = {};
  const tree = createComponentWithIntl(
    <MemoryRouter>
      <ImportOptions {...props} />
    </MemoryRouter>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
