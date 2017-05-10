import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import * as types from '../actions/types';

import { mapsData } from '../mapsData';

const filter = (state = '', action) => {
    switch (action.type) {
        case types.FILTER:
            return action.filter;

        default:
            return state;
    }
};

/**
 * Reducer for creating map
 * This reducer should build an object to be added to mapsData
 */
// const createMap = (state = {}, action) => {
//     switch (action.type) {
//         case types.UPDATE_MAP_BORDERS:
//         case types.UPDATE_MAP_POINTS:
//         case types.INIT_MAP:
//         case types.SUBMIT_MAP:
//         default:
//             return state;
//     }
// };

const maps = (state = mapsData, action) => {
    switch (action.type) {
        // case types.INIT_MAPS:
        //     return {
        //         ...state,
        //         ...mapsData,
        //     };
        case types.ADD_MAP:
            const newMap = action.data;
            return {
                ...state,
                maps: [
                    ...state.maps,
                    newMap,
                ],
            };
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    filter,
    maps,
    routing,
});

export default rootReducer;
