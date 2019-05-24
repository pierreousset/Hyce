import React from 'react';
import {
  AsyncStorage,
  View,
  StyleSheet,
  Image
} from 'react-native';
import { Button, Input } from 'react-native-elements';
import { Facebook, Constants } from 'expo';
import firebase from '../conf/firebase-api';
import { UserContext } from '../conf/Usercontext';
import Icon from 'react-native-vector-icons/Ionicons';

class LoginScreen extends React.Component {
    constructor(props) {
      super(props)
    }
    static navigationOptions = {
      title: 'Please sign in',
    };
    state = { locked: true };

    render() {
      return (
        <View style={styles.container}>
        <View>
            <Image
              source={require('../assets/images/Hyce_logo.png')}
              style={styles.welcomeImage}
            />
          </View>
          <Button
            icon={
              <Icon
                name="logo-facebook"
                size={30}
                color="white"
              />
            }
            title=" Connexion Facebook"
            id="buttonLogin"
            onPress={this._signInAsync}

          />

        </View>
      );
    }

    _signInAsync = async () =>  {
      const FACEBOOK_APP_ID = Constants.manifest.extra.FACEBOOK_APP_ID;
      try {
        const {
          type,
          token,
          expires,
          permissions,
          declinedPermissions,
        } = await Facebook.logInWithReadPermissionsAsync(FACEBOOK_APP_ID.toString(), {
          permissions: ["email", "user_likes", 'public_profile', 'user_photos', 'user_friends', 'user_location'],
          behavior: "native",
        });
        if (type === 'success') {
          // Get the user's name using Facebook's Graph API
          const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
          const user = await response.json()
          this.props.setUser(user);
          this.props.setToken(token);
          this.props.setMaps(true);
          await AsyncStorage.setItem('userToken', token);
          await AsyncStorage.setItem('userId', user.id);
          await AsyncStorage.setItem('maps', JSON.stringify(true));
          //await firebase.shared.facebookFire(token);
          this.props.navigation.navigate('Main');
        } else {
          alert(type);
        }
      } catch ({ message }) {
        alert(`Facebook Login Error: ${message}`);
      }
    }
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFED46',
    },
  });

const withUserContext = WrapperComponent => props => {
  return(
  <UserContext.Consumer>
    {ctx => <WrapperComponent{...ctx} {...props} ></WrapperComponent>}
  </UserContext.Consumer>)
}

export default wrapperInUserContext = withUserContext(LoginScreen);
