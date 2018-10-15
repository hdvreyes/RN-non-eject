import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'

import ListItem from '../ListItem/ListItem';

const placeList = (props) => {
    return ( 
        <FlatList style={styles.listContainer}
            data={props.places} 
            renderItem={ (info) => (
                <ListItem placeName={info.item.name} placeImage={info.item.image} onItemPressed={ () => props.onItemSelected(info.item.key) }></ListItem>
            )} />
    );
};
const styles = StyleSheet.create({
    listContainer: {
        width: "100%",
        backgroundColor: "#eee"
    }
});
export default placeList;