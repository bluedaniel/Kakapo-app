import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { injectIntl, FormattedMessage } from 'react-intl';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { settingActions, themeActions } from '../../actions';
import { ColorPicker } from '../../components/ui';
import './settings.css';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = { colorPickerActive: false };
    this.changePaletteSlot = this.changePaletteSlot.bind(this);
    this.handleSwatch = this.handleSwatch.bind(this);
  }

  changePaletteSlot(slotNo) {
    this.setState({
      colorPickerActive: true,
      slotNo: slotNo,
      defaultColor: this.props.themes.get('palette').get(slotNo)
    });
  }

  handleSwatch(swatch) {
    this.setState({ colorPickerActive: false });
    this.props.themeActions.themesChange(swatch, this.state.slotNo);
  }

  render() {
    return (
      <div className="modal settings-pane">
        <Link className="close" to="/"><FormattedMessage id="modal.close"/></Link>
        <div className="modal-inner">
          <h5><FormattedMessage id="settings.header"/></h5>
          <div className="opt">
            <FormattedMessage id="settings.theme"/>
            <span className="swatches">
              <a onClick={() => this.changePaletteSlot(0)} style={{ backgroundColor: this.props.themes.get('palette').get(0) }}></a>
              <a onClick={() => this.changePaletteSlot(1)} style={{ backgroundColor: this.props.themes.get('palette').get(1) }}></a>
            </span>
            <ColorPicker
              active={this.state.colorPickerActive}
              color={this.state.defaultColor}
              handleSwatch={this.handleSwatch}
              />
          </div>
          <div className="opt">
            <a
              className="github hint--right"
              data-hint="Fork me on Github!"
              href="https://github.com/bluedaniel/kakapo-web"
              target="_blank"
            >
              <i className="icon-github"/>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  themes: PropTypes.object,
  settingActions: PropTypes.object,
  themeActions: PropTypes.object
};

const mapStateToProps = state => ({
  themes: state.themes,
  settings: state.settings
});

const mapDispatchToProps = dispatch => ({
  settingActions: bindActionCreators(settingActions, dispatch),
  themeActions: bindActionCreators(themeActions, dispatch)
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Settings));
