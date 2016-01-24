/*eslint-env mocha */
/*eslint no-console:0 */
import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import mapValues from 'lodash/mapValues';
import { IntlProvider } from 'react-intl';
import { getFakeStore, getReactIntlContext, getIntlProps } from '__tests__/helper';
import { youtubeItemClass } from 'classes/';
import YouTubeItem from '../youtubeListItem';

function setup(enzymeMethod=shallow, props={}) {
  const storeData = { soundActions: {}, ...props };

  let component = (<YouTubeItem sound={randomSound()} store={getFakeStore(storeData)}/>);
  let wrapper;
  if (enzymeMethod === shallow) {
    wrapper = shallow(component, { context: getReactIntlContext() });
  } else if (enzymeMethod === mount) {
    wrapper = mount(<IntlProvider { ...getIntlProps() }>{component}</IntlProvider>);
  }

  return {
    props,
    wrapper
  };
}

function randomSound() {
  return mapValues({ ...youtubeItemClass, ...{
    videoId: '7ccQyyCLtx8',
    viewCount: 100000,
    duration: '3:40',
    img: 'test'
  } }, e => typeof e === 'function' ? `test` : e);
}

describe('<YouTubeItem/>', () => {
  it('renders as a <div> with className equals `youtube-item`', () => {
    const { wrapper } = setup();
    expect(wrapper.shallow().shallow().type()).to.eql('div');
    expect(wrapper.shallow().shallow().prop('className')).to.eql('youtube-item');
  });

  describe('When mounted', () => {
    it('renders correct display of duration', () => {
      const { wrapper } = setup(mount);
      expect(wrapper.find('.view-count').html()).to
        .eql('<span class="view-count"><span>100,000</span><span> </span><span>views</span></span>');
    });
  });
});
