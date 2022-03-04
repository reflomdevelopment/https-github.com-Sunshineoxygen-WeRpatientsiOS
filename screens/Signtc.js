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
  Dimensions
  
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

  // const array = [{id:1,image:images.Avatr1,heading:'Oncology',username:'User Name',time:'05',
  //                posttitle:'lorem ipsum',description:"Lorem Ipsum is simply dummy text of. imply dummy text of.imply dummy text of.imply dummy text of.imply dummy text of.imply dummy text of.imply dummy text of.ever since the 1500s, when an unknown printersum."
  //                },]







  function Header() {
    return (
      <View style={styles.CustomBorder}>
        <View style={styles.HeaderContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('SignUpAvatar')}>
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
            <Text style={{...FONTS.h3, color: COLORS.primary,marginLeft:"49%"}}>Terms of use</Text>
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
      <Text style={{fontSize: 20,
    fontWeight: "bold",marginLeft:"2%"}}>
        Terms of use.
      </Text>
      <Text style={{fontSize: 15,
    marginLeft:"2%",marginTop:"3%",textAlign:'justify', marginRight:"2%",}}>
       <Text style={{fontWeight: "bold"}}> Hello and welcome </Text>
      to the weRpatients community. 
         </Text>
         <Text style={{fontSize: 15,
    marginLeft:"2%",marginTop:"3%",textAlign:'justify', marginRight:"2%"}}>
    The following permissions are required for use app</Text>
    <Text style={{fontSize: 15,
    marginLeft:"2%",marginTop:"3%",textAlign:'justify', marginRight:"2%"}}>
    Camera permissions-for join a video event and video call. </Text>
    <Text style={{fontSize: 15,
    marginLeft:"2%",marginTop:"3%",textAlign:'justify', marginRight:"2%"}}>
    Storage permissions-for post a video and image. </Text>
      <Text style={{fontSize: 15,
    marginLeft:"2%",marginTop:"3%",textAlign:'justify', marginRight:"2%"}}>
    An open community of patients, healthcare professionals, caretakers and caregivers, where you can share and open discussion about prefered pathologies on weRpatients keeping your confidential identity through a nickname and avatar. </Text>
      
    <Text style={{fontSize: 15,
    marginLeft:"2%",marginTop:"3%",textAlign:'justify', marginRight:"2%"}}>
   With a single purpose to empower the patients of the future to capacitate them to understand their health conditions and to be able to decide from a position of knowledge we launch this patient community. 
    </Text>
      
    <Text style={{fontSize: 15,
    marginLeft:"2%",marginTop:"3%",textAlign:'justify', marginRight:"2%"}}>
   We are Sunshinoxygen, a new helathtech concept committed with the progress of health vehiculized by technology and focused on the humanization of the patient. These Terms govern your use of weRpatients, Sunshineoxygen products and services, technologies and software that we offer (Sunshineoxygen products or products), except where we expressly state that conditions other than these apply. These Products are provided to you by Sunshineoxygen S.L.
    </Text>
      
    <Text style={{fontSize: 15,
    marginLeft:"2%",marginTop:"3%",textAlign:'justify', marginRight:"2%"}}>
  We do not charge you for the use of weRpatients or the rest of the products and services that are included in these Conditions. Instead, companies and organizations pay us to show you advertising about their products or services. By using our Products, you agree that we will show you advertisements that we consider relevant to you and your interests. We use your personal data when determining which ads we show you.
    </Text>
      

    <Text style={{fontSize: 15,
    marginLeft:"2%",marginTop:"3%",textAlign:'justify', marginRight:"2%"}}>
  We do not share any information with them that directly identifies you (such as your name, email address or other contacting information), unless you give us specific permission. Instead, advertisers provide us with information, such as the type of audience they want to reach with their ads, and we show them to people who may be interested in them. We also provide advertisers with reports on their advertising performance so they know how people are interacting with their content. See Section 2 below for more information on this.  </Text>


  <Text style={{fontSize: 15,
    marginLeft:"2%",marginTop:"3%",textAlign:'justify', marginRight:"2%"}}>
  Our Data Policy details how we collect and use your personal data to determine some of the ads you see and to be able to offer the rest of the services described below. In weRpatients settings you can also check the privacy options you have at your disposal whenever you want to determine how we use your data.
    </Text>

    <Text style={{fontSize: 20,
    fontWeight: "bold",marginLeft:"2%",marginTop:"2%"}}>
       1. The services we offer
      </Text>

      <Text style={{fontSize: 15,
    marginLeft:"2%",marginTop:"3%",textAlign:'justify', marginRight:"2%"}}>
  Our goal is to give people the possibility of creating communities around different pathologies, share information and empower patients to be able to understand, manage and be able to take informed decisions about their healthcare conditions we offer you the cross-border Products and services described below:  </Text>
  <Text style={{fontSize: 20,
    marginLeft:"2%",marginTop:"2%"}}>
     We provide you with a personalized experience:
      </Text>
      <Text style={{fontSize: 18,
    fontWeight: "bold",marginLeft:"2%",marginTop:"3%",textAlign:'justify', marginRight:"2%",marginLeft:"2%"}}>
          • We provide experiences on weRpatients, that can help to empower the patient of the future. 
      </Text>
      <Text style={{fontSize: 18,
    fontWeight: "bold",marginLeft:"2%",marginTop:"3%",textAlign:'justify', marginRight:"2%",marginLeft:"2%"}}>
         
    • We connect you with a health community of patients, caretakers, caregivers and healthcare professionals and care services that might be of your interest:</Text>


    <Text style={{fontSize: 15,
    marginLeft:"2%",marginTop:"3%",textAlign:'justify', marginRight:"2%"}}>
  in order to help you to be informed and understand day by day more and more the pathology that you have or you are dealing with as a professional and caretaker or caregiver. 
    </Text>

    <Text style={{fontSize: 18,
    fontWeight: "bold",marginLeft:"2%",marginTop:"3%",textAlign:'justify', marginRight:"2%",marginLeft:"2%"}}>
        
    • We protect and support our community with our administrator account that avoids out of place behaviors.
        
         </Text>
         <Text style={{fontSize: 18,
    fontWeight: "bold",marginLeft:"2%",marginTop:"3%",textAlign:'justify', marginRight:"2%",marginLeft:"2%"}}>
        
    • We update our cutting-edge technologies to offer safe and functional services ad-hoc to all populations. 
         </Text>
         <Text style={{fontSize: 18,
    fontWeight: "bold",marginLeft:"2%",marginTop:"3%",textAlign:'justify', marginRight:"2%",marginLeft:"2%"}}>
   
     • We give you access to a shared community health information platform where you can share contents about what is interesting or important for you.

         </Text>

         <Text style={{fontSize: 18,
    fontWeight: "bold",marginLeft:"2%",marginTop:"3%",textAlign:'justify', marginRight:"2%",marginLeft:"2%"}}>
           
        • We help you discover up-to-date health content, products and services that may interest you.     
         </Text>

         <Text style={{fontSize: 18,
    fontWeight: "bold",marginLeft:"2%",marginTop:"3%",textAlign:'justify', marginRight:"2%",marginLeft:"2%"}}>
            
        • We put you in contact with top rated community members that can bring their own opinions and point of views of your healthcare condition.     
         </Text>

         <Text style={{fontSize: 18,
    fontWeight: "bold",marginLeft:"2%",marginTop:"3%",textAlign:'justify', marginRight:"2%",marginLeft:"2%"}}>
          
        • We conduct studies to find ways to improve healthcare and improve products and services involving public-private partnerships.    
         </Text>

         
         <Text style={{fontSize: 20,
    fontWeight: "bold",marginLeft:"2%",marginTop:"3%"}}>
     2. Your commitments to weRpatients and our community
      </Text>

      <Text style={{fontSize: 15,
    marginLeft:"2%",marginTop:"3%",textAlign:'justify', marginRight:"2%"}}>
    We make these services available to you and others in order to fulfill our purpose. In return, you must commit to the following with us:</Text>
     
    <Text style={{fontSize: 15,
    marginLeft:"2%",marginTop:"3%",textAlign:'justify', marginRight:"2%"}}>
  • Who can use weRpatients:  </Text>

  <Text style={{fontSize: 15,
    marginLeft:"2%",marginTop:"3%",textAlign:'justify', marginRight:"2%"}}>
  1) Patients </Text>
  <Text style={{fontSize: 15,
    marginLeft:"2%",marginTop:"3%",textAlign:'justify', marginRight:"2%"}}>
 2) healthcare professionals </Text>
  <Text style={{fontSize: 15,
    marginLeft:"2%",marginTop:"3%",textAlign:'justify', marginRight:"2%"}}>
