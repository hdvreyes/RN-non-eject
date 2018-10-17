import { name as appName } from "../../app.json";
import AuthScreen from '../screens/Auth/Auth';
import FindPlace from '../screens/FindPlace/FindPlace';
import SharePlace from '../screens/SharePlace/SharePlace';

export const SHARE_PLACE = appName + ".SharePlaceScreen";
export const FIND_PLACE = appName + ".FindPlaceScreen";
export const AUTH = appName + ".AuthScreen";
export const PLACE_DETAILS = appName + ".PlaceDetailScreen";
export const SIDE_DRAWER = appName + ".SideDrawerScreen";

const screens = (screen) => {
    console.log("HERE ==> " + screen);
    switch (screen) {
        case SHARE_PLACE:
            return { SharePlace };
        case FIND_PLACE:
            return { FindPlace };
        case AUTH:
            return { AuthScreen };
        default:
            return { AuthScreen };
    }
};
export default screens;
