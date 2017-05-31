import * as types from './types';

export function filterTable(filter) {
    return {
        type: types.FILTER,
        filter,
    };
}

export function addMap(newMap) {
    console.log('Action addMap called');
    return {
        type: types.ADD_MAP,
        payload: newMap,
    };
}

export function initMaps(mapsData) {
    console.log('init maps data');
    console.log(mapsData);
    return {
        type: types.INIT_MAPS,
        payload: {
            data: mapsData,
        },
    };
}
