import { SET_PLACES, DELETE_PLACE, PLACE_ADDED, START_ADD_PLACE } from '../actions/actionTypes';
import { placeAdded } from '../actions/places';

const initialState = {
    places: [],
    placeAdded: false
};

const reducer = (state = initialState, action) => {
    console.log("ACTION TYPE: " + action.type);
    switch (action.type) {
        case SET_PLACES:
            return {
                ...state,
                places: action.places
            };
        case DELETE_PLACE:
            console.log("KEY 222 => " + action.placeKey);
            return {
                ...state,
                places: state.places.filter((place, i) => {
                    return place.key !== action.placeKey;
                }),
                selectedPlace: null
            };
        case PLACE_ADDED:
            return {
                ...state,
                placeAdded: true
            };
        case START_ADD_PLACE:
            return {
                ...state,
                placeAdded: false
            };
        default:
            return state;
    }
};

export default reducer;