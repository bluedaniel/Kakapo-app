import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import validator from 'validator';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { soundActions } from '../../actions';
import { toasterInstance } from '../../utils';

class CustomUrl extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(el) {
    el.preventDefault();
    const data = {
      name: this.refs.name.value,
      url: this.refs.customInput.value
    };

    if (!data.name || !data.url) return this.handleError('import.error.empty');
    if (!validator.isURL(data.url)) return this.handleError('import.error.url');

    this.props.soundActions.addSound('custom', {
      name: data.name,
      url: data.url,
      source: 'customStream',
      icon: ''
    });
    this.context.history.push('/downloads');
  }

  handleError(msg) {
    toasterInstance().then(_t => _t.toast(this.props.intl.formatMessage({ id: msg })));
  }

  render() {
    return (
      <div>
        <h5>{this.props.intl.formatMessage({ id: 'import.custom.header' })}</h5>
        <form onSubmit={this.handleSubmit}>
          <div className="row media-import">
            <input
              className="u-full-width"
              placeholder={this.props.intl.formatMessage({ id: 'import.custom.name_placeholder' })}
              ref="name"
              type="text"
            />
            <input
              className="u-full-width"
              placeholder={this.props.intl.formatMessage({ id: 'import.custom.url_placeholder' })}
              ref="customInput"
              type="text"
            />
            <button
              className="pure-button pure-button-primary"
              ref="btn"
              style={this.props.themes.getIn([ 'base', 'btnPrimary' ]).toJS()}
            ><FormattedMessage id="import.save"/></button>
          </div>
        </form>
      </div>
    );
  }
}

CustomUrl.contextTypes = {
  history: PropTypes.object
};

CustomUrl.propTypes = {
  themes: PropTypes.object,
  soundActions: PropTypes.object,
  intl: intlShape.isRequired
};

const mapStateToProps = state => ({
  themes: state.themes
});

const mapDispatchToProps = dispatch => ({
  soundActions: bindActionCreators(soundActions, dispatch)
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(CustomUrl));
