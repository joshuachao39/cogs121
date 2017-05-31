import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import * as actions from '../actions';

import MapTile from './MapTile';

const propTypes = {
    maps: PropTypes.array,
};

class MapList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filter: '',
        };
    }

    handleFilter(e) {
        this.setState({ filter: e.target.value });
    }

    render() {
        let rows = [];

        const { filter } = this.state;
        const { maps } = this.props;

        if (maps) {
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
        }

        if (rows.length === 0) rows = <div className="col-sm-12">No maps to show!</div>;

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8">
                        <label
                            className="gr-filter--maps-label"
                            htmlFor="gr-filter--maps"
                        >
                            Search:
                            <input
                                id="gr-filter--maps"
                                className="gr-input form-control"
                                value={this.state.filter}
                                onChange={this.handleFilter.bind(this)}
                            />
                        </label>
                    </div>
                    <div className="col-md-4">
                        <Link
                            to="maps/New"
                            className="btn gr-btn gr-btn--success gr-btn--right gr-filter--create-btn"
                        >
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
