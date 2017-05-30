import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

const propTypes = {
    mapName: PropTypes.string,
    type: PropTypes.string,
    handleInit: PropTypes.func,
    nextStep: PropTypes.func,
    prevStep: PropTypes.func,
    description: PropTypes.string,
};

const defaultProps = {
    mapName: '',
    description: '',
    type: '',
    handleInit() {},
    nextStep() {},
    prevStep() {},
};

export default class NameTypeFields extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mapName: this.props.mapName,
            description: this.props.description,
            type: this.props.type,
            nError: false,
            dError: false,
            tError: false,
            nameError: '',
            descriptionError: '',
            typeError: '',
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
        let errorExists = false;
        if (!this.state.mapName) {
            this.setState({
                nameError: 'Please enter a name.',
                nError: true
            });
            errorExists = true;
        } else {
            nError: false;
        }
        if (!this.state.description) {
            this.setState({
                descriptionError: 'Please enter a description.',
                dError: true
            });
            errorExists = true;
            // Set errormessage as this error
            // return false
        }
        if (!this.state.type) {
            this.setState({
                typeError: 'Please select a type.',
                tError: true
            });
            errorExists = true;
        }
        if (errorExists) {
            return false;
        }
        return true;
        // Do for name and type
    }

    validateAndPrevious() {
        window.location.href = '/maps';
    }

    validateAndNext() {
        if (this.validate()) {
            this.props.handleInit(this.state.mapName, this.state.description, this.state.type);
            this.props.nextStep();
        }
    }

    render() {
        return (
            <div className="gr-wrapper container gr-wrapper--fullheight vcenter-parent">
                <div className="gr-form--name-type-wrapper gr-form-group form-group vcenter">
                    <h2>First, some info about your event</h2><br />
                    <label htmlFor="mapName">Name</label>
                    <input
                      className="gr-input gr-input--text gr-input--label form-control gr-form--control"
                      type="text"
                      name="mapName"
                      id="mapName"
                      value={this.state.mapName}
                      onChange={this.changeName}
                    />
                    {this.state.nError &&
                        <p className="error"> {this.state.nameError} </p>
                    }
                    <label htmlFor="description">Description</label>
                    <input
                      className="gr-input gr-input--text gr-input--label form-control gr-form--control"
                      type="text"
                      name="description"
                      id="description"
                      value={this.state.description}
                      onChange={this.changeDescription}
                    />
                    {this.state.dError &&
                        <p className="error"> {this.state.descriptionError} </p>
                    }
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
                                htmlFor="type-other"
                                className={(this.state.type === 'other') ? 'selected' : ''}
                            >
                                <input
                                    type="radio"
                                    value="other"
                                    name="type"
                                    id="type-other"
                                />
                                <div className="gr-input--card-icon">
                                    <FontAwesome name="question" />
                                </div>
                                <div className="gr-input--card-text">
                                    Other
                                </div>
                            </label>
                        </div>
                    </div>
                    {this.state.tError &&
                        <p className="error"> {this.state.typeError} </p>
                    }
                </div>
                <div className="gr-step--selector">
                    <button
                        className="btn btn-default gr-btn--left gr-btn"
                        onClick={this.validateAndPrevious}
                    >
                        Back
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
