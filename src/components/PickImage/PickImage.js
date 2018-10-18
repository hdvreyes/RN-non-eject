import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import imagePlaceholder from '../../assets/sunset.png';
class PickImage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.placeholder} >
                    <Image source={imagePlaceholder} style={styles.previewImage}/>
                </View>
                <View style={styles.button}>
                    <Button title="Pick Image" />
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
    },
    previewImage: {
        width: "100%",
        height: "100%"
    }
});

export default PickImage;