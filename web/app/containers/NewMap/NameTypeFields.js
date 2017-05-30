import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { MAP_EVENT } from '../../components/MapTileTypes';

const propTypes = {
    handleInit: PropTypes.func,
    nextStep: PropTypes.func,
    prevStep: PropTypes.func,
};

const defaultProps = {
    handleInit() {},
    nextStep() {},
    prevStep() {},
};

export default class NameTypeFields extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mapName: 'New Map',
            type: MAP_EVENT,
        };

        this.changeName = this.changeName.bind(this);
        this.changeType = this.changeType.bind(this);
        this.changeDescription = this.changeDescription.bind(this);

        this.validateAndPrevious = this.validateAndPrevious.bind(this);
        this.validateAndNext = this.validateAndNext.bind(this);
        this.validate = this.validate.bind(this);
    }

    changeName(e) {
        this.setState({
            mapName: e.target.value,
        });
    }

    /*
     * Handles the changing of type of event
     */
    changeType(e) {
        this.setState({
            type: e.target.value,
        });
    }

    /**
     * Handles changing of description of event
     */
    changeDescription(e) {
        this.setState({
            description: e.target.value,
        });
    }

    validate() {
        return true;
    }

    validateAndPrevious() {
        if (this.validate()) {
            this.props.handleInit(this.state.mapName, this.state.description, this.state.type);
            this.props.prevStep();
        }
    }

    validateAndNext() {
        console.log(this.state.mapName);
        console.log(this.state.description);
        console.log(this.state.type);
        if (this.validate()) {
            this.props.handleInit(this.state.mapName, this.state.description, this.state.type);
            this.props.nextStep();
        }
    }

    render() {
        return (
            <div className="gr-wrapper">
                <div className="gr-form--name-type-wrapper gr-form-group form-group">
                    <label htmlFor="mapName">Name</label>
                    <input
                      className="gr-map--form-control form-control gr-form--control"
                      type="text"
                      name="mapName"
                      id="mapName"
                      value={this.state.mapName}
                      onChange={this.changeName}
                    />
                    <label htmlFor="description">Description</label>
                    <input
                      className="gr-map--form-control form-control gr-form--control"
                      type="text"
                      name="description"
                      id="description"
                      value={this.state.description}
                      onChange={this.changeType}
                    />
                    <div className="gr-input--title">Select type of event</div>
                    <div
                        className="row gr-input--cards"
                        onChange={this.changeType}
                    >
                        <div className="col-md-3 gr-input--card">
                            <label
                                htmlFor="type-conference"
                                className={(this.state.type === 'conference') ? 'selected' : ''}
                            >
                                <input
                                    type="radio"
                                    value="conference"
                                    name="type"
                                    id="type-conference"
                                />
                                <div className="gr-input--card-icon">
                                    <FontAwesome name="briefcase" />
                                </div>
                                <div className="gr-input--card-text">
                                    Conference
                                </div>
                            </label>
                        </div>
                        <div className="col-md-3 gr-input--card">
                            <label
                                htmlFor="type-family"
                                className={(this.state.type === 'family') ? 'selected' : ''}
                            >
                                <input
                                    type="radio"
                                    value="family"
                                    name="type"
                                    id="type-family"
                                />
                                <div className="gr-input--card-icon">
                                    <FontAwesome name="users" />
                                </div>
                                <div className="gr-input--card-text">
                                    Family
                                </div>
                            </label>
                        </div>
                        <div className="col-md-3 gr-input--card">
                            <label
                                htmlFor="type-party"
                                className={(this.state.type === 'party') ? 'selected' : ''}
                            >
                                <input
                                    type="radio"
                                    value="party"
                                    name="type"
                                    id="type-party"
                                />
                                <div className="gr-input--card-icon">
                                    <FontAwesome name="birthday-cake" />
                                </div>
                                <div className="gr-input--card-text">
                                    Party
                                </div>
                            </label>
                        </div>
                        <div className="col-md-3 gr-input--card">
                            <label
                                htmlFor="type-golf"
                                className={(this.state.type === 'golf') ? 'selected' : ''}
                            >
                                <input
                                    type="radio"
                                    value="golf"
                                    name="type"
                                    id="type-golf"
                                />
                                <div className="gr-input--card-icon">
                                    <FontAwesome name="flag" />
                                </div>
                                <div className="gr-input--card-text">
                                    Golf
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="gr-step--selector">
                    <button
                        className="btn btn-default gr-btn--left gr-btn"
                        onClick={this.validateAndPrevious}
                    >
                        Prev
                    </button>
                    <button
                        className="btn btn-default gr-btn--right gr-btn gr-btn--primary"
                        onClick={this.validateAndNext}
                    >
                        Next
                    </button>
                </div>
            </div>
        );
    }
}

NameTypeFields.propTypes = propTypes;
NameTypeFields.defaultProps = defaultProps;
