/* eslint-env mocha */
/* eslint no-console:0 */
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { newSoundClass } from 'classes/';
import { DownloadItem } from 'components/';

function setup(props = {}) {
  return { props, wrapper: shallow(<DownloadItem sound={props} />).shallow() };
}

const soundProp = (props = {}) => {
  const obj = { ...newSoundClass, source: 'file', progress: 0.8, ...props };
  return Object.keys(obj).reduce((newObj, _e) => {
    newObj[_e] = obj[_e] === null ? 'wind' : obj[_e];
    return newObj;
  }, {});
};

describe('<DownloadItem/>', () => {
  it('renders as a <div> with className equals `download active`', () => {
    const { wrapper } = setup(soundProp());
    expect(wrapper.type()).to.eql('div');
    expect(wrapper.prop('className')).to.eql('download active');
  });

  it('without image should render `no-image`', () => {
    const { wrapper } = setup(soundProp({ source: 'youtubeStream', img: '' }));
    expect(wrapper.find('.no-image').length).to.eql(1);
  });
});
