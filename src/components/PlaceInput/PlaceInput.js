import React, { Component } from 'react'
import { View, TextInput, Button, StyleSheet} from 'react-native';
import DefaultInput from '../UI/DefaultInput';

const placeInput = (props) => (
  <DefaultInput placeholder="Place name" 
    value={props.placeName} 
    onChangeText={props.onChangeText} />
);

export default placeInput;
