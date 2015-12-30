/* eslint-env jasmine */
import React from 'react';
import sd from 'skin-deep';
import Settings from '../settings.jsx';
import IntlData from '../../../../i18n/en.json';

describe('Settings component', () => {
  let instance;
  beforeEach(() => {
    const tree = sd.shallowRender(
      React.createElement(Settings, {
        messages: IntlData.messages
      }));
    instance = tree.getMountedInstance();
  });

  it('should contain theme object', () => {
    expect(instance.state.theme).toBeDefined();
  });
});
