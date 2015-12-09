import React, { Component, PropTypes } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import { Link } from 'react-router';
import { injectIntl, FormattedMessage } from 'react-intl';

class Media extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const routeName = window.location.hash.substr(1).split('/').join(' ') || '';
    return (
      <CSSTransitionGroup
        component="div"
        transitionEnterTimeout={450}
        transitionLeaveTimeout={450}
        transitionName="modal">
        {routeName ? <Link className="modal-bg" to="/"/> : ''}
        <div className={'modal ' + routeName} key={routeName}>
          <Link className="close" to="/"><FormattedMessage id="modal.close"/></Link>
          {React.cloneElement(this.props.children)}
        </div>
      </CSSTransitionGroup>
    );
  }
}

Media.propTypes = {
  children: PropTypes.object
};

export default injectIntl(Media);
