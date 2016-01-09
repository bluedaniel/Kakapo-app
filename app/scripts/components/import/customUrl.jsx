import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import validator from 'validator';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { soundActions } from '../../actions';
import { toasterInstance, validHowl } from '../../utils';

class CustomUrl extends Component {
  static contextTypes = {
    history: PropTypes.object
  };

  static propTypes = {
    themes: PropTypes.object,
    soundActions: PropTypes.object,
    intl: intlShape.isRequired
  };

  state = {
    focused: false,
    inputName: false,
    inputCustom: false
  };

  componentDidMount() {
    this.refs.name.focus();
  }

  handleSubmit = (el) => {
    el.preventDefault();
    const data = {
      name: this.refs.name.value,
      url: this.refs.customInput.value
    };

    if (!data.name || !data.url) return this.handleError('import.error.empty');
    if (!validator.isURL(data.url)) return this.handleError('import.error.url');
    if (!validHowl(data.url)) return this.handleError(validHowl(data.url, true), false);

    this.props.soundActions.addSound('custom', {
      name: data.name,
      file: data.url,
      source: 'customStream'
    });
    this.context.history.push('/');
  };

  handleError = (msg, intl=true) => {
    const err = intl ? this.props.intl.formatMessage({ id: msg }) : msg;
    toasterInstance().then(_t => _t.toast(err));
  };

  onFocus = (e) => this.setState({ focused: e.target.id });

  onBlur = () => {
    this.setState({
      focused: false,
      inputName: this.refs.name.value.length,
      inputCustom: this.refs.customInput.value.length
    });
  };

  render() {
    return (
      <div className="modal-inner">
        <h5>{this.props.intl.formatMessage({ id: 'import.custom.header' })}</h5>
        <form onSubmit={this.handleSubmit}>
          <div className="media-import">
            <span className={classNames('input', {
              'input--filled': this.state.focused === 'input-name' || this.state.inputName
            })}>
              <input className="input__field" id="input-name" onBlur={this.onBlur} onFocus={this.onFocus} ref="name" type="text"/>
              <label className="input__label" htmlFor="input-name">
                <span className="input__label-content">
                  <FormattedMessage id="import.custom.name_placeholder"/>
                </span>
              </label>
            </span>
            <span className={classNames('input', {
              'input--filled': this.state.focused === 'input-custom' || this.state.inputCustom
            })}>
              <input className="input__field" id="input-custom" onBlur={this.onBlur} onFocus={this.onFocus} ref="customInput" type="text"/>
              <label className="input__label" htmlFor="input-custom">
                <span className="input__label-content">
                  <FormattedMessage id="import.custom.url_placeholder"/>
                </span>
              </label>
            </span>
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

const mapStateToProps = state => ({
  themes: state.themes
});

const mapDispatchToProps = dispatch => ({
  soundActions: bindActionCreators(soundActions, dispatch)
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(CustomUrl));
