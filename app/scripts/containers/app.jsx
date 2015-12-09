import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { soundActions } from '../actions';
import { Header, Nav, SoundList } from '../components';
import { konami } from '../utils';
import DevTools from './DevTools';
import '../styles/base.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { konami: false };
  }

  componentDidMount() {
    this.props.soundActions.soundsInit();
    konami.subscribe(this.konamiEntered);
  }

  konamiEntered() {
    this.setState({ konami: !this.state.konami });
  }

  render() {
    return (
      <div>
        <div className="wrapper">
          <Nav/>
          <Header/>
          <div className="container">
            <SoundList/>
            {this.props.children && React.cloneElement(this.props.children)}
            <aside className="toast-view"></aside>
          </div>
        </div>
        {__DEV__ ? <DevTools/> : null}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object,
  settings: PropTypes.object,
  sounds: PropTypes.object,
  themes: PropTypes.object,
  soundActions: PropTypes.object
};

const mapStateToProps = state => ({
  sounds: state.sounds,
  settings: state.settings,
  routerState: state.router
});

const mapDispatchToProps = dispatch => ({
  soundActions: bindActionCreators(soundActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
