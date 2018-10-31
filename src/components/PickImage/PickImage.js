import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import imagePlaceholder from '../../assets/sunset.png';
import ImagePicker from 'react-native-image-picker';
// import PickImage from './PickImage';

class PickImage extends Component {
    state = {
        pickedImage: null
    }

    reset = () => {
        console.log("RESET AGAIN!!!");
        this.setState({
            pickedImage: null
        });
    }

    pickImageHandler = () => {
            // More info on all the options is below in the API Reference... just some common use cases shown here
            const options = {
            title: 'Select Image',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            maxWidth: 100,
            maxHeight: 100
        };

        /**
        * The first arg is the options object for customization (it can also be null or omitted for default options),
        * The second arg is the callback which sends object: response (more info in the API Reference)
        */
        ImagePicker.showImagePicker({title: "Image", maxWidth: 800, maxHeight: 600}, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState({
                    pickedImage: {
                        uri: response.uri
                    }
                });
                this.props.onImagePicked({uri: response.uri, base64: response.data});
            }
        });
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.placeholder} >
                    <Image source={this.state.pickedImage} style={styles.previewImage}/>
                </View>
                <View style={styles.button}>
                    <Button title="Pick Image" onPress={this.pickImageHandler} />
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