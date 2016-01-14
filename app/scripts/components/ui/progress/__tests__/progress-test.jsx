/*eslint-env mocha */
/*eslint no-console:0 */
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Progress from '../progress';

function setup(props={}) {
  const wrapper = shallow(<Progress {...props} />);
  return {
    props,
    wrapper
  };
}

describe('<Progress/>', () => {
  it('renders as a <div>', () => {
    const { wrapper } = setup();
    expect(wrapper.type()).to.eql('div');
  });

  it('className equals `progress`', () => {
    const { wrapper } = setup();
    expect(wrapper.prop('className')).to.eql('progress');
  });

  describe('When given props', () => {
    it('progress rounds 0.415 to 42% ', () => {
      const { wrapper } = setup({
        progress: .415
      });
      expect(wrapper.find('.progress-text').text()).to.eql('42%');
    });
  });
});
