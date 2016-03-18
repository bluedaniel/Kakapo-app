/* eslint-env mocha */
/* eslint no-console:0 */
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { getData } from '../../helper';
import { ImportSearchResult as SearchResult } from 'components/';

function setup(props = {}) {
  const propData = {
    service: 'youtube',
    ...getData('intl'),
    ...props
  };
  const wrapper = shallow(<SearchResult {...propData} />);
  return {
    props,
    wrapper
  };
}

const sound = {
  desc: 'Testing description',
  duration: '03:48',
  img: 'https://i.ytimg.com/vi/YTg7fpGLsKE/hqdefault.jpg',
  name: 'Testing name',
  tags: '',
  videoId: 'YTg7fpGLsKE',
  viewCount: 319609
};

describe('<SearchResult/>', () => {
  describe('When YouTube data added', () => {
    it('renders as a <div> with className equals `youtube-item`', () => {
      const { wrapper } = setup({ sound });
      expect(wrapper.type()).to.eql('div');
      expect(wrapper.prop('className')).to.eql('youtube-item');
    });

    it('renders the view count in correct locale', () => {
      const { wrapper } = setup({ sound });
      expect(wrapper.find('.view-count').text()).to.be.oneOf([ '319609 views', '319,609 views' ]);
    });
  });

  describe('When SoundCloud data added', () => {
    it('renders as a <div> with className equals `soundcloud-item`', () => {
      const { wrapper } = setup({ service: 'soundcloud', sound });
      expect(wrapper.type()).to.eql('div');
      expect(wrapper.prop('className')).to.eql('soundcloud-item');
    });

    it('renders the view count in correct locale', () => {
      const { wrapper } = setup({ service: 'soundcloud', sound });
      expect(wrapper.find('.view-count').text()).to.be.oneOf([ '319609 plays', '319,609 plays' ]);
    });
  });
});
