import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import classNames from 'classnames';
import { Link } from 'react-router';
import './header.css';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header className="header" style={this.props.themes.getIn([ 'header', 'titlebar' ]).toJS()}>
        <div className="container">
          <div className="titlebar">
            <Link title={this.props.intl.formatMessage({ id: 'nav.downloads' })} to="/downloads">
              <i className={classNames('icon-add', {
                dark: this.props.themes.get('darkUI')
              })}/>
            </Link>
            <Link className="logo" to="/">
              <h3 style={this.props.themes.getIn([ 'header', 'h3' ]).toJS()}>
                <img src={require('kakapo-assets/icons/social/kakapo.png')}/>
                Kakapo
              </h3>
            </Link>
            <Link title={this.props.intl.formatMessage({ id: 'nav.settings' })} to="/settings">
              <i className={classNames('icon-settings', {
                dark: this.props.themes.get('darkUI')
              })}/>
            </Link>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  themes: PropTypes.object,
  intl: intlShape.isRequired
};

const mapStateToProps = state => ({
  themes: state.themes
});

export default injectIntl(connect(mapStateToProps)(Header));
