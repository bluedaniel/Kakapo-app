/* eslint-env mocha */
/* eslint no-console:0 */
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { getData } from '../../helper';
import { TextInput } from 'components/ui/';

function setup(props = {}) {
  const propData = {
    name: 'test',
    placeholder: 'without.translation',
    ...getData('intl'),
    ...props
  };
  return { props, wrapper: shallow(<TextInput {...propData} />) };
}

describe('<TextInput/>', () => {
  it('renders as a <div> with className equals `group`', () => {
    const { wrapper } = setup();
    expect(wrapper.type()).to.eql('div');
    expect(wrapper.prop('className')).to.eql('group');
  });

  it('renders the correct amount of elements', () => {
    const { wrapper } = setup();
    expect(wrapper.find('input')).to.have.length(1);
    expect(wrapper.find('.highlight')).to.have.length(1);
    expect(wrapper.find('.bar')).to.have.length(1);
    expect(wrapper.find('label')).to.have.length(1);
  });

  it('renders correctly without translation', () => {
    const { wrapper } = setup();
    expect(wrapper.find('label').text()).to.eql('without.translation');
  });

  describe('When given props', () => {
    it('renders the correct value', () => {
      const { wrapper } = setup({ value: 42 });
      expect(wrapper.find('input').props().defaultValue).to.eql(42);
    });

    it('renders the correct translation', () => {
      const { wrapper } = setup({ placeholder: 'nav.settings' });
      expect(wrapper.find('label').text()).to.eql('Settings');
    });

    it('renders a loading spinner', () => {
      const { wrapper } = setup({ spinner: true });
      expect(wrapper.find('.spinner')).to.have.length(1);
    });
  });
});
