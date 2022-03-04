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
  BackHandler
  
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
const CoockiesCookie = ({navigation}) => {
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

  useEffect(() => {   
    const backAction = () => {

      navigation.navigate('Login');
      
      // Alert.alert("Hold on!", "Are you sure you want to close app?", [
      //   {
      //     text: "Cancel",
      //     onPress: () => null,
      //     style: "cancel"
      //   },
      //   { text: "YES", onPress: () => BackHandler.exitApp() }
      // ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  function Header() {
    return (
      <View style={styles.CustomBorder}>
        <View style={styles.HeaderContainer}>
          <TouchableOpacity onPress={() => {
              navigation.navigate('Login');
            }           
            }>
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
            <Text style={{...FONTS.h3, color: COLORS.primary,alignSelf:'center'}}>Cookie Policy</Text>
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
    <Text style={{fontSize: 20, fontWeight: "bold",marginLeft:"2%"}}>
        Cookies and other storage technologies
    </Text>
      
    <Text style={{fontSize: 15, marginLeft:"2%",marginTop:"3%",textAlign:'justify', marginRight:"2%"}}>
      Cookies are small pieces of text that are used to store information in web browsers. They allow us to store and receive identifiers and additional information on computers, telephones and other devices. Other technologies, including data that we store on your web browser or device, identifiers associated with your device, and other software, are used for similar purposes. For the purposes of this policy, all these technologies are called “cookies”.
    </Text>
    
    <Text style={{fontSize: 15, marginLeft:"2%",marginTop:"3%",textAlign:'justify', marginRight:"2%"}}>
      We use cookies in the following cases: if you have a weRpatients account, use Sunshineoxygen products (including our website and applications) or visit other websites and applications that use Sunshineoxygen products (including the "Like" button or other Sunshineoxygen technologies). Cookies allow weRpatients to offer its products to you and help us understand the information we receive about you, including data about your use of other websites and applications, regardless of whether or not you are registered or logged in.
    </Text>

    <Text style={{fontSize: 15, marginLeft:"2%",marginTop:"3%",textAlign:'justify', marginRight:"2%"}}>
      This policy describes our use of cookies and the options available to you. Unless otherwise indicated in this document, we will treat the data we collect through cookies in accordance with the  weRpatients Data Policy.
    </Text>

    <Text style={{marginTop:"3%",fontSize: 20, fontWeight: "bold",marginLeft:"2%"}}>
    Why do we use cookies?
    </Text>
    <Text style={{fontSize: 15, marginLeft:"2%",marginTop:"1%",textAlign:'justify', marginRight:"2%"}}>
    Cookies help us provide, protect and improve Sunshineoxygen products; allowing us to personalize content, tailor ads and measure performance, and provide greater security. These include session cookies, which are deleted when you close the browser, and persistent cookies, which remain in the browser until they expire or you delete them. Although the cookies we use may change in certain circumstances as we improve and update Sunshineoxygen products, we use them for the following purposes:
    </Text>

    <Text style={{marginTop:"3%",fontSize: 20, fontWeight: "bold",marginLeft:"2%"}}>
    Authentication
    </Text>
    <Text style={{fontSize: 15, marginLeft:"2%",marginTop:"1%",textAlign:'justify', marginRight:"2%"}}>
    We use cookies to verify your account and determine if you are logged in, in order to help you access Sunshieoxygen products and show you the appropriate features and experience.
    </Text>
    <Text style={{fontSize: 15, marginLeft:"2%",marginTop:"1%",textAlign:'justify', marginRight:"2%"}}>
    Cookies also help us remember your browser so that you do not have to constantly log in to Sunshineoxygen and can do so easily through third-party websites and applications. 
    </Text>

    <Text style={{marginTop:"3%",fontSize: 20, fontWeight: "bold",marginLeft:"2%"}}>
    Security and integrity of websites and products
    </Text>
    <Text style={{fontSize: 15, marginLeft:"2%",marginTop:"1%",textAlign:'justify', marginRight:"2%"}}>
    We use cookies to protect your account, your data, and Sunshineoxygen products.
    </Text>
    <Text style={{fontSize: 15, marginLeft:"2%",marginTop:"1%",textAlign:'justify', marginRight:"2%"}}>
    We also use cookies to store information that allows us to recover your account in case you forget your password or to request additional authentication information if you tell us that your account has been hacked. 
    We also use cookies to address activities that may violate our policies or otherwise undermine our ability to provide Sunshineoxygen products.
    </Text>

    <Text style={{marginTop:"3%",fontSize: 20, fontWeight: "bold",marginLeft:"2%"}}>
    Advertising, recommendations, statistics and measurement
    </Text>
    <Text style={{fontSize: 15, marginLeft:"2%",marginTop:"1%",textAlign:'justify', marginRight:"2%"}}>
    We use cookies to display advertisements for companies and other organizations, and to recommend them to people who may be interested in the products, services or causes that these companies promote.
    </Text>

    <Text style={{fontSize: 15, marginLeft:"2%",marginTop:"1%",textAlign:'justify', marginRight:"2%"}}>
    
    </Text>

    <Text style={{fontSize: 15, marginLeft:"2%",marginTop:"1%",textAlign:'justify', marginRight:"2%"}}>
    Cookies help us display and measure ads on different browsers and devices used by the same person.
    </Text>
    <Text style={{fontSize: 15, marginLeft:"2%",marginTop:"1%",textAlign:'justify', marginRight:"2%"}}>
    Cookies also allow us to provide statistics on the people who use Sunshineoxygen products and those who interact with the ads, websites and applications of our advertisers and the companies that use weRpatients products.
    </Text>

    <Text style={{fontSize: 15, marginLeft:"2%",marginTop:"1%",textAlign:'justify', marginRight:"2%"}}>
    </Text>
    <Text style={{fontSize: 15, marginLeft:"2%",marginTop:"1%",textAlign:'justify', marginRight:"2%"}}>
      We also use cookies to help you exclude the display of weRpatients ads based on your activity on third-party websites. An example would be our cookie "oo", which lasts for five years. Learn more about the data we receive, how we decide which ads to show you on and off Sunshineoxygen products, and the controls you have.
    </Text>

    <Text style={{marginTop:"3%",fontSize: 20, fontWeight: "bold",marginLeft:"2%"}}>
    Website functions and services
    </Text>
    <Text style={{fontSize: 15, marginLeft:"2%",marginTop:"1%",textAlign:'justify', marginRight:"2%"}}>
    We use cookies to enable functions that help us provide Sunshineoxygen products.
    </Text>

    <Text style={{fontSize: 15, marginLeft:"2%",marginTop:"1%",textAlign:'justify', marginRight:"2%"}}>
    </Text>
    <Text style={{fontSize: 15, marginLeft:"2%",marginTop:"1%",textAlign:'justify', marginRight:"2%"}}>
      We also use cookies in order to provide you with content relevant to your regional settings.
    </Text>

    <Text style={{marginTop:"3%",fontSize: 20, fontWeight: "bold",marginLeft:"2%"}}>
    Performance
    </Text>
    <Text style={{fontSize: 15, marginLeft:"2%",marginTop:"1%",textAlign:'justify', marginRight:"2%"}}>
    We use cookies to give you the best possible experience.
    </Text>

    <Text style={{marginTop:"3%",fontSize: 20, fontWeight: "bold",marginLeft:"2%"}}>
    Analysis and studies
    </Text>
    <Text style={{fontSize: 15, marginLeft:"2%",marginTop:"1%",textAlign:'justify', marginRight:"2%"}}>
    We use cookies to better understand the use made of Sunshineoxygen products, in order to improve them.
    </Text>

    <Text style={{marginTop:"3%",fontSize: 20, fontWeight: "bold",marginLeft:"2%"}}>
    Third Party Websites and Applications
    </Text>
    <Text style={{fontSize: 15, marginLeft:"2%",marginTop:"1%",textAlign:'justify', marginRight:"2%"}}>
    Our business partners may also choose to share information with weRpatients from cookies placed on their own website domains, regardless of whether you have a weRpatients account or are logged in. Sunshineoxygen cannot access these cookies when you are on a website other than the site where they are located (including our domains), unlike what happens with cookies that are placed on Sunshineoxygne's own domains. However, they are used for the same purposes as cookies from Sunshineoxygen's own domains, which consist of personalizing content (including advertising), measuring the performance of ads, analyzing and offering a safer experience, as detailed. in this Cookie Policy.
    </Text>


    <Text style={{marginTop:"3%",fontSize: 20, fontWeight: "bold",marginLeft:"2%"}}>
    Where do we use cookies?
    </Text>
    <Text style={{fontSize: 15, marginLeft:"2%",marginTop:"1%",textAlign:'justify', marginRight:"2%"}}>
    We can store cookies on your computer or device, and receive information stored in them when you use or visit:
    </Text>

    <Text style={{fontSize: 15, marginLeft:"2%",marginTop:"1%",textAlign:'justify', marginRight:"2%"}}>
    </Text>
    <Text style={{fontSize: 15, marginLeft:"2%",marginTop:"1%",textAlign:'justify', marginRight:"2%"}}>
    Sunshineoxygen’s products;
Products provided by other members of the Sunshineoxygen group of companies; or
the websites and applications of other companies that use Sunshinoxygen products . Sunshineoxygen uses cookies and receives information when you visit these sites and applications, including data about your devices and information about your activity, regardless of whether or not you take any additional action. This process takes place as described, whether you have a weRpatients account and log in, or if you do not have such an account.
    </Text>

    <Text style={{marginTop:"3%",fontSize: 20, fontWeight: "bold",marginLeft:"2%"}}>
    Do other companies use cookies in relation to Sunshineoxygen products?
    </Text>
    <Text style={{fontSize: 15, marginLeft:"2%",marginTop:"1%",textAlign:'justify', marginRight:"2%"}}>
    Yes, other companies use cookies in Sunshineoxygen products to provide us with advertising, measurement, marketing and analysis services, as well as to facilitate certain functions and improve the services we offer you.
    </Text>

    <Text style={{fontSize: 15, marginLeft:"2%",marginTop:"1%",textAlign:'justify', marginRight:"2%"}}>
    </Text>
    <Text style={{fontSize: 15, marginLeft:"2%",marginTop:"1%",textAlign:'justify', marginRight:"2%"}}>
    There are also third-party companies that use cookies on their own websites and applications in connection with Sunshineoxygen products. To find out how other companies use cookies, check their corresponding policies.
    </Text>

    <Text style={{marginTop:"3%",fontSize: 20, fontWeight: "bold",marginLeft:"2%"}}>
    How can you control your information?
    </Text>
    <Text style={{fontSize: 15, marginLeft:"2%",marginTop:"1%",textAlign:'justify', marginRight:"2%"}}>
    We use cookies to personalize and improve content and services, provide a more secure experience, and show you useful and relevant ads on and off weRpatients. You can control how we use the data to show you ads, among other purposes, using the tools described below.
    </Text>

    <Text style={{marginTop:"3%",fontSize: 20, fontWeight: "bold",marginLeft:"2%"}}>
    Manage your cookies
    </Text>
    <Text style={{fontSize: 15, marginLeft:"2%",marginTop:"1%",textAlign:'justify', marginRight:"2%"}}>
    You can manage weRpatients's main advertising cookie and cookies from other companies on weRpatients products in this browser.
    </Text>


    <Text style={{marginTop:"3%",fontSize: 20, fontWeight: "bold",marginLeft:"2%"}}>
    If you have a weRpatients account:
    </Text>
    <Text style={{fontSize: 15, marginLeft:"2%",marginTop:"1%",textAlign:'justify', marginRight:"2%"}}>
    You can use your ad preferences to find out why you see a particular ad and to control how we use the information we collect to show you ads.
    </Text>
    <Text style={{fontSize: 15, marginLeft:"2%",marginTop:"1%",textAlign:'justify', marginRight:"2%"}}>
    To serve you better ads, we use data provided to us by advertisers and other partners about your activity outside of Sunshineoxygen companies' products, including websites and applications. You can indicate whether or not you want us to use this data to show you advertising in the ad settings.
    </Text>

    <Text style={{fontSize: 15, marginLeft:"2%",marginTop:"1%",textAlign:'justify', marginRight:"2%"}}>
    </Text>
    <Text style={{fontSize: 15, marginLeft:"2%",marginTop:"1%",textAlign:'justify', marginRight:"2%"}}>
    weRpatients Audience Network allows advertisers to show you ads on apps and websites outside of Sunshineoxygen companies' products. One of the ways the Audience Network displays relevant ads is by using your ad preferences to determine which ads may interest you. You can control this option in the ad settings.
    </Text>

    <Text style={{marginTop:"3%",fontSize: 20, fontWeight: "bold",marginLeft:"2%"}}>
    All:
    </Text>
    <Text style={{fontSize: 15, marginLeft:"2%",marginTop:"1%",textAlign:'justify', marginRight:"2%"}}>
    You can indicate that you do not want to see interest-based internet ads from weRpatients, Sunshineoxygen or other companies involved through the Digital Advertising Alliance in the US, the Digital Advertising Alliance of Canada in Canada, or the European Interactive Digital Advertising Alliance in Europe, or by configuring your mobile device, provided the relevant option is available, on Android, iOS 13 or an earlier version of iOS. Keep in mind that ad blockers and tools that limit the use of our cookies can affect these controls.
    </Text>


    <Text style={{marginTop:"3%",fontSize: 20, fontWeight: "bold",marginLeft:"2%"}}>
    More information about internet advertising:
    </Text>
    <Text style={{fontSize: 15, marginLeft:"2%",marginTop:"1%",textAlign:'justify', marginRight:"2%"}}>
    The advertising companies we work with often use cookies and similar technologies as part of their services.
    </Text>

    <Text style={{marginTop:"3%",fontSize: 20, fontWeight: "bold",marginLeft:"2%"}}>
    For more information on how advertisers use cookies and the options they offer, see the following web addresses:
    </Text>
    <Text style={{fontSize: 15, marginLeft:"2%",marginTop:"1%",textAlign:'justify', marginRight:"2%"}}>
      • Digital Advertising Alliance (https://optout.aboutads.info/?c=2&lang=EN)
	  </Text>

    <Text style={{fontSize: 15, marginLeft:"2%",marginTop:"1%",textAlign:'justify', marginRight:"2%"}}>
      •	Digital Advertising Alliance of Canada (https://youradchoices.ca/)
	  </Text>

    <Text style={{fontSize: 15, marginLeft:"2%",marginTop:"1%",textAlign:'justify', marginRight:"2%"}}>
    •	European Interactive Digital Advertising Alliance (http://www.youronlinechoices.eu/)
    </Text>

    <Text style={{marginTop:"3%",fontSize: 20, fontWeight: "bold",marginLeft:"2%"}}>
    Browser cookie controls:
    </Text>
    <Text style={{fontSize: 15, marginLeft:"2%",marginTop:"1%",textAlign:'justify', marginRight:"2%"}}>
    In addition, your browser or your device may offer settings that allow you to indicate whether you want browser cookies to be used and to eliminate them. These controls vary depending on the browser, and manufacturers can change both the settings they make available to you and how they work at any time. As of June 23, 2021, you can find more information about the controls offered by the most popular browsers in the links available below. 
	  </Text>

    <Text style={{marginTop:"3%",fontSize: 20, fontWeight: "bold",marginLeft:"2%"}}>
    Certain weRpatients and Sunshineoxygne products may not work properly if you disable the use of browser cookies. Keep in mind that these controls are different from those offered by:
    </Text>
    <Text style={{fontSize: 15, marginLeft:"2%",marginTop:"1%",textAlign:'justify', marginRight:"2%"}}>
    •	weRpatients
    </Text>
    <Text style={{fontSize: 15, marginLeft:"2%",marginTop:"1%",textAlign:'justify', marginRight:"2%"}}>
    •	Sunshineoxygen
    </Text>
    <Text style={{fontSize: 15, marginLeft:"2%",marginTop:"1%",textAlign:'justify', marginRight:"2%"}}>
    •	Google Chrome (https://support.google.com/chrome/answer/95647)
    </Text>
    <Text style={{fontSize: 15, marginLeft:"2%",marginTop:"1%",textAlign:'justify', marginRight:"2%"}}>
    •	Internet explorer (https://support.microsoft.com/en-us/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d)
    </Text>
    <Text style={{fontSize: 15, marginLeft:"2%",marginTop:"1%",textAlign:'justify', marginRight:"2%"}}>
    •	Firefox (https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop)
    </Text>
    <Text style={{fontSize: 15, marginLeft:"2%",marginTop:"1%",textAlign:'justify', marginRight:"2%"}}>
    •	Safari (https://support.apple.com/en-ie/guide/safari/sfri11471/mac)
    </Text>
    <Text style={{fontSize: 15, marginLeft:"2%",marginTop:"1%",textAlign:'justify', marginRight:"2%"}}>
    •	Safari Mobile (https://support.apple.com/en-us/HT201265)
    </Text>
    <Text style={{fontSize: 15, marginLeft:"2%",marginTop:"1%",textAlign:'justify', marginRight:"2%"}}>
    •	Opera (https://blogs.opera.com/news/2015/08/how-to-manage-cookies-in-opera/)
	  </Text>

    <Text style={{marginTop:"3%",fontSize: 20, fontWeight: "bold",marginLeft:"2%"}}>
    Version: 9 August 2021
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

export default CoockiesCookie;
