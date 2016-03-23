import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
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

describe('<CustomUrl/>', () => {
  it('renders as a <div> with className equals `customurl`', () => {
    const { wrapper } = setup();
    expect(wrapper.type()).to.eql('div');
    expect(wrapper.prop('className')).to.eql('customurl');
  });
});
