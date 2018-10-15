import { ADD_PLACE, DELETE_PLACE, SELECT_PLACE, DESELECT_PLACE } from '../actions/actionTypes';

const initialState = {
    places: [],
    selectedPlace: null
};

const reducer = (state = initialState, action) => {
    console.log("ACTION TYPE: " + action.type);
    switch (action.type) {
        case ADD_PLACE:
        console.log("ACTION TYPE 1: " + action.type);

            return {
                ...state,
                places: state.places.concat({ 
                    key: action.key,
                    name: action.placeName,
                    image: {
                      uri: "https://cdn.shopify.com/s/files/1/1158/9490/products/C000009037-PAR-ZOOM_0236d34d-459c-4750-8edc-c4686f93d23d_800x.jpg"
                    }
                  })
            };
        case DELETE_PLACE:
            return {
                ...state,
                places: state.places.filter((place, i) => {
                    return place.key !== state.selectedPlace.key;
                }),
                selectedPlace: null
            };
        case SELECT_PLACE:
            return {
                ...state,
                selectedPlace: state.places.find(place => {
                    return place.key === action.placeKey;
                })
            };
        case DESELECT_PLACE:
            return {
                ...state,
                selectedPlace: null
            };
        default:
            return state;
    }
};

export default reducer;