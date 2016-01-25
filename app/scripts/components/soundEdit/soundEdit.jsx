import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { soundActions } from 'actions/';
import { soundClass } from 'classes/';
import { toasterInstance } from 'utils/';

export default class SoundEdit extends Component {
  static propTypes = {
    themes: PropTypes.object,
    intl: PropTypes.object,
    soundActions: PropTypes.object,
    sound: PropTypes.shape(soundClass)
  };

  state = {
    focused: false,
    inputName: this.props.sound.name,
    inputTags: this.props.sound.tags
  };

  handleCancel = (el) => {
    el.preventDefault();
    this.props.dispatch(soundActions.soundsEdit(this.props.sound, null));
  };

  handleSave = (el) => {
    el.preventDefault();
    if (!this.refs.name.value) {
      return toasterInstance().then(_t => _t.toast(this.props.intl.formatMessage({ id: 'import.error.empty' })));
    }
    this.props.dispatch(soundActions.soundsEdit(this.props.sound, {
      name: this.refs.name.value,
      tags: this.refs.tags.value
    }));
  };

  onFocus = (e) => {
    this.setState({
      focused: e.target.id,
      inputName: this.refs.name.value.length,
      inputTags: this.refs.tags.value.length
    });
  };

  onBlur = () => {
    this.setState({
      focused: false,
      inputName: this.refs.name.value.length,
      inputTags: this.refs.tags.value.length
    });
  };

  render() {
    let { sound, themes, intl } = this.props;
    return (
      <div className="item editing" style={themes.getIn([ 'soundList', 'item' ]).toJS()}>
        <form onSubmit={this.handleSave}>

          <span className={classNames('input', {
            'input--filled': this.state.focused === 'input-name' || this.state.inputName
          })}>
            <input className="input__field" id="input-name" defaultValue={sound.name} onBlur={this.onBlur} onFocus={this.onFocus} ref="name" type="text"/>
            <label className="input__label" htmlFor="input-name">
              <span className="input__label-content">
                {intl.formatMessage({ id: 'list.editing_name' })}
              </span>
            </label>
          </span>

          <span className={classNames('input', {
            'input--filled': this.state.focused === 'input-tags' || this.state.inputTags
          })}>
            <input className="input__field" id="input-tags" defaultValue={sound.tags} onBlur={this.onBlur} onFocus={this.onFocus} ref="tags" type="text"/>
            <label className="input__label" htmlFor="input-tags">
              <span className="input__label-content">
                {intl.formatMessage({ id: 'list.editing_tag' })}
              </span>
            </label>
          </span>

          <a className="pure-button" onClick={this.handleCancel} style={themes.getIn([ 'base', 'btn' ]).toJS()}>
            {intl.formatMessage({ id: 'list.cancel' })}
          </a>
          <button
            className="pure-button pure-button-primary"
            style={themes.getIn([ 'base', 'btnPrimary' ]).toJS()}
          >{intl.formatMessage({ id: 'list.save' })}</button>
        </form>
      </div>
    );
  }
}
