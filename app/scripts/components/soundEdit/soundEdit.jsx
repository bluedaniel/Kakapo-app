import React, { Component, PropTypes } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { soundActions } from '../../actions';
import { soundClass } from '../../classes';
import { toasterInstance } from '../../utils';

class SoundEdit extends Component {
  static propTypes = {
    themes: PropTypes.object,
    intl: PropTypes.object,
    soundActions: PropTypes.object,
    sound: PropTypes.shape(soundClass)
  }

  state = {
    loading: false,
    focused: false,
    inputName: this.props.sound.name,
    inputTags: this.props.sound.tags
  }

  handleCancel = (el) => {
    el.preventDefault();
    this.props.soundActions.soundsEdit(this.props.sound, null);
  }

  handleSave = (el) => {
    el.preventDefault();
    if (!this.refs.name.value) {
      return toasterInstance().then(_t => _t.toast(this.props.intl.formatMessage({ id: 'import.error.empty' })));
    }
    this.props.soundActions.soundsEdit(this.props.sound, {
      name: this.refs.name.value,
      tags: this.refs.tags.value
    });
  }

  onFocus = (e) => {
    this.setState({
      focused: e.target.id,
      inputName: this.refs.name.value.length,
      inputTags: this.refs.tags.value.length
    });
  }

  onBlur = () => {
    this.setState({
      focused: false,
      inputName: this.refs.name.value.length,
      inputTags: this.refs.tags.value.length
    });
  }

  render() {
    return (
      <div className="item editing" style={this.props.themes.getIn([ 'soundList', 'item' ]).toJS()}>
        <form onSubmit={this.handleSave}>

          <span className={classNames('input', {
            'input--filled': this.state.focused === 'input-name' || this.state.inputName
          })}>
            <input className="input__field" id="input-name" defaultValue={this.props.sound.name} onBlur={this.onBlur} onFocus={this.onFocus} ref="name" type="text"/>
            <label className="input__label" htmlFor="input-name">
              <span className="input__label-content">
                <FormattedMessage id="list.editing_name"/>
              </span>
            </label>
          </span>

          <span className={classNames('input', {
            'input--filled': this.state.focused === 'input-tags' || this.state.inputTags
          })}>
            <input className="input__field" id="input-tags" defaultValue={this.props.sound.tags} onBlur={this.onBlur} onFocus={this.onFocus} ref="tags" type="text"/>
            <label className="input__label" htmlFor="input-tags">
              <span className="input__label-content">
                <FormattedMessage id="list.editing_tag"/>
              </span>
            </label>
          </span>

          <a className="pure-button" onClick={this.handleCancel} style={this.props.themes.getIn([ 'base', 'btn' ]).toJS()}>
            <FormattedMessage id="list.cancel"/>
          </a>
          <button
            className="pure-button pure-button-primary"
            style={this.props.themes.getIn([ 'base', 'btnPrimary' ]).toJS()}
          ><FormattedMessage id="list.save"/></button>
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

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(SoundEdit));
