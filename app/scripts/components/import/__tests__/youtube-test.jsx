/*eslint-env mocha */
/*eslint no-console:0 */
import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import { fromJS, List } from 'immutable';
import { mapValues } from 'lodash';
import { IntlProvider } from 'react-intl';
import { getFakeData, getFakeStore, getReactIntlContext, getIntlProps } from '__tests__/helper';
import { youtubeItemClass } from 'classes/';
import ConnectedYouTube, { YouTube } from '../youtube';
import YoutubeItem from '../youtubeItem';

function setup(enzymeMethod=shallow, props={}) {
  const storeData = { store: getFakeStore({ ...getFakeData('search'), soundActions: {}, ...props }) };

  let wrapper;
  let component = (<ConnectedYouTube {...storeData}/>);

  if (enzymeMethod === shallow) {
    wrapper = shallow(component, { context: getReactIntlContext() });
  } else if (enzymeMethod === mount) {
    component = (<ConnectedYouTube  {...storeData}/>);
    wrapper = mount(<IntlProvider {...getIntlProps()}>{component}</IntlProvider>);
  }

  return {
    props,
    wrapper
  };
}

function randomSounds(count) {
  let arr = new List();
  for (let i = 0; i < count; i++) {
    arr = arr.set(i, mapValues({ ...youtubeItemClass, ...{
      videoId: i,
      viewCount: i,
      duration: 0
    } }, e => typeof e === 'function' ? `test${i}` : e));
  }
  return arr;
}

describe('<Youtube/>', () => {
  it('renders as a <div> with className equals `modal-inner`', () => {
    const { wrapper } = setup();
    expect(wrapper.shallow().shallow().type()).to.eql('div');
    expect(wrapper.shallow().shallow().prop('className')).to.eql('modal-inner');
  });

  it('renders correct number of YouTube items', () => {
    const { wrapper } = setup(shallow, { search: fromJS({ youtube: randomSounds(5) }) });
    expect(wrapper.shallow().shallow().find(YoutubeItem).length).to.eql(5);
  });

  describe('When mounted', () => {
    it('focus on input should change state', () => {
      const { wrapper } = setup(mount);
      console.log(wrapper);
      // wrapper.find('.input__field').simulate('focus');
      // expect(wrapper.state('focused')).to.eql('input-yt');
    });

    it.skip('should subscribe to RxJS autocomplete stream', () => {

    });
  });
});
