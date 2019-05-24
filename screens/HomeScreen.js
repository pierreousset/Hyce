import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage
} from 'react-native';
import { Avatar, Header } from 'react-native-elements';
import { UserContext } from '../conf/Usercontext';
import CardScreen from './CardScreen'

import { MonoText } from '../components/StyledText';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.props.user = {img: ''}
  }

  state = {
    fontLoaded: false,
  };


  async getUserUrl(){
    const token = await AsyncStorage.getItem('userToken');
    const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
    this.props.setUser(await response.json());
  }

  async getUserImgUrl(){
    const token = await AsyncStorage.getItem('userToken');
    const id = await AsyncStorage.getItem('userId');
    const response = await fetch(`https://graph.facebook.com/${id}/picture?access_token=${token}`);
    const url = await response;
    const img = {img: url.url};
    this.props.setUser(Object.assign(this.props.user, img ));
  }

  async getMapsState(){
    const a = await AsyncStorage.getItem('maps', (value) => {JSON.parse(value)})
    this.props.setMaps(Boolean(a));
  }
  
  //async componentDidMount() {
    //await Font.loadAsync({
      //'open-sans-regular': require('../assets/fonts/OpenSans-Regular.ttf'),
    //});
    //this.setState({ fontLoaded: true });
  //}

  componentWillMount() {
    const token = this.props.getToken();
    this.getUserUrl()
    this.getUserImgUrl()
    this.getMapsState()
  }


  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Avatar
              size="large"
              rounded
              activeOpacity={0.7}
              source={{
              uri: this.props.user ? this.props.user.img : ""}}
              />
              <Text h2 style={styles.textH2}>Bonjour, {this.props.user && this.props.user.name} !</Text>
          </View>
          <View style={styles.welcomeContainer}>
            <CardScreen />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFED46',
    padding: 0,
    margin: 0,
    paddingTop: 20
  },
  developmentModeText: {
    marginBottom: 30,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  textH2: {
    //fontFamily: 'open-sans-regular',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
  },
  contentContainer: {
    paddingTop: 0,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});

const withUserContext = WrapperComponent => props => {
  return(
  <UserContext.Consumer>
    {ctx => <WrapperComponent {...ctx} {...props} ></WrapperComponent>}
  </UserContext.Consumer>)
}

export default wrapperInUserContext = withUserContext(HomeScreen);

