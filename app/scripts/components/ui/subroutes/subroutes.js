import React from 'react';
import { complement, equals } from 'ramda';
import { Link, Switch, Route } from 'react-router-dom';
import { cx } from 'utils/';
import {
  ImportOptions,
  ImportKakapo,
  ImportSearch,
  ImportCustomUrl,
  Playlist,
  Settings,
} from 'components/';
import './subroutes.css';

const isHome = complement(equals)('/');

export default ({
  router: {
    location: { pathname },
  },
}) => (
  <div
    className={cx('secondary-panel', {
      'with-close': isHome(pathname),
    })}
  >
    {isHome(pathname) ? <Link className="icon-close" to="/" /> : null}

    <div className="inner">
      <Switch>
        <Route exact path="/" render={() => <ImportOptions />} />
        <Route path="/settings" render={() => <Settings />}>
          <Route path="/theme(/:slotNo)" render={() => <Settings />} />
        </Route>
        <Route path="/kakapo" render={() => <ImportKakapo />} />
        <Route path="/youtube" render={() => <ImportSearch />} />
        <Route path="/soundcloud" render={() => <ImportSearch />} />
        <Route path="/custom" render={() => <ImportCustomUrl />} />
        <Route path="/playlist(/:playlistId)" render={() => <Playlist />} />
        <Route path="/playlist" render={() => <Playlist />} />
        <Route path="/share-playlist(/:shareId)" render={() => <Playlist />} />
      </Switch>
    </div>
  </div>
);
