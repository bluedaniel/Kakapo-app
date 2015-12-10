
**Note: This branch is very much under active development and quite experimental.**

<img src="http://www.kakapo.co/icons/social/kakapo.png" width="128" height="128" align="right" />

[Kakapo](http://kakapo.co) is an open source ambient sound mixer for relaxation or productivity.

This repo builds both the website and desktop apps.

[Download the latest desktop version here](https://github.com/bluedaniel/Kakapo-app/releases), or install via [homebrew-cask](http://caskroom.io/) with `brew cask install kakapo`.

See also: [Kakapo for iOS & Android](https://github.com/bluedaniel/Kakapo-native) - [Kakapo for Chrome](https://github.com/bluedaniel/Kakapo-chrome).

It's built using:

- [Electron](https://github.com/atom/electron) - Creates app for desktop.
- [ReactJS](https://github.com/facebook/react) - Components
- [Babel 6](https://github.com/babel/babel) - To transform ES6 code.
- [Redux](https://github.com/rackt/redux) - State management.
- [ImmutableJs](https://github.com/facebook/immutable-js) - All stores uses immutable maps/lists.
- [HowlerJs](https://github.com/goldfire/howler.js) - Handles audio objects.
- [ReactIntl](https://github.com/yahoo/react-intl) - Internationalisation.
- [RxJS](https://github.com/Reactive-Extensions/RxJS) - Search autocomplete and state changes use observables.
- [PostCSS](https://github.com/postcss/postcss) - Transform JS styles.
- [Webpack](https://github.com/webpack/webpack) - Bundling JS and Hot module replacement.

<img src="http://www.kakapo.co/images/screenshot.png" width="728" height="533" />

<img src="http://www.kakapo.co/images/kakapo-app-screenshot.png" width="728" height="600" />

## Install and build

``` bash
# Clone
$ git clone https://github.com/bluedaniel/Kakapo-web.git

# Install
$ cd Kakapo-app && npm install

# Run desktop
$ npm start -- --platform=desktop

# Run website
$ npm start -- --platform=web
```

Both the website and desktop app should automatically open and have hot module enabled for live changes.

## Contribute
You are most welcome to do with this repo what you will :smile:.

If you'd like to help translate the app into a new language, you can do so at - [https://github.com/bluedaniel/kakapo-assets](https://github.com/bluedaniel/kakapo-assets).

## Bugs and Feature Requests

Have a bug or a feature request? [Please open a new issue here](https://github.com/bluedaniel/Kakapo-app/issues/new).
