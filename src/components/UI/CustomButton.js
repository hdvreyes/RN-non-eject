import React from 'react';
import { TouchableOpacity, TouchableNativeFeedback, Text, View, StyleSheet, Platform } from 'react-native';

const customButton = (props) => {
    const content = (
        <View style={[styles.button, { backgroundColor: props.backgroundColor }]}>
            <Text style={[{color:props.textColor}]}>{props.children}</Text>
        </View>
    );

    if (Platform.OS === 'android') {
        return (<TouchableNativeFeedback onPress={ props.onPress } >
                    {content}
                </TouchableNativeFeedback>);
    }
    return (<TouchableOpacity activeOpacity={0.8} onPress={ props.onPress } >
                {content}
            </TouchableOpacity>);
};

const styles = StyleSheet.create({
    button:{
        padding: 10,
        margin: 5,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: "#eee",
        alignItems: "center"
    }
});

export default customButton;