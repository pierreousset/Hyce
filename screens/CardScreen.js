import React, {Component} from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { UserContext } from '../conf/Usercontext';
import { Card, ListItem, Button, Icon, Image, Avatar } from 'react-native-elements'

let WIDTHDIM = Dimensions.get('window').width
let HEIGHTDIM = Dimensions.get('window').height

const mylike = [
    {
        id: 1,
        like: true
    },
    {
        id: 2,
        like: false
    },
    {
        id: 2,
        like: true
    },
    {
        id: 4,
        like: true
    }
]

const post = [
    {
       name: 'abercombie',
       avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
       like: 100,
        id:1,
        description: 'Salut je viens de poster ça',
        img: 'https://scontent-cdt1-1.cdninstagram.com/vp/e2adf88f8d89d18c9b20cbe0526b5e7a/5D72702A/t51.2885-15/e35/51912048_789530331416184_3325732823230713969_n.jpg?_nc_ht=scontent-cdt1-1.cdninstagram.com',
        commenter: 1
        
    },
    {
        name: 'pierre',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
        like: 400,
        id:2,
        description: 'Salut SalutSalutSalutSalutSalutSalut',
        img: 'https://scontent-cdt1-1.cdninstagram.com/vp/ff6ca16f4f2a4cbec7396053e663d030/5D67AEE2/t51.2885-15/e35/54277401_424468958364210_8685948513083366512_n.jpg?_nc_ht=scontent-cdt1-1.cdninstagram.com',
        commenter: 1

    },
    {
        name: 'pierre',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
        like: 400,
        id:3,
        description: 'je suis la et f',
        img: 'https://scontent-cdt1-1.cdninstagram.com/vp/ca107890547ffaed9068cecd752a252f/5D566F09/t51.2885-15/e35/53415103_1933197856809863_5945981204994168269_n.jpg?_nc_ht=scontent-cdt1-1.cdninstagram.com',
        commenter: 1
    },
     {
        name: 'camille',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
        like: 1100,
        id:4,
        description: 'Je me fait chier',
        img: 'https://scontent-cdt1-1.cdninstagram.com/vp/9b969282f689ffa32d0713e804280965/5D5CF077/t51.2885-15/e35/55947340_132746834531263_2146871523843699653_n.jpg?_nc_ht=scontent-cdt1-1.cdninstagram.com',
        commenter: 1
 
     }
   ]

class CardScreen extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
        <View>
        {
            post.map((p, i) => {
            return (
                    <View key={i} style={styles.card}>
                        <View style={{flexWrap: 'wrap', alignItems: 'flex-start', flexDirection:'row', margin:10, width: '100%'}} >
                            <Avatar 
                                size="small"
                                rounded
                                activeOpacity={0.7}
                                source={{
                                        uri: p.avatar ? p.avatar : ""}}/>
                            <Text style={{margin:10}}>{p.name}</Text>
                        </View>
                        <View key={i} style={{padding:0}}>
                            {p.img != null ? <Image source={{ uri: p.img }} style={{ width: WIDTHDIM - 50, height: WIDTHDIM }} PlaceholderContent={<ActivityIndicator />  } /> : ""}
                            <View style={{padding:0, marginTop: 10, flexDirection: 'row', marginLeft: 20}}>
                                <Icon
                                    size={28}
                                    name='ios-heart-empty'
                                    type='ionicon'
                                />
                                <View style={{marginLeft: 10}}>
                                    <Icon
                                        size={28}
                                        name='ios-chatbubbles'
                                        type='ionicon'
                                    />
                                </View>
                            </View>
                            <Text style={{margin:20, marginTop: 5}}><Text style={{marginRight:10,fontWeight: 'bold'}}>{p.name}</Text>{p.description}</Text>
                        </View>
                    </View>
            )})
        }</View>
                
    );
  }
}

const styles = StyleSheet.create({
    card: {
      flex: 0,
      backgroundColor: '#fff',
      width: WIDTHDIM - 50,  
      margin: 10,
      borderBottomLeftRadius: 10, 
      borderBottomRightRadius: 10,
      borderTopLeftRadius: 10, 
      borderTopRightRadius: 10,
    },
  });


const withUserContext = WrapperComponent => props => {
  return(
  <UserContext.Consumer>
    {ctx => <WrapperComponent {...ctx} {...props} ></WrapperComponent>}
  </UserContext.Consumer>)
}

export default wrapperInUserContext = withUserContext(CardScreen);

