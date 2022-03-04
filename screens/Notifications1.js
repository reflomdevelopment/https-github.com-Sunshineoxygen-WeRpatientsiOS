import React, {useState,useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,ActivityIndicator
} from 'react-native';
import {COLORS, FONTS, icons, images, SIZES} from '../constants';
import {Card} from 'react-native-paper';
import Modal from 'react-native-modal';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
const Notifications = ({navigation}) => {
  const [shouldShow, setShouldShow] = useState(false);
  // const Notifications = [
  //   {
  //     id: 1,
  //     name: 'hdjhs hsdjs ',
  //     TimeAg0: '10 Am',
  //     description: 'sjdh sdsjh shdjsh sjsh shdjsh jhsjhd sh',
  //   },

  //   {
  //     id: 2,
  //     name: 'hdjhs hsdjs ',
  //     TimeAg0: '10 Am',
  //     description: 'sjdh sdsjh shdjsh sjsh shdjsh jhsjhd sh',
  //   },

  //   {
  //     id: 3,
  //     name: 'hdjhs hsdjs ',
  //     TimeAg0: '10 Am',
  //     description:
  //       'sjdh sdsjh shdjsh sjsh shdjsh jhsjhd sh j hsjhdjhsjhdjhsjhhsjhdjhsjhdjhsjhhsjhdjhsjhdjhsjh  jhsjhdjhsjhdjhsjhdjhsjhdjhsjhdjhsjhdjhsjhdjhsjhdhsjhdjhsjhdjhsjhdjhsjhd',
  //   },
  // ];

  const showexpert = () => {
    setShouldShow(!shouldShow);
  };

  async function goback() {
    navigation.goBack(null);
    return true;
  }
  const [isLoading1, setLoading1] = useState(true);
  const [Notifications, setNotifications]=useState([])
  let repeat = 0;
  useEffect(() => {
    getMemberProfile();
    async function getMemberProfile() {
      let user_mps = await AsyncStorage.getItem('userid');
      await fetch(
        'http://werpatient.reflomsolutions.com/api/Misc/not/'+user_mps,
      )
        .then(response => response.json())
        .then(responseJson => {
          console.log('responseJson', responseJson);
          setNotifications(responseJson)

          setLoading1(false);
        })
        .catch(err => console.log(err));
    }
  }, [repeat]);
  function Header() {
    return (
      <View style={styles.HeaderContainer}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image
            source={icons.Menu}
            resizeMode="contain"
            style={styles.menuImage}
          />
        </TouchableOpacity>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{width: 200}}>
            <Text alignItems="center" style={styles.text}>
              Notifications
            </Text>
            {/* <Image  source={images.weRp} 
                 resizeMode="contain" 
                 style={{height:50,width:200}}
             />  */}
          </View>
        </View>

        <TouchableWithoutFeedback onPress={() => goback()}>
          <Image
            source={icons.backpress}
            resizeMode="contain"
            style={styles.menuImage}
          />
        </TouchableWithoutFeedback>
      </View>
    );
  }

  function ListAngel() {
    return (
      
      <View>
          {isLoading1 ? (
        <View style={{flex: 1, paddingTop: '50%'}}>
          <ActivityIndicator animating={true} color={'#253A79'} />
          <Text style={{color: '#253A79', fontSize: 15, textAlign: 'center'}}>
            Please wait...
          </Text>
        </View>
      ) : (
        <ScrollView>
        {Notifications.map((item, index) => (
          <TouchableOpacity style={styles.background} key={index}>
            <View style={styles.image_BG}>
              <Image
               source={{
                uri:
                  'https://www.werpatients.com/assets/avatar/' +
                  item.AvatarPic,
              }}
                resizeMode="contain"
                style={{width: SIZES.width / 5, height: SIZES.height / 13}}
              />

            </View>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '90%',
                  alignItems: 'center',
                }}>
                <View style={{width: '70%'}}>
                  {/* <Text>{item.NickName}</Text> */}
                  {item.Status==1  ? <Text>{item.NickName} like your {item.Topic} post </Text>:null}
                  {item.Status==2  ? <Text>{item.NickName} comment on your {item.Topic} post</Text>:null}
                  {item.Status==3  ? <Text>{item.NickName} reply on your comment</Text>:null}
                  {item.Status==4  ? <Text>{item.NickName} rating on your {item.Topic} post</Text>:null}
                  {item.Status==5  ? <Text>{item.NickName} add you as angel patient </Text>:null}
                  {item.Status==6  ? <Text>{item.NickName} call you </Text>:null}
                </View>
                <View style={{width: '25%'}}>
                  <Text> {moment(item.CreatedID).format('hh:mm A')} </Text>
                </View>
              </View>
              <View
                style={{
                  borderBottomWidth: 0.5,
                  borderBottomColor: COLORS.lightGray,
                  marginTop: '5%',
                }}></View>
            </View>
          </TouchableOpacity>
        ))}
        {Notifications.length > 0 ? null
: 
<View
                  style={{
                    flexDirection: 'row',
                    alignSelf: 'center',
                    height: '100%',
                  }}>
                  <View
                    style={{width: '80%', height: '100%', marginLeft: '6%',marginTop:"25%"}}>
                    <View style={{width: '90%', height: '100%'}}>
                      <Text
                        style={[
                          styles.eventtitle,
                          {
                            alignSelf: 'center',
                            fontWeight: '600',
                            color: '#000',
                            fontSize: 15,
                          },
                        ]}>
                        No Notifications Found
                      </Text>
                    </View>
                  </View>
                  </View>
}
        </ScrollView>
      )}

      </View>
    );
  }

  return (
    <View style={styles.Conatiner}>
      <SafeAreaView style={styles.Conatiner}>
        {Header()}
        <ScrollView>{ListAngel()}</ScrollView>
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  Conatiner: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  TextStyle: {
    ...FONTS.h4,
    marginLeft: '4%',
  },

  HeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    // shadowOpacity: 1,
    // shadowColor:'#000',
    // elevation: 4,
    // height:SIZES.height/12
  },

  TextInput: {
    height: SIZES.height / 17,
    width: SIZES.width / 1.5,
    marginTop: '1%',
    borderWidth: 0.2,
    borderRadius: 5,
    alignItems: 'center',
  },

  menuImage: {
    width: SIZES.width / 25,
    height: SIZES.height / 25,
    tintColor: COLORS.primary,
    // marginLeft:10
  },

  background: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginVertical: 10,
  },

  image_BG: {
    width: '20%',
  },
  text: {
    color: COLORS.primary,
    marginTop: '10%',
    ...FONTS.h3,
    textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
  },
});
export default Notifications;
