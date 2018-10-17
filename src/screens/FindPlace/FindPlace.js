import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import PlaceList from '../../components/PlaceList/PlaceList';
// import { PLACE_DETAILS } from '../../config/constants';
import { PLACE_DETAILS } from '../../config/constants';

class FindPlaceScreen extends Component {
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    onNavigatorEvent = (event) => {
        console.log(event);
        if (event.type === "NavBarButtonPress") {
            if (event.id === "sideDrawerToggle") {
                this.props.navigator.toggleDrawer({
                    side: "left"
                });
            }
        }
    }

    itemSelectedHandler = (key) => {
        const selPlace = this.props.places.find(place => {
                return place.key == key;
            });
        this.props.navigator.push({
            screen: PLACE_DETAILS,
            title: selPlace.name,
            passProps: {
                selectedPlace: selPlace
            }

        });
    }
    render() {
        return (<View>
            <PlaceList places={this.props.places} onItemSelected={this.itemSelectedHandler}/>
        </View>);
    }
}
const mapStateProps = state => {
    return {
        places: state.places.places
    };
};
export default connect(mapStateProps)(FindPlaceScreen);