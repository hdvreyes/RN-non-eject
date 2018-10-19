import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const defaultInput = (props) => (
    <TextInput 
        underlineColorAndroid="transparent" 
        {...props}
        style={[styles.input, props.style]} 
    />
);
const styles = StyleSheet.create({
    input: {
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderColor: "#eee",
        padding: 5,
        marginTop: 8,
        marginBottom: 8,
        borderRadius: 3,
        textAlign: "center",
        color: "#999"
    }
});
export default defaultInput;