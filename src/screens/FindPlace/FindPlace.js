import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { connect } from 'react-redux';
import PlaceList from '../../components/PlaceList/PlaceList';
// import { PLACE_DETAILS } from '../../config/constants';
import { PLACE_DETAILS } from '../../config/constants';
// import styles from '../../styles/Styles';
import { getPlaces } from '../../store/actions/index';
class FindPlaceScreen extends Component {
    state = {
        placesLoaded: false,
        removeAnimation: new Animated.Value(1)
    }
    static navigatorStyle = {
        navBarButtonColor: "#888"
    }

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    onNavigatorEvent = (event) => {
        console.log(event);
        if (event.type === "ScreenChangedEvent") {
            if (event.id === "willAppear") {
                this.props.onLoadPlaces();
            }
        }

        if (event.type === "NavBarButtonPress") {
            if (event.id === "sideDrawerToggle") {
                this.props.navigator.toggleDrawer({
                    side: "left"
                });
            }
        }
    }

    placesSearchHandler = () => {
        Animated.timing(this.state.removeAnimation, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
        }).start();

        this.setState(prevState => {
            return {
                ...prevState.removeAnimation,
                placesLoaded: true
            };
        });
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
        let content = (
            <Animated.View style={{ 
                    opacity: this.state.removeAnimation,
                    transform: [
                        {
                            scale: this.state.removeAnimation.interpolate({
                                inputRange: [0, 1],
                                outputRange: [12, 1]
                            })
                        }
                    ]
                }}>
                <TouchableOpacity onPress={this.placesSearchHandler}>
                    <View style={styles.searchButton}>
                        <Text style={styles.searchButtonText}>Find Places</Text>
                    </View>
                </TouchableOpacity>
                
            </Animated.View>
        );

        if (this.state.placesLoaded) {
            content = (<PlaceList places={this.props.places} onItemSelected={this.itemSelectedHandler}/>);
        }

        return (<View style={this.state.placesLoaded ? null : styles.buttonContainer }>{content}</View>);
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    searchButton: {
        borderColor: "orange",
        borderWidth: 3,
        borderRadius: 50,
        padding: 20
    },
    searchButtonText: {
        color: "orange",
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center"
    }
});

const mapStateProps = state => {
    return {
        places: state.places.places
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoadPlaces: () => dispatch(getPlaces())
    };
};

export default connect(mapStateProps, mapDispatchToProps)(FindPlaceScreen);