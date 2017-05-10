import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import * as types from '../actions/types';

const filter = (state = '', action) => {
    switch (action.type) {
        case types.FILTER:
            return action.filter;

        default:
            return state;
    }
};

const createMap = (state = {}, action) => {
    switch (action.type) {
        case types.UPDATE_MAP_BORDERS:
        case types.UPDATE_MAP_POINTS:
        case types.INIT_MAP:
        case types.SUBMIT_MAP:
        default:
            return state;    
    }
};

const rootReducer = combineReducers({
    filter,
    createMap,
    routing
});

export default rootReducer;
