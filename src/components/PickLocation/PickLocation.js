import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
class PickLocation extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.placeholder} ><Text>Map 1</Text></View>
                <View style={styles.button}>
                    <Button title="Locate me!"/>
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
    }
});

export default PickLocation;