import React from 'react';
import { View, StyleSheet, Platform, Text, Dimensions, Animated, Image, AsyncStorage } from 'react-native';
import { MapView, Constants, Location, Permissions } from 'expo';
import { UserContext } from '../conf/Usercontext';
import { NavigationEvents } from 'react-navigation';
import { Icon } from 'react-native-elements'


const { width, height } = Dimensions.get("window");

let WIDTHD = Dimensions.get("window").width
let HEIGHTD = Dimensions.get("window").height

const CARD_HEIGHT = height / 15;
const CARD_WIDTH = CARD_HEIGHT + 30;

class MapsScreen extends React.Component { 
  state = {
    mapRegion: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.1922, longitudeDelta: 0.1421 },
    locationResult: null,
    location: {coords: { latitude: 37.78825, longitude: -122.4324}},
    region: {
      latitude: 45.52220671242907,
      longitude: -122.6653281029795,
      latitudeDelta: 0.04864195044303443,
      longitudeDelta: 0.040142817690068,
    },
    markers: [],
  };
  

  componentWillMount() {
    this.animation.addListener(({ value }) => {
      let index = Math.floor(value / WIDTHD + 0.3); // animate 30% away from landing on the next item
      if (index >= this.state.markers.length) {
        index = this.state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;
          const { coordinate } = this.state.markers[index];
          this.map.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: this.state.region.latitudeDelta,
              longitudeDelta: this.state.region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
  }
  async getUserFriend(){
    const token = await AsyncStorage.getItem('userToken');
    const userId = await AsyncStorage.getItem('userId');
    const response = await fetch(`https://graph.facebook.com/${userId}/friends?access_token=${token}`);
    const userFriend = await response.json()
    for (const i=0, l=userFriend.data.length; i<l; i++){
      const id = userFriend.data[i].id;
      console.log(id);
    }
  }

  componentWillMount() {
  }

  update() {
    this.state.markers = []
    if (this.props.localisation) {
      this._getLocationAsync();
      this.getUserFriend();
      this.index = 0;
      this.animation = new Animated.Value(0);
      this.forceUpdate()
    }else{
      this.forceUpdate()
    }
    
  }

  _getLocationAsync = async () => {
   let { status } = await Permissions.askAsync(Permissions.LOCATION);
   if (status !== 'granted') {
     this.setState({
       locationResult: 'Permission to access location was denied',
       location,
     });
   }

   let location = await Location.getCurrentPositionAsync({});
   this.state.markers.push({coordinate: {latitude: location.coords.latitude,longitude: location.coords.longitude,},title: "Moi",});
   this.setState({ locationResult: JSON.stringify(location), location, });
 };

 render() {
  const interpolations = this.state.markers.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      ((index + 1) * CARD_WIDTH),
    ];
    const scale = this.animation.interpolate({
      inputRange,
      outputRange: [1, 2.5, 1],
      extrapolate: "clamp",
    });
    const opacity = this.animation.interpolate({
      inputRange,
      outputRange: [0.35, 1, 0.35],
      extrapolate: "clamp",
    });
    return { scale, opacity };
  });

  return (
    <View style={styles.container}>
    <NavigationEvents onWillFocus={() => this.update()}/>
      <MapView
        ref={map => this.map = map}
        initialRegion={this.state.markers.coordinate}
        style={styles.container}
      >
        {this.state.markers.map((marker, index) => {
          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale,
              },
            ],
          };
          const opacityStyle = {
            opacity: interpolations[index].opacity,
          };
          return (
            <MapView.Marker key={index} coordinate={marker.coordinate}>
              <Animated.View style={[styles.markerWrap, opacityStyle]}>
                <Animated.View style={[styles.ring, scaleStyle]} />
                <View style={styles.marker} />
              </Animated.View>
            </MapView.Marker>
          );
        })}
      </MapView>
      <Animated.ScrollView
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={WIDTHD - 30}
        style={{flex:1, width:null, height:null}}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: this.animation,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
        style={styles.scrollView}
        contentContainerStyle={styles.endPadding}
      >
        {this.state.markers.map((marker, index) => (
          <View style={styles.card} key={index}>
            <View style={styles.textContent}>
            <View style={{flex:1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'stretch'}}>
              <Icon reverse name='ios-body' type='ionicon' color='#517fa4'/>
            
              <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
              <Text>Chat</Text>
            </View>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
}

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFED46',
  },
  scrollView: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  card: {
    flex: 1,
    padding: 5,
    elevation: 2,
    backgroundColor: "#FFF",
    justifyContent: 'center',
    //alignItems: 'center',
    marginHorizontal: 35,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: 80,
    width: WIDTHD - 60,
    overflow: "hidden",
    borderRadius: 10,
    padding: 10
  
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 1,
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    width: 10,
    height: 10,
    borderRadius: 4,
    backgroundColor: "#FFED46",
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.5)",
  },
});

const withUserContext = WrapperComponent => props => {
  return(
  <UserContext.Consumer>
    {ctx => <WrapperComponent {...ctx} {...props} ></WrapperComponent>}
  </UserContext.Consumer>)
}

export default wrapperInUserContext = withUserContext(MapsScreen);