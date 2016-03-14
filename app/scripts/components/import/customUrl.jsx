import React, { Component, PropTypes } from 'react';
import { intlShape } from 'react-intl';
import { soundActions } from 'actions/';
import { toasterInstance, validHowl, validUrl } from 'utils/';
import { TextInput } from 'components/ui';

export default class CustomUrl extends Component {
  static propTypes = {
    themes: PropTypes.object,
    soundActions: PropTypes.object,
    dispatch: PropTypes.func,
    intl: intlShape
  };

  static contextTypes = {
    router: PropTypes.object
  };

  componentDidMount() {
    this.refs.name.getElementsByTagName('input')[0].focus();
  }

  handleSubmit = (el) => {
    el.preventDefault();
    const data = {
      name: this.refs.name.getElementsByTagName('input')[0].value,
      file: this.refs.customInput.getElementsByTagName('input')[0].value,
      source: 'customStream'
    };

    if (!data.name || !data.file) return this.handleError('import.error.empty');
    if (!validUrl(data.file)) return this.handleError('import.error.url');
    if (!validHowl(data.file)) return this.handleError(validHowl(data.file, true), false);

    this.props.dispatch(soundActions.addSound('custom', data));
    return this.context.router.push('/');
  };

  handleError = (msg, intl = true) => {
    const err = intl ? this.props.intl.formatMessage({ id: msg }) : msg;
    toasterInstance().then(_t => _t.toast(err));
  };

  render() {
    const { themes, intl } = this.props;
    return (
      <div className="customurl">
        <h5>{intl.formatMessage({ id: 'import.custom.header' })}</h5>
        <form onSubmit={this.handleSubmit}>
          <div className="media-import">
            <div ref="name">
              <TextInput placeholder="import.custom.name_placeholder" name="name" intl={intl} />
            </div>
            <div ref="customInput">
              <TextInput placeholder="import.custom.url_placeholder"
                name="customInput" intl={intl}
              />
            </div>
            <button
              className="button"
              ref="btn"
              style={themes.getIn([ 'base', 'btnPrimary' ]).toJS()}
            >{intl.formatMessage({ id: 'import.save' })}</button>
          </div>
        </form>
      </div>
    );
  }
}
