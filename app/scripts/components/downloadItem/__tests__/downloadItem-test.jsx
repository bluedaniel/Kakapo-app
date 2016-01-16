/*eslint-env mocha */
/*eslint no-console:0 */
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import mapValues from 'lodash/mapValues';
import { newSoundClass } from 'classes/';
import DownloadItem from '../downloadItem';

function setup(props={}) {
  const wrapper = shallow(<DownloadItem sound={props}/>).shallow();
  return {
    props,
    wrapper
  };
}

let soundProp = (props={}) => mapValues({ ...newSoundClass, ...{
  source: 'file',
  progress: 0.8
}, ...props }, e => e === null ? `wind` : e);

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
