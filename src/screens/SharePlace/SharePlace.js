import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';
import { addPlace } from '../../store/actions/index';
import MainText from '../../components/UI/MainText';
import HeadingText from '../../components/UI/HeadingText';
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation';
class SharePlaceScreen extends Component {
    state = {
        placeName: ""
    };

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }
    
    placeNameChangedHandler = (val) => {
        this.setState({ placeName: val });
    };

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

    placeAddedHandler = () => {
        if (this.state.placeName.trim() !== "") { 
            this.props.onAddPlace(this.state.placeName);
       }
    }
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <MainText><HeadingText>Share a place with us!</HeadingText></MainText>
                    <PickImage />
                    <PickLocation />
                    <PlaceInput placeName={this.state.placeName} 
                                onChangeText={this.placeNameChangedHandler}/>
                    <View style={styles.button}>
                        <Button title="Share the place!" onPress={this.placeAddedHandler} />
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },
    placeholder: {
        borderWidth: 1,
        borderColor: "#bbb",
        backgroundColor: "#eee",
        borderRadius: 2,
        width: "80%",
        height: 150
    },
    button: {
        margin: 10
    },
    previewImage: {
        width: "100%",
        height: "100%"
    }
});

const mapDispatchToProps = dispatch => {
    return { 
        onAddPlace: (placeName) => dispatch(addPlace(placeName))
    };
};

export default connect(null, mapDispatchToProps)(SharePlaceScreen);