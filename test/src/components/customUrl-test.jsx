/* eslint-env mocha */
/* eslint no-console:0 */
import React from 'react';
import { spy } from 'sinon';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { getData } from '../../helper';
import { ImportCustomUrl as CustomUrl } from 'components/';

function setup(props = {}, method = shallow) {
  const propData = {
    ...getData('intl'),
    ...getData('themes'),
    ...props
  };
  const wrapper = method(<CustomUrl {...propData} />);
  return {
    props,
    wrapper
  };
}

describe('<CustomUrl/>', () => {
  it('renders as a <div> with className equals `customurl`', () => {
    const { wrapper } = setup();
    expect(wrapper.type()).to.eql('div');
    expect(wrapper.prop('className')).to.eql('customurl');
  });

  it('call componentDidMount', () => {
    spy(CustomUrl.prototype, 'componentDidMount');
    setup({}, mount);
    expect(CustomUrl.prototype.componentDidMount.calledOnce).to.eql(true);
    CustomUrl.prototype.componentDidMount.restore();
  });

  it('contains correct refs', () => {
    const { wrapper } = setup({}, mount);
    expect(wrapper.ref('name').length).to.equal(1);
    expect(wrapper.ref('customInput').length).to.equal(1);
  });
});
