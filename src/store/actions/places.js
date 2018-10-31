import { SET_PLACES, DELETE_PLACE } from './actionTypes';
import { uiStartLoading, uiStopLoading, authGetToken } from './index';

export const addPlace = (placeName, location, image) => {
    return dispatch => {
        let authToken;
        dispatch(uiStartLoading());
        dispatch(authGetToken())
            .catch(() => {
                alert("No token found!");
            })
            .then(token => {
                authToken = token
                return fetch("https://us-central1-skeleton-dev-27913.cloudfunctions.net/storeImage",{
                    method: "POST",
                    body: JSON.stringify({
                        image: image.base64
                    }),
                    headers: {
                        "Authorization" : "Bearer " + authToken
                    }
                })
            })
            .catch(err => {
                console.log(err);
                dispatch(uiStopLoading());
                alert("Something went wrong!");
            })
            .then(res => res.json())
            .then(parsedRes => {
                if (parsedRes.error) {
                    alert(parsedRes.error + " - ");
                }
                const placeData = {
                    name: placeName,
                    location: location,
                    image:parsedRes.imageUrl
                };
                console.log(parsedRes);
                return fetch("https://skeleton-dev-27913.firebaseio.com/places.json?auth=" + authToken, {
                    method: "POST",
                    body: JSON.stringify(placeData)
                })
            })
            .then(res => res.json())
            .then(parsedRes => {
                console.log(parsedRes);
                dispatch(uiStopLoading());

                if (parsedRes.error) {
                    alert(parsedRes.error + " -- ");
                }
            })
            .catch(error => {
                console.log(error);
                dispatch(uiStopLoading());
                alert("Something went wrong!");
            });


    };
    
        //     type: ADD_PLACE,
        // placeName: placeName,
        // location: location,
        // image: image

};

export const getPlaces = () => {
    return dispatch => {
        dispatch(authGetToken())
            .then(token => {
                return fetch("https://skeleton-dev-27913.firebaseio.com/places.json?auth=" + token)
            })
            .catch(() => {
                alert("No valid token");
            })
            .then(res => res.json())
            .then(parsedRes => {
                console.log("1 ----->");
                console.log(parsedRes);
                if (parsedRes.error) {
                    alert(parsedRes.error);
                }
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
            })
            .catch(error => {
                console.log("1 ----->");
                console.log(error);
                alert("Something went wrong!");
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
        dispatch(authGetToken())
            .catch(() => {
                alert("No token found!");
            })
            .then(token => {
                return fetch("https://skeleton-dev-27913.firebaseio.com/places/" + key + ".json?auth=" + token, {
                    method: "DELETE"
                })
            })
            .then(res => {
                res.json()
                console.log(res.json());
            })
            .then(parsedRes => {
                console.log(parsedRes);
                dispatch(removeItem(key));
            })
            .catch(error => {
                console.log(error);
                alert("Something went wrong!");
            });
        
    }

};

export const removeItem = (key) => {
    return {
        type: DELETE_PLACE,
        placeKey: key
    };
};