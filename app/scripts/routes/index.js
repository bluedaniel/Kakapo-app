import { App, Playlist, Settings } from 'containers/';
import { ImportOptions, ImportKakapo, ImportSearch, ImportCustomUrl } from 'components/';

export default {
  path: '/',
  component: App,
  indexRoute: { component: ImportOptions },
  childRoutes: [
    {
      path: 'settings',
      component: Settings,
      childRoutes: [
        { path: 'theme(/:slotNo)', component: Settings }
      ]
    },
    { path: 'kakapo', component: ImportKakapo },
    { path: 'youtube', component: ImportSearch },
    { path: 'soundcloud', component: ImportSearch },
    { path: 'custom', component: ImportCustomUrl },
    { path: 'playlist(/:playlistId)', component: Playlist },
    { path: 'share-playlist(/:shareId)', component: Playlist }
  ]
};
