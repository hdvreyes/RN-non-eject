import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps

class PickLocation extends Component {
    
    componentWillMount() {
        this.reset();
    }

    reset = () => {
        this.setState({
            focusedLocation: {
                        latitude: 37.7900352,
                        longitude: -122.4013726,
                        latitudeDelta: 0.0122,
                        longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.0122
                    },
            locationChosen: false
        });
    }

    pickLocationHandler = (event) => {
        const coords = event.nativeEvent.coordinate;
        this.map.animateToRegion({
            ...this.state.focusedLocation,
            latitude: coords.latitude,
            longitude: coords.longitude
        });
        this.setState(prevState => {
            return {
                focusedLocation: {
                    ...prevState.focusedLocation,
                    latitude: coords.latitude,
                    longitude: coords.longitude
                },
                locationChosen: true
            };
        });
        this.props.onLocationPick({
            latitude: coords.latitude,
            longitude: coords.longitude
        });
    };

    getLocationHandler = () => {
        navigator.geolocation.getCurrentPosition(pos => {
            const nativeEvent = {
                nativeEvent: {
                    coordinate: {
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude
                    }
                }
            };
            this.pickLocationHandler(nativeEvent);

        }, error => {
            console.log(error);
            alert("Error ->" + error)
        });
    }

    render() {
        let marker = null
        if (this.state.locationChosen) {
            marker = <MapView.Marker coordinate={this.state.focusedLocation} />
        }
        return (
            <View style={styles.container}>
                <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                initialRegion={this.state.focusedLocation}
                region={!this.state.locationChosen ? this.state.focusedLocation : null}
                onPress={this.pickLocationHandler}
                ref={ref => this.map = ref}>{marker}</MapView>
                <View style={styles.button}>
                    <Button title="Locate me!" onPress={this.getLocationHandler}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        width: "100%"
    },
    map: {
        width: "100%",
        height: 250
    },
    button: {
        margin: 10
    }
});

export default PickLocation;