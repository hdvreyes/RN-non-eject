import { Navigation } from "react-native-navigation";

import AuthScreen from './src/screens/Auth/Auth';
import FindPlace from './src/screens/FindPlace/FindPlace';
import SharePlace from './src/screens/SharePlace/SharePlace';

import { SHARE_PLACE, FIND_PLACE, AUTH } from './src/config/constants';

// import { screens } from './src/config/screens';
// Register screens
Navigation.registerComponent(AUTH, () => AuthScreen);
Navigation.registerComponent(SHARE_PLACE, () => SharePlace);
Navigation.registerComponent(FIND_PLACE, () => FindPlace);

// Start App
Navigation.startSingleScreenApp({
  screen: {
    screen: AUTH,
    title: "Login"
  }
});