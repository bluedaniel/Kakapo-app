/* eslint-env mocha */
/* eslint no-console:0 */
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { getData } from '../../helper';
import { Nav } from 'components/';

function setup(props = {}) {
  const propData = {
    ...getData('themes'),
    ...getData('intl'),
    ...props
  };
  return { props, wrapper: shallow(<Nav {...propData} />) };
}

describe('<Nav/>', () => {
  it('className equals `topbar`', () => {
    const { wrapper } = setup();
    expect(wrapper.prop('className')).to.eql('topbar');
  });
});
