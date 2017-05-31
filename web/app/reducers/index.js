import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
// import axios from 'axios';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
// import * as types from '../actions/types';
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

export { store, reducers };
