import React, { PropTypes } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../actions';

class App extends React.Component {
    componentWillMount() {
        console.log('app is initing maps');
        axios.get('https://guorient-backend.herokuapp.com/maps')
            .then((res) => {
                this.props.initMaps(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        return (
          <div>
            <div>
                { this.props.children }
            </div>
            <footer />
          </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.object,
    initMaps: PropTypes.func,
};

function mapStateToProps(state) {
    return {
        maps: state.maps.maps,
    };
}

export default connect(mapStateToProps, actions)(App);
