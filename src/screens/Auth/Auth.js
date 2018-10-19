
import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import startMainTabs from '../MainTabs/startMainTabs';
import DefaultInput from '../../components/UI/DefaultInput';
import HeadingText from '../../components/UI/HeadingText';
import MainText from '../../components/UI/MainText';
import backgroundImage from '../../assets/sunset.png';
import CustomButton from '../../components/UI/CustomButton';

class AuthScreen extends Component {
    state = {
        viewMode: Dimensions.get('window').height > 500 ? "portrait" : "landscape"
    };

    constructor(props) {
        super(props);
        Dimensions.addEventListener("change", this.updateStyles);
    }
    
    componentWillUnmount() {
        Dimensions.removeEventListener("change", this.updateStyles)
    }

    updateStyles = (dims) => {
        this.setState({
            viewMode: dims.window.height > 500 ? "portrait" : "landscape"
        });
    }

    loginHandler = () => {
        startMainTabs();
    }

    render() {
        let headingText = null;
        if (this.state.viewMode === "portrait") {
            headingText = (<MainText>
                            <HeadingText>Please Log In</HeadingText>
                        </MainText>);
        }

        return (
                <ImageBackground source={backgroundImage} style={styles.imageBackground}>
                    <View style={styles.container}>

                        {headingText}

                        <CustomButton backgroundColor="#29aaf4" textColor="#fff" onPress={ () => alert("Hello") }>Switch to login</CustomButton>
                        <View style={styles.inputContainer}>

                            <DefaultInput placeholder="Your E-mail address" style={styles.input} />
                            <View style={
                                    this.state.viewMode === "portrait" ? styles.portraitPasswordContainer : styles.landscapePasswordContainer                                
                                }>
                                <View style={
                                    this.state.viewMode === "portrait" ? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper    
                                }>
                                    <DefaultInput placeholder="Password" style={styles.input} />
                                </View>
                                <View style={
                                    this.state.viewMode === "portrait" ? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper    
                                }>
                                    <DefaultInput placeholder="Confirm password" style={styles.input} />
                                </View>

                            </View>

                        </View>
                        <CustomButton backgroundColor="#29aaf4" textColor="#fff" onPress={this.loginHandler}>Submit</CustomButton>
                    </View>
                </ImageBackground>
            );
    }

}

const styles = StyleSheet.create({
    container: {
       flex: 1,
       justifyContent: "center",
       alignItems: "center"
    },
    inputContainer:{
        width: "80%"
    },
    imageBackground: {
        width: "100%",
        flex: 1
    },
    input: {
        backgroundColor: "#eee",
        borderColor: "#bbb"
    },
    landscapePasswordContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    portraitPasswordContainer: {
        flexDirection: "column",
        justifyContent: "flex-start"
    },
    landscapePasswordWrapper: {
        width: "45%"
    },
    portraitPasswordWrapper: {
        width: "100%"
    }

});

export default AuthScreen;