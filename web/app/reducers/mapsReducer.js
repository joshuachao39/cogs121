import * as types from '../actions/types';
import axios from 'axios';

const mapsReducer = (state, action) => {
    switch (action.type) {
        case types.INIT_MAPS:
            return {
                ...state,
                maps: action.payload.data,
            };
        case types.ADD_MAP:
            console.log('Adding a map reducer');
            console.log(state.maps);
            const currMaps = [...state.maps];
            const newMap = {
                ...action.payload,
                id: currMaps.length, // New id
            };
            // TEMPORARY fix
            // Make axios request here
            axios.post('https://guorient-backend.herokuapp.com/maps/new', newMap)
                .then(function() {
                    console.log('Updated backend with map');
                    window.location.href = '/maps';
                })
                .catch(function(err) {
                    console.log(err);
                });

            const stateCpy = (state) ? [...state] : [];

            return [
                ...stateCpy,
                newMap,
            ];
        default:
            console.log('Reducer default state reached');
            return {};
    }
};

export { mapsReducer };
