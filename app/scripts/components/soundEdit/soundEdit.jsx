import React, { Component, PropTypes } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { soundActions } from '../../actions';
import { soundClass } from '../../classes';

class SoundEdit extends Component {
  constructor(props) {
    super(props);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleCancel(el) {
    el.preventDefault();
    this.props.soundActions.soundsEdit(this.props.sound, null);
  }

  handleSave(el) {
    el.preventDefault();
    this.props.soundActions.soundsEdit(this.props.sound, {
      name: this.refs.name.value,
      tags: this.refs.tags.value
    });
  }

  render() {
    return (
      <div className="item editing" style={this.props.themes.getIn([ 'soundList', 'item' ]).toJS()}>
        <form onSubmit={this.handleSave}>
          <label><FormattedMessage id="list.editing_name"/></label>
          <input
            className="u-full-width"
            defaultValue={this.props.sound.name}
            placeholder={this.props.intl.formatMessage({ id: 'list.editing_name_placeholder' })}
            ref="name"
            type="text"
          />
        <label><FormattedMessage id="list.editing_tag"/></label>
          <input
            className="u-full-width"
            defaultValue={this.props.sound.tags}
            placeholder={this.props.intl.formatMessage({ id: 'list.editing_tag_placeholder' })}
            ref="tags"
            type="text"
          />
        <a className="button" onClick={this.handleCancel} style={this.props.themes.getIn([ 'base', 'btn' ]).toJS()}>
            <FormattedMessage id="list.cancel"/>
          </a>
          <button
            className="button-primary"
            style={this.props.themes.getIn([ 'base', 'btnPrimary' ]).toJS()}
          ><FormattedMessage id="list.save"/></button>
        </form>
      </div>
    );
  }
}

SoundEdit.propTypes = {
  themes: PropTypes.object,
  intl: PropTypes.object,
  soundActions: PropTypes.object,
  sound: PropTypes.shape(soundClass)
};

const mapStateToProps = state => ({
  themes: state.themes
});

const mapDispatchToProps = dispatch => ({
  soundActions: bindActionCreators(soundActions, dispatch)
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(SoundEdit));
