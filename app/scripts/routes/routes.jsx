import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { AddMedia, App, Settings } from '../containers';
import { ImportOptions, ImportKakapo, ImportYouTube, ImportCustomUrl, ImportSoundCloud } from '../components';

export default (
  <Route component={App} path="/">
    <Route component={Settings} path="settings"/>
    <Route component={AddMedia} path="downloads">
      <IndexRoute component={ImportOptions}/>
      <Route component={ImportKakapo} path="kakapo"/>
      <Route component={ImportYouTube} path="youtube"/>
      <Route component={ImportCustomUrl} path="custom"/>
      <Route component={ImportSoundCloud} path="soundcloud"/>
    </Route>
    <Route component="" path="*"/>
  </Route>
);