3) caretakers </Text>
  <Text style={{fontSize: 15,
    marginLeft:"2%",marginTop:"3%",textAlign:'justify', marginRight:"2%"}}>
 4) caregivers  </Text>
  <Text style={{fontSize: 15,
    marginLeft:"2%",marginTop:"3%",textAlign:'justify', marginRight:"2%"}}>
  5) Others: people interested in a certain health condition or pathology.  </Text>
  
  <Text style={{fontSize: 15,
    marginLeft:"2%",marginTop:"3%",textAlign:'justify', marginRight:"2%"}}>
  • You cannot use weRpatients in the following cases:   </Text>
  <Text style={{fontSize: 15,
    marginLeft:"2%",marginTop:"3%",textAlign:'justify', marginRight:"2%"}}>
  1) Under 18 years of age. </Text>
  <Text style={{fontSize: 15,
    marginLeft:"2%",marginTop:"3%",textAlign:'justify', marginRight:"2%"}}>
 2) We have disabled your account previously for not accomplishing our Terms and Policies.  </Text>
  <Text style={{fontSize: 15,
    marginLeft:"2%",marginTop:"3%",textAlign:'justify', marginRight:"2%"}}>
3) Applicable law prohibits you from accessing our products, services and software. </Text>

<Text style={{fontSize: 15,
    marginLeft:"2%",marginTop:"3%",textAlign:'justify', marginRight:"2%"}}>
  • Do not share your password or give other people access to your weRpatients account, or transfer your account to them (without our permission).   </Text>

  <Text style={{fontSize: 15,
    marginLeft:"2%",marginTop:"3%",textAlign:'justify', marginRight:"2%"}}>
  • Sunshineoxygen reserves the right to delete your account even if we consider it to be an improper or fraudulent use or for not accomplishing our Terms and Policies.   </Text>


  <Text style={{fontSize: 18,
    fontWeight: "bold",marginLeft:"2%",marginTop:"3%",textAlign:'justify', marginRight:"2%",marginLeft:"2%"}}>
        
    •Intellectual property, you have your rights for the property contents that are yours  as we do have the intellectual property of our contents, thus if you consider sharing any of our content you need our previous written consent. Please address to  
    <Text  style={{fontSize: 18,color: "#1e90ff",textDecorationLine: 'underline',
    fontWeight: "bold",marginLeft:"2%",marginTop:"3%",textAlign:'justify', marginRight:"2%",marginLeft:"2%"}}>
   {' '}
     hello@sunshineoxygen.com</Text> to ask for content approval.   
         </Text>


   
   
{/* <Text style={{fontSize: 20,
    fontWeight: "bold",marginLeft:"2%",marginTop:"3%"}}>
Contact Us
      </Text>
      <Text style={{fontSize: 15,
    marginLeft:"2%",marginTop:"3%",textAlign:'justify', marginRight:"2%"}}>
   If you have any questions or suggestions about our Terms of use, do not hesitate to contact us at weRpatients@gmail.com. 
</Text> */}
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
