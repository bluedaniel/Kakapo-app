import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Map } from 'immutable';
import { Notifications } from 'components/ui/';

function setup(props = {}) {
  return { props, wrapper: shallow(<Notifications {...props} />) };
}

describe('<Notifications/>', () => {
  it('renders as a <aside> with className equals `notify`', () => {
    const { wrapper } = setup({ notifications: new Map() });
    expect(wrapper.type()).to.eql('aside');
    expect(wrapper.prop('className')).to.eql('notify');
  });

  describe('When given props', () => {
    it('className is correct', () => {
      const { wrapper } = setup({ notifications: new Map({ a: 'test' }) });
      expect(wrapper.prop('className')).to.eql('notify notify-visible');
    });

    it('renders list in correct order', () => {
      const { wrapper } = setup({ notifications: new Map({ a: 'test', b: 'test2' }) });
      expect(wrapper.children().length).to.eql(2);
      expect(wrapper.childAt(0).text()).to.eql('test');
      expect(wrapper.childAt(1).text()).to.eql('test2');
    });
  });
});
