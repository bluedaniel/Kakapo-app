import {
  ImportOptions,
  ImportKakapo,
  ImportSearch,
  ImportCustomUrl,
  Playlist,
  Settings
} from 'components/';
import App from 'containers/app/app';

export default [
  {
    path: '/',
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: ImportOptions
      },
      {
        path: '/settings',
        component: Settings,
        routes: [
          {
            path: '/theme(/:slotNo)',
            component: Settings
          }
        ]
      },
      { path: '/kakapo', component: ImportKakapo },
      { path: '/youtube', component: ImportSearch },
      { path: '/soundcloud', component: ImportSearch },
      { path: '/custom', component: ImportCustomUrl },
      { path: '/playlist(/:playlistId)', component: Playlist },
      { path: '/playlist', component: Playlist },
      { path: '/share-playlist(/:shareId)', component: Playlist }
    ]
  }
];
