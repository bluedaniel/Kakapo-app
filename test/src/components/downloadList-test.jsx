import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Map } from 'immutable';
import { getData } from '../../helper';
import { newSoundClass } from 'classes/';
import { DownloadList } from 'components/';

function setup(props = {}) {
  const propData = { ...getData('sounds'), ...props };
  return { props, wrapper: shallow(<DownloadList {...propData} />) };
}

function randomSounds(count) {
  let arr = new Map();
  for (let i = 0; i < count; i++) {
    const obj = { ...newSoundClass, progress: i > 2 ? 1 : 0.5 };
    arr = arr.set(i, Object.keys(obj).reduce((newObj, _e) => {
      newObj[_e] = obj[_e] === null ? `test${i}` : obj[_e];
      return newObj;
    }, {}));
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
