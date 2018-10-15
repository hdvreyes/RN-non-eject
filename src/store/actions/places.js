import { ADD_PLACE, DELETE_PLACE, SELECT_PLACE, DESELECT_PLACE } from './actionTypes';

export const addPlace = (key, placeName) => {
    console.log("HERE BIY " + key);
    return {
        type: ADD_PLACE,
        key: key,
        placeName: placeName
    };
};

export const deletePlace = () => {
    return {
        type: DELETE_PLACE
    };
};

export const selectPlace = (key) => {
    return {
        type: SELECT_PLACE,
        placeKey: key
    };
};

export const deselectPlace = () => {
    console.log("DESELECT");
    return {
        type: DESELECT_PLACE
    };
};