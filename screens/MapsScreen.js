import React, { Component } from 'react';
import { MapView, Constants, Location, Permissions } from 'expo';
import { UserContext } from '../conf/Usercontext';
import { Icon, Input } from 'react-native-elements'
import firebase from '../conf/firebase-api'
import {db} from '../conf/firebase-api'
import { 
  Text, 
  StyleSheet, 
  View, 
  FlatList, 
  Dimensions, 
  TouchableOpacity, 
  TouchableWithoutFeedback, 
  TextInput, 
  ActivityIndicator } from 'react-native';
//import MapView from 'react-native-maps';
import Modal from 'react-native-modal';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

import * as theme from '../theme';

const { Marker } = MapView;
const { height, width } = Dimensions.get('screen');
const parkingsSpots = [
  {
    apiKey: "AIzaSyAkYYqau2JlUUdLKvLc_9G3XCzlaY4_wlw",
    appName: "[DEFAULT]",
    authDomain: "hyce-234514.firebaseapp.com",
    createdAt: "1557400548566",
    displayName: "Pierre Ousset",
    email: "pierre.rugby1@hotmail.fr",
    emailVerified: false,
    isAnonymous: false,
    lastLoginAt: "1557475649108",
    phoneNumber: null,
    photoURL: "https://graph.facebook.com/2158737017554380/picture",
    providerData: [{
        displayName: "Pierre Ousset",
        email: "pierre.rugby1@hotmail.fr",
        phoneNumber: null,
        photoURL: "https://graph.facebook.com/2158737017554380/picture",
        providerId: "facebook.com",
        uid: "2158737017554380",
      },
    ],
    redirectEventId: null,
    stsTokenManager: {
      accessToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjYxZDE5OWRkZDBlZTVlNzMzZGI0YTliN2FiNDAxZGRhMzgxNTliNjIiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiUGllcnJlIE91c3NldCIsInBpY3R1cmUiOiJodHRwczovL2dyYXBoLmZhY2Vib29rLmNvbS8yMTU4NzM3MDE3NTU0MzgwL3BpY3R1cmUiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vaHljZS0yMzQ1MTQiLCJhdWQiOiJoeWNlLTIzNDUxNCIsImF1dGhfdGltZSI6MTU1NzQ3NTczNywidXNlcl9pZCI6IjJaMFBtamh0cXljWlBDYzRSN0hoVk1POHE5eDIiLCJzdWIiOiIyWjBQbWpodHF5Y1pQQ2M0UjdIaFZNTzhxOXgyIiwiaWF0IjoxNTU3NDk2ODQ5LCJleHAiOjE1NTc1MDA0NDksImVtYWlsIjoicGllcnJlLnJ1Z2J5MUBob3RtYWlsLmZyIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImZhY2Vib29rLmNvbSI6WyIyMTU4NzM3MDE3NTU0MzgwIl0sImVtYWlsIjpbInBpZXJyZS5ydWdieTFAaG90bWFpbC5mciJdfSwic2lnbl9pbl9wcm92aWRlciI6ImZhY2Vib29rLmNvbSJ9fQ.o8UHLt-IJl-jz9kxXOW5Iva-F1O6PmqxY0XkkCjVJiTlQMc32T5_drVQfrOP3aHBvNjXm2AfPaQbyek0l2thXAp6GwuFVQTXXglxgJZscEkhGD0Hu_Lx6rF3HTpZM_n5OftqT62wgyWL8LjXnIk7Py7rYKohXJTkIit172m8pbD27zL0TyDyLqzZZ-aABIE6NXf3YDImgRs0LLakmS_0iQ3RuKDXypaKcSuzm0WXlN4pZOKet1T6j602fC5EjsdDR7O7kbPVc5Zf9jHeUNGqkRbjkOOkCMlp5HuCucCwZhf2ay4s6w0mBupJ8Pf4vzJVPbWZOH8Di3tKW4n6qcizdQ",
      apiKey: "AIzaSyAkYYqau2JlUUdLKvLc_9G3XCzlaY4_wlw",
      expirationTime: 1557500445230,
      refreshToken: "AEu4IL3CoFXPU6B-5nXBg20p7xbnfsbr9ZGYeeNCaGWeOYMQzSNOFXzu3lZU2FhVTwt4jLx6EhTdFXBzx-QA8QOY47vhwZ2ZWt3dCMOTydw4J9oHKXnrYjMjRs1xZi_9VT3Jn7JwqerHGrk4ce-jnJhez6K_S81ykK_aeu02lhXyMd3i9ShSpHHod5XHKQgP8UqULEhRdUUhgXXFKylSiF6R2knQB3Lm9cu_b1Q7HJOZ5GrSb17MPhAASSSd-oJWB24iSa0cyZigcEmgW__rfHCtBF6ZhIYKwpxJghA02FGc5soKbyusFxU",
    },
    uid: "2Z0PmjhtqycZPCc4R7HhVMO8q9x2",
    id: 1,
    coordinate: {
      latitude: 43.625007,
      longitude: 1.4320661,
    },
  },
  {
    apiKey: "AIzaSyAkYYqau2JlUUdLKvLc_9G3XCzlaY4_wlw",
    appName: "[DEFAULT]",
    authDomain: "hyce-234514.firebaseapp.com",
    createdAt: "1557400548566",
    displayName: "David",
    email: "david@hotmail.fr",
    emailVerified: false,
    isAnonymous: false,
    lastLoginAt: "1557475649108",
    phoneNumber: null,
    photoURL: "https://graph.facebook.com/2158737017554380/picture",
    redirectEventId: null,
    stsTokenManager: {
      accessToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjYxZDE5OWRkZDBlZTVlNzMzZGI0YTliN2FiNDAxZGRhMzgxNTliNjIiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiUGllcnJlIE91c3NldCIsInBpY3R1cmUiOiJodHRwczovL2dyYXBoLmZhY2Vib29rLmNvbS8yMTU4NzM3MDE3NTU0MzgwL3BpY3R1cmUiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vaHljZS0yMzQ1MTQiLCJhdWQiOiJoeWNlLTIzNDUxNCIsImF1dGhfdGltZSI6MTU1NzQ3NTczNywidXNlcl9pZCI6IjJaMFBtamh0cXljWlBDYzRSN0hoVk1POHE5eDIiLCJzdWIiOiIyWjBQbWpodHF5Y1pQQ2M0UjdIaFZNTzhxOXgyIiwiaWF0IjoxNTU3NDk2ODQ5LCJleHAiOjE1NTc1MDA0NDksImVtYWlsIjoicGllcnJlLnJ1Z2J5MUBob3RtYWlsLmZyIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImZhY2Vib29rLmNvbSI6WyIyMTU4NzM3MDE3NTU0MzgwIl0sImVtYWlsIjpbInBpZXJyZS5ydWdieTFAaG90bWFpbC5mciJdfSwic2lnbl9pbl9wcm92aWRlciI6ImZhY2Vib29rLmNvbSJ9fQ.o8UHLt-IJl-jz9kxXOW5Iva-F1O6PmqxY0XkkCjVJiTlQMc32T5_drVQfrOP3aHBvNjXm2AfPaQbyek0l2thXAp6GwuFVQTXXglxgJZscEkhGD0Hu_Lx6rF3HTpZM_n5OftqT62wgyWL8LjXnIk7Py7rYKohXJTkIit172m8pbD27zL0TyDyLqzZZ-aABIE6NXf3YDImgRs0LLakmS_0iQ3RuKDXypaKcSuzm0WXlN4pZOKet1T6j602fC5EjsdDR7O7kbPVc5Zf9jHeUNGqkRbjkOOkCMlp5HuCucCwZhf2ay4s6w0mBupJ8Pf4vzJVPbWZOH8Di3tKW4n6qcizdQ",
      apiKey: "AIzaSyAkYYqau2JlUUdLKvLc_9G3XCzlaY4_wlw",
      expirationTime: 1557500445230,
      refreshToken: "AEu4IL3CoFXPU6B-5nXBg20p7xbnfsbr9ZGYeeNCaGWeOYMQzSNOFXzu3lZU2FhVTwt4jLx6EhTdFXBzx-QA8QOY47vhwZ2ZWt3dCMOTydw4J9oHKXnrYjMjRs1xZi_9VT3Jn7JwqerHGrk4ce-jnJhez6K_S81ykK_aeu02lhXyMd3i9ShSpHHod5XHKQgP8UqULEhRdUUhgXXFKylSiF6R2knQB3Lm9cu_b1Q7HJOZ5GrSb17MPhAASSSd-oJWB24iSa0cyZigcEmgW__rfHCtBF6ZhIYKwpxJghA02FGc5soKbyusFxU",
    },
    uid: "2Z0PmjhtqycZPCc4R7HhVMO8q9x3",
    id: 2,
    coordinate: {
      latitude: 43.60424440822793,
      longitude: 1.446293966773169,
    },
  },
  {
    apiKey: "AIzaSyAkYYqau2JlUUdLKvLc_9G3XCzlaY4_wlw",
    appName: "[DEFAULT]",
    authDomain: "hyce-234514.firebaseapp.com",
    createdAt: "1557400548566",
    displayName: "Camille Raynaud",
    email: "Camille.Raynaud@hotmail.fr",
    emailVerified: false,
    isAnonymous: false,
    lastLoginAt: "1557475649108",
    phoneNumber: null,
    photoURL: "https://graph.facebook.com/2158737017554380/picture",
    redirectEventId: null,
    stsTokenManager: {
      accessToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjYxZDE5OWRkZDBlZTVlNzMzZGI0YTliN2FiNDAxZGRhMzgxNTliNjIiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiUGllcnJlIE91c3NldCIsInBpY3R1cmUiOiJodHRwczovL2dyYXBoLmZhY2Vib29rLmNvbS8yMTU4NzM3MDE3NTU0MzgwL3BpY3R1cmUiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vaHljZS0yMzQ1MTQiLCJhdWQiOiJoeWNlLTIzNDUxNCIsImF1dGhfdGltZSI6MTU1NzQ3NTczNywidXNlcl9pZCI6IjJaMFBtamh0cXljWlBDYzRSN0hoVk1POHE5eDIiLCJzdWIiOiIyWjBQbWpodHF5Y1pQQ2M0UjdIaFZNTzhxOXgyIiwiaWF0IjoxNTU3NDk2ODQ5LCJleHAiOjE1NTc1MDA0NDksImVtYWlsIjoicGllcnJlLnJ1Z2J5MUBob3RtYWlsLmZyIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImZhY2Vib29rLmNvbSI6WyIyMTU4NzM3MDE3NTU0MzgwIl0sImVtYWlsIjpbInBpZXJyZS5ydWdieTFAaG90bWFpbC5mciJdfSwic2lnbl9pbl9wcm92aWRlciI6ImZhY2Vib29rLmNvbSJ9fQ.o8UHLt-IJl-jz9kxXOW5Iva-F1O6PmqxY0XkkCjVJiTlQMc32T5_drVQfrOP3aHBvNjXm2AfPaQbyek0l2thXAp6GwuFVQTXXglxgJZscEkhGD0Hu_Lx6rF3HTpZM_n5OftqT62wgyWL8LjXnIk7Py7rYKohXJTkIit172m8pbD27zL0TyDyLqzZZ-aABIE6NXf3YDImgRs0LLakmS_0iQ3RuKDXypaKcSuzm0WXlN4pZOKet1T6j602fC5EjsdDR7O7kbPVc5Zf9jHeUNGqkRbjkOOkCMlp5HuCucCwZhf2ay4s6w0mBupJ8Pf4vzJVPbWZOH8Di3tKW4n6qcizdQ",
      apiKey: "AIzaSyAkYYqau2JlUUdLKvLc_9G3XCzlaY4_wlw",
      expirationTime: 1557500445230,
      refreshToken: "AEu4IL3CoFXPU6B-5nXBg20p7xbnfsbr9ZGYeeNCaGWeOYMQzSNOFXzu3lZU2FhVTwt4jLx6EhTdFXBzx-QA8QOY47vhwZ2ZWt3dCMOTydw4J9oHKXnrYjMjRs1xZi_9VT3Jn7JwqerHGrk4ce-jnJhez6K_S81ykK_aeu02lhXyMd3i9ShSpHHod5XHKQgP8UqULEhRdUUhgXXFKylSiF6R2knQB3Lm9cu_b1Q7HJOZ5GrSb17MPhAASSSd-oJWB24iSa0cyZigcEmgW__rfHCtBF6ZhIYKwpxJghA02FGc5soKbyusFxU",
    },
    uid: "2Z0PmjhtqycZPCc4R7HhVMO8q9x4",
    id: 3,
    coordinate: {
      latitude: 43.592757582162264,
      longitude: 1.4134468111636806,
    },
  },
];

