import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { getData } from '../../helper';
import { Link } from 'react-router';
import { ImportOptions as Options } from 'components/';

function setup(props = {}) {
  const propData = {
    ...getData('intl'),
    ...props
  };
  return { props, wrapper: shallow(<Options {...propData} />) };
}

describe('<Options/>', () => {
  it('renders as a <div> with className equals `downloads`', () => {
    const { wrapper } = setup();
    expect(wrapper.type()).to.eql('div');
    expect(wrapper.prop('className')).to.eql('downloads');
  });

  it('contains 6 links', () => {
    const { wrapper } = setup();
    expect(wrapper.find(Link)).to.have.length(6);
  });

  it('should render 6 icons', () => {
    const { wrapper } = setup();
    expect(wrapper.find('.icon-img-kakapo')).to.have.length(1);
    expect(wrapper.find('.icon-img-youtube')).to.have.length(1);
    expect(wrapper.find('.icon-img-soundcloud')).to.have.length(1);
    expect(wrapper.find('.icon-img-custom')).to.have.length(1);
    expect(wrapper.find('.icon-settings')).to.have.length(1);
    expect(wrapper.find('.icon-playlist')).to.have.length(1);
  });
});
