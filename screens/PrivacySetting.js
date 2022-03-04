import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  Share,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ToastAndroid,Alert,
  ActivityIndicator,
  TouchableNativeFeedback,
  Dimensions,
  
  
} from 'react-native';
import {COLORS, FONTS, icons, images, SIZES} from '../constants';
import {Picker} from '@react-native-picker/picker';
import Modal from 'react-native-modal';
import ReadMore from '@fawazahmed/react-native-read-more';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import Video from 'react-native-video';
import Sound from 'react-native-sound';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import TimeAgo from 'react-native-timeago';
import VideoPlayer from 'react-native-video-controls';
import ToggleSwitch from 'toggle-switch-react-native'

const windowWidth = Dimensions.get('window').width;
const Mypost = ({navigation}) => {
  const windowWidth = Dimensions.get('window').width;
  const [countlike, setcountlike] = useState(20);
  const [comment, setcomment] = useState(50);
  const commentArray = ['hrjhb', 'djfdjfkjdkj'];
  const [isModalVisible1, setModalVisible1] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);
  const [likeImage, setLikeimage] = useState(false);
  const [CommentImage, setcommentImage] = useState(false);
  const [array, setarray] = useState([]);
  const [isLoading1, setLoading1] = useState(true);
  const [isLoadinglike, setLoadinglike] = useState(false);
  const [Useridno, setUseridno] = useState('');
  const [Usercomments, setUsercomments] = React.useState('');
  const [Userpostcomment, setUserpostcomment] = React.useState('');
  const [loading5, setLoading5] = React.useState(false);
  const [Usercommentsreply, setUsercommentsreply] = React.useState('');
  const [Userreplycomment, setUserreplycomment] = React.useState('');
  const [settingp, setSettingp] = useState(false);
  // const array = [{id:1,image:images.Avatr1,heading:'Oncology',username:'User Name',time:'05',
  //                posttitle:'lorem ipsum',description:"Lorem Ipsum is simply dummy text of. imply dummy text of.imply dummy text of.imply dummy text of.imply dummy text of.imply dummy text of.imply dummy text of.ever since the 1500s, when an unknown printersum."
  //                },]
async function settingfun(){

setSettingp(!settingp);
global.settingvalue = settingp;
console.log(global.settingvalue )
}


useEffect(() => {
  console.log(global.settingvalue)
  // if ( global.settingvalue = ''){
    
  //   console.log("jjjjjjj")
  // }
  
 setSettingp(!global.settingvalue)
 
});



  function Header() {
    return (
      <View style={styles.CustomBorder}>
        <View style={styles.HeaderContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image
              source={icons.ArrowLeft}
              resizeMode="contain"
              style={{
                width: SIZES.width / 18,
                height: SIZES.height / 18,
                tintColor: COLORS.primary,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{...FONTS.h3, color: COLORS.primary,marginLeft:"20%",marginRight:"-20%"}}>Privacy Policy Setting</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function renderItem() {
    return (
      <View

      style={{
        flex: 1,
      }}><ScrollView>
   
      <Text style={{fontSize:20,
    marginLeft:"2%",marginTop:"3%",textAlign:'justify', marginRight:"2%",}}>
       <Text style={{fontWeight: "bold"}}>You can control your privacy policy with one click </Text>
     
         </Text>

         <ToggleSwitch
  isOn={settingp}
  onColor="#253A79"
  offColor="#707070"
  label="Allows to keep your data in the system"
  labelStyle={{ color: "black", fontWeight: "900" }}
  size="large"
  onToggle={isOn => settingfun()}
/>

<View style={{
    marginTop:"3%"}}>
<Text style={[styles.LinkMail, {color: COLORS.primary}]}>
  
When you use our services, you’re trusting us with your information. We understand this is a big responsibility and work hard to protect your information and put you in control.     
          
        
        </Text>
        </View>
        <Text style={{fontSize: 15,
    marginLeft:"2%",marginTop:"3%",textAlign:'justify', marginRight:"2%"}}>
We use data to build better services. 
 </Text>
  <Text style={{fontSize: 15,
    marginLeft:"2%",marginTop:"3%",textAlign:'justify', marginRight:"2%"}}>
Admin contact email- hello@sunshineoxygen.com
 </Text>

   


<Text style={{fontSize: 20,
    fontWeight: "bold",marginLeft:"2%",marginTop:"3%"}}>

      </Text>
      <Text style={{fontSize: 15,
    marginLeft:"2%",marginTop:"3%"}}>
  </Text>
</ScrollView>
    </View>
    
    );
  }
  return (
    <View style={styles.container}>
     
        <SafeAreaView style={styles.container}>
          {Header()}
          <ScrollView>{renderItem()}</ScrollView>
        </SafeAreaView>
   
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  // Button: {
  //   flex:1,
  //   borderRadius: 6,
  //   backgroundColor: COLORS.primary,
  //   width: SIZES.width / 3.0,
  //   height: SIZES.height / 20,
  //   // alignItems: 'center',
  //   // justifyContent: 'center',
  //   // alignSelf: 'center',
  //   // marginTop: SIZES.height/25
  // },

  HeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: '1%',
    justifyContent: 'space-between',
    width: '60%',
  },

  mainCard: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    elevation: 10,
    marginTop: '3%',
    width: SIZES.width / 1.1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    padding: '3%',
    marginBottom: 10,
    alignSelf: 'center',
  },

  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '98%',
    justifyContent: 'space-between',
  },
  LinkMail: {
    ...FONTS.h4,
    color: COLORS.lightGray,
    textAlign: 'center',
    marginLeft:"2%",marginTop:"3%",textAlign:'justify', marginRight:"2%"
  },
  text: {
    color: COLORS.primary,
    marginTop: '7%',
    ...FONTS.h3,
  },
  CustomBorder: {
    backgroundColor: COLORS.white,
    shadowOpacity: 1,
    shadowColor: '#000',
    elevation: 4,
  },

  commentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  textStyle: {
    ...FONTS.h5,
    color: COLORS.black,
  },

  commentImage: {
    width: SIZES.width / 16,
    height: SIZES.height / 18,
    tintColor: COLORS.primary,
  },

  userName: {
    ...FONTS.h4,
    color: COLORS.black,
  },

  commentText: {
    ...FONTS.h4,
    color: COLORS.primary,
  },

  profileHeading: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  totalpost: {
    ...FONTS.h4,
    color: COLORS.primary,
    alignSelf: 'center',
    marginTop: '5%',
  },

  TextinputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  commentConatiner: {
    flexDirection: 'column',
    marginLeft: '2%',
    width: '70%',
    backgroundColor: '#f2f2f2',
    padding: '2%',
    height: SIZES.height / 10,
    borderRadius: 15,
    alignSelf: 'center',
  },
  mediaPlayer: {
    position: 'absolute',
    margin: 5,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    // borderRadius:10,
    width: windowWidth - 50,
    height: '100%',
  },
});

export default Mypost;
