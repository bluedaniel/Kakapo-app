import React, { Component, PropTypes } from 'react';
import validator from 'validator';
import { intlShape } from 'react-intl';
import classNames from 'classnames';
import { soundActions } from 'actions/';
import { toasterInstance, validHowl } from 'utils/';

export default class CustomUrl extends Component {
  static contextTypes = {
    router: PropTypes.object
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
      file: this.refs.customInput.value,
      source: 'customStream'
    };

    if (!data.name || !data.file) return this.handleError('import.error.empty');
    if (!validator.isURL(data.file)) return this.handleError('import.error.url');
    if (!validHowl(data.file)) return this.handleError(validHowl(data.file, true), false);

    this.props.dispatch(soundActions.addSound('custom', data));
    this.context.router.push('/');
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
    const { themes, intl } = this.props;
    return (
      <div className="modal customurl">
        <div className="modal-inner">
          <h5>{intl.formatMessage({ id: 'import.custom.header' })}</h5>
          <form onSubmit={this.handleSubmit}>
            <div className="media-import">
              <span className={classNames('input', {
                'input--filled': this.state.focused === 'input-name' || this.state.inputName
              })}>
                <input className="input__field" id="input-name" onBlur={this.onBlur} onFocus={this.onFocus} ref="name" type="text"/>
                <label className="input__label" htmlFor="input-name">
                  <span className="input__label-content">
                    {intl.formatMessage({ id: 'import.custom.name_placeholder' })}
                  </span>
                </label>
              </span>
              <span className={classNames('input', {
                'input--filled': this.state.focused === 'input-custom' || this.state.inputCustom
              })}>
                <input className="input__field" id="input-custom" onBlur={this.onBlur} onFocus={this.onFocus} ref="customInput" type="text"/>
                <label className="input__label" htmlFor="input-custom">
                  <span className="input__label-content">
                    {intl.formatMessage({ id: 'import.custom.url_placeholder' })}
                  </span>
                </label>
              </span>
              <button
                className="pure-button pure-button-primary"
                ref="btn"
                style={themes.getIn([ 'base', 'btnPrimary' ]).toJS()}
              >{intl.formatMessage({ id: 'import.save' })}</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
