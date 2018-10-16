import { name as appName } from "../../app.json";
import AuthScreen from '../screens/Auth/Auth';
import FindPlace from '../screens/FindPlace/FindPlace';
import SharePlace from '../screens/SharePlace/SharePlace';

export const SHARE_PLACE = appName + ".SharePlace";
export const FIND_PLACE = appName + ".FindPlace";
export const AUTH = appName + ".Auth";

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
