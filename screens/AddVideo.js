import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ToastAndroid,Alert,
  ActivityIndicator,
} from 'react-native';
import {COLORS, FONTS, icons, images, SIZES} from '../constants';
import {Picker} from '@react-native-picker/picker';
import ImagePicker from 'react-native-image-crop-picker';
import Video from 'react-native-video';
import AsyncStorage from '@react-native-community/async-storage';

const AddVideo = ({navigation}) => {
  const [selectedValue, setSelectedValue] = useState('1');
  const PathologyArray = [
    {itemName: 'Cytopathology'},
    {itemName: 'Histopathology'},
    {itemName: 'Neuropathology'},
  ];
  const [image, setimage] = useState(null);
  const [images1, setimages1] = useState(null);
  const [Userid1, setUserid1] = useState('');
  const [Userregion, setUserregion] = useState('');
  const [PathologyArray1, setPathologyArray1] = useState([
    {PathologyID: '1', PathologyName: ''},
    {PathologyID: '2', PathologyName: ''},
  ]);
  const [loading, setLoading] = React.useState(false);
  const [Posttxt, setPosttxt] = useState('');
  const [Imagechecking, setImagechecking] = useState('');
  const [Imageurl, setImageurl] = useState('');
  
  let repeat = 0;
  useEffect(() => {
    if (global.Userregion == '') {
      getMemberProfile();
      async function getMemberProfile() {
        let user_mps = await AsyncStorage.getItem('userid');
        await fetch(
          'https://www.werpatients.com/sunshineoxygenadmin/api/Post/patho/' + user_mps,
        )
          .then(response => response.json())
          .then(responseJson => {
            console.log('responseJson', responseJson);
            setPathologyArray1(responseJson);

            setLoading(false);
          })
          .catch(err => console.log(err));
        await fetch(
          'https://www.werpatients.com/sunshineoxygenadmin/api/Post/region/' + user_mps,
        )
          .then(response => response.json())
          .then(responseJson => {
            console.log('responseJson', responseJson[0].Region);
            setUserregion(responseJson[0].Region);
          })
          .catch(err => console.log(err));
      }
    } else {
      setPathologyArray1(global.PathologyArray1);
      setUserregion(global.Userregion);
      global.PathologyArray1.map((item,index)=>{
        console.log(index, " : index");
        if(index === 0){
          setSelectedValue(item.PathologyID);
        }              
      });
    }
    let timer1 = setInterval(() => gettingupdate(), 5000);
    return () => clearInterval(timer1);
  }, [repeat]);

  async function gettingupdate(){
    console.log(global.updatefuction)
    if(global.updatefuction == '1'){
      getMemberProfile();
      async function getMemberProfile() {
        let user_mps = await AsyncStorage.getItem('userid');
        await fetch(
          'https://www.werpatients.com/sunshineoxygenadmin/api/Post/patho/' + user_mps,
        )
          .then(response => response.json())
          .then(responseJson => {
            console.log('responseJson', responseJson);
            setPathologyArray1(responseJson);
            setSelectedValue(responseJson[0].PathologyID)
            global.PathologyArray1 = responseJson;

            //
          })
          .catch(err => console.log(err));

       
      }

   global.updatefuction='2'
   console.log("llll")
    }
  }



  async function Signincode() {
    
   
    console.log(Imageurl);
    setLoading(true);
    if (Posttxt == '') {
      Alert.alert(
        'Please enter some text ! ',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      setLoading(false);
      return false;
    }
    if (selectedValue == '') {
      Alert.alert(
        'Please choose pathology ! ',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      setLoading(false);
      return false;
    }
    if (Imagechecking == '') {
      Alert.alert(
        'Please choose video ! ',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      setLoading(false);
      return false;
    }


    //  {items.file_Name.toString().endsWith("mp4")  ? Video : image }
    var formData = new FormData();
    formData.append('Description', Posttxt);
    formData.append('PathologyID',selectedValue );
    Imageurl.forEach((element, i) => {
      const newFile = {
        uri: element,
        type: 'image/jpg',
        name: 'video.mp4',
      };
      formData.append('Files[]', newFile);
      console.log(' var pho' + JSON.stringify(newFile));
    });
    // formData.append('img', photo);
    let user_mps = await AsyncStorage.getItem('userid');

    fetch(
      'https://www.werpatients.com/sunshineoxygenadmin/api/Post/post/' +
        user_mps +
        '/3/' +
        Userregion,
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
          setPosttxt('');
          setImagechecking('');
          Alert.alert(
            data.msg,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          setLoading(false);
          return false;

          // Alert.alert(
          //   data.msg,
          //    ToastAndroid.SHORT,
          //    ToastAndroid.CENTER,)
          //    AsyncStorage.setItem('userid',data.user_id.toString());
          //    console.log("data",data.user_id);
        } else {
          Alert.alert(
            data.msg,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          setLoading(false);
          return false;
        }
      });
  }

  const pickMultiple = () => {
    setImagechecking('');
    var SampleArray = [];
    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      sortOrder: 'desc',
      includeExif: true,
      forceJpg: true,
      mediaType: 'video',
    })
      .then(images1 => {
        setimage({
          image: null,
          images1: images1.map(i => {
            SampleArray.push(i.path);
            setImagechecking(i.path);
            setImageurl(SampleArray);
            console.log('received image', i);
            return {
              uri: i.path,
              width: i.width,
              height: i.height,
              mime: i.mime,
            };
          }),
        });
        setimages1(
          images1.map(i => {
            console.log('received image', i);
            return {
              uri: i.path,
              width: i.width,
              height: i.height,
              mime: i.mime,
            };
          }),
          Alert.alert(
            'Video is added !',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          ),
        );
      })
      .catch(e =>
        Alert.alert(
          'Error:Video is not added !',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        ),
      );
  };
  const renderVideo = video => {
    console.log('rendering video');
    return (
      <View style={{height: 300, width: 300}}>
        <Video
          source={{uri: video.uri, type: video.mime}}
          style={{position: 'absolute', top: 0, left: 0, bottom: 0, right: 0}}
          rate={1}
          paused={false}
          volume={1}
          muted={false}
          resizeMode={'cover'}
          onError={e => console.log(e)}
          onLoad={load => console.log(load)}
          repeat={true}
        />
      </View>
    );
  };

  const renderImage = image => {
    return (
      <Image
        style={{width: 300, height: 300, resizeMode: 'contain'}}
        source={image}
      />
    );
  };

  const renderAsset = image => {
    if (image.mime && image.mime.toLowerCase().indexOf('video/') !== -1) {
      return renderVideo(image);
    }

    return renderImage(image);
  };
  return (
    <View style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={styles.TextInput}>
          <TextInput
            autoCapitalize="none"
            style={styles.TextStyle}
            placeholder={'What is in your mind ?'}
            placeholderTextColor={COLORS.lightGray1}
            value={Posttxt}
            onChangeText={Posttxt => setPosttxt(Posttxt)}
          />
        </View>
        <View style={styles.TextInput_Dropdown}>
          <Picker
            selectedValue={selectedValue}
            itemStyle={styles.itemStyle}
            mode="dropdown"
            style={styles.pickerStyle}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }>
            {PathologyArray1.map((item, index) => (
              <Picker.Item
                color={COLORS.black}
                label={item.PathologyName}
                value={item.PathologyID}
                index={index}
                key={index}
              />
            ))}
          </Picker>
        </View>
        {/* <ScrollView>
              
              {image ? renderAsset(image) : null}
              {images1
              ? images1.map((i) => (
              <View key={i.uri}>{renderAsset(i)}</View>
              ))
              : null}
              
      </ScrollView> */}
        <TouchableOpacity activeOpacity={0} onPress={pickMultiple}>
          <View style={styles.postPicker}>
            <View style={styles.Addpostimage}>
              <Image
                source={images.AddVideo}
                resizeMode="contain"
                style={{
                  width: SIZES.width / 4,
                  height: SIZES.height / 4,
                }}
              />
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Signincode()} style={[styles.Button]}>
          {loading ? (
            <Text style={styles.ButtonText}>
              <ActivityIndicator animating={true} color={'#fff'} />
            </Text>
          ) : (
            <Text style={styles.ButtonText}>post</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  Button: {
    borderRadius: 6,
    backgroundColor: COLORS.primary,
    width: SIZES.width / 4,
    height: SIZES.height / 17,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: '5%',
  },
  TextInput_Dropdown: {
    height: SIZES.height / 5,
    width: SIZES.width / 1.1,
    borderWidth: 0.3,
    borderRadius: 6,
    borderColor: COLORS.lightGray,
    marginTop: '3%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  ButtonText: {
    color: COLORS.white,
    ...FONTS.h2,
    textTransform: 'capitalize',
  },
  TextInput: {
    height: SIZES.height / 8,
    width: SIZES.width / 1.1,
    borderWidth: 0.3,
    borderRadius: 6,
    borderColor: COLORS.lightGray,
    marginTop: '3%',
    alignSelf: 'center',
    padding:8
  },

  TextStyle: {
    ...FONTS.h4,
    marginLeft: '4%',
    color: COLORS.primary,
  },

  itemStyle: {
    ...FONTS.h4,
    color: COLORS.lightGray1,
  },

  pickerStyle: {
    width: '100%',
    ...FONTS.h3,
    color: COLORS.lightGray1,
  },

  textStyle: {
    ...FONTS.h3,
    color: COLORS.lightGray1,
  },
  postPicker: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    elevation: 10,
    shadowColor: '#000',
    width: SIZES.width / 1.1,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    marginTop: '3%',
    padding: '10%',
    alignSelf: 'center',
  },

  Addpostimage: {
    borderRadius: 10,
    backgroundColor: COLORS.white,
    borderColor: COLORS.primary,
    borderStyle: 'dashed',
    zIndex: 1,
    borderWidth: 2,
    alignItems: 'center',
    height: 150,
    justifyContent: 'center',
  },
});

export default AddVideo;
