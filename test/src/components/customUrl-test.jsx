import React from 'react';
import test from 'tape';
import { shallow } from 'enzyme';
import { getData } from '../../helper';
import { ImportCustomUrl as CustomUrl } from 'components/';

function setup(props = {}) {
  const propData = {
    ...getData('intl'),
    ...getData('themes'),
    ...props
  };
  return { props, wrapper: shallow(<CustomUrl {...propData} />) };
}

test('<CustomUrl/>', t => {
  test('renders as a <div> with className equals `customurl`', t => {
    t.plan(2);
    const { wrapper } = setup();
    t.equal(wrapper.type(), 'div');
    t.equal(wrapper.prop('className'), 'customurl');
  });
  t.end();
});
