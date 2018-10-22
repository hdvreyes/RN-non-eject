
import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { connect } from 'react-redux';

import startMainTabs from '../MainTabs/startMainTabs';
import DefaultInput from '../../components/UI/DefaultInput';
import HeadingText from '../../components/UI/HeadingText';
import MainText from '../../components/UI/MainText';
import backgroundImage from '../../assets/sunset.png';
import CustomButton from '../../components/UI/CustomButton';
import validate from '../../utility/validation';
import configureStore from '../../store/configureStore';

import { tryAuth } from '../../store/actions/index';

class AuthScreen extends Component {
    state = {
        viewMode: Dimensions.get('window').height > 500 ? "portrait" : "landscape",
        controls: {
            email: {
                value: "",
                valid: false,
                validationRules: {
                    isEmail: true
                },
                touched: false
            },
            password: {
                value: "",
                valid: false,
                validationRules: {
                    minLength: 6
                },
                touched: false
            },
            confirmPassword: {
                value: "",
                valid: false,
                validationRules: {
                    equalTo: 'password'
                },
                touched: false
            }
        }

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
        const authData = {
            email: this.state.controls.email.value,
            password: this.state.controls.password.value
        };
        this.props.onLogin(authData);
        startMainTabs();
    }

    updateInputState = (key, value) => {
        let connectedValue = {};
        if (this.state.controls[key].validationRules.equalTo) {
            const equalControl = this.state.controls[key].validationRules.equalTo;
            const equalValue = this.state.controls[equalControl].value;
            connectedValue = {
                ...connectedValue,
                equalTo: equalValue
            };
        }

        if (key == 'password') {
            connectedValue = {
                ...connectedValue,
                equalTo: value
            };
        }
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    confirmPassword: {
                        ...prevState.controls.confirmPassword,
                        valid:
                            key === 'password' ? 
                            validate(prevState.controls.confirmPassword.value,
                            prevState.controls.confirmPassword.validationRules,
                            connectedValue) : 
                            prevState.controls.confirmPassword.valid
                    },
                    [key]: {
                        ...prevState.controls[key],
                        value: value,
                        valid: validate(value, prevState.controls[key].validationRules, connectedValue),
                        touched: true
                    }
                }
            };
        });    
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

                            <DefaultInput 
                                placeholder="Your E-mail address" 
                                style={styles.input} 
                                value={ this.state.controls.email.value }
                                onChangeText={ (val) => this.updateInputState('email', val) }
                                valid={this.state.controls.email.valid}
                                touched={this.state.controls.email.touched}
                                />
                            <View style={
                                    this.state.viewMode === "portrait" ? styles.portraitPasswordContainer : styles.landscapePasswordContainer                                
                                }>
                                <View style={
                                    this.state.viewMode === "portrait" ? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper    
                                }>
                                    <DefaultInput 
                                        placeholder="Password" 
                                        style={styles.input} 
                                        value={this.state.controls.password.value}
                                        onChangeText={(val) => this.updateInputState('password', val)}
                                        valid={this.state.controls.password.valid}
                                        touched={this.state.controls.password.touched}
                                        />
                                </View>
                                <View style={
                                    this.state.viewMode === "portrait" ? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper    
                                }>
                                    <DefaultInput 
                                        placeholder="Confirm password" 
                                        style={styles.input} 
                                        value={this.state.controls.confirmPassword.value}
                                        onChangeText={(val) => this.updateInputState('confirmPassword', val)}
                                        valid={this.state.controls.confirmPassword.valid}
                                        touched={this.state.controls.confirmPassword.touched}
                                        />
                                </View>

                            </View>

                        </View>
                        <CustomButton 
                            backgroundColor="#29aaf4" 
                            textColor="#fff" 
                            onPress={this.loginHandler}
                            disabled={
                                !this.state.controls.email.valid ||
                                !this.state.controls.password.valid ||
                                !this.state.controls.confirmPassword.valid }
                            >
                            Submit
                            </CustomButton>
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

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (authData) => dispatch(tryAuth(authData))
    };
};

export default connect(null, mapDispatchToProps)(AuthScreen);