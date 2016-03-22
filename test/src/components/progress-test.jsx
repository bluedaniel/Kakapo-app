import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Progress } from 'components/ui/';

function setup(props = {}) {
  return { props, wrapper: shallow(<Progress {...props} />) };
}

describe('<Progress/>', () => {
  it('renders as a <div> with className equals `progress`', () => {
    const { wrapper } = setup();
    expect(wrapper.type()).to.eql('div');
    expect(wrapper.prop('className')).to.eql('progress');
  });

  describe('When given props', () => {
    it('progress rounds 0.415 to 42% ', () => {
      const { wrapper } = setup({
        progress: 0.415
      });
      expect(wrapper.find('.progress-text').text()).to.eql('42%');
    });
  });
});
