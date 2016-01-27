/*eslint-env mocha */
/*eslint no-console:0 */
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Map } from 'immutable';
import { mapValues } from 'lodash';
import { getData } from '__tests__/helper';
import { newSoundClass } from 'classes/';
import DownloadList from '../downloadList';

function setup(props={}) {
  const propData = { ...getData('sounds'), ...props };
  const wrapper = shallow(<DownloadList {...propData}/>);
  return {
    props,
    wrapper
  };
}

function randomSounds(count) {
  let arr = new Map();
  for (let i = 0; i < count; i++) {
    arr = arr.set(i, mapValues({ ...newSoundClass, ...{
      progress: i > 2 ? 1 : 0.5
    } }, e => e === null ? `test${i}` : e));
  }
  return arr;
}

describe('<DownloadList/>', () => {
  it('renders empty div if no downloads', () => {
    const { wrapper } = setup();
    expect(wrapper.html()).to.eql('<div></div>');
  });

  describe('When given props', () => {
    it('renders as a <div> with className equals `download-list`', () => {
      const { wrapper } = setup({ sounds: randomSounds(4) });
      expect(wrapper.type()).to.eql('div');
      expect(wrapper.prop('className')).to.eql('download-list');
    });

    it('should only render sounds with `progress` < 1', () => {
      const { wrapper } = setup({ sounds: randomSounds(4) });
      expect(wrapper.children().length).to.eql(3);
    });
  });
});
