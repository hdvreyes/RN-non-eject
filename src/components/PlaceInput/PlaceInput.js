import React, { Component } from 'react'
import { View, TextInput, Button, StyleSheet} from 'react-native';

export default class PlaceInput extends Component {
  state = {
    placeName: ""
  };
  
  placeNameChangedHandler = (val) => {
    console.log("val " + val);
    this.setState({ placeName: val });
  };

  render() {

    return (
      <View style={styles.inputContainer}>
          <TextInput style={ styles.placeInput } placeholder="Place goes here..." value={this.state.placeName} onChangeText={this.placeNameChangedHandler}/>
          <Button style={styles.placeButton} title="Add" onPress={ () => this.props.placeSubmitHandler(this.props.currentCount, this.state.placeName) } />
      </View>
    );

  }
  // const placeInput = (props) => {
  //   const {} = props;
  //   return (
  //         <View style={styles.inputContainer}>
  //             <TextInput style={ styles.placeInput } placeholder="Place goes here..." value={props.placeName} onChangeText={props.placeNameChangedHandler}/>
  //             <Button style={styles.placeButton} title="Add" onPress={ () => props.placeSubmitHandler(props.currentCount++, props.placeName) } />
  //         </View>
  //   );
  
  // };
    
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 50,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 10,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    inputContainer: {
      backgroundColor: '#fff',
      width: "100%",
      alignItems: "center",
      flexDirection: "row",
      paddingBottom: 5,
      justifyContent: "space-between"
    },
    placeInput: {
      width: "80%",
      borderColor: "#eee",
      borderWidth: 1,
      padding: 5,
      height: 40,
    },
    placeButton: {
      width: "20%"
    },
  });