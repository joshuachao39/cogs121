import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { filterTable } from '../actions';
import MapList from '../components/MapList';

const FilterableTable = () => {
    return (
        <div className="gr-filter--pad-top">
            <div className="gr-sidebar--top container-fluid">
                <h1>Guorient</h1>
            </div>
            <MapList/>
        </div>
    );
};

FilterableTable.propTypes = {
    filter: PropTypes.string,
    onFilter: PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        filter: state.filter
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFilter: filterText => dispatch(filterTable(filterText))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FilterableTable);
