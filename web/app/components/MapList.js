import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../actions';

import MapTile from './MapTile';
import { MAP_NEW } from './MapTileTypes';
// import { mapList } from '../styles/mapList.scss';

const propTypes = {
    filter: PropTypes.string,
    maps: PropTypes.array,
};

class MapList extends React.Component {
    render() {
        let rows = [];
        let newrow = [];

        const { maps, filter } = this.props;

        newrow.push(
            <div className="col-sm-12">
                <MapTile
                    key={'new'}
                    data={{ type: MAP_NEW }}
                    mapless={true}
                />
            </div>
        );

        if (!maps) {
            return (
                <div>
                    <div id="newrow">
                        {newrow}
                    </div>
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
            <div>
                <div id="newrow" className="row">
                    {newrow}
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
