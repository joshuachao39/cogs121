import React from 'react';
import PropTypes from 'prop-types';
import { SketchPicker } from 'react-color';

const propTypes = {
    index: PropTypes.number,
    name: PropTypes.string,
    color: PropTypes.string,
    handlePointChange: PropTypes.func,
};

/**
 * Handles color and name updating of individual point of interest
 */
export default class PointOfInterest extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showColorPicker: false,
        };

        this.showColorPicker = this.showColorPicker.bind(this);
        this.hideColorPicker = this.hideColorPicker.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
    }

    hideColorPicker() {
        this.setState({ showColorPicker: false });
    }

    showColorPicker() {
        this.setState({ showColorPicker: true });
    }

    handleColorChange(color) {
        const { index, name } = this.props;

        this.props.handlePointChange(index, name, color.hex);
    }

    handleInputChange(e) {
        const { index, color } = this.props;

        this.props.handlePointChange(index, e.target.value, color);
    }

    render() {
        const { color, name } = this.props;

        return (
            <div
                className="gr-sidebar--place-wrapper"
            >
                <button
                    className="gr-sidebar--color-picker-wrapper"
                    onClick={this.showColorPicker}
                    onBlur={this.hideColorPicker}
                    style={{
                        backgroundColor: color,
                    }}
                >
                    {this.state.showColorPicker &&
                          <div className="gr-sidebar--color-picker">
                              <SketchPicker
                                  color={color}
                                  onChangeComplete={this.handleColorChange}
                              />
                          </div>
                    }
                </button>
                <span className="gr-sidebar--point-name">
                    <input
                        value={name}
                        onChange={this.handleInputChange}
                    />
                </span>
            </div>
        );
    }
}

PointOfInterest.propTypes = propTypes;
