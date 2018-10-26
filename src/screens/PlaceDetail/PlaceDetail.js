import React, {Component} from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, Platform, Dimensions, ScrollView } from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons'
import { deletePlace } from '../../store/actions/index';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps

class PlaceDetail extends Component {
    placeDeletedHandler = () => {
        this.props.onDeletePlace(this.props.selectedPlace.key);
        this.props.navigator.pop();
    }

    render() {
        let marker = null;
        let location = null;
        if (this.props.selectedPlace.location) {
            location = {
                ...this.props.selectedPlace.location,
                latitudeDelta: 0.0122,
                longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.0122
            };
            marker = <MapView.Marker coordinate={location} />
        }



        return(
            <View style={styles.container} >
                <View>
                    <Image style={styles.placeImage} source={this.props.selectedPlace.image} />
                    <MapView
                        style={styles.map}
                        provider={PROVIDER_GOOGLE}
                        initialRegion={location}>
                            {marker}
                    </MapView>
                    <Text style={styles.placeName}>{this.props.selectedPlace.name}</Text>
                </View>
                <View>
                    <TouchableOpacity style={styles.deleteButton} 
                                      activeOpacity={0.9} 
                                      onPress={this.placeDeletedHandler}>
                        <View>
                            <Icon size={30} name={ Platform.OS === 'android' ? "md-trash" : "ios-trash"} color="white"/>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );

    }    
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
    },
    placeImage: {
        width: "100%",
        height: 200,
        marginBottom: 10
    },
    placeName: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 18
    },
    deleteButton: {
        backgroundColor: "red",
        marginBottom: 10,
        alignItems: "center",
        padding: 5
        
    },
    map: {
        width: "100%",
        height: 200
    },

});

const mapDispatchToProps = (dispatch) => {
    return {
        onDeletePlace: (key) => dispatch(deletePlace(key))
    };
}

export default connect(null, mapDispatchToProps) (PlaceDetail);