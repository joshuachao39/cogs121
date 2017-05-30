import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import axios from 'axios';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import * as types from '../actions/types';
import { mapsReducer } from './mapsReducer';
import { filterReducer } from './filterReducer';

const reducers = combineReducers({
    filter: filterReducer,
    maps: mapsReducer,
    routing,
});

const middleware = applyMiddleware(thunk, logger());

const store = createStore(reducers, middleware);
store.subscribe(() => {
    console.log('store changed', store.getState());
});

function initMaps(mapsData) {
    // console.log('init maps data');
    // console.log(mapsData);
    store.dispatch({
        type: types.INIT_MAPS,
        payload: {
            data: mapsData,
        }
    });
}

axios.get('http://guorient-backend.herokuapp.com/maps')
    .then((res) => {
        initMaps(res.data);
    })
    .catch((err) => {
        console.log(err);
    });

export { store, reducers };
