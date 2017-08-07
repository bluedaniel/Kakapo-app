import { App, Playlist, Settings } from 'containers/';
import {
  ImportOptions,
  ImportKakapo,
  ImportSearch,
  ImportCustomUrl
} from 'components/';

export default [
  {
    component: App,
    path: '/',
    routes: [
      {
        path: '/',
        exact: true,
        component: ImportOptions
      },
      {
        path: 'settings',
        component: Settings,
        routes: [
          {
            path: '/theme(/:slotNo)',
            component: Settings
          }
        ]
      },
      { path: 'kakapo', component: ImportKakapo },
      { path: 'youtube', component: ImportSearch },
      { path: 'soundcloud', component: ImportSearch },
      { path: 'custom', component: ImportCustomUrl },
      { path: 'playlist(/:playlistId)', component: Playlist },
      { path: 'share-playlist(/:shareId)', component: Playlist }
    ]
  }
];
