import React from 'react';
import { View, StyleSheet, AsyncStorage, Text, SafeAreaView, Dimensions, Image, Alert } from 'react-native';
import { UserContext } from '../conf/Usercontext';
import { CheckBox, Avatar, Slider, Tooltip, Icon, Button } from 'react-native-elements';
import { GiftedChat } from 'react-native-gifted-chat';
import {Firebase} from '../conf/firebase-api'
import { black } from 'ansi-colors';

const WIDTH = Dimensions.get("screen").width

class VetementScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    messages: [],
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{fontWeight:'600', fontSize:20, marginBottom:20, color:'#2d2727'}}>Carte disponible</Text>
        <View style={{borderColor: 'black', borderRadius:30, width:WIDTH - 30, height:230, backgroundColor:'#3805a8'}}>
          <Image 
            source={require('../assets/images/Logotisseo.png')} 
            style={{height:50, width:120, marginLeft:20, marginTop:20}}/>
          <View style={{flex:1, position: 'absolute', right: 0, bottom:0}}>
            <Text style={{color:'white', fontWeight:'bold', padding:30}}>Camille Raynaud</Text>
          </View>
        </View>
        <View style={{marginTop:10}}>
          <Button 
            title="Ajouté une autre carte"
            buttonStyle={{borderRadius:10, alignItems:'center', backgroundColor:'#15c645'}}
            onPress={() => { 
              Alert.alert(
                'Sorry 😩',
                "Possibiliter non disponible pour l'instant 😕",
                [
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
              )}}
            icon={
              <Icon
                name="ios-add-circle-outline"
                size={30}
                containerStyle={{ marginLeft:5}}
                color="white"
                type='ionicon'
              />
            }/>
        </View>
        <View style={{marginTop:10, alignItems: 'center'}}>
          <Image 
              source={require('../assets/images/icons8-batterie-faible-96.png')} 
              style={{height:100, width:120, marginLeft:20, marginTop:20}}
            />
            <Text style={{fontSize:15, marginTop:5, fontWeight:'500', alignItems: 'center'}}>Niveau de batterie : <Text style={{fontWeight:'bold'}}>25%</Text></Text>
        </View>

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
});


const withUserContext = WrapperComponent => props => {
  return(
  <UserContext.Consumer>
    {ctx => <WrapperComponent {...ctx} {...props} ></WrapperComponent>}
  </UserContext.Consumer>)
}

export default wrapperInUserContext = withUserContext(VetementScreen);