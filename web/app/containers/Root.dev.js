import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
// import DevTools from './DevTools';
import { Router } from 'react-router';
import routes from '../routes';
import { store } from '../reducers';

export default class Root extends Component {
    render() {
        const { history } = this.props;
        return (
            <Provider store={store}>
                <div>
                    <Router history={history} routes={routes} />
                    { /* <DevTools visibleOnLoad={false} /> */ }
                </div>
            </Provider>
        );
    }
}

Root.propTypes = {
    history: PropTypes.object.isRequired
};
