import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import classNames from 'classnames';
import { Link } from 'react-router';
import './header.css';

class Header extends Component {
  static propTypes = {
    themes: PropTypes.object,
    intl: intlShape.isRequired
  };

  render() {
    return (
      <header className="header" style={this.props.themes.getIn([ 'header', 'titlebar' ]).toJS()}>
        <div className="container">
          <Link to="/downloads">
            <i
              className={classNames('icon-add', 'hint--bottom-right', {
                dark: this.props.themes.get('darkUI')
              })}
              data-hint={this.props.intl.formatMessage({ id: 'nav.downloads' })}
            />
          </Link>
          <Link to="/playlist">
            <i
              className={classNames('icon-playlist', 'hint--bottom-right', {
                dark: this.props.themes.get('darkUI')
              })}
              data-hint={this.props.intl.formatMessage({ id: 'nav.playlist' })}
            />
          </Link>
          <Link className="logo" to="/">
            <h3 style={this.props.themes.getIn([ 'header', 'h3' ]).toJS()}>
              <img src={require('kakapo-assets/icons/social/kakapo.png')}/>
              Kakapo
            </h3>
          </Link>
          <Link title={this.props.intl.formatMessage({ id: 'nav.settings' })} to="/settings">
            <i
              className={classNames('icon-settings', 'hint--bottom', {
                dark: this.props.themes.get('darkUI')
              })}
              data-hint={this.props.intl.formatMessage({ id: 'nav.settings' })}
            />
          </Link>
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  themes: state.themes
});

export default injectIntl(connect(mapStateToProps)(Header));
