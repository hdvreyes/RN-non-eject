import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

import Styles from '../../styles/Styles';
import styles from '../../styles/Styles';

const listItem = (props) => (
    <TouchableOpacity activeOpacity={0.7} onPress={props.onItemPressed}>
        <View style={Styles.listItem}>
            <Image resizeMode="contain" source={props.placeImage} style={styles.placeImage} />
            <Text>{props.placeName}</Text>
        </View>
    </TouchableOpacity>
);


export default listItem;