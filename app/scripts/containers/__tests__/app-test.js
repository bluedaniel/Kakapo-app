/* eslint-env jasmine */
import React from 'react';
import sd from 'skin-deep';
import App, { Konami } from '../app.jsx';
import Sounds from '../../stores/sounds';

describe('App container', () => {
  beforeEach(done => Sounds.getSounds().then(done), 1000);

  it('should create an RxJs obserable', () => {
    expect(Konami).toBeDefined();
  });

  describe('on render', () => {
    let instance;
    let tree;

    beforeEach(() => {
      tree = sd.shallowRender(React.createElement(App));
      instance = tree.getMountedInstance();
    });

    it('should contain reflux state objects', () => {
      expect(instance.state.sounds).toBeDefined();
      expect(instance.state.theme).toBeDefined();
      expect(instance.state.settings).toBeDefined();
    });

    it('should contain 12 sounds in state', () => {
      expect(instance.state.sounds.count()).toBe(12);
    });

    xit('should subscribe to the RxJs obserable', () => {
      // Konami should be subscribed, not sure how to test
      // Need to look at obj & RxJs docs
    });
  });
});
