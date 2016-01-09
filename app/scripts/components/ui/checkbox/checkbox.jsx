import React, { Component, PropTypes } from 'react';

export default class Checkbox extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    checked: PropTypes.bool,
    handleChange: PropTypes.func,
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string
  };

  handleChange = () => {
    this.props.handleChange(this.refs.checkbox.checked);
  };

  render() {
    return (
      <label className="switch" htmlFor={this.props.name}>
        <span className="switch-label">{this.props.label}</span>
        <input
          checked={this.props.checked}
          id={this.props.name}
          name={this.props.name}
          onChange={this.handleChange}
          ref="checkbox"
          type="checkbox"
          value={this.props.value}
          />
      </label>
    );
  }
}
