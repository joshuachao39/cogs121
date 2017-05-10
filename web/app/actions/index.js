import * as types from './types';

export function filterTable(filter) {
    return {
        type: types.FILTER,
        filter,
    };
}

/**
 * Action dispatcher for updating current borders
 * in the map creation process
 */
export function updateMapBorders(borders) {
    return {
        type: types.UPDATE_MAP_BORDERS,
        borders,
    };
}

/**
 * Action dispatcher for updating the current
 * points of interest in map creation process
 */
export function updateMapPoints(points) {
    return {
        type: types.UPDATE_MAP_POINTS,
        points,
    };
}

/**
 * Action dispatcher for initializing the map
 * creation process
 */
export function initMap(name, description) {
    return {
        type: types.INIT_MAP,
        name,
        description,
    };
}

/**
 * Action dispatcher for submitting the map
 */
export function submitMap() {
    return {
        type: types.SUBMIT_MAP,
    }
}


