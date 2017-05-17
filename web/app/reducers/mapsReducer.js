import * as types from '../actions/types';
import axios from 'axios';

const mapsReducer = (state, action) => {
    switch (action.type) {
        case types.INIT_MAPS:
            console.log('init maps called');
            return {
                ...state,
                maps: action.payload,
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
            // mapsData.push(newMap);
            axios.post('http://localhost:3000/maps/new', newMap)
                .then(function() {
                    console.log('Updated backend with map');
                })
                .catch(function(err) {
                    console.log(err);
                });

            return [
                ...currMaps,
                newMap,
            ];
        default:
            console.log('Reducer default state reached');
            return {};
    }
};

export { mapsReducer };
