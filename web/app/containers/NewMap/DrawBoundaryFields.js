import React from 'react';
import PropTypes from 'prop-types';
import { Map, TileLayer, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';

const propTypes = {
    nextStep: PropTypes.func,
    prevStep: PropTypes.func,
};

export default class DrawBoundaryFields extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mapName: 'New Map',
            locationName: 'San Francisco',
            position: {
                lat: 37.772607,
                lon: -122.435886,
            },
        };

        this.validate = this.validate.bind(this);
        this.validateAndNext = this.validateAndNext.bind(this);
        this.validateAndPrevious = this.validateAndPrevious.bind(this);
    }

    validate() {
        // TODO
        return true;
    }

    validateAndPrevious() {
        if (this.validate()) {
            // TODO: add some redux saving before moving on
            this.props.prevStep();
        }
    }


    validateAndNext() {
        if (this.validate()) {
            // TODO: add some redux saving before moving on
            this.props.nextStep();
        }
    }

    /**
     * Handler to handle the creation of polygons
     */
    _onCreate(e) {
        console.log(e);
    }

    render() {
        const { position } = this.state;

        return (
            <div className="gr-wrapper container-fluid">
                <div className="gr-map--wrapper">
                    <Map
                        center={position}
                        zoom={18}
                        scrollWheelZoom={false}
                        style={{
                            height: '80vh',
                        }}
                    >
                        <TileLayer
                            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                            attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
                        />
                        <FeatureGroup>
                            <EditControl
                                position="topleft"
                                onEdited={this._onEditPath}
                                onCreated={this._onCreate}
                                onDeleted={this._onDeleted}
                                draw={{
                                    marker: false,
                                }}
                            />
                        </FeatureGroup>
                    </Map>
                </div>
                <div className="gr-step--selector">
                    <button
                        className="btn btn-default gr-btn--left gr-btn"
                        onClick={this.validateAndPrevious}
                    >
                        Prev
                    </button>
                    <button
                        className="btn btn-default gr-btn--right gr-btn"
                        onClick={this.validateAndNext}
                    >
                        Next
                    </button>
                </div>
            </div>
        );
    }
}

DrawBoundaryFields.propTypes = propTypes;
