import { SET_PLACES, DELETE_PLACE } from '../actions/actionTypes';

const initialState = {
    places: []
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
        default:
            return state;
    }
};

export default reducer;