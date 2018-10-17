import React, {Component} from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
// Import Library Icons
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons'
import { deletePlace } from '../../store/actions/index';

class PlaceDetail extends Component {
    placeDeletedHandler = () => {
        this.props.onDeletePlace(this.props.selectedPlace.key);
        this.props.navigator.pop();
    }

    render() {
        return(
            <View style={styles.container} >
                <View>
                    <Image style={styles.placeImage} source={this.props.selectedPlace.image} />
                    <Text style={styles.placeName}>{this.props.selectedPlace.name}</Text>
                </View>
                <View>            
                    <TouchableOpacity style={styles.deleteButton} 
                                      activeOpacity={0.9} 
                                      onPress={this.placeDeletedHandler}>
                        <View>
                            <Icon size={30} name="ios-trash" color="white"/>
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
        
    }

});

const mapDispatchToProps = (dispatch) => {
    return {
        onDeletePlace: (key) => dispatch(deletePlace(key))
    };
}

export default connect(null, mapDispatchToProps) (PlaceDetail);