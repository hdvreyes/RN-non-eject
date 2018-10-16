import { Navigation } from 'react-native-navigation';
import { SHARE_PLACE, FIND_PLACE, AUTH } from '../../config/constants';
import Icon from 'react-native-vector-icons/Ionicons';
const startTabs = () => {
    Promise.all([
        Icon.getImageSource("md-map", 30),
        Icon.getImageSource("md-share-alt", 30)
    ]).then(sources => {
        Navigation.startTabBasedApp({
            tabs: [
                {
                    screen: FIND_PLACE,
                    title: "Find Place",
                    label: "Find Place",
                    icon: sources[0]
                },{
                    screen: SHARE_PLACE,
                    title: "Share Place",
                    label: "Share Place",
                    icon: sources[1]
                }
            ]
        });
    });
};
export default startTabs;