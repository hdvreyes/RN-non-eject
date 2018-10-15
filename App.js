import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import PlaceInput from './src/components/PlaceInput/PlaceInput';
import PlaceList from './src/components/PlaceList/PlaceList';
import placeImage from './src/assets/saitama.jpg';
import PlaceDetail from './src/components/PlaceDetail/PlaceDetail';
// import { selectPlace } from './src/store/actions';
import { addPlace, deletePlace, selectPlace, deselectPlace } from './src/store/actions/index';

class App extends React.Component {

  placeNameChangedHandler = (val) => {
    console.log(val);
    this.setState({ placeName: val });
  };
  
  placeSubmitHandler = (index, placeName) => {
    console.log("HELLO " + index);
    this.props.onAddPlace(index, placeName);
  };

  placeSelectedHandler = (index) => {
    this.props.onSelectPlace(index)
    // this.setState(prev => {
    //   return {
    //     selectedPlace: prev.places.find(place => {
    //       return place.key === index;
    //     })
    //   };
    // });
  };

  placeDeletedHandler = () => {
    this.props.onDeletePlace()
    // this.setState(prev => {
    //   return { 
    //     places: prev.places.filter((place, i) => {
    //       return place.key !== prev.selectedPlace.key;
    //     }),
    //     selectedPlace: null
    //   };
    // });
  }
  
  modalClosedHandler = () => {
    console.log("CLOSE");
    this.props.onDeselectPlace()
    // this.setState({
    //   selectedPlace: null
    // });
  };

  render() {

    console.log('all star hey');
    return (
      <View style={styles.container}>
        <PlaceDetail selectedPlace={this.props.selectedPlace} 
                     onItemDeleted={this.placeDeletedHandler} 
                     onModalClosed={this.modalClosedHandler} />
        <PlaceInput placeName={this.props.placeName} placeSubmitHandler={this.placeSubmitHandler} currentCount={this.props.places.length}></PlaceInput>
        <PlaceList places={this.props.places} onItemSelected={ this.placeSelectedHandler }></PlaceList>
      </View>
    );
  }
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

});

const mapStateToProps = state => {
  return {
    places: state.places.places,
    selectedPlace: state.places.selectedPlace
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (key, name) => dispatch(addPlace(key, name)),
    onDeletePlace: () => dispatch(deletePlace()),
    onSelectPlace: (key) => dispatch(selectPlace(key)),
    onDeselectPlace: () => dispatch(deselectPlace())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);