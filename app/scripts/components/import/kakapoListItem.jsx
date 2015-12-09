import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { soundClass } from '../../classes';
import { soundActions } from '../../actions';
import { Image } from '../ui';

class KakapoItem extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (!this.alreadyAdded()) {
      this.props.soundActions.addSound('kakapo', {
        name: this.props.intl.formatMessage({ id: `sounds.${this.props.sound.name.replace(/\s+/g, '_').toLowerCase()}` }),
        url: this.props.sound.file,
        source: 'file',
        icon: this.props.sound.img
      });
    }
  }

  alreadyAdded() {
    return this.props.sounds.filter(_s => this.props.sound.file === _s.file).count() === 1;
  }

  render() {
    return (
      <div className={classNames('kakapo-item', { disabled: this.alreadyAdded() })} onClick={this.handleClick}>
        <div className="thumbnail">
          <Image img={`http://data.kakapo.co/v2/images/dark_${this.props.sound.img}.png`}/>
        </div>
        <span className="title">
          <FormattedMessage id={(`sounds.${this.props.sound.name.replace(/\s+/g, '_').toLowerCase()}`)} />
        </span>
    </div>
    );
  }
}

KakapoItem.propTypes = {
  sounds: PropTypes.object,
  soundActions: PropTypes.object,
  intl: intlShape.isRequired,
  sound: PropTypes.shape(soundClass)
};

const mapStateToProps = state => ({
  sounds: state.sounds
});

const mapDispatchToProps = dispatch => ({
  soundActions: bindActionCreators(soundActions, dispatch)
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(KakapoItem));
