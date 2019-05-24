import React from 'react';
import { View, StyleSheet, AsyncStorage, Text } from 'react-native';
import { UserContext } from '../conf/Usercontext';
import { CheckBox, Avatar, Slider, Tooltip, Icon, Button } from 'react-native-elements'

class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    value: 200
  };

  async updateLocalisation() {
    this.props.setMaps(!this.props.localisation)
    
    await AsyncStorage.setItem('maps', JSON.stringify(!this.props.localisation));

  }
  async _removePress(navigate) {
    try {
      //alert(navigate)
      await AsyncStorage.removeItem('userToken');
      this.props.navigation.navigate('AuthLoading');
    }
    catch(exception) {
      alert(exception)
      return false;
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.containerColor}>
        <Avatar
              size="large"
              rounded
              activeOpacity={0.7}
              containerStyle={styles.avatarProfil}
              source={{
              uri: this.props.user ? this.props.user.img : ""}}
              />
          <Text h2 style={styles.textH2}>{this.props.user && this.props.user.name} !</Text>
        </View>
        <View style={styles.containerCheckbox}>
          <Text h4 style={styles.textH4}>Paramètre</Text>
          <CheckBox
            title='Localisation'
            checked={this.props.localisation}
            onPress={() => this.updateLocalisation()}
          />
        </View>
        <View style={styles.containerDeco}>
          <Button
            icon={
              <Icon
                name="ios-log-out"
                type='ionicon'
                size={30}
                color="white"
              />
            }
            title=" Déconnection"
            id="buttonDeco"
            onPress={() =>this._removePress(navigate)}

          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textH2: {
    //fontFamily: 'open-sans-regular',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
    paddingTop: 10,
    paddingBottom: 30,
    textAlign: 'center',
  },
  textH4: {
    //fontFamily: 'open-sans-regular',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 5,
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'center',
  },
  containerColor: {
    backgroundColor: '#FFED46',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
    borderBottomLeftRadius: 10, 
    borderBottomRightRadius: 10,
  },
  containerCheckbox: {
    marginTop: 10,
    margin: 10,
    backgroundColor: '#F7F9FC'
  },
  containerDeco: {
    marginTop: 10,
    margin: 10,
    backgroundColor: '#F7F9FC',
    justifyContent: 'space-between',
  },
  textHeure: {
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: '500',
  },
  containerIcon: {
    flexDirection: 'row', 
    justifyContent: 'flex-end',
    paddingRight: 20
  }
});


const withUserContext = WrapperComponent => props => {
  return(
  <UserContext.Consumer>
    {ctx => <WrapperComponent {...ctx} {...props} ></WrapperComponent>}
  </UserContext.Consumer>)
}

export default wrapperInUserContext = withUserContext(SettingsScreen);