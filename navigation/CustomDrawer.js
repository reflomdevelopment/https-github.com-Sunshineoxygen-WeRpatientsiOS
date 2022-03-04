import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
  SafeAreaView,
  useWindowDimensions,
  Alert
} from 'react-native';
import {DrawerContentScrollView,getDrawerStatusFromState} from '@react-navigation/drawer';
import {icons, images, COLORS, SIZES, FONTS} from '../constants';
import {NavigationHelpersContext} from '@react-navigation/core';
import AsyncStorage from '@react-native-community/async-storage';
import Tooltip from 'react-native-walkthrough-tooltip';

import { Platform } from 'react-native'

const CustomSidebarMenu = props => {
  const [active, setActive] = useState(1);
  const DrawerItem = [
    {id: 1, screen: 'MyProfile', titlename: 'My Profile', image: icons.Profile},
    {id: 2, screen: 'MyPost', titlename: 'My Post', image: icons.Mypost},
    {id: 3, screen: 'MyState', titlename: 'My Stats', image: icons.mystate},
    {
      id: 4,
      screen: 'MyPathology',
      titlename: 'My Pathology',
      image: icons.pathology,
    },
    {
      id: 7,
      screen: 'MyAngellist',
      titlename: 'My Angel Patient',
      image: icons.MyAngel1,
    },
    {
      id: 5,
      screen: 'Privacy',
      titlename: 'Privacy Policy',
      image: icons.PrivacyPolocy,
    },
    {
      id: 8,
      screen: 'PrivacySetting',
      titlename: 'Privacy Setting',
      image: icons.PrivacyPolocy,
    },
    {id: 6, screen: 'Logout', titlename: 'Logout', image: icons.logout},
  ];

  const [Usernickname, setUsernickname] = useState('');
  const [Userpic, setUserpic] = useState('');
  const [Userstatus, setUserstatus] = useState('');
  const [toolTipVisible,setToolTipVisible] = useState(false);
  const setactive = item => {
    setActive(item.id);
    props.navigation.navigate(item.screen);
  };
  const [isLoading1, setLoading1] = useState(true);

  // const isDrawerOpen = useDrawerStatus ();
  const [isDrawerOpen,setIsDrawerOpen] = useState(null);
  // alert(isDrawerOpen);
  async function drawerStatus(){
    let drawerIsOPen = await AsyncStorage.getItem('drawerIsOPen');
    console.log(drawerIsOPen);
    if(drawerIsOPen  === '1'){
      setIsDrawerOpen(true);
    }    
    else{
      setIsDrawerOpen(false);
    }
  }

  useEffect(() => {
    drawerStatus();
    chathistory();
    async function chathistory() {
      let user_mps = await AsyncStorage.getItem('userid');

      await fetch(
        'https://www.werpatients.com/sunshineoxygenadmin/api/Misc/userrating/' +
          user_mps,
      )
        .then(response => response.json())
        .then(responseJson1 => {
          console.log(
            'check',
            'https://www.werpatients.com/assets/avatar/' +
              responseJson1.data[0].AvatarPic,
          );
          setUsernickname(responseJson1.data[0].NickName);
          setUserstatus(responseJson1.status.msg);
          setUserpic(
            'https://www.werpatients.com/assets/avatar/' +
              responseJson1.data[0].AvatarPic,
          );
          setLoading1(false);
        });
    }
  }); 
  
  // alert(isDrawerOpen);
  
  return (
    <DrawerContentScrollView {...props} 
   
    style={
      [isDrawerOpen &&
      {
        // width: Dimensions.get('window').width * .5,
      backgroundColor:'white',
      overflowX: 'hidden',
      } ]
      }
     
      >
      <View style={styles.container}>
        {isLoading1 ? (
          <View style={{flex: 1, paddingTop: '50%'}}>
            <ActivityIndicator animating={true} color={'#253A79'} />
            <Text style={{color: '#253A79', fontSize: 15, textAlign: 'left'}}>
              Please wait as we load your profile status
            </Text>
          </View>
        ) : (
          <View >
            <View style={{}}>
              <View style={styles.profilebg}>
                <Image
                  source={{uri: Userpic}}
                  //  resizeMode="contain"
                  style={{width: 75, height: 75, borderRadius: 100}}
                  //   style={{maxHeight:'100%',maxWidth:'100%',}}
                />
              </View>
              <Text style={styles.username}>{Usernickname}</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                flexWrap: 'wrap',
              }}>
              <View style={styles.Background}>
                {Userstatus === 'Silver' ? (
                  <Image
                    source={images.silver}
                    resizeMode="contain"
                    style={{width:24, height: 24}}
                  />
                ) : (
                  <Image
                    source={images.expertPatientsFigure}
                    resizeMode="contain"
                    style={{width: 24, height: 24}}
                  />
                )}
                <Text style={styles.rank}>{Userstatus}</Text>
              </View>
         
            </View>
          </View>
        )}
      </View>

      {
      DrawerItem.map((item, index) => (
        <TouchableOpacity key={index} onPress={() => setactive(item)}>
          {active == item.id ? (
            <View style={styles.activebg}>
             <View style={{width:'35%',alignItems:'flex-end'}}>
             <Image
                  source={item.image}
                  resizeMode="contain"
                  style={{
                    height: 24,
                    marginStart: 0,
                    tintColor: COLORS.primary,
                  }}
                />
             </View>
             <View style={{width:'65%'}}>
                <Text
                  style={{
                    // ...FONTS.h3, 
                    fontSize:Platform.isPad? 24.8:18,
                    color: COLORS.primary, 
                    marginStart: 15,}}>
                  {item.titlename}
                </Text>
             </View>

                
              {/* <View style={{marginLeft:"0%"}}>
                
              </View> */}
              {/* <View style={{width:'100%'}}>
            


            1234
            
               
              </View> */}

            </View>
          ) : (
            <View style={styles.inactive}>
              <View style={{width:'35%',alignItems:'flex-end'}}>
                <Image
                  source={item.image}
                  resizeMode="contain"
                  style={{
                    height: 24,
                    marginStart: 0,
                    tintColor: COLORS.lightGray,
                  }}
                />
              </View>

              <View style={{width: '65%'}}>
                <Text
                  adjustsFontSizeToFit

                  style={{                                
                    // ...FONTS.h2,
                    fontSize:Platform.isPad? 24.8:18,
                    color: COLORS.lightGray,
                    marginStart: 5,
                  }}>
                  {item.titlename}
                  {/* {
                  item.screen === 'Privacy' && 
                  <Tooltip
                    animated={true}
                    // (Optional) When true,
                    // tooltip will animate in/out when showing/hiding
                    arrowSize={{width: 16, height: 10}}
                    // (Optional) Dimensions of arrow bubble pointing
                    // to the highlighted element
                    backgroundColor="rgba(0,0,0,0.5)"
                    // (Optional) Color of the fullscreen background
                    // beneath the tooltip.
                    isVisible={toolTipVisible}
                    // (Must) When true, tooltip is displayed
                    content={
                    <Text> Report inappropriate content or app misuse: We take inappropriate content seriously If you see content on a werpatients that you believe violates the law or your rights, let us know. We’ll review the material and consider blocking, limiting, or removing access to it. Behaviors like phishing, violence, or explicit content may also violate our product policies and qualify for delete, deactivate or block the user responsible for it. Before creating a request, try to flag the content. You can report contacting us sending an email to hello@sunshineoxygen.com. Thank you.
                      </Text>
                      }
                    // (Must) This is the view displayed in the tooltip
                    placement="top"
                    // (Must) top, bottom, left, right, auto.
                    onClose={() => setToolTipVisible(false)}
                    // (Optional) Callback fired when the user taps the tooltip
                  >
                    
                    <TouchableOpacity onPress={() => {setToolTipVisible(true)}}>
                      <Image source={icons.InfoIcon} style={{left:15,top:2}}></Image>
                    </TouchableOpacity>
                    </Tooltip>
                } */}
                </Text>
                
              </View>
            </View>
          )}
        </TouchableOpacity>
      ))}
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  activebg: {
    flexDirection: 'row',
    width:Platform.isPad? SIZES.width / 2:SIZES.width / 1,
    alignSelf: 'center',
    height: SIZES.height / 18,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    shadowOpacity: 1,
    shadowColor: '#000',
    elevation: 4,
    borderRadius: 20,
    marginHorizontal: 0,
    marginVertical: 10,
  },
  profilebg: {
    paddingVertical:'7%',
   // height: SIZES.height / 8,
    //width: SIZES.width /  6,
    alignSelf: 'center',
    marginTop: '1%',
  },

  inactive: {
    flexDirection: 'row',
    width:Platform.isPad? SIZES.width / 2:SIZES.width / 1,
    alignSelf: 'center',
    height: SIZES.height / 18,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  Background: {
    width: SIZES.width / 5.1,
    height: SIZES.height / 8,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    shadowOpacity: 1,
    margin: '1%',
    shadowColor: '#000',
    elevation: 4,
    justifyContent: 'center',
    borderRadius: 10,
  },
  rank: {
    fontSize: 12,
    color: COLORS.blue,
  },
  username: {
    ...FONTS.h3,
    color: COLORS.primary,
    alignSelf: 'center',
    textTransform: 'capitalize',
  },
});
export default CustomSidebarMenu;
