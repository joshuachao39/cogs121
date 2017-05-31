import React, { PropTypes } from 'react';
import { Map, TileLayer, Polygon } from 'react-leaflet';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';
import axios from 'axios';

import * as actions from '../actions';

class MapContainer extends React.Component {
    constructor(props) {
        super(props);

        // TODO: this.map is undefined -> 404 error
        this.renderPolygons = this.renderPolygons.bind(this);
        this.state = {
            map: undefined,
        };
    }

    componentWillMount() {
        const mapId = parseInt(this.props.params.mapId, 10);
        console.log(`making request to get map ${mapId}`);

        axios.get(`https://guorient-backend.herokuapp.com/maps/${mapId}`)
            .then((res) => {
                console.log(res.data);
                this.setState({ map: res.data });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    renderPolygons() {
        const mapId = parseInt(this.props.params.mapId, 10);
        const map = this.props.maps[mapId];

        return (map.points) ? map.points.map((point) => {
            const position = point.boundary.points;
            return (
                <Polygon
                    positions={position}
                    color={point.color}
                    fillColor={point.color}
                />
            );
        }) : null;
    }

    render() {
        if (!this.state.map) {
            console.log('map not loaded');
            return <div>Loading</div>;
        }

        console.log('map is defined');
        console.log(this.state.map);

        const map = this.state.map;

        const { name, description, type, locationName } = map;

        const position = {
            lat: map.coords.lat,
            lng: map.coords.lng,
        };

        const positions = [];
        map.boundary.points.forEach((elem) => {
            positions.push([ elem.lat, elem.lng ]);
        });

        const renderedPointsOfInterest = this.renderPolygons();
        const pointsOfInterest = map.points;

        return (
            <div className="gr-wrapper gr-newmap--wrapper">
                <div className="gr-sidebar--wrapper">
                    <div className="gr-sidebar">
                        <div className="gr-sidebar--top">
                            <h1>{map.name}</h1>
                        </div>
                        <div className="vcenter form-group">
                            <h4 className="gr-sidebar--instruction">
                                Info
                            </h4>
                            <div className="gr-sidebar--finalize-list">
                                {name &&
                                    <div className="gr-sidebar--finalize-list-elem">
                                        Name: {name}
                                    </div>
                                }
                                {description &&
                                    <div className="gr-sidebar--finalize-list-elem">
                                        Description: {description}
                                    </div>
                                }
                                {type &&
                                    <div className="gr-sidebar--finalize-list-elem">
                                        Type: {type}
                                    </div>
                                }
                                {locationName &&
                                    <div className="gr-sidebar--finalize-list-elem">
                                        <FontAwesome name="flag"/>
                                        &nbsp;Location: near {locationName}
                                    </div>
                                }
                                {pointsOfInterest &&
                                    <div className="gr-sidebar--finalize-list-elem">
                                        <FontAwesome name="map-marker" />
                                        &nbsp;{pointsOfInterest.length} points of interest
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="gr-step--selector gr-sidebar--bottom">
                            <Link
                                className="btn btn-default gr-btn--left gr-btn"
                                to="/maps"
                            >
                                Back
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="gr-map--wrapper">
                    <Map
                        center={position}
                        zoom={18}
                        scrollWheelZoom={false}
                        style={{
                            height: '100vh',
                        }}
                    >
                        <TileLayer
                            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                            attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
                        />
                        <Polygon
                            color="#888888"
                            positions={positions}
                        />
                        {renderedPointsOfInterest}
                    </Map>
                </div>
            </div>
        );
    }
}

MapContainer.propTypes = {
    mapName: PropTypes.string,
    params: PropTypes.object,
    maps: PropTypes.array,
    initMaps: PropTypes.func,
};

function mapStateToProps(state) {
    return {
        maps: state.maps.maps,
    };
}

export default connect(mapStateToProps, actions)(MapContainer);
