import { Navigation } from 'react-native-navigation';
import { SHARE_PLACE, FIND_PLACE, AUTH, SIDE_DRAWER } from '../../config/constants';
import Icon from 'react-native-vector-icons/Ionicons';
const startTabs = () => {
    Promise.all([
        Icon.getImageSource("md-map", 30),
        Icon.getImageSource("md-share-alt", 30),
        Icon.getImageSource("ios-menu", 30)
    ]).then(sources => {
        Navigation.startTabBasedApp({
            tabs: [
                {
                    screen: FIND_PLACE,
                    title: "Find Place",
                    label: "Find Place",
                    icon: sources[0],
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: sources[2],
                                title: "Menu",
                                id: "sideDrawerToggle"
                            }
                        ]
                    }
                },{
                    screen: SHARE_PLACE,
                    title: "Share Place",
                    label: "Share Place",
                    icon: sources[1],
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: sources[2],
                                title: "Menu",
                                id: "sideDrawerToggle"
                            }
                        ]
                    }

                }
            ],
            drawer: { 
                left: {
                    screen: SIDE_DRAWER
                }
            }
        });
    });
};
export default startTabs;