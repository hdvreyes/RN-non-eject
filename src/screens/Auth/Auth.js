
import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ImageBackground } from 'react-native';
import startMainTabs from '../MainTabs/startMainTabs';
import DefaultInput from '../../components/UI/DefaultInput';
import HeadingText from '../../components/UI/HeadingText';
import MainText from '../../components/UI/MainText';
import backgroundImage from '../../assets/sunset.png';
import CustomButton from '../../components/UI/CustomButton';

class AuthScreen extends Component {
    
    loginHandler = () => {
        startMainTabs();
    }

    render() {
        return (
                <ImageBackground source={backgroundImage} style={styles.imageBackground}>
                    <View style={styles.container}>
                        <MainText>
                            <HeadingText>Please Log In</HeadingText>
                        </MainText>
                        <CustomButton backgroundColor="#29aaf4" textColor="#fff" onPress={ () => alert("Hello") }>Switch to login</CustomButton>
                        <View style={styles.inputContainer}>
                            <DefaultInput placeholder="Your E-mail address" style={styles.input} />
                            <DefaultInput placeholder="Password" style={styles.input} />
                            <DefaultInput placeholder="Confirm password" style={styles.input} />
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
    }
});

export default AuthScreen;