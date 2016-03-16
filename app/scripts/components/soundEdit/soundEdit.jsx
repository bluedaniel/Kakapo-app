import React, { Component, PropTypes } from 'react';
import { intlShape } from 'react-intl';
import { TextInput } from 'components/ui';
import { soundActions } from 'actions/';
import { soundClass } from 'classes/';
import { toasterInstance } from 'utils/';

export default class SoundEdit extends Component {
  static propTypes = {
    themes: PropTypes.object,
    soundActions: PropTypes.object,
    sound: PropTypes.shape(soundClass),
    dispatch: PropTypes.func,
    intl: intlShape
  };

  handleCancel = (el) => {
    el.preventDefault();
    this.props.dispatch(soundActions.soundsEdit(this.props.sound, null));
  };

  handleSave = (el) => {
    el.preventDefault();
    const data = {
      name: this.refs.name.getElementsByTagName('input')[0].value,
      tags: this.refs.tags.getElementsByTagName('input')[0].value
    };

    if (!data.name) {
      return toasterInstance().then(_t =>
        _t.toast(this.props.intl.formatMessage({ id: 'import.error.empty' })));
    }
    return this.props.dispatch(soundActions.soundsEdit(this.props.sound, data));
  };

  render() {
    const { sound, themes, intl } = this.props;
    return (
      <div className="item editing">
        <form onSubmit={this.handleSave}>
          <div ref="name">
            <TextInput placeholder="list.editing_name" name="name" value={sound.name} intl={intl} />
          </div>
          <div ref="tags">
            <TextInput placeholder="list.editing_tag" name="tags" value={sound.tags} intl={intl} />
          </div>
          <a className="button" onClick={this.handleCancel}>
            {intl.formatMessage({ id: 'list.cancel' })}
          </a>
          <button
            className="button"
            style={{ backgroundColor: themes.get('btn'), borderColor: themes.get('btn') }}
          >{intl.formatMessage({ id: 'list.save' })}</button>
        </form>
      </div>
    );
  }
}