class MapsScreen extends Component {
  state = {
    hours: {},
    active: null,
    activeModal: null,
    messages: [],
    users: [],
    textmessages: '',
    me:'',
    messageList: [],
    isLoading: true,
  }

  checkLogging () {
    firebase.auth().onAuthStateChanged(user => {
      if (user){
        this.setState({ me: user.uid})
      }
    })
  }

  componentWillMount() {
    const { parkings } = this.props;
    const hours = {};
    this.checkLogging()
    parkings.map(parking => {hours[parking.id] = 1});
    this.setState({ hours });
  }

  sendMessage = async (activeModal, db) => {
    if (this.state.textmessages.length > 0) {
      let mgsId = db.ref('messages').child(activeModal.uid).child(activeModal.id)
      let updates= {}
      let message = {
        message : this.state.textmessages,
        time: new Date(),
        from: this.state.me
      }
      updates['messages/' + activeModal.uid+ '/' + this.state.me] = message;
      updates['messages/' + this.state.me + '/'+ activeModal.uid] = message;
      db.ref().update(updates);
      this.setState({ textmessages: '' })
    }
  }


  renderParking = (item) => {
    const { hours } = this.state;

    return (
      <TouchableWithoutFeedback key={`parking-${item.id}`} onPress={() => this.setState({ active: item.id })} >
        <View style={[styles.parking, styles.shadow]}>
          <View style={styles.hours}>
            <Text style={styles.hoursTitle}>{item.displayName}</Text>
          </View>
          <View style={styles.parkingInfoContainer}>
            <TouchableOpacity style={styles.buy} onPress={() => this.setState({ activeModal: item })}>
              <View style={styles.buyTotal}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.buyTotalPrice}>Contacter</Text>
                </View>
              </View>
              <View style={styles.buyBtn}>
                <FontAwesome name='angle-right' size={theme.SIZES.icon * 1.75} color={theme.COLORS.white} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  renderParkings = () => {
    return (
      <FlatList
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToAlignment="center"
        style={styles.parkings}
        data={this.props.parkings}
        extraData={this.state}
        keyExtractor={(item, index) => `${item.id}`}
        renderItem={({ item }) => this.renderParking(item)}
      />
    )
  }

  renderRow = ({item}) => {
    return(
    <View style={{
      flexDirection:"row", 
      width:'60%', 
      alignSelf: item.from === this.state.me ? 'flex-end' : 'flex-start',
      backgroundColor: item.from === this.state.me ? '#00897b' : '#7cb342',
      borderRadius: 5,
      marginBottom: 10}}>
      <Text style={{color:'#fff', padding:7, fontSize:16}}>{item.message}</Text>
      <Text>{item.time}</Text>
    </View>
    )}

    _displayLoading(){
      if (this.state.isLoading) {
        return (
          <View style={styles.loading_container}>
            <ActivityIndicator size='large' />
          </View>
        )
        
      }
    }

  renderModal() {
    const { activeModal, hours } = this.state;

    if (!activeModal) {
      return null
    } else {
      db.ref('users/' + activeModal.displayName).set({name:activeModal.displayName});
      //this.state.messageList = []
      console.log(activeModal.uid);
      
      db.ref('/messages/').child(activeModal.uid)
      .on('value', (snapshot)=> {
        console.log('Value :', snapshot.val());
        
        this.setState((prevState)=>{
          return {
            messageList: [...prevState.messageList, snapshot.val()],
            isLoading: false
          }
        })
      })

      console.log('liste : ' , this.state.messageList);
      
      const {width, height} = Dimensions.get('window')

      return (
        <Modal
          isVisible
          animationType={'slide'}
          useNativeDriver
          style={styles.modalContainer}
          backdropColor={theme.COLORS.overlay}
          onBackButtonPress={() => this.setState({ activeModal: null })}
          onBackdropPress={() => this.setState({ activeModal: null })}
          onSwipeComplete={() => this.setState({ activeModal: null })}
        >
          <View style={styles.modal}>
            <View>
              <Text style={{ fontSize: theme.SIZES.font * 1.5 }}>
                {activeModal.displayName}
              </Text>
            </View>
            <View style={{textAlign: 'center'}}>
              <TouchableOpacity style={styles.titleMessage}>
              <Text style={{ fontSize: theme.SIZES.font * 1, textAlign:'center' }}>Message</Text> 
              </TouchableOpacity>
              <FlatList 
                style={{padding:10, height: height * 0.4}}
                data={this.state.messageList}
                renderItem={this.renderRow}
                keyExtractor={(item, index) => index.toString()}
              />
              <Input 
                value={this.state.textmessages}
                //onChangeText={this.handleChange('testmessage')}
                onChangeText={(textmessages) => this.setState({textmessages})}
                placeholder='Text'
                />
              <TouchableOpacity onPress={() => {this.sendMessage(activeModal, db)}}>
               <Text>send</Text>
              </TouchableOpacity>
            </View>
          </View>
          {this._displayLoading()}
        </Modal>
      );
    }
  
  }

  render() {
    const { currentPosition, parkings } = this.props;

    return (
      <View style={styles.container}>
        <MapView
          initialRegion={currentPosition}
          showsUserLocation={this.props.localisation}
          style={styles.map}
        >
          {parkings.map(parking => (
            <Marker
              key={`marker-${parking.id}`}
              coordinate={parking.coordinate}
            >
              <TouchableWithoutFeedback onPress={() => this.setState({ active: parking.id })} >
                <View style={[
                  styles.marker,
                  styles.shadow,
                  this.state.active === parking.id ? styles.active : null
                ]}>
                  <Text style={styles.markerPrice}>{parking.displayName}</Text>
                </View>
              </TouchableWithoutFeedback>
            </Marker>
          ))}
        </MapView>
        {this.renderParkings()}
        {this.renderModal()}
      </View>
    )
  }
}

MapsScreen.defaultProps = {
  currentPosition: {
    latitude: 43.592757582162264,
    longitude: 1.4134468111636806,
    latitudeDelta: 0.0122,
    longitudeDelta: 0.0121,
  },
  parkings: parkingsSpots,
}


const styles = StyleSheet.create({
  loading_container:{
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: theme.COLORS.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: theme.SIZES.base * 2,
    paddingTop: theme.SIZES.base * 2.5,
    paddingBottom: theme.SIZES.base * 1.5,
  },
  headerTitle: {
    color: theme.COLORS.gray,
  },
  headerLocation: {
    fontSize: theme.SIZES.font,
    fontWeight: '500',
    paddingVertical: theme.SIZES.base / 3,
  },
  map: {
    flex: 3,
  },
  parkings: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
    paddingBottom: theme.SIZES.base * 2,
  },
  parking: {
    flexDirection: 'row',
    backgroundColor: theme.COLORS.white,
    borderRadius: 6,
    padding: theme.SIZES.base,
    marginHorizontal: theme.SIZES.base * 2,
    width: width - (24 * 2),
  },
  buy: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: theme.SIZES.base * 1.5,
    paddingVertical: theme.SIZES.base,
    backgroundColor: theme.COLORS.yellow,
    borderRadius: 6,
  },
  buyTotal: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  buyTotalPrice: {
    color: theme.COLORS.black,
    fontSize: theme.SIZES.base + 3,
    fontWeight: '600',
    paddingLeft: theme.SIZES.base / 4,
  },
  buyBtn: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  marker: {
    flexDirection: 'row',
    backgroundColor: theme.COLORS.white,
    borderRadius: theme.SIZES.base * 2,
    paddingVertical: 12,
    paddingHorizontal: theme.SIZES.base * 2,
    borderWidth: 1,
    borderColor: theme.COLORS.white,
  },
  markerPrice: { color: theme.COLORS.black, fontWeight: 'bold', },
  markerStatus: { color: theme.COLORS.gray },
  shadow: {
    shadowColor: theme.COLORS.black,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  active: {
    borderColor: theme.COLORS.yellow,
  },
  hours: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: theme.SIZES.base / 2,
    justifyContent: 'space-evenly',
  },
  hoursTitle: {
    fontSize: theme.SIZES.text,
    fontWeight: '500',
  },
  hoursDropdown: {
    borderRadius: theme.SIZES.base / 2,
    borderColor: theme.COLORS.overlay,
    borderWidth: 1,
    padding: theme.SIZES.base,
    marginRight: theme.SIZES.base / 2,
  },
  hoursDropdownOption: {
    padding: 5,
    fontSize: theme.SIZES.font * 0.8,
  },
  hoursDropdownStyle: {
    marginLeft: -theme.SIZES.base,
    paddingHorizontal: theme.SIZES.base / 2,
    marginVertical: -(theme.SIZES.base + 1),
  },
  parkingInfoContainer: { flex: 1.5, flexDirection: 'row' },
  parkingInfo: {
    justifyContent: 'space-evenly',
    marginHorizontal: theme.SIZES.base * 1.5,
  },
  parkingIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalContainer: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  modal: {
    flexDirection: 'column',
    height: height * 0.75,
    padding: theme.SIZES.base * 2,
    backgroundColor: theme.COLORS.white,
    borderTopLeftRadius: theme.SIZES.base,
    borderTopRightRadius: theme.SIZES.base,
  },
  modalInfo: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: theme.SIZES.base,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: theme.COLORS.overlay,
    borderBottomColor: theme.COLORS.overlay,
  },
  modalHours: {
    paddingVertical: height * 0.11,
  },
  modalHoursDropdown: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.SIZES.base,
  },
  titleMessage: {
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.SIZES.base * 1.5,
    backgroundColor: theme.COLORS.red,
  },
  payText: {
    fontWeight: '600',
    fontSize: theme.SIZES.base * 1.5,
    color: theme.COLORS.white,
  }
})


const withUserContext = WrapperComponent => props => {
  return(
  <UserContext.Consumer>
    {ctx => <WrapperComponent {...ctx} {...props} ></WrapperComponent>}
  </UserContext.Consumer>)
}

export default wrapperInUserContext = withUserContext(MapsScreen);