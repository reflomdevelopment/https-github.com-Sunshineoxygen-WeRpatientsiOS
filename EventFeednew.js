import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  Share,
  ImageBackground,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  ActivityIndicator,
  ToastAndroid,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {COLORS, FONTS, icons, images, SIZES} from '../constants';
import ReadMore from '@fawazahmed/react-native-read-more';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-community/async-storage';
import TimeAgo from 'react-native-timeago';
import Video from 'react-native-video';
import AddText from '../screens/AddText';

import AddVideo from '../screens/AddVideo';
import AddPodcast from '../screens/AddPodcast';
import AddEvent from '../screens/AddEvent';
import AddDebeate from '../screens/AddDebeate';
import Sound from 'react-native-sound';
//Media Controls to control Play/Pause/Seek and full screen
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
import {color, set} from 'react-native-reanimated';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Item} from 'native-base';
import AddImage from './AddImage';
import moment from 'moment';

const Feed = ({navigation}) => {
  const [isLoadinglike, setLoadinglike] = useState(false);
  const [countlike, setcountlike] = useState(20);
  const [comment, setcomment] = useState(50);
  const commentArray = ['hrjhb', 'djfdjfkjdkj'];

  const [defaultRating, setDefaultRating] = useState(0);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  const [isModalVisible1, setModalVisible1] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);

  const [likeImage, setLikeimage] = useState(false);
  const [CommentImage, setcommentImage] = useState(false);

  const [Userregion, setUserregion] = useState('');
  const [isLoading1, setLoading1] = useState(true);
  const [PathologyArray1, setPathologyArray1] = useState('');
  const [PathologyArray2, setPathologyArray2] = useState('');
  const [Useridno, setUseridno] = useState('');
  const [loading5, setLoading5] = React.useState(false);

  //post conts
  const [Postid1, setPostid1] = useState('');
  const [Userpics, setUserpics] = useState('');
  const [Usernames, setUsernames] = useState('');
  const [Counteyname, setCounteyname] = useState('');
  const [Posttimeago, setPosttimeago] = useState('');
  const [Posttitle, setPosttitle] = useState('');
  const [Postdesc, setPostdesc] = useState('');
  const [Postimage, setPostimage] = useState('');
  const [Postnooflike, setPostnooflike] = useState('');
  const [Postnoofcomment, setPostnoofcomment] = useState('');
  const [Postlikeornot, setPostPostlikeornot] = useState('');
  const [Postratingstautus, setPostratingstautus] = useState('');
  const [Pathologyname, setPathologyname] = useState('');
  const [array, setarray] = useState('');
  const [Userpostcomment, setUserpostcomment] = React.useState('');
  const [Usercomments, setUsercomments] = React.useState('');
  const [Usercommentsreply, setUsercommentsreply] = React.useState('');
  const [Userreplycomment, setUserreplycomment] = React.useState('');
  const timer = useRef(null);
  async function ratingfilltest(name, name2, event){
    console.log(name)
    console.log(name2)
  
    clearInterval(timer.current);
    setDefaultRating(name2)
    console.log(name)
    // alert(name)
    let newMarkers = array.map(el => (
      el.PostID===name ? {...el, defRate:name2}: el
))
console.log("hyyy")
console.log(newMarkers)
setarray(newMarkers)

// this.setState({ markers });
setTimeout(() => {
  timer.current = setInterval(() => feedupdatenow(), 15000);
    return () => clearInterval(timer.current);
}, 20000);
  }
  async function getMemberProfile() {
    let user_mps = await AsyncStorage.getItem('userid');

    await fetch(
      'https://www.werpatients.com/sunshineoxygenadmin/api/Post/patho/' + user_mps,
    )
      .then(response => response.json())
      .then(responseJson1 => {
        console.log('responseJson1', responseJson1[0].PathologyID);
        console.log('responseJson2', responseJson1[1].PathologyID);
        setPathologyArray1(responseJson1[0].PathologyID);
        setPathologyArray2(responseJson1[1].PathologyID);

        setUseridno(user_mps);
        fetch(
          'https://www.werpatients.com/sunshineoxygenadmin/api/Post/region/' + user_mps,
        )
          .then(response => response.json())
          .then(responseJson2 => {
            console.log('responseJson3', responseJson2[0].Region);
            setUserregion(responseJson2[0].Region);

            //  setLoading1(false)

            console.log('responseJsonkk', responseJson1[0].PathologyID);
            console.log('responseJsonkkk', responseJson1[1].PathologyID);
            console.log('responseJsonkkk', responseJson2[0].Region);

            if (global.myoptioncheck === 'Event') {
              console.log('event' + responseJson2[0].Region);
              fetch(
                'https://www.werpatients.com/sunshineoxygenadmin/api/Event/Evedet/' +
                  user_mps +
                  '/' +
                  responseJson1[0].PathologyID +
                  '/' +
                  responseJson1[1].PathologyID,
              )
                .then(response => response.json())
                .then(responseJson => {
                  console.log('responseJson', responseJson);
                  console.log('hh');
                  setarray(responseJson);
                  setLoading1(false);
                });
            } else {
              fetch(
                'https://www.werpatients.com/sunshineoxygenadmin/api/Post/region_post/' +
                  user_mps +
                  '/' +
                  global.myoptioncheck +
                  '/' +
                  responseJson2[0].Region +
                  '/' +
                  responseJson1[0].PathologyID +
                  '/' +
                  responseJson1[1].PathologyID,
              )
                .then(response => response.json())
                .then(responseJson => {
                  console.log('responseJson', responseJson);

                  setarray(responseJson);
                  setLoading1(false);
                });
            }
          });
      })
      .catch(err => console.log(err));

    // await fetch('https://www.werpatients.com/sunshineoxygenadmin/api/Signup/get_user_type')
    // .then((response) => response.json())
    // .then((responseJson) => {
    //     console.log("responseJson",responseJson);
    //     setProfileType(responseJson)

    //     setLoading1(false)

    // }).catch(err => console.log(err))
    //                      let timer1 = setInterval(() => getMemberProfile(), 5000);
    // return () => clearInterval(timer1)
  }

  useEffect(() => {
    getMemberProfile11();
    async function getMemberProfile11() {
      console.log('feed');

      let user_mps = await AsyncStorage.getItem('userid');

      await fetch(
        'https://www.werpatients.com/sunshineoxygenadmin/api/Post/patho/' + user_mps,
      )
        .then(response => response.json())
        .then(responseJson1 => {
          console.log('responseJson1', responseJson1[0].PathologyID);
          console.log('responseJson2', responseJson1[1].PathologyID);
          setPathologyArray1(responseJson1[0].PathologyID);
          setPathologyArray2(responseJson1[1].PathologyID);

          global.PathologyArray1 = responseJson1;
          global.pathology1function = responseJson1[0].PathologyID;
          global.pathology2function = responseJson1[1].PathologyID;
          global.useridfunction = user_mps;
          setUseridno(user_mps);

          fetch(
            'https://www.werpatients.com/sunshineoxygenadmin/api/Post/region/' +
              user_mps,
          )
            .then(response => response.json())
            .then(responseJson2 => {
              console.log('responseJson3', responseJson2[0].Region);
              setUserregion(responseJson2[0].Region);
              global.Userregion = responseJson2[0].Region;
              global.regionfunction = responseJson2[0].Region;

              //  setLoading1(false)

              console.log('responseJsonkk', responseJson1[0].PathologyID);
              console.log('responseJsonkkk', responseJson1[1].PathologyID);
              console.log('responseJsonkkk', responseJson2[0].Region);

              if (global.myoptioncheck === 'Event') {
                setLoading1(true);
                fetch(
                  'https://www.werpatients.com/sunshineoxygenadmin/api/Event/Evedet/' +
                    user_mps +
                    '/' +
                    responseJson1[0].PathologyID +
                    '/' +
                    responseJson1[1].PathologyID,
                )
                  .then(response => response.json())
                  .then(responseJson => {
                    console.log('responseJson', responseJson);
                    console.log('hh');
                    setarray(responseJson);
                    setLoading1(false);
                  });
              }
            });
        })
        .catch(err =>
          alert(
            err +
              '\n Reason:Please check Internet \n Or \n Server Down\n Solution:Restart app/Try after sometime',
          ),
        );
    }

    // timer.current = setInterval(() => feedupdatenow(), 5000);
    // return () => clearInterval(timer.current);
  }, []);

  // const array = [{id:1,image:images.Avatr1,heading:'Oncology',username:'User Name',time:'05',
  //                posttitle:'lorem ipsum',description:"Lorem Ipsum is simply dummy text of. imply dummy text of.imply dummy text of.imply dummy text of.imply dummy text of.imply dummy text of.imply dummy text of.ever since the 1500s, when an unknown printersum."
  //                },]

  //  const array = [{"PostID":"16","Title":null,"Description":"Lorem Ipsum is simply dummy text of. imply dummy text of.imply dummy text of.imply dummy text of.imply dummy text of.imply dummy text of.imply dummy text of.ever since the 1500s, when an unknown printersumpost","PostType":"1","Region":"Delhi","EndDate":null,"PostOverallRating":null,"CreatedAt":"2021-05-31 08:40:43","NickName":"toptesting","AvatarID":"1","Country":"India","PathologyName":"glaucoma","PathologyDescription":"","image":[],"status":"0","ratingstatus":"0","comment":"10","react":"10"}]
  async function feedupdatenow() {
    if (
      global.pathology1function != null ||
      global.pathology2function != null ||
      global.useridfunction != null ||
      global.global.regionfunction != null
    ) {
      fetch(
        'https://www.werpatients.com/sunshineoxygenadmin/api/Event/Evedet/' +
          global.useridfunction +
          '/' +
          global.pathology1function +
          '/' +
          global.pathology2function,
      )
        .then(response => response.json())
        .then(responseJson => {
          console.log('responseJson', responseJson);
          console.log('hh');
          setarray(responseJson);
          setLoading1(false);
        });
    }
  }

  const commentarry1 = [
    {
      CommentID: '8',
      Comment: 'testing only',
      CommentFileName: 'user1',
      CreatedAt: '2021-06-02 15:40:12',
      NickName: 'toptesting',
      AvatarID: '1',
      status: '0',
    },
  ];
  const toggleModal = txt => {
    setModalVisible1(!isModalVisible1);
    setUsercomments('');
    // setLoading2(true)
    fetch(
      'https://www.werpatients.com/sunshineoxygenadmin/api/Event/comment/' +
        Useridno +
        '/' +
        txt,
    )
      .then(response => response.json())
      .then(json => setUsercomments(json))
      .catch(error => console.error(error));
    //   setLoading2(false)
    //   setModalVisible(!isModalVisible);
    var userclickpostid = '';
    global.userclickpostid = txt;
    console.log(global.userclickpostid);
    // setcomment(comment+1);
    // setcommentImage(!CommentImage)
  };

  const toggleModal2 = txt => {
    setUsercommentsreply('');
    fetch(
      'https://www.werpatients.com/sunshineoxygenadmin/api/Post/rply/' +
        Useridno +
        '/' +
        txt,
    )
      .then(response => response.json())
      .then(json => setUsercommentsreply(json))
      .catch(error => console.error(error));
    var commentid = '';
    global.commentid = txt;

    setModalVisible2(!isModalVisible2);
  };

  const Replycomment = () => {
    if (Userreplycomment == '') {
      ToastAndroid.showWithGravity(
        'Please enter reply ! ',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return false;
    }

    setLoading5(true);
    var formData = new FormData();
    formData.append('Reply', Userreplycomment);

    fetch(
      'https://www.werpatients.com/sunshineoxygenadmin/api/Post/repli/' +
        Useridno +
        '/' +
        global.commentid,
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
          setUserreplycomment('');

          ToastAndroid.showWithGravity(
            'Reply successfully added to comment! ',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          setLoading5(false);
          fetch(
            'https://www.werpatients.com/sunshineoxygenadmin/api/Post/rply/' +
              Useridno +
              '/' +
              global.commentid,
          )
            .then(response => response.json())
            .then(json => setUsercommentsreply(json))
            .catch(error => console.error(error));
          //  var commentid=""
          //  global.commentid=txt
        } else {
          setLoading5(false);
          // toggleModal1()
          // return false;
        }
      });
  };

  async function likepost(txt) {
    //  setLoadinglike(true)

    ToastAndroid.showWithGravity(
      'Please wait..! ',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
    await fetch(
      'https://www.werpatients.com/sunshineoxygenadmin/api/Event/Like/' +
        Useridno +
        '/' +
        txt,
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log('responseJson reflom', responseJson);
        if (responseJson.status == 'Success') {
          // ToastAndroid.showWithGravity(
          //   "Your like added to this post! ",
          //   ToastAndroid.SHORT,
          //   ToastAndroid.CENTER,
          // );
        }
        if (responseJson.status == 'deleted') {
          // ToastAndroid.showWithGravity(
          //   "Your like removed from this post! ",
          //   ToastAndroid.SHORT,
          //   ToastAndroid.CENTER,
          // );
        }
        console.log(
          'https://www.werpatients.com/sunshineoxygenadmin/api/Post/region_post/' +
            Useridno +
            '/1/' +
            Userregion +
            '/' +
            PathologyArray1 +
            '/' +
            PathologyArray2,
        );
      })
      .catch(err => console.log(err));
    if (global.myoptioncheck === 'Event') {
      fetch(
        'https://www.werpatients.com/sunshineoxygenadmin/api/Event/Evedet/' +
          Useridno +
          '/' +
          PathologyArray1 +
          '/' +
          PathologyArray2,
      )
        .then(response => response.json())
        .then(responseJson => {
          console.log('responseJson', responseJson);
          console.log('hh');
          setarray(responseJson);
          // setLoading1(false)
        });
    }
    setTimeout(function () {
      setLoadinglike(false);
    }, 900);

    // setcountlike(countlike+1);
    // setLikeimage(!likeImage)
  }

  // async function  submitrating(txt){
  // console.log( defaultRating)
  // alert(txt)
  // await fetch('http://werpatient.reflomsolutions.com/api/Post/rating/'+Useridno+'/'+txt)
  //   .then((response) => response.json())
  //   .then((responseJson) => {
  //     console.log("responseJson reflom",responseJson);
  //     if (responseJson.status == 'Success') {
  //       ToastAndroid.showWithGravity(
  //         "Thanks for rating post! ",
  //         ToastAndroid.SHORT,
  //         ToastAndroid.CENTER,
  //       );
  //     }
  //   }
  // }

  async function submitrating(txt) {
    var formData = new FormData();
    formData.append('Rating', defaultRating);

    fetch(
      'https://www.werpatients.com/sunshineoxygenadmin/api/Event/rating/' +
        Useridno +
        '/' +
        txt,
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
          setUserreplycomment('');

          ToastAndroid.showWithGravity(
            'Thanks for post rating ! ',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          getMemberProfile();
          //  var commentid=""
          //  global.commentid=txt
        } else {
          // toggleModal1()
          // return false;
        }
      });
  }

  async function postcomments() {
    if (Userpostcomment == '') {
      ToastAndroid.showWithGravity(
        'Please enter comment ! ',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );

      return false;
    }
    setLoading5(true);

    var formData = new FormData();
    formData.append('Comment', Userpostcomment);
    fetch(
      'https://www.werpatients.com/sunshineoxygenadmin/api/Event/note/' +
        Useridno +
        '/' +
        global.userclickpostid,
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
          ToastAndroid.showWithGravity(
            'Comment successfully added to post! ',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          setUserpostcomment('');
          setLoading5(false);
          fetch(
            'https://www.werpatients.com/sunshineoxygenadmin/api/Event/comment/' +
              Useridno +
              '/' +
              global.userclickpostid,
          )
            .then(response => response.json())
            .then(json => setUsercomments(json))
            .catch(error => console.error(error));
        } else {
          setloading5(false);

          // toggleModal()
          // return false;
        }
      });
  }

  async function sharepost(name, name2, event) {
    if (name == null) {
      name = '';
    }
    try {
      const result = await Share.share({
        message:
          name +
          ' ' +
          name2 +
          ' ' +
          'For more latest update please download We R  Patient app https://werpatient.reflomsolutions.com',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  }
  const videoPlayer = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
  const [screenType, setScreenType] = useState('content');

  const onSeek = seek => {
    //Handler for change in seekbar
    videoPlayer.current.seek(seek);
  };

  const onPaused = playerState => {
    //Handler for Video Pause
    setPaused(!paused);
    setPlayerState(playerState);
  };

  const onReplay = () => {
    //Handler for Replay
    setPlayerState(PLAYER_STATES.PLAYING);
    videoPlayer.current.seek(0);
  };

  const onProgress = data => {
    // Video Player will progress continue even if it ends
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      setCurrentTime(data.currentTime);
    }
  };

  const onLoad = data => {
    setDuration(data.duration);
    setIsLoading(false);
  };

  const onLoadStart = data => setIsLoading(true);

  const onEnd = () => setPlayerState(PLAYER_STATES.ENDED);

  const onError = () => alert('Oh! ', error);

  const exitFullScreen = () => {
    alert('Exit full screen');
  };

  const enterFullScreen = () => {};

  const onFullScreen = () => {
    setIsFullScreen(isFullScreen);
    if (screenType == 'content') setScreenType('cover');
    else setScreenType('content');
  };

  const renderToolbar = () => (
    <View>
      <Text style={styles.toolbar}> toolbar </Text>
    </View>
  );

  const onSeeking = currentTime => setCurrentTime(currentTime);

  const CustomRatingBar = () => {
    return (
      <View style={styles.customRatingBarStyle}>
        {maxRating.map((item, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => setDefaultRating(item) + console.log(item)}>
              <Image
                style={styles.starImageStyle}
                source={
                  item <= defaultRating ? images.starfill : images.starempty
                }
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  async function playTrack(txt) {
    const track = new Sound(
      'https://www.werpatients.com/assets/mediauphotu/' + txt,
      null,
      e => {
        if (e) {
          console.log('error loading track:', e);
        } else {
          track.play();
        }
      },
    );
  }

  return (
    <View>
      {isLoading1 ? (
        <View style={{flex: 1, paddingTop: '15%'}}>
          <ActivityIndicator animating={true} color={'#253A79'} />
          <Text style={{color: '#253A79', fontSize: 15, textAlign: 'center'}}>
            Please wait as we load your data
          </Text>
        </View>
      ) : (
        <SafeAreaView>
          {global.myoptioncheck === '1' ? <AddText /> : null}
          {global.myoptioncheck === '2' ? <AddImage /> : null}
          {global.myoptioncheck === '3' ? <AddVideo /> : null}
          {global.myoptioncheck === '5' ? <AddPodcast /> : null}
          {global.myoptioncheck === '4' ? <AddDebeate /> : null}
          {global.myoptioncheck === 'Event' ? <AddEvent /> : null}
          {array.map((item, index) => (
            <View style={styles.mainCard} key={index}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={{
                    uri:
                      'https://www.werpatients.com/assets/avatar/' +
                      item.AvatarPic,
                  }}
                  resizeMode="contain"
                  style={{width: SIZES.width / 5, height: SIZES.height / 7}}
                />

                {/* <Image  
        //  source={item.image}
        source={images.Avatr1}
         
          resizeMode="contain"
           style={{width:SIZES.width/5,height:SIZES.height/7,}}
          /> */}
                {/* <Text>hggjgggjhg</Text> */}
                <View style={{marginLeft: 10}}>
                  <Text style={styles.heading}>{item.PathologyName}</Text>
                  <Text style={styles.userName}>{item.NickName}</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 2,
                      width: SIZES.width / 2.5,
                      justifyContent: 'space-between',
                    }}>
                    <Image
                      source={{
                        uri:
                          'https://www.werpatients.com/assets/Flag/' +
                          item.Flag,
                      }}
                      resizeMode="contain"
                      style={{width: 20, height: 20}}
                    />
                    <Text>{item.Country}</Text>
                    <View
                      style={{
                        width: 8,
                        height: 8,
                        backgroundColor: 'red',
                        borderRadius: 10,
                      }}></View>

                    <Text>
                      {moment
                        .utc(item.System_Created_date)
                        .local()
                        .startOf('seconds')
                        .fromNow()
                        .replace('a few seconds ago', 'a few sec ago')}
                    </Text>

                    {/* <TimeAgo time= {item.CreatedAt} mins ago /> */}
                    {/* <Text>{item.CreatedAt} mins ago</Text> */}
                  </View>
                </View>
              </View>
              <View>
                {global.myoptioncheck === '4' ? (
                  <Text
                    onPress={() =>
                      navigation.navigate('Debate', {postid: item.PostID})
                    }
                    style={styles.userName}>
                    {item.Title}
                  </Text>
                ) : (
                  <Text
                    onPress={() =>
                      navigation.navigate('EventDescription', {
                        postid: item.PostID,
                      })
                    }
                    style={styles.userName}>
                    {item.Title}
                  </Text>
                )}

                {/* <Text style={styles.userName}>{item.Title}</Text> */}
                <ReadMore
                  numberOfLines={2}
                  style={styles.textStyle}
                  seeMoreStyle={{color: COLORS.primary, ...FONTS.h5}}
                  seeLessStyle={{color: COLORS.primary, ...FONTS.h5}}>
                  {item.Description}
                </ReadMore>
              </View>

              {global.myoptioncheck === '1' ? <Text></Text> : null}

              {global.myoptioncheck === '2' ? (
                <View
                  style={{
                    width: SIZES.width / 1.2,
                    height: SIZES.height / 4,
                    marginTop: '5%',
                  }}>
                  <FlatList
                    data={item.image}
                    horizontal
                    pagingEnabled
                    scrollEnabled
                    snapToAlignment="center"
                    scrollEventThrottle={16}
                    decelerationRate={'fast'}
                    showsHorizontalScrollIndicator={false}
                    //  keyExtractor={({ Postid1 }, index) => PostID1}
                    keyExtractor={(item, index) => item.image}
                    renderItem={({item, index}) => (
                      <Image
                        source={{
                          uri:
                            'https://www.werpatients.com/assets/mediauphotu/' +
                            item.image,
                        }}
                        style={{
                          width: SIZES.width / 1.2,
                          height: SIZES.height / 3.9,
                        }}
                      />
                    )}
                  />
                </View>
              ) : null}

              {global.myoptioncheck === '3'
                ? item.image.map((c, i) => (
                    <View
                      style={{
                        width: SIZES.width / 1.2,
                        height: SIZES.height / 4,
                        marginTop: '5%',
                      }}>
                      <Video
                        source={{
                          uri:
                            'https://www.werpatients.com/assets/mediauphotu/' +
                            c.image,
                        }}
                        style={{width: 300, height: 300}}
                        controls={false}
                      />
                    </View>
                  ))
                : null}
              {global.myoptioncheck === '4' ? (
                <View
                  style={{
                    width: SIZES.width / 1.2,
                    height: SIZES.height / 4,
                    marginTop: '5%',
                  }}>
                  <FlatList
                    data={item.image}
                    horizontal
                    pagingEnabled
                    scrollEnabled
                    snapToAlignment="center"
                    scrollEventThrottle={16}
                    decelerationRate={'fast'}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={({PostID}, index) => PostID}
                    renderItem={({item, PostID}) => (
                      <Image
                        source={{
                          uri:
                            'https://www.werpatients.com/assets/mediauphotu/' +
                            item.image,
                        }}
                        style={{
                          width: SIZES.width / 1.2,
                          height: SIZES.height / 3.9,
                        }}
                      />
                    )}
                  />
                </View>
              ) : null}

              {global.myoptioncheck === 'Event' ? (
                <View
                  style={{
                    width: SIZES.width / 1.2,
                    height: SIZES.height / 4,
                    marginTop: '5%',
                  }}>
                  <FlatList
                    data={item.image}
                    horizontal
                    pagingEnabled
                    scrollEnabled
                    snapToAlignment="center"
                    scrollEventThrottle={16}
                    decelerationRate={'fast'}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={({PostID}, index) => PostID}
                    renderItem={({item, PostID}) => (
                      <Image
                        source={{
                          uri:
                            'https://www.werpatients.com/assets/mediauphotu/' +
                            item.image,
                        }}
                        style={{
                          width: SIZES.width / 1.2,
                          height: SIZES.height / 3.9,
                        }}
                      />
                    )}
                  />
                </View>
              ) : null}

              {global.myoptioncheck === '5'
                ? item.image.map((c, i) => (
                    //  <FlatList
                    //    data={item.image}
                    //    horizontal
                    //    pagingEnabled
                    //    scrollEnabled
                    //    snapToAlignment='center'
                    //    scrollEventThrottle={16}
                    //    decelerationRate ={"fast"}
                    //    showsHorizontalScrollIndicator={false}
                    //    keyExtractor={({ Country }, index) => Country}
                    //    renderItem={({ item,Country }) => (
                    <TouchableOpacity
                      onPress={() => playTrack(c.image)}
                      style={[styles.Button]}>
                      <Text style={styles.ButtonText}>Play Podcast</Text>
                    </TouchableOpacity>

                    //  }
                    //  )
                    //  }/>
                  ))
                : null}

              {/* { global.myoptioncheck === '5' ?
<TouchableOpacity onPress={() => playTrack()} style={[styles.Button,]} >
    
             <Text style={styles.ButtonText}>Play Podcast</Text>
            
         </TouchableOpacity>

: null } */}

              {/* { global.myoptioncheck === '3' ? 


 <View style={{width:SIZES.width/1.2,height:SIZES.height/4,marginTop:'5%'}} >
   <Text>video pass{global.myoptioncheck}</Text>
     <FlatList
         data={item.image}
         horizontal
         pagingEnabled
         scrollEnabled
         snapToAlignment='center'
         scrollEventThrottle={16}
         decelerationRate ={"fast"}
         showsHorizontalScrollIndicator={false}
         keyExtractor={({ PostID }, index) => PostID}
         renderItem={({ item,PostID }) => (

  
<Video
        onEnd={onEnd}
        onLoad={onLoad}
        onLoadStart={onLoadStart}
        onProgress={onProgress}
        paused={paused}
        ref={videoPlayer}
        resizeMode={screenType}
        onFullScreen={isFullScreen}
        source={{
          uri:
          'https://www.werpatients.com/assets/mediauphotu/'+item.image,
        }}
        // style={styles.mediaPlayer}
        volume={10}
       />
      
       )
      }/>  
</View> 

: <Text>video failed pass{global.myoptioncheck}</Text> } */}

              {/* <Image  source={images.nurse_help} style={{maxWidth:'100%',maxHeight:'100%'}}/> */}

              {/* {global.myoptioncheck == '1'? <Text></Text>:
       <View style={{width:SIZES.width/1.2,height:SIZES.height/4,marginTop:'5%'}} >
      
         

        
    
          <FlatList
            data={item.image}
            horizontal
            pagingEnabled
            scrollEnabled
            snapToAlignment='center'
            scrollEventThrottle={16}
            decelerationRate ={"fast"}
            showsHorizontalScrollIndicator={false}
            keyExtractor={({ Category }, index) => Category}
            renderItem={({ item,index }) => (
            
          
        <Image
          
          source={{uri: 'http://werpatient.reflomsolutions.com/assets/mediauphotu/'+item.image}} style={{width:SIZES.width/1.2,height:SIZES.height/3.9}}/>
          )
        }/>  */}

              {/* <Video
        onEnd={onEnd}
        onLoad={onLoad}
        onLoadStart={onLoadStart}
        onProgress={onProgress}
        paused={paused}
        ref={videoPlayer}
        resizeMode={screenType}
        onFullScreen={isFullScreen}
        source={{
          uri:
            'https://assets.mixkit.co/videos/download/mixkit-countryside-meadow-4075.mp4',
        }}
        style={styles.mediaPlayer}
        volume={10}
       />
        <MediaControls
        duration={duration}
        isLoading={isLoading}
        mainColor="#333"
        onFullScreen={onFullScreen}
        onPaused={onPaused}
        onReplay={onReplay}
        onSeek={onSeek}
        onSeeking={onSeeking}
        playerState={playerState}
        progress={currentTime}
        toolbar={renderToolbar()}
      /> */}
              {/* </View> 
         } */}
              <View style={styles.commentContainer}>
                <TouchableOpacity
                  style={styles.commentRow}
                  onPress={() => likepost(item.PostID)}>
                  {isLoadinglike ? (
                    <View style={{flex: 1, paddingTop: '0%'}}>
                      <ActivityIndicator animating={true} color={'#253A79'} />
                    </View>
                  ) : item.status == '1' ? (
                    <Image
                      source={icons.like}
                      resizeMode="contain"
                      style={styles.commentImage}
                    />
                  ) : (
                    <Image
                      source={icons.dislike}
                      resizeMode="contain"
                      style={styles.commentImage}
                    />
                  )}
                  <Text style={styles.commentText}> {item.react} Likes</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.commentRow, {marginRight: 10}]}
                  onPress={() => toggleModal(item.PostID)}>
                  {/* <Image  source={icons.chat1} resizeMode="contain" 
             style={styles.commentImage}
             />  */}
                  {CommentImage ? (
                    <Image
                      source={icons.Chat}
                      resizeMode="contain"
                      style={styles.commentImage}
                    />
                  ) : (
                    <Image
                      source={icons.chat1}
                      resizeMode="contain"
                      style={styles.commentImage}
                    />
                  )}
                  <Text style={styles.commentText}>
                    {' '}
                    {item.comment} Comment
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => sharepost(item.Title, item.Description)}
                  style={styles.commentRow}>
                  <Image
                    source={icons.share}
                    resizeMode="contain"
                    style={styles.commentImage}
                  />

                  <Text style={styles.commentText}> Share</Text>
                </TouchableOpacity>
              </View>

              {item.UserID === Useridno ?
  <View>
                  <View
                    style={{
                      borderColor: COLORS.primary,
                      width: '100%',
                      borderBottomWidth: 0.5,
                      marginTop: '5%',
                      bottom: '3%',
                    }}></View>
                  <Text style={styles.ratingtext}>
                  Ratings
                  </Text>
                  <View style={styles.customRatingBarStyle}>
        {maxRating.map((items, key) => {
          return (
            <TouchableOpacity
            
           >
              <Image
                style={styles.starImageStyle}
                source={
                  items <= item.avgrate ? images.starfill : images.starempty
                }
              />
            </TouchableOpacity>
          );
              })}
                  </View>
     </View>
              
 :

 item.ratingstatus === '0' ?
 <View>
 <View
   style={{
     borderColor: COLORS.primary,
     width: '100%',
     borderBottomWidth: 0.5,
     marginTop: '5%',
     bottom: '3%',
   }}></View>
 <Text style={styles.ratingtext}>
   How would you like to rate on Post ?
 </Text>
 <View style={styles.customRatingBarStyle}>
{maxRating.map((items, key) => {
return (
<TouchableOpacity
activeOpacity={0.7}
key={items}
onPress={() => ratingfilltest(item.PostID,items)}
>
<Image
style={styles.starImageStyle}
source={
 items <= item.defRate ? images.starfill : images.starempty
}
/>
</TouchableOpacity>
);
})}
</View>
 <TouchableOpacity
   onPress={() => submitrating(item.PostID)}
   style={[styles.Button]}>
   <Text style={styles.ButtonText}>Submit</Text>
 </TouchableOpacity>
</View>
:
<View>
<View
  style={{
    borderColor: COLORS.primary,
    width: '100%',
    borderBottomWidth: 0.5,
    marginTop: '5%',
    bottom: '3%',
  }}></View>
<Text style={styles.ratingtext1}>
  How would you like to rate on Post ?
</Text>
<View style={styles.customRatingBarStyle}>
{maxRating.map((items, key) => {
return (
<TouchableOpacity
activeOpacity={0.7}
key={items}

>
<Image
style={styles.starImageStyle}
source={
items <= item.ratingStar ? images.starfill : images.starempty
}
/>
</TouchableOpacity>
);
})}
</View>
<View

  style={[styles.Button2]}>
  <Text style={styles.ButtonText}>Rated</Text>
</View>
</View>
                
}



              {/* {item.ratingstatus === '0' ? (
                <View>
                  <View
                    style={{
                      borderColor: COLORS.primary,
                      width: '100%',
                      borderBottomWidth: 0.5,
                      marginTop: '5%',
                      bottom: '3%',
                    }}></View>
                  <Text style={styles.ratingtext}>
                    How would you like to rate on Post ?
                                  </Text>
                  <View style={styles.customRatingBarStyle}>
        {maxRating.map((items, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={items}
              onPress={() => ratingfilltest(item.PostID,items)}
           >
              <Image
                style={styles.starImageStyle}
                source={
                  items <= item.defRate ? images.starfill : images.starempty
                }
              />
            </TouchableOpacity>
          );
        })}
      </View>
                  <TouchableOpacity
                    onPress={() => submitrating(item.PostID)}
                    style={[styles.Button]}>
                    <Text style={styles.ButtonText}>Submit</Text>
                  </TouchableOpacity>
                </View>
              ) :  
              <View>
              <View
                style={{
                  borderColor: COLORS.primary,
                  width: '100%',
                  borderBottomWidth: 0.5,
                  marginTop: '5%',
                  bottom: '3%',
                }}></View>
              <Text style={styles.ratingtext1}>
                How would you like to rate on Post ?
              </Text>
              <View style={styles.customRatingBarStyle}>
    {maxRating.map((items, key) => {
      return (
        <TouchableOpacity
          activeOpacity={0.7}
          key={items}
         
       >
          <Image
            style={styles.starImageStyle}
            source={
              items <= item.ratingStar ? images.starfill : images.starempty
            }
          />
        </TouchableOpacity>
      );
    })}
  </View>
              <View
              
                style={[styles.Button2]}>
                <Text style={styles.ButtonText}>Rated</Text>
              </View>
            </View>
              
              } */}

              {/* <Text style={styles.ratingtext}>How would you like to rate on Post ?</Text>
      <CustomRatingBar />
      <TouchableOpacity style={[styles.Button,]} >

         <Text style={styles.ButtonText}>Submit</Text>
     </TouchableOpacity> */}
            </View>
          ))}

          <Modal
           onBackButtonPress={() => setModalVisible1(false)}
            isVisible={isModalVisible1}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            onSwipeComplete={() => setModalVisible1(false)}
            swipeDirection="left"
            style={{margin: 0}}
            animationType="slide"
            transparent={false}>
            <View style={{flex: 1, backgroundColor: COLORS.white}}>
           
              <FlatList
                data={Usercomments}
                keyExtractor={item => item.CommentID}
                renderItem={({item}) => (
                  <View style={{flex: 1}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        marginTop: '5%',
                      }}>
                      <View style={styles.Profileimagecontainer}>
                      <Image
                  source={{
                    uri:
                      'https://www.werpatients.com/assets/avatar/' +
                      item.AvatarPic
                  }}
                 
                  resizeMode="contain"
                  style={{
                    width: SIZES.width / 8,
                    height: SIZES.height / 8,
                  }}
                />
                      </View>

                      <View style={styles.commentConatiner}>
                        <Text style={styles.profileHeading}>
                          {item.NickName}
                        </Text>
                        <Text>{item.Comment}</Text>
                       
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        width: '60%',
                        marginLeft: '10%',
                      }}>
                      <Text>
                        {moment
                          .utc(item.CreatedAt)
                          .local()
                          .startOf('seconds')
                          .fromNow()
                          .replace('a few seconds ago', 'a few sec ago')}
                      </Text>

                      {/* <TimeAgo time= {item.CreatedAt} mins ago /> */}
                      {/* <Text>10 hrs</Text> */}
                      {/* <Text>Like</Text> */}
                      <Text onPress={() => toggleModal2(item.CommentID)}>
                        Reply({item.replyCount})
                      </Text>
                    </View>
                  </View>
                )}
              />

              <View style={styles.TextinputContainer}>
                <View style={{width: '80%'}}>
                  <TextInput
                    style={styles.input}
                    placeholder="Write a comment"
                    placeholderTextColor="#000"
                    multiline={true}
                    value={Userpostcomment}
                    onChangeText={Userpostcomment =>
                      setUserpostcomment(Userpostcomment)
                    }
                  />
                </View>
                {loading5 ? (
                  <Text style={styles.ButtonText}>
                    <ActivityIndicator animating={true} color={'#253A79'} />
                  </Text>
                ) : (
                  <TouchableOpacity
                    onPress={() => postcomments()}
                    style={{
                      backgroundColor: COLORS.primary,
                      margin: '2%',
                      padding: 10,
                      borderRadius: 10,
                    }}>
                    <Text style={{color: '#fff'}}>Post</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </Modal>

          <Modal
           onBackButtonPress={() => setModalVisible2(false)}
            isVisible={isModalVisible2}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            onSwipeComplete={() => setModalVisible2(false)}
            swipeDirection="left"
            style={{margin: 0}}
            animationType="slide"
            transparent={false}>
            <View style={{flex: 1, backgroundColor: COLORS.white}}>
              <Text
                style={{
                  ...FONTS.h3,
                  alignSelf: 'center',
                  color: COLORS.primary,
                }}>
                Replies
              </Text>

              <FlatList
                data={Usercommentsreply}
                keyExtractor={item => item.Created_At}
                renderItem={({item}) => (
                  <View style={{flex: 1}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                        marginTop: '5%',
                      }}>
                      <View style={styles.Profileimagecontainer}>
                      <Image
                  source={{
                    uri:
                      'https://www.werpatients.com/assets/avatar/' +
                      item.AvatarPic,
                  }}
                  resizeMode="contain"
                  style={{
                    width: SIZES.width / 8,
                    height: SIZES.height / 8,
                  }}
                />
                      </View>

                      <View style={styles.commentConatiner}>
                        <Text style={styles.profileHeading}>
                          {item.NickName}
                        </Text>
                        <Text>{item.Reply}</Text>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        width: '60%',
                        marginLeft: '10%',
                      }}>
                      <Text>
                        {moment
                          .utc(item.CreatedAt)
                          .local()
                          .startOf('seconds')
                          .fromNow()
                          .replace('a few seconds ago', 'a few sec ago')}
                      </Text>

                      {/* <TimeAgo time= {item.CreatedAt} mins ago /> */}
                      {/* <Text>10 hrs</Text> */}
                      {/* <Text>Like</Text>
          <Text>Reply</Text> */}
                    </View>
                  </View>
                )}
              />

              <View style={styles.TextinputContainer}>
                <View style={{width: '80%'}}>
                  <TextInput
                    style={styles.input}
                    placeholder="Write a comment"
                    placeholderTextColor="#000"
                    multiline={true}
                    value={Userreplycomment}
                    onChangeText={Userreplycomment =>
                      setUserreplycomment(Userreplycomment)
                    }
                  />
                </View>
                {loading5 ? (
                  <Text style={styles.ButtonText}>
                    <ActivityIndicator animating={true} color={'#253A79'} />
                  </Text>
                ) : (
                  <TouchableOpacity
                    style={{
                      backgroundColor: COLORS.primary,
                      margin: '2%',
                      padding: 10,
                      borderRadius: 10,
                    }}>
                    <Text
                      onPress={() => Replycomment()}
                      style={{color: '#fff'}}>
                      Post
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </Modal>
        </SafeAreaView>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  Button: {
    borderRadius: 6,
    backgroundColor: COLORS.primary,
    width: SIZES.width / 3,
    height: SIZES.height / 15,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: '5%',
  },
  Button2: {
    borderRadius: 6,
    backgroundColor: COLORS.lightGray,
    width: SIZES.width / 3,
    height: SIZES.height / 15,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: '5%',
  },
  heading: {
    ...FONTS.h3,
    color: COLORS.primary,
  },
  userName: {
    ...FONTS.h4,
    color: COLORS.black,
  },
  ButtonText: {
    color: COLORS.white,
    ...FONTS.h2,
  },
  ratingtext1: {
    alignSelf: 'center',
    color: COLORS.lightGray,
    ...FONTS.h3,
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
    justifyContent: 'space-between',
    marginTop: '1%',
  },
  commentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: SIZES.width / 4.4,
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
  commentText: {
    ...FONTS.h4,
    color: COLORS.primary,
  },
  customRatingBarStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: '5%',
  },
  starImageStyle: {
    width: 30,
    height: 30,
    margin: '1%',
    resizeMode: 'cover',
  },
  ratingtext: {
    alignSelf: 'center',
    color: COLORS.primary,
    ...FONTS.h3,
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
  profileHeading: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  TextinputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
});
export default Feed;
