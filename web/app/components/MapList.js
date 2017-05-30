import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import * as actions from '../actions';

import MapTile from './MapTile';

const propTypes = {
    filter: PropTypes.string,
    maps: PropTypes.array,
};

class MapList extends React.Component {
    render() {
        let rows = [];

        const { maps, filter } = this.props;

        if (!maps) {
            return (
                <div>
                    No maps to show
                </div>
            );
        }

        maps.forEach((elem) => {
            const nameLC = elem.name.toLowerCase();
            const filterLC = filter.toLowerCase();

            if (nameLC.indexOf(filterLC) !== -1) {
                rows.push(
                    <div className="col-md-4">
                        <MapTile
                            key={elem.name}
                            data={elem}
                            mapless={false}
                        />
                    </div>
                );
            }
        });

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8">
                    </div>
                    <div className="col-md-4">
                        <Link to="maps/New" className="btn gr-btn gr-btn--success gr-btn--right">
                            + Create
                        </Link>
                    </div>
                </div>
                <div id="row" className="row">
                    {rows}
                </div>
            </div>
        );
    }
}

MapList.propTypes = propTypes;

function mapStateToProps(state) {
    return {
        maps: state.maps.maps,
    };
}

export default connect(mapStateToProps, actions)(MapList);
