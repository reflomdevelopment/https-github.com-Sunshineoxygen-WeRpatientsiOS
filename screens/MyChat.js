import { Item, Row } from 'native-base';
import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  ActivityIndicator,
  ToastAndroid,AlertBackHandler,
  BackHandler,
  Alert
} from 'react-native';
import { COLORS, FONTS, icons, images, SIZES } from '../constants';
import { Card } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import { ScrollView } from 'react-native-gesture-handler';
import Chat from './Chat';
import {
  useFocusEffect,
  useIsFocused
} from '@react-navigation/native';
import ReadMore from '@fawazahmed/react-native-read-more';

const MyChat = ({ navigation }) => {
  const header = [
    { id: 1, title: 'Chat' },
    { id: 2, title: 'Chat Requests' },
  ];
  const [shouldShow, setShouldShow] = useState(false);
  const [ChatArray, setChatArray] = useState([]);

  const isFocused = useIsFocused();

  // const chatArray = [{id:1,username:'user1' ,Timeago:'10.25 AM ',title:'iuiuiniui iuiu iiui iuiiun iuiuiu iuiuu uiiu uiu '},
  //                   {id:2,username:'user1' ,Timeago:'10.25 AM ',title:'iuiuiniui iuiu iiui iuiiun iuiuiu iuiuu uiiu uiu '},
  //                   {id:3,username:'user1' ,Timeago:'10.25 AM ',title:'iuiuiniui jjgjk '},
  //                   {id:4,username:'user1' ,Timeago:'10.25 AM ',title:'iuiuiniui iuiu iiui iuiiun iuiuiu iuiuu uiiu uiu '}]

  // const chatArray=[{"AvatarPic":"1.png","UserID":"7","NickName":"user@123","ProfessionalTitle":"dummy","CreatedAT":"2021-05-27 08:43:02","Status":"1"},{"AvatarPic":"1.png","UserID":"8","NickName":"testing","ProfessionalTitle":"dummy","CreatedAT":"2021-05-27 09:59:20","Status":"1"},{"AvatarPic":"1.png","UserID":"9","NickName":"testingdd","ProfessionalTitle":"dummy","CreatedAT":"2021-05-29 14:08:02","Status":"1"},{"AvatarPic":"1.png","UserID":"10","NickName":"ghj","ProfessionalTitle":"hfd","CreatedAT":"2021-05-29 14:40:15","Status":"1"},{"AvatarPic":"1.png","UserID":"11","NickName":"jjj","ProfessionalTitle":"oka","CreatedAT":"2021-05-29 14:42:47","Status":"1"},{"AvatarPic":"1.png","UserID":"13","NickName":"htfg","ProfessionalTitle":"890","CreatedAT":"2021-05-30 04:03:59","Status":"1"},{"AvatarPic":"Group_100882.png","UserID":"1","NickName":"purva@123","ProfessionalTitle":"","CreatedAT":"2021-05-25 06:09:03","Status":"1"},{"AvatarPic":"Group_100882.png","UserID":"5","NickName":"test@123","ProfessionalTitle":"","CreatedAT":"2021-05-25 13:08:09","Status":"1"}]

  const CallsArray = [
    {
      id: 1,
      username: 'user1',
      time: '50 minut ago ',
      callType: 'video',
      callincomout: 'incoming',
    },
    {
      id: 1,
      username: 'user1',
      time: '50 minut ago ',
      callType: 'video',
      callincomout: 'outgoing',
    },
    {
      id: 1,
      username: 'user1',
      time: '50 minut ago ',
      callType: 'call',
      callincomout: 'incoming',
    },
  ];
  const [text, setText] = useState();
  const [active, setActive] = useState(1);
  const [ChatNotification, setChatNotification] = useState([]);
  const [Userno, setUserno] = useState('');
  const SlectHeader = item => {
    setActive(item.id);
  };

  const showexpert = () => {
    setShouldShow(!shouldShow);
    navigation.navigate('Notifications');
  };
  const [isLoading1, setLoading1] = useState(true);
  let repeat = 0;
  useEffect(() => {
    getMemberProfile();
    async function getMemberProfile() {
      setLoading1(true);
      let user_mps = await AsyncStorage.getItem('userid');
      setUserno(user_mps);
      await fetch(
        'https://www.werpatients.com/sunshineoxygenadmin/api/Chat/user_list/' + user_mps,
      )
        .then(response => response.json())
        .then(async responseJson => {
          console.log('responseJson', responseJson);
          responseJson.sort(function (obj2, obj1) {
            // Ascending: first id less than the previous
            return obj1.unReadCount - obj2.unReadCount;
          }),
            await setChatArray(responseJson);
            await setLoading1(false);

          //
        })
        .catch(err => console.log(err));
      await fetch(
        'https://www.werpatients.com/sunshineoxygenadmin/api/Chat/invit/' + user_mps,
      )
        .then(response => response.json())
        .then(responseJson => {
          console.log('responseJson1', responseJson);
          setChatNotification(responseJson);
          setLoading1(false);

          //
        })
        .catch(err => console.log(err));
    }
  }, [isFocused]);
  useFocusEffect(
    React.useCallback(() => {

      let timer1 = setInterval(() => getMemberProfile(), 3000);
      const backAction = () => {
        clearInterval(timer1)
        navigation.replace('Home')
       
        return true;
      };
  
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
  
      // Do something when the screen is focused
      return () => {
        clearInterval(timer1)
        backHandler.remove();
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );


  async function getMemberProfile() {

    let user_mps = await AsyncStorage.getItem('userid');
    setUserno(user_mps);
    await fetch(
      'https://www.werpatients.com/sunshineoxygenadmin/api/Chat/user_list/' + user_mps,
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log('responseJson', responseJson);
        responseJson.sort(function (obj2, obj1) {
          // Ascending: first id less than the previous
          return obj1.unReadCount - obj2.unReadCount;
        }),
          setChatArray(responseJson);
        setLoading1(false);

        //
      })
      .catch(err => console.log(err));
    await fetch(
      'https://www.werpatients.com/sunshineoxygenadmin/api/Chat/invit/' + user_mps,
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log('responseJson1', responseJson);
        setChatNotification(responseJson);
        setLoading1(false);

        //
      })
      .catch(err => console.log(err));
  }
  async function chathistory() {
    let user_mps = await AsyncStorage.getItem('userid');
    await fetch(
      'https://www.werpatients.com/sunshineoxygenadmin/api/Chat/user_list/' + user_mps,
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log('responseJson', responseJson);
        setChatArray(responseJson);
        setLoading1(false);

        //
      })
      .catch(err => console.log(err));
  }

  async function zoomapiaccept(txt) {
    Alert.alert(
      'Please Wait.',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );

    var formData = new FormData();
    formData.append('RequestID', txt);
    formData.append('Status', '3');
    fetch(
      'https://www.werpatients.com/sunshineoxygenadmin/api/Chat/send_accept_reject',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      },
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.status == 'Success') {
          Alert.alert(
            data.msg,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );

          fetch(
            'https://www.werpatients.com/sunshineoxygenadmin/api/Chat/invit/' + Userno,
          )
            .then(response => response.json())
            .then(responseJson => {
              console.log('responseJson1', responseJson);
              setChatNotification(responseJson);


              //
            });
        }
      });
  }

  async function zoomapireject(txt) {
    Alert.alert(
      'Please Wait.',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );

    var formData = new FormData();
    formData.append('RequestID', txt);
    formData.append('Status', '4');
    fetch(
      'https://www.werpatients.com/sunshineoxygenadmin/api/Chat/send_accept_reject',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      },
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.status == 'Success') {
          Alert.alert(
            data.msg,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );

          fetch(
            'https://www.werpatients.com/sunshineoxygenadmin/api/Chat/invit/' + Userno,
          )
            .then(response => response.json())
            .then(responseJson => {
              console.log('responseJson1', responseJson);
              setChatNotification(responseJson);

              //
            });
        }
      });
  }
  const searchData = e => {
    let text = e.toLowerCase();
    let newData = ChatArray;

    let filteredName = newData.filter(item => {
      return item.NickName.toLowerCase().match(text);
    });
    if (!text || text === '') {
      chathistory();
      console.log('no search');
      setChatArray(ChatArray);
    } else if (!Array.isArray(filteredName) && !filteredName.length) {
      setChatArray(ChatArray);
      console.log('no search2');
    } else if (Array.isArray(filteredName)) {
      console.log('no search3');
      // this.setState({
      //   noData: false,
      //   data: filteredName
      // })
      setChatArray(filteredName);
    }
  };

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

        <Card style={styles.TextInput}>
          <View style={{flex:1,justifyContent:'center'}}>
          <View style={{ flexDirection: 'row', alignSelf: 'center'}}>
            <Image
              source={icons.loupe}
              resizeMode="contain"
              style={[
                styles.menuImage,
                { width: SIZES.width / 20, height: SIZES.height / 20 },
              ]}
            />
            <View style={{ width: SIZES.width / 2 ,justifyContent:'center'}}>
              <TextInput
                onChangeText={text => searchData(text)}
                autoCapitalize="none"
                value={text}
                autoCapitalize="none"
                placeholder="Search by name"
                placeholderTextColor={COLORS.black}
                style={styles.TextStyle}
              />
            </View>
          </View>
          </View>
        </Card>

        <TouchableWithoutFeedback onPress={showexpert}>
          <Image
            source={icons.notifications}
            resizeMode="contain"
            style={styles.menuImage}
          />
        </TouchableWithoutFeedback>
      </View>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      {isLoading1 ? (
        <View style={{ flex: 1, paddingTop: '50%' }}>
          <ActivityIndicator animating={true} color={'#253A79'} />
          <Text style={{ color: '#253A79', fontSize: 15, textAlign: 'center' }}>
            Please wait...
          </Text>
        </View>
      ) : (
        <SafeAreaView>
          <ScrollView>
            {Header()}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginTop: '3%',
                justifyContent: 'space-evenly',
              }}>
              {header.map((item, index) => (
                <TouchableWithoutFeedback
                  activeOpacity={0.3}
                  key={index}
                  onPress={() => SlectHeader(item)}>
                  <View
                    style={
                      active == item.id ? styles.activebg : styles.inactive
                    }>
                    <Text
                      style={
                        active == item.id
                          ? styles.activestyle
                          : styles.inactivetextstyle
                      }>
                      {item.title}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              ))}

            </View>
            {active === 1
              ? ChatArray.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={{ width: SIZES.width / 1.1, alignSelf: 'center' }}
                  onPress={() =>
                    navigation.push('Chatstatus', {
                      username1: item.NickName,
                      userid1: item.UserID,
                      pic: item.AvatarPic,
                      isBlock:item.BlockStatus
                    })
                  }>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View style={{ width: '10%', flexDirection: 'row' }}>

                      <Image
                        source={{
                          uri:
                            'https://www.werpatients.com/assets/avatar/' +
                            item.AvatarPic,
                        }}
                        resizeMode="contain"
                        style={{
                          width: SIZES.width / 6,
                          height: SIZES.height / 7,
                        }}
                      />


                      {moment(item.LastActivity).format('YYYY-MM-DD hh:mm:ss ') > moment().utc().subtract(10, 'seconds').format('YYYY-MM-DD hh:mm:ss ')
                        ?
                        <View style={styles.innerCircle} />
                        : <View style={styles.innerCircle2} />}
                      <Text>
                      </Text>
                    </View>

                    <View style={{ width: '80%', justifyContent: 'center' }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginTop: '6%',
                        }}>
                        <Text
                          style={{
                            ...FONTS.h3,
                            color: COLORS.primary,
                            textTransform: 'capitalize',
                          }}>
                          {item.NickName}
                        </Text>

                        <Text style={{ ...FONTS.h4, color: COLORS.primary }}>

                          {moment(item.CreatedAT).format('hh:mm A')}
                        </Text>
                      </View>
                      <View>

                        <Text style={{ ...FONTS.h4, color: COLORS.primary, }}>
                          {item.ProfessionalTitle}
                        </Text>

                        {item.unReadCount > '0' ? <Text style={{ ...FONTS.h4, color: COLORS.LightGreen, }}>
                          # {item.unReadCount} New Message
                          {/* {item.ProfessionalTitle} */}
                        </Text> : null}

                      </View>
                      <View
                        style={{
                          borderBottomWidth: 0.5,
                          borderBottomColor: COLORS.lightGray,
                          marginTop: '5%',
                        }}></View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
              : null}
            {active === 2
              ?

              ChatNotification.length > 0 ?

                ChatNotification.map((item, index) => (

                  <TouchableOpacity
                    key={index}
                    style={{ width: SIZES.width / 1.1, alignSelf: 'center' }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>


                      <View style={{ width: '10%' }}>
                        <Image
                          source={{
                            uri:
                              'https://www.werpatients.com/assets/avatar/' +
                              item.AvatarID,
                          }}
                          resizeMode="contain"
                          style={{
                            width: SIZES.width / 6,
                            height: SIZES.height / 7,
                          }}
                        />

                      </View>

                      <View style={{ width: '80%', justifyContent: 'center' }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: '6%',

                          }}>
                          <Text
                            style={{
                              ...FONTS.h3,
                              color: COLORS.primary,
                              textTransform: 'capitalize',
                            }}>
                            {item.NickName}
                          </Text>

                          <View style={{ justifyContent: 'flex-end',flexDirection:'row' }}>
                            <TouchableOpacity
                              onPress={() => zoomapiaccept(item.RequestID)} style={[styles.Button]}>
                              <Text style={styles.ButtonText}>Accept</Text>
                            </TouchableOpacity>
                         
                            <TouchableOpacity
                              onPress={() => zoomapireject(item.RequestID)} style={[styles.Button2]}>
                              <Text style={styles.ButtonText}>Reject</Text>
                            </TouchableOpacity>
                          </View>

                        </View>
                        <View>
                          <Text style={{ ...FONTS.h4, color: COLORS.primary, marginTop: '-1%', }}>
                            {item.ProfessionalTitle}
                          </Text>

                          <ReadMore
                            numberOfLines={2}
                            style={styles.textStyle}
                            seeMoreStyle={{ color: COLORS.primary, ...FONTS.h5 }}
                            seeLessStyle={{ color: COLORS.primary, ...FONTS.h5 }}>
                            {item.Message}
                          </ReadMore>
                        </View>
                        <View
                          style={{
                            borderBottomWidth: 0.5,
                            borderBottomColor: COLORS.lightGray,
                            marginTop: '5%',
                          }}></View>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))




                : <View
                  style={{
                    flexDirection: 'row',
                    alignSelf: 'center',
                    height: '100%',
                  }}>
                  <View
                    style={{ width: '80%', height: '100%', marginLeft: '6%', marginTop: "25%" }}>
                    <View style={{ width: '90%', height: '100%' }}>
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
              :
              null

            }

            {ChatNotification.length > 0 ? null

              :
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  height: '100%',
                }}>
                <View
                  style={{ width: '80%', height: '100%', marginLeft: '6%', marginTop: "25%" }}>
                  <View style={{ width: '90%', height: '100%' }}>
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

                    </Text>
                  </View>
                </View>
              </View>
            }
          </ScrollView>
        </SafeAreaView>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  activebg: {
    backgroundColor: COLORS.primary,
    width: SIZES.width / 2.4,
    borderRadius: 5,
    height: SIZES.height / 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Button: {
    borderRadius: 6,
    backgroundColor: COLORS.primary,
    width: SIZES.width / 6,
    height: SIZES.height / 23,
    alignItems: 'center',
    justifyContent: 'center',
    // alignSelf: 'center',

  },
  Button2: {
    borderRadius: 6,
    backgroundColor: '#ff0000',
    width: SIZES.width / 6,
    height: SIZES.height / 23,
    alignItems: 'center',
    justifyContent: 'center',
    // alignSelf: 'center',
    marginLeft:5

  },
  ButtonText: {
    color: COLORS.white,
    ...FONTS.h3,
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
  inactive: {
    backgroundColor: COLORS.white,
    width: SIZES.width / 2.4,
    borderRadius: 5,
    height: SIZES.height / 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  TextStyle: {
    ...FONTS.h4,
    marginLeft: '4%',
  },
  menuImage: {
    width: SIZES.width / 18,
    height: SIZES.height / 18,
    tintColor: COLORS.primary,
    // marginLeft:10
  },
  TextInput: {
    height: SIZES.height / 15,
    width: SIZES.width / 1.5,
    marginTop: '1%',
    borderWidth: 0.2,
    borderRadius: 5,
    alignItems: 'center',
  },
  TextStyle: {
    ...FONTS.h4,
    marginLeft: '4%',
  },
  activestyle: {
    color: COLORS.white,
    ...FONTS.h3,
  },
  inactivetextstyle: {
    color: COLORS.lightGray,
    ...FONTS.h3,
  },
  innerCircle: {
    marginLeft: '-30%',
    borderRadius: 12,
    width: 12,
    height: 12,
    margin: 12,
    backgroundColor: "#18D92B"
  },
  innerCircle2: {
    marginLeft: '-30%',
    borderRadius: 12,
    width: 12,
    height: 12,
    margin: 12,
    backgroundColor: "#ff0000"
  },
});
export default MyChat;
