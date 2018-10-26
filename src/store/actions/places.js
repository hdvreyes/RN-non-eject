import { SET_PLACES, DELETE_PLACE } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './index';

export const addPlace = (placeName, location, image) => {
    return dispatch => {
        dispatch(uiStartLoading());
        fetch("https://us-central1-skeleton-dev-27913.cloudfunctions.net/storeImage",{
            method: "POST",
            body: JSON.stringify({
                image: image.base64
            })
        })
        .catch(err => {
            console.log(err);
            dispatch(uiStopLoading());
            alert("Something went wrong!");
        })
        .then(res => res.json())
        .then(parsedRes => {
            const placeData = {
                name: placeName,
                location: location,
                image:parsedRes.imageUrl
            };
            console.log(parsedRes);
            return fetch("https://skeleton-dev-27913.firebaseio.com/places.json", {
                method: "POST",
                body: JSON.stringify(placeData)
            })
        })
        .catch(error => {
            console.log(error);
            dispatch(uiStopLoading());
            alert("Something went wrong!");
        })
        .then(res => res.json())
        .then(parsedRes => {
            console.log(parsedRes);
            dispatch(uiStopLoading());
        });

    };
    
        //     type: ADD_PLACE,
        // placeName: placeName,
        // location: location,
        // image: image

};

export const getPlaces = () => {
    return dispatch => {
        fetch("https://skeleton-dev-27913.firebaseio.com/places.json")
        .catch(error => {
            console.log(error);
            alert("Something went wrong!");
        })
        .then(res => res.json())
        .then(parsedRes => {
            console.log(parsedRes);
            const places = [];
            for (let key in parsedRes) {
                places.push({
                    ...parsedRes[key],
                    image: {
                        uri: parsedRes[key].image
                    },
                    key: key
                });
            }
            dispatch(setPlaces(places));
        });
    }

};

export const setPlaces = (places) => {
    return {
        type: SET_PLACES,
        places: places
    };    
};

export const deletePlace = (key) => {
    console.log("KEY => " + key);

    return dispatch => {
        fetch("https://skeleton-dev-27913.firebaseio.com/places/" + key + ".json", {
            method: "DELETE"
        })
        .catch(error => {
            console.log(error);
            alert("Something went wrong!");
        })
        .then(res => {
            res.json()
            console.log(res.json());
        })
        .then(parsedRes => {
            console.log(parsedRes);

            // const places = [];
            // for (let key in parsedRes) {
            //     places.push({
            //         ...parsedRes[key],
            //         image: {
            //             uri: parsedRes[key].image
            //         },
            //         key: key
            //     });
            // }
             dispatch(removeItem(key));
        });
    }

};

export const removeItem = (key) => {
    return {
        type: DELETE_PLACE,
        placeKey: key
    };
};