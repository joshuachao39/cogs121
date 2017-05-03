import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import { MAP_EVENT } from './MapTileTypes';

const MapTile = ({ data }) => {
    const name = (data.type === MAP_EVENT) ? data.name : 'New';
    const description = (data.type === MAP_EVENT) ? data.description : 'Create a new map';

    return (
        <div className="col-md-4">
            <Link to={`/maps/${name}`}>
                <div className="gr-card card">
                    <img
                        className="card-img-top"
                        src="http://lorempixel.com/g/400/200"
                        alt="map"
                    />
                    <div className="card-block">
                        <h4 className="card-title">{name}</h4>
                        <p>{description}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
};

MapTile.propTypes = {
    data: PropTypes.object
};

export default MapTile;
