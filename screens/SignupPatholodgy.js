import React, { useState, useEffect } from 'react';
import {
  Text,
  Card,
  View,
  Paragraph,
  Title,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  ToastAndroid, Alert, BackHandler
} from 'react-native';
import { COLORS, FONTS, icons, images, SIZES } from '../constants';
import { Picker } from '@react-native-picker/picker';
import FooterSlider from '../navigation/FooterSlider';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-community/async-storage';

const SignupPatholodgy = ({ navigation, route }) => {
  const { pnick } = route.params;
  const { ppathinterest } = route.params;
  console.log('signuppath');
  console.log(pnick + ppathinterest);

  const [selectedValue, setSelectedValue] = useState('0');
  const [selectedValue1, setSelectedValue1] = useState('0');
  const [selectedValue2, setSelectedValue2] = useState('0');
  const [selectedValue3, setSelectedValue3] = useState('0');
  const [Createnewitem, setCreatenewitem] = useState('');
  const [Createnewitem2, setCreatenewitem2] = useState('');
  const [foolpepoleupdate, setFoolpepoleupdate] = useState('0');

  const [PathologyArray, setPathologyArray] = useState(
    '[ {itemName: "Cytopathology"},{itemName: "Histopathology"},{itemName: "Neuropathology"},]',
  );
  const [SecomdaryPathologyArray, setSecomdaryPathologyArray] = useState(
    '[ {itemName: "Cytopathology"},{itemName: "Histopathology"},{itemName: "Neuropathology"},]',
  );
  const [ProfileType, setProfileType] = useState(
    '[ {itemName: "Cytopathology"},{itemName: "Histopathology"},{itemName: "Neuropathology"},]',
  );

  const PathologyCondition = [
    {
      PathologyConditionID: '0',
      PathologyCondition: 'Please Select',
      Status: '1',
    },
    { PathologyConditionID: '1', PathologyCondition: 'Acute', Status: '1' },
    { PathologyConditionID: '2', PathologyCondition: 'Chronic', Status: '1' },
  ];
  const clinetrequire = [''];

  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);
  const [isLoading1, setLoading1] = useState(true);
  const [foolpeoples, setFoolpeoples] = useState('');
  const [foolpeoples4, setFoolpeoples4] = useState('');
  const [foolpeoples6, setFoolpeoples6] = useState('');

  async function createpathology() {
    if (Createnewitem == '') {
      Alert.alert(
        'Please enter pathology ! ',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      setModalVisible(false);
      setLoading1(false);
      return false;
    }
    if (Createnewitem.trim() == '') {
      Alert.alert(
        'Please enter pathology ! ',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      setModalVisible(false);
      setLoading1(false);
      return false;
    }

    let uid = await AsyncStorage.getItem('tempuserid');
    console.log(uid);
    await AsyncStorage.setItem('usercondition', uid);
    setLoading1(true);

    var formData = new FormData();
    formData.append('PathologyName', Createnewitem + " -[Unapproved]");
    formData.append('Status', '2');
    formData.append('UserID', '0');
    // formData.append('img', photo);

    fetch(
      'https://www.werpatients.com/sunshineoxygenadmin/api/Signup/create_pathology/' + uid,
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
      .then(async function (data) {
        if (data.status == 'Success') {

          await setFoolpeoples4(data.id)
          console.log("Success" + data.id.toString())

          // getMemberProfile();
          global.Createnewitem = Createnewitem
          AsyncStorage.setItem('path1', Createnewitem);
          // setCreatenewitem('');
          // setLoading1(false);

          // Alert.alert(
          //   'Main pathology of interest Created successfully!\nBut need admin approval once your request is approved by admin.\nYou will be able to add it.',
          //   ToastAndroid.LONG,
          //   ToastAndroid.CENTER,
          // );

          Alert.alert(
            "Success!",
            "Pathology of interest Created successfully!\nBut need admin approval once your request is approved by admin.\nYou will be able to add it.",
            [
              {
                text: "Okay",

                style: "cancel",
              },
            ],

          );
          getMemberProfile()
          setModalVisible(false);
          setLoading1(false);
          return false;
        } else {
          Alert.alert(
            data.msg,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          setLoading1(false);
          return false;
        }
      });

    setModalVisible(!isModalVisible);
  }


  const toggleModal = () => {
    setCreatenewitem('');
    setModalVisible(!isModalVisible);
  };

  const toggleModal2 = () => {
    setModalVisible2(!isModalVisible2);
  };

  async function closemodal() {
    setModalVisible(!isModalVisible);

  }
  async function closemodal2() {
    setModalVisible2(!isModalVisible2);

  }


  useEffect(() => {

    const backAction = () => {

      Alert.alert("Hold on!", "Are you sure you want to skip registration ?", [
        {
          text: "back",
          onPress: () => navigation.goBack(),
          style: "cancel"
        },
        { text: "YES", onPress: () => navigation.navigate('Login') }
      ]);
      return true;
    };






    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  let repeat = 0;
  useEffect(() => {
    getMemberProfile();
    async function getMemberProfile() {

      let uid = await AsyncStorage.getItem('tempuserid');
      console.log(uid);
      await fetch(
        'https://www.werpatients.com/sunshineoxygenadmin/api/Signup/get_pathology/' + uid,
      )
        .then(response => response.json())
        .then(responseJson => {
          console.log('responseJson', responseJson);

          const newCountries = responseJson.filter(
            element => element.PathologyName !== 'None',
          );
          // const newCountries1 = newCountries.filter(element => element.PathologyName !== "None");

          let floors = newCountries;

          floors.push({
            PathologyID: '0',
            PathologyName: 'Please Select',
            Status: '1',
          });

          let array = floors.sort((a, b) => {
            return a['PathologyID'] > b['PathologyID'];
          });

          setPathologyArray(array);

          let floors1 = responseJson;

          floors1.push({
            PathologyID: '0',
            PathologyName: 'Please Select',
            Status: '1',
          });

          let array1 = floors1.sort((a, b) => {
            return a['PathologyID'] > b['PathologyID'];
          });

          setSecomdaryPathologyArray(array1);
        })
        .catch(err => console.log(err));

      await fetch(
        'https://www.werpatients.com/sunshineoxygenadmin/api/Signup/get_user_type',
      )
        .then(response => response.json())
        .then(responseJson => {
          console.log('responseJson', responseJson);

          let floors = responseJson;

          floors.push({
            UserTypeID: '0',
            UserType: 'Please Select',

          });

          let array = floors.sort((a, b) => {
            return a['UserTypeID'] > b['UserTypeID'];
          });








          setProfileType(array);

          setLoading1(false);
        })
        .catch(err => console.log(err));
    }
  }, [repeat]);

  //   async function getMemberProfile() {
  //     setLoading1(true)
  //     let uid = await AsyncStorage.getItem('tempuserid');
  //     console.log(uid);
  //     console.log("A")
  //     console.log("1"+foolpeoples4)
  //     console.log("2"+foolpeoples6)
  //     await fetch(
  //       'https://www.werpatients.com/sunshineoxygenadmin/api/Signup/get_pathology'+uid,
  //     )
  //       .then(response => response.json())
  //       .then(responseJson => {
  //         console.log('responseJson', responseJson);
  //         const newCountries = responseJson.filter(
  //           element => element.PathologyName !== 'None',
  //         );
  //         // const newCountries1 = newCountries.filter(element => element.PathologyName !== "None");
  //         let floors = newCountries;

  //         floors.push({
  //           PathologyID: '0',
  //           PathologyName: 'Please Select',
  //           Status: '1',
  //         });
  //         console.log(foolpeoples)
  //         console.log("B")
  //         if(Createnewitem ===''){
  //           console.log("C")
  //           if(global.Createnewitem="")
  //           {
  //     console.log("D")
  //     let array = floors.sort((a, b) => {
  //       return a['PathologyID'] > b['PathologyID'];
  //     });
  //           }
  //           else
  //           {
  //             console.log("E")
  //             floors.push({
  //               PathologyID:foolpeoples4,
  //               PathologyName:global.Createnewitem+" [Unapproved]",
  //               Status: '1',
  //             });
  //             console.log("F")
  //             // let array = floors.sort((a, b) => {
  //             //   return a['PathologyID'] > b['PathologyID'];
  //             // });
  //           }
  //           console.log("G")
  //           // let array = floors.sort((a, b) => {
  //           //   return a['PathologyID'] > b['PathologyID'];
  //           // });
  //       }
  //       else{
  //         console.log("H")
  //         floors.push({
  //           PathologyID: foolpeoples4,
  //           PathologyName:Createnewitem+" [Unapproved]",
  //           Status: '1',
  //                   });

  //         // let array=  floors.sort(function(obj1, obj2) {

  //         //   return obj1.PathologyID - obj2.PathologyID;
  //         // });

  //         // let array = floors.sort((a, b) => {
  //         //   return a['PathologyID'] > b['PathologyID'];
  //         // });
  //  let array=  floors.sort(function(obj1, obj2) {

  //           return obj1.PathologyID - obj2.PathologyID;

  //         });
  //         // setting55()
  //         // async function setting55(){
  //         //   await  setSelectedValue(foolpeoples4)
  //         // }

  //       setSelectedValue(foolpeoples4)
  //         setPathologyArray(array);
  //           // console.log("array here")
  //           // console.log(array)

  //       }

  //       console.log("I")

  //         // let array = floors.sort((a, b) => {
  //         //   return a['PathologyID'] > b['PathologyID'];
  //         // });
  //         // setPathologyArray(array);





  //         let floors1 = responseJson;

  //         floors1.push({
  //           PathologyID: '0',
  //           PathologyName: 'Please Select',
  //           Status: '1',
  //         });
  //         if(Createnewitem2 ===''){

  //         }
  //         else{
  //           AsyncStorage.setItem('path2', Createnewitem);
  //           floors1.push({
  //             PathologyID: foolpeoples6,
  //             PathologyName:Createnewitem2+" [Unapproved]",
  //             Status: '1',
  //           });
  //           setCreatenewitem2('');
  //         }

  //         let array1=  floors1.sort(function(obj1, obj2) {

  //           return obj1.PathologyID - obj2.PathologyID;

  //         });
  //         // let array1 = floors1.sort((a, b) => {
  //         //   return a['PathologyID'] > b['PathologyID'];
  //         // });

  //         // setting56()
  //         // async function setting56(){
  //         //   await  setSelectedValue(foolpeoples6)
  //         // }
  //         setSecomdaryPathologyArray(array1);
  //           setLoading1(false);
  //           // foolpeoples55()
  //           // async function foolpeoples55(){
  //           //   await  getMemberProfile2()

  //           // }

  //       })
  //       .catch(err => console.log(err));
  //   }




  async function getMemberProfile() {

    let uid = await AsyncStorage.getItem('tempuserid');
    console.log(uid);
    await fetch(
      'https://www.werpatients.com/sunshineoxygenadmin/api/Signup/get_pathology/' + uid,
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log('responseJson', responseJson);

        const newCountries = responseJson.filter(
          element => element.PathologyName !== 'None',
        );
        // const newCountries1 = newCountries.filter(element => element.PathologyName !== "None");

        let floors = newCountries;

        floors.push({
          PathologyID: '0',
          PathologyName: 'Please Select',
          Status: '1',
        });

        let array = floors.sort((a, b) => {
          return a['PathologyID'] > b['PathologyID'];
        });

        setPathologyArray(array);

        let floors1 = responseJson;

        floors1.push({
          PathologyID: '0',
          PathologyName: 'Please Select',
          Status: '1',
        });

        let array1 = floors1.sort((a, b) => {
          return a['PathologyID'] > b['PathologyID'];
        });

        setSecomdaryPathologyArray(array1);
      })
      .catch(err => console.log(err));

    await fetch(
      'https://www.werpatients.com/sunshineoxygenadmin/api/Signup/get_user_type',
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log('responseJson', responseJson);
        setProfileType(responseJson);

        setLoading1(false);
      })
      .catch(err => console.log(err));
  }

  async function submit() {



    if (selectedValue == '0') {
      Alert.alert(
        'Please select main pathology of interest ! ',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      setModalVisible(false);
      setLoading1(false);
      return false;
    }

    if (selectedValue1 == '0') {

      Alert.alert(
        'Please select secondary pathology of interest ! ',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      setModalVisible(false);
      setLoading1(false);
      return false;
    }

    // if (selectedValue == '') {
    //   setLoading1(true)
    //   setSelectedValue(foolpeoples4)
    //   setLoading1(false)
    //   }
    //   if (selectedValue1 == '') {
    //     setLoading1(true)
    //     setSelectedValue(foolpeoples6)
    //     setLoading1(false)
    //   }
    // console.log("hi"+selectedValue)
    // console.log("h2"+selectedValue1)
    //   if (selectedValue == '') {
    //     Alert.alert(
    //       'Please select main pathology of interest ! ',
    //       ToastAndroid.SHORT,
    //       ToastAndroid.CENTER,
    //     );
    //     setModalVisible(false);
    //     setLoading1(false);
    //     return false;
    //   }
    //   if (selectedValue1 == '') {
    //     Alert.alert(
    //       'Please select secondary pathology of interest ! ',
    //       ToastAndroid.SHORT,
    //       ToastAndroid.CENTER,
    //     );
    //     setModalVisible(false);
    //     setLoading1(false);
    //     return false;
    //   }



    if (selectedValue2 == '0') {
      Alert.alert(
        'Please slect pathology condition ! ',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      setModalVisible(false);
      setLoading1(false);
      return false;
    }
    if (selectedValue3 == '0') {
      Alert.alert(
        'Please select profile type ! ',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      setModalVisible(false);
      setLoading1(false);
      return false;
    }

    console.log(selectedValue);
    console.log(selectedValue1);

    if (selectedValue != selectedValue1) {
      // alert(selectedValue+selectedValue1+selectedValue2+selectedValue3)
      navigation.navigate('SignUpgender', {
        pnick: pnick,
        ppathinterest: ppathinterest,
        pmpatho: selectedValue,
        psecpath: selectedValue1,
        ppaathocondition: selectedValue2,
        ppprofile: selectedValue3,
      });
      // navigation.navigate('SignUpgender')
    } else {
      Alert.alert(
        'Secondary Pathology must be different from main Pathology',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return false;
    }
  }
  return (
    <View style={styles.container}>
      {isLoading1 ? (
        <View style={{ flex: 1, paddingTop: '50%' }}>
          <ActivityIndicator animating={true} color={'#253A79'} />
          <Text style={{ color: '#253A79', fontSize: 15, textAlign: 'center' }}>
            Please wait...
          </Text>
        </View>
      ) : (
        <SafeAreaView>
          <ScrollView keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <View style={{}}>
              <Text style={styles.text}>Main pathology Of interest</Text>
              <View style={styles.TextInput_Dropdown}>
                <Picker
                  selectedValue={selectedValue}
                  itemStyle={styles.itemStyle}
                  mode="dropdown"
                  style={styles.pickerStyle}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedValue(itemValue)
                  }>
                  {PathologyArray.map((item, index) =>
                    item.PathologyID === '0' ? (
                      <Picker.Item
                        index={index}
                        key={index}
                        color="#9EA0A4"
                        label="Please Select"
                        value="0"
                      />
                    ) : (
                      // style={{height: 50, width: 100}}
                      // enabled={false}
                      //   <Text color="#253a79"
                      //   label="Please Select"
                      //   key={index}

                      // />

                      <Picker.Item
                        color={COLORS.black}
                        label={item.PathologyName}
                        value={item.PathologyID}
                        index={index}
                        key={index}
                      />
                    ),
                  )}
                </Picker>
              </View>
              <TouchableOpacity
                style={{ alignItems: 'flex-start', flexDirection: 'row' }}
                onPress={toggleModal}>
                <Image
                  source={icons.Create}
                  resizeMode="contain"
                  style={{ width: SIZES.width / 30, height: SIZES.height / 20 }}
                />
                <Text style={styles.ForgotPassword}>Create Pathology</Text>
              </TouchableOpacity>

              <Text style={styles.text}>Secondary pathology Of interest</Text>
              <View style={styles.TextInput_Dropdown}>
                <Picker
                  selectedValue={selectedValue1}
                  itemStyle={styles.itemStyle}
                  mode="dropdown"
                  style={styles.pickerStyle}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedValue1(itemValue)
                  }>
                  {SecomdaryPathologyArray.map((item, index) =>
                    item.PathologyID === '0' ? (
                      <Picker.Item
                        index={index}
                        key={index}
                        color="#9EA0A4"
                        label="Please Select"
                        value="0"
                      />
                    ) : (
                      // style={{height: 50, width: 100}}
                      // enabled={false}
                      //   <Text color="#253a79"
                      //   label="Please Select"
                      //   key={index}

                      // />

                      <Picker.Item
                        color={COLORS.black}
                        label={item.PathologyName}
                        value={item.PathologyID}
                        index={index}
                        key={index}
                      />
                    ),
                  )}
                </Picker>
              </View>
              <TouchableOpacity
                style={{ alignItems: 'flex-start', flexDirection: 'row' }}
                onPress={toggleModal}>
                <Image
                  source={icons.Create}
                  resizeMode="contain"
                  style={{ width: SIZES.width / 30, height: SIZES.height / 20 }}
                />
                <Text style={styles.ForgotPassword}>Create Pathology</Text>
              </TouchableOpacity>

              <Text style={styles.text}>Pathology Condition</Text>
              <View style={styles.TextInput_Dropdown}>
                <Picker
                  selectedValue={selectedValue2}
                  itemStyle={styles.itemStyle}
                  mode="dropdown"
                  style={styles.pickerStyle}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedValue2(itemValue)
                  }>
                  {PathologyCondition.map((item, index) =>
                    item.PathologyConditionID === '0' ? (
                      <Picker.Item
                        index={index}
                        key={index}
                        color="#9EA0A4"
                        label="Please Select"
                        value="0"
                      />
                    ) : (
                      // style={{height: 50, width: 100}}
                      // enabled={false}
                      //   <Text color="#253a79"
                      //   label="Please Select"
                      //   key={index}

                      // />

                      <Picker.Item
                        color={COLORS.black}
                        label={item.PathologyCondition}
                        value={item.PathologyConditionID}
                        index={index}
                        key={index}
                      />
                    ),
                  )}
                </Picker>
              </View>

              <Text style={styles.text}>Select Your Profile type</Text>
              <View style={styles.TextInput_Dropdown}>
                <Picker
                  selectedValue={selectedValue3}
                  itemStyle={styles.itemStyle}
                  mode="dropdown"
                  style={styles.pickerStyle}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedValue3(itemValue)
                  }>




                  {ProfileType.map((item, index) =>
                    item.UserTypeID === '0' ? (
                      <Picker.Item
                        index={index}
                        key={index}
                        color="#9EA0A4"
                        label="Please Select"
                        value="0"
                      />
                    ) : (
                      // style={{height: 50, width: 100}}
                      // enabled={false}
                      //   <Text color="#253a79"
                      //   label="Please Select"
                      //   key={index}

                      // />

                      <Picker.Item
                        color={COLORS.black}
                        label={item.UserType}
                        value={item.UserTypeID}
                        index={index}
                        key={index}
                      />
                    ),
                  )}
                </Picker>
              </View>

              {/* onPress={()=>navigation.navigate('SignUpgender') */}
            </View>


          </ScrollView>

          <View style={{}}>
            <TouchableOpacity style={styles.Button} onPress={() => submit()}>
              <Text style={styles.ButtonText}>Next</Text>
            </TouchableOpacity>

            <FooterSlider
              navigation={navigation}
              screens={'SignupPatholodgy'}
            />
          </View>

          <Modal
            isVisible={isModalVisible}
            onBackButtonPress={() => setModalVisible(false)}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <View
                style={{
                  backgroundColor: COLORS.white,
                  alignItems: 'center',
                  height:SIZES.height/4,
                  
                }}>
                <TouchableOpacity

                  onPress={() => closemodal()}>
                  <Image
                    source={icons.backpress}
                    resizeMode="contain"
                    style={{ width: SIZES.width / 20, height: SIZES.height / 20, marginRight: "90%" }}
                  />
                </TouchableOpacity>
                <Text style={styles.newmodal}>Create Pathology</Text>
                <View style={styles.TextInput}>
                  <TextInput
                    placeholder="Please enter pathology name"
                    placeholderTextColor={'grey'}
                    autoCapitalize="none"
                    style={styles.TextStyle}
                    value={Createnewitem}
                    onChangeText={Createnewitem =>
                      setCreatenewitem(Createnewitem)
                    }
                  />
                </View>
                <TouchableOpacity
                  style={{
                    borderRadius: 6,
                    backgroundColor: COLORS.primary,
                    width: SIZES.width / 4,
                    height: SIZES.height / 18,
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    marginTop: '4%',
                  }}
                  onPress={() => createpathology()}>
                  <Text style={styles.ButtonText}>Ok</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <Modal
            isVisible={isModalVisible2}
            onBackButtonPress={() => setModalVisible2(false)}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <View
                style={{
                  backgroundColor: COLORS.white,
                  alignItems: 'center',
                  height: 200,
                }}>
                <Text style={styles.text}>Create Pathology</Text>
                <View style={styles.TextInput}>
                  <TextInput
                    placeholder="Please enter pathology name"
                    autoCapitalize="none"
                    style={styles.TextStyle}
                    value={Createnewitem2}
                    onChangeText={Createnewitem2 =>
                      setCreatenewitem2(Createnewitem2)
                    }
                  />
                </View>
                <TouchableOpacity
                  style={{
                    borderRadius: 6,
                    backgroundColor: COLORS.primary,
                    width: SIZES.width / 4,
                    height: SIZES.height / 18,
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    marginTop: '5%',
                  }}
                  onPress={() => createpathology()}>
                  <Text style={styles.ButtonText}>Ok</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </SafeAreaView>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },

  Button: {
    borderRadius: 6,
    backgroundColor: COLORS.primary,
    width: SIZES.width / 1.3,
    height: SIZES.height / 15,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: SIZES.height / 30
  },
  newmodal: {
    color: COLORS.primary,
    marginTop: '-6%',
    ...FONTS.h3,
  },
  ButtonText: {
    color: COLORS.white,
    ...FONTS.h2,
  },
  TextStyle: {
    ...FONTS.h3,
    marginLeft: '4%',
    padding:12,fontSize:15
  },

  TextInput: {
    height: SIZES.height / 15,
    width: SIZES.width / 1.3,
    borderWidth: 0.3,
    borderRadius: 6,
    borderColor: COLORS.lightGray,
    marginTop: '2%',
  },

  TextInput_Dropdown: {
    height: SIZES.height / 5,
    width: SIZES.width / 1.3,
    borderWidth: 0.3,
    borderRadius: 6,
    borderColor: COLORS.lightGray,
    marginTop: '2%',
    justifyContent: 'center',
    // padding:0
  },

  text: {
    color: COLORS.primary,
    marginTop: '10%',
    ...FONTS.h3,
  },

  Heading: {
    alignSelf: 'center',
    marginTop: '2%',
    color: COLORS.primary,
    ...FONTS.h1,
  },

  ForgotPassword: {
    color: COLORS.primary,
    ...FONTS.h4,
    alignSelf: 'center',
    marginLeft: 10,
  },

  itemStyle: {
    ...FONTS.h3,
  },
  pickerStyle: {
    width: '100%',
    ...FONTS.h3,
    color: COLORS.black,
    // height:SIZES.height/5

  },

  textStyle: {
    ...FONTS.h3,
  },
});

export default SignupPatholodgy;
