import * as types from '../actions/types';

const filterReducer = (state = '', action) => {
    switch (action.type) {
        case types.FILTER:
            return action.filter;

        default:
            return state;
    }
};

export { filterReducer };
