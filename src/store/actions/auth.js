import { AsyncStorage } from "react-native";
import { TRY_AUTH, AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN } from "./actionTypes";
import { uiStartLoading, uiStopLoading } from "./index";
import startMainTabs from "../../screens/MainTabs/startMainTabs";
import { removeItem } from './places';
import App from "../../../App"
let API_KEY = "AIzaSyCJk1Sla_eX1Nuw5QRkYoOvFkGc3YvpL1U";

export const tryAuth = (authData, authMode) => {
    return dispatch => {
        dispatch(uiStartLoading());
        let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/";
        let urlEndpoint = "verifyPassword";
        if (authMode === "signup") {
            urlEndpoint = "signupNewUser";
        }

        fetch(url + urlEndpoint + "?key=" + API_KEY, {
            method: "POST",
            body: JSON.stringify({
                email: authData.email,
                password: authData.password,
                returnSecureToken: true
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .catch(err => {
            console.log(err);
            alert("Something went wrong!");
            dispatch(uiStopLoading());
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error();
            }
        })
        .then(parsedRes => {
            console.log(parsedRes);
            dispatch(uiStopLoading());
            if (!parsedRes.idToken) {
                alert("Something went wrong! " + parsedRes.error.message);
            } else {
                dispatch(authStoreToken(parsedRes.idToken, parsedRes.expiresIn, parsedRes.refreshToken));
                startMainTabs();                
            }
        });
    };
};

export const authStoreToken = (token, expiresIn, refreshToken) => {
    return dispatch => {
        const now = new Date();
        const expiryDate = now.getTime() + expiresIn * 1000;
        dispatch(authSetToken(token, expiryDate));
        console.log(now, expiryDate);
        AsyncStorage.setItem("com.ae.token", token);
        AsyncStorage.setItem("com.ae.expiryDate", expiryDate.toString());
        AsyncStorage.setItem("com.ae.refreshToken", refreshToken);
    };
};

export const authSetToken = (token, expiryDate) => {
    return {
        type: AUTH_SET_TOKEN,
        token: token,
        expiryDate: expiryDate
    };
};


export const authGetToken = () => {
    return (dispatch, getState) => {
        const promise = new Promise((resolve, reject) => {
            const token = getState().auth.token;
            const expiryDate = getState().auth.expiryDate;
            let asyncToken;
            if (!token || new Date(expiryDate) <= new Date())  {
                AsyncStorage.getItem("com.ae.token")
                            .catch(error => {
                                reject();
                            })
                            .then(authToken => {
                                asyncToken = authToken;
                                if (!authToken) {
                                    reject();
                                    return;
                                }
                                return AsyncStorage.getItem("com.ae.expiryDate");
                            })
                            .then(expiryDate => {
                                const parsedExpiryDate = new Date(parseInt(expiryDate));
                                const now = new Date();
                                if (parsedExpiryDate > now) {
                                    dispatch(authSetToken(asyncToken));
                                    resolve(asyncToken);
                                } else {
                                    reject();
                                }

                            })
                            .catch(error => {
                                reject();
                            });
                
            } else {
                resolve(token);
            }
        });

        return promise
        .catch(error => {
            return AsyncStorage.getItem("com.ae.refreshToken")
            .then(refreshToken => {
                return fetch("https://securetoken.googleapis.com/v1/token?key=" + API_KEY, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: "grant_type=refresh_token&refresh_token=" + refreshToken
                });
            })
            .then(res => res.json())
            .then(parsedRes => {
                if (parsedRes.id_token) {
                    console.log("Refresh token worked!");
                    dispatch(authStoreToken(parsedRes.id_token, parsedRes.expires_in, parsedRes.refresh_token));
                    return parsedRes.refresh_token;
                } else {
                    dispatch(authClearStorage());
                }
            })
            .then(token => {
                if (!token) {
                    throw(new Error());
                } else {
                    return token;
                }
            });

        });
    };
};

export const authAutoSignIn = () => {
    return dispatch => {
        dispatch(authGetToken())
        .then(token => {
            startMainTabs();
        })
        .catch(err => {
            console.log("Failed to fetch token!");
        });
    };
};

export const authClearStorage = () => {
    return dispatch => {
        AsyncStorage.removeItem("com.ae.token");
        AsyncStorage.removeItem("com.ae.expiryDate");
        return AsyncStorage.removeItem("com.ae.refreshToken");
    };
};

export const authLogout = () => {
    return dispatch => {
        dispatch(authClearStorage())
        .then(() => {
            App();
        });
        dispatch(authRemoveToken());
    };
};

export const authRemoveToken = () => {
    return {
        type: AUTH_REMOVE_TOKEN
    };
};