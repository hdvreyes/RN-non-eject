import { Navigation } from "react-native-navigation";
import { Provider } from 'react-redux';
import AuthScreen from './src/screens/Auth/Auth';
import FindPlace from './src/screens/FindPlace/FindPlace';
import SharePlace from './src/screens/SharePlace/SharePlace';
import PlaceDetail from './src/screens/PlaceDetail/PlaceDetail';
import SideDrawer from './src/screens/SideDrawer/SideDrawer';

import configureStore from './src/store/configureStore';
import { SHARE_PLACE, FIND_PLACE, AUTH, PLACE_DETAILS, SIDE_DRAWER } from './src/config/constants';

const store = configureStore();

// import { screens } from './src/config/screens';
// Register screens
Navigation.registerComponent(AUTH, () => AuthScreen, store, Provider);
Navigation.registerComponent(SHARE_PLACE, () => SharePlace, store, Provider);
Navigation.registerComponent(FIND_PLACE, () => FindPlace, store, Provider);
Navigation.registerComponent(PLACE_DETAILS, () => PlaceDetail, store, Provider);
Navigation.registerComponent(SIDE_DRAWER, () => SideDrawer, store, Provider);

// Start App
export default () => Navigation.startSingleScreenApp({
  screen: {
    screen: AUTH,
    title: "Login"
  }
});