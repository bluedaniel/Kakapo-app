import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { DownloadList } from '../../components';

class Options extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const activeDownloads = this.props.sounds.filter(_s => _s.recentlyDownloaded);
    return (
      <div className="modal-inner media">
        <div className="pure-g">
          <div className="pure-u-1-2">
            <Link className="option options-kakapo" to="/downloads/kakapo">
              <i className="icon-kakapo"/> <FormattedMessage id="import.options.kakapo"/>
            </Link>
            <Link className="option options-soundcloud" to="/downloads/soundcloud">
              <i className="icon-soundcloud"/> <FormattedMessage id="import.options.soundcloud"/>
            </Link>
          </div>
          <div className="pure-u-1-2">
            <Link className="option options-youtube" to="/downloads/youtube">
              <i className="icon-youtube"/> <FormattedMessage id="import.options.youtube"/>
            </Link>
            <Link className="option options-custom" to="/downloads/custom">
              <i className="icon-file dark"/> <FormattedMessage id="import.options.custom"/>
            </Link>
          </div>
        </div>
        <div className={classNames('download-wrap', { active: activeDownloads.count() })}>
          <DownloadList sounds={activeDownloads}/>
        </div>
      </div>
    );
  }
}

Options.propTypes = {
  sounds: PropTypes.object
};

const mapStateToProps = state => ({
  sounds: state.sounds
});

export default injectIntl(connect(mapStateToProps)(Options));
