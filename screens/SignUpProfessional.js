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
import FooterSlider from '../navigation/FooterSlider';
import Modal from 'react-native-modal';
const SignUpProfessional = ({navigation, route}) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedValue1, setSelectedValue1] = useState('India');
  const [selectedValuecountry, setSelectedValuecountry] = useState([]);
  const [selectedValuecountryid, setSelectedValuecountryid] =
    useState('Please Select');
  const [selectedValueresgion, setSelectedValueresgion] = useState([]);
  const [selectedValueresgionid, setSelectedValueresgionid] = useState('0');
  const [Testing, setTesting] = useState('');
  const [selectedValue2, setSelectedValue2] = useState('Delhi');
  const [Protitle, setProtitle] = useState('');
  const [Healthin, setHealthin] = useState('');
  const [Country1, setCountry1] = useState('');
  const [Region1, setRegion1] = useState('');

  const [Mycountry, setMycountry] = useState('');
  const [Myregion, setMyregion] = useState('');
  const [Myflag, setMyflag] = useState('');

  const [Country11, setCountry11] = useState('India');
  const [Region11, setRegion11] = useState('Delhi');

  const {pnick} = route.params;
  const {ppathinterest} = route.params;
  const {pmpatho} = route.params;
  const {psecpath} = route.params;
  const {ppaathocondition} = route.params;
  const {ppprofile} = route.params;
  const {pgender} = route.params;
  const {pmainlang} = route.params;
  const {page10} = route.params;
  const {pweight} = route.params;
  const {pheight} = route.params;
  const {pemail} = route.params;
  const {pcontact} = route.params;
  const {ppassword1} = route.params;
  const {pweightunit} = route.params;
  const {pheightunit} = route.params;
  const [isLoading1, setLoading1] = useState(true);
  // console.log(
  //   pnick +
  //     ppathinterest +
  //     pmpatho +
  //     psecpath +
  //     ppaathocondition +
  //     ppprofile +
  //     pgender +
  //     pmainlang +
  //     page10 +
  //     pweight +
  //     pheight +
  //     pemail +
  //     pcontact +
  //     ppassword1,
  // );

  console.log('signuppreofession');
  let repeat = 0;
  useEffect(() => {
    console.log('ok' + selectedValueresgion);
    console.log('' + selectedValueresgionid);
    getMemberProfile();
    async function getMemberProfile() {
      await fetch('https://www.werpatients.com/sunshineoxygenadmin/api/Signup/Countre')
        .then(response => response.json())
        .then(responseJson => {
          let floors = responseJson;

          floors.push({id: '0', name: 'Please Select', flag: 'af.png'});
          console.log(floors);
          // Set state
          // this.setState({ floors });
          // setPathologyArray(responseJson => [...newElement, responseJson])
          let array = floors.sort((a, b) => {
            return a['id'] > b['id'];
          });

          setSelectedValuecountry(array);

          setLoading1(false);
        })
        .catch(err => console.log(err));
      //             await fetch('https://www.werpatients.com/sunshineoxygenadmin/api/Signup/region/101')
      //             .then((response) => response.json())
      //             .then((responseJson1) => {
      //                 // console.log("responseJson",responseJson1);
      //                 var statename=[]

      //                 setSelectedValueresgion(statename)
      // setLoading1(false)
      //             }).catch(err => console.log(err))
    }
  }, [repeat]);

  useEffect(() => {
    console.log('country' + selectedValuecountry);
    console.log('countryid' + selectedValuecountryid);
    console.log('region' + selectedValueresgion);
    console.log('cregionid' + selectedValueresgionid);
    getMemberProfile();
    async function getMemberProfile() {
      await fetch(
        'https://www.werpatients.com/sunshineoxygenadmin/api/Signup/region/' +
          selectedValuecountryid,
      )
        .then(response => response.json())
        .then(responseJson1 => {
          // console.log("responseJson",responseJson1);

          let floors = responseJson1;

          // Add item to it
          floors.push({id: '0', name: 'Please Select', flag: 'af.png'});
          console.log(floors);
          // Set state
          // this.setState({ floors });
          // setPathologyArray(responseJson => [...newElement, responseJson])
          let array = floors.sort((a, b) => {
            return a['id'] > b['id'];
          });

          setSelectedValueresgion(array);
          // setSelectedValue(selectedValue)
          //                 setSelectedValueresgion(responseJson1)
          // setLoading1(false)
        })
        .catch(err => console.log(err));
    }
  }, [selectedValuecountryid]);

  useEffect(() => {

    
    getMemberProfile();
    async function getMemberProfile() {
      setLoading1(true)
      console.log(
        'http://werpatient.reflomsolutions.com/api/Signup/cotreg/' +
          selectedValuecountryid +
          '/' +
          selectedValueresgionid,
      );
      console.log("https://www.werpatients.com/sunshineoxygenadmin/api/Signup/cotreg/" +
      selectedValuecountryid +
      '/' +
      selectedValueresgionid)
      await fetch(
        'https://www.werpatients.com/sunshineoxygenadmin/api/Signup/cotreg/' +
          selectedValuecountryid +
          '/' +
          selectedValueresgionid,
      )

        .then(response => response.json())
        .then(responseJson5 => {

          // console.log("responseJson",responseJson5[1].Region);
          setMycountry(responseJson5[0].Country);
          setMyregion(responseJson5[1].Region);
          setMyflag(responseJson5[0].Flag);
          console.log("121"+Mycountry+""+Myregion+""+Myflag)
          // setSelectedValue(selectedValue)
          //                 setSelectedValueresgion(responseJson1)
          setLoading1(false)
        })
        .catch(err => console.log(err));
    }
  }, [selectedValueresgionid]);

  //     useEffect(() => {

  //       getMemberProfile();
  //               async function getMemberProfile (){
  //                 await fetch('http://werpatient.reflomsolutions.com/api/Signup/region/'+selectedValuecountryid)
  //                 .then((response) => response.json())
  //                 .then((responseJson) => {
  //                     console.log("responseJson",responseJson);
  //                     setSelectedValuecountry(responseJson)
  //     setLoading1(false)
  //                 }).catch(err => console.log(err))

  //       }

  // }, [selectedValuecountryid]);

  // const   county = [
  //   {id:1,CounterName:"india" ,    Region : ["MadhayPradesh, Rajasthan,Gujrat,Maharashtar",],
  //   CountryImage:require('../assets/images/india.png')},
  //   {id:2,CounterName:"Pakistan" , Region : ["Dhaka" ,"taka","Karachi",],
  //   CountryImage:require('../assets/images/pakistan.png')},
  //   {id:3,CounterName:"Bangladesh" , Region : ["Dhaka" ,"taka","Karachi",],
  //   CountryImage:require('../assets/images/Bangladesh.png')},
  //   {id:4,CounterName:"Shri Lanka" , Region : ["Dhaka" ,"taka","Karachi",],
  //   CountryImage:require('../assets/images/ShriLanka.png')},

  // ]
  const [county, setCounty] = useState([]);
  const [counter, setCounter] = useState('india');
  const [selectRegion, setSelectRegion] = useState('Mp');
  const [Region, setregion] = useState([]);
  const [FlagImage, setFlagImage] = useState(
    require('../assets/images/india.png'),
  );

  const HealthInsurance = [
    {itemName: 'Please Select', itemid: '0'},
    {itemName: 'Yes Public Health Insurance', itemid: '1'},
    {itemName: 'Yes Private Health Insurance', itemid: '2'},
    {itemName: 'No', itemid: '3'},
  ];

  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible1, setModalVisible1] = useState(false);

  const toggleModal = () => {
    Alert.alert(
      'Swipe right to left for close! ',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
    setModalVisible(!isModalVisible);
  };

  const toggleModal1 = () => {
    Alert.alert(
      'Swipe right to left for close! ',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
    setModalVisible1(!isModalVisible1);
  };
  const selectCountry = item => {
    setCounter(item.name);
    setModalVisible(!isModalVisible);
    setregion(item.Region);
    setFlagImage(item.flag);
    console.log(item.name);
  };
  const selectRegion1 = item => {
    setSelectRegion(item);
    setModalVisible1(!isModalVisible1);

    console.log(item);
  };

  async function submit() {
    // if (Protitle == '') {
    //   Alert.alert(
    //     'Please enter professional title ! ',
    //     ToastAndroid.SHORT,
    //     ToastAndroid.CENTER,
    //   );

    //   return false;
    // }
    // if (selectedValue == '0') {
    //   Alert.alert(
    //     'Please select health insurance ! ',
    //     ToastAndroid.SHORT,
    //     ToastAndroid.CENTER,
    //   );

    //   return false;
    // }

    if (selectedValuecountryid == 'Please Select') {
      Alert.alert(
        'Please select country, Note : we use country for post,debate,event to be show for your regional area! ',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );

      return false;
    }

    if (selectedValueresgionid == '0') {
      Alert.alert(
        'Please select region, Note : we use region for post,debate,event to be show for your regional area! ',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );

      return false;
    }

    if (Mycountry == null) {
      Alert.alert(
        'Please wait ! ',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );

      return false;
    }

    console.log(Protitle + selectedValue + selectedValue1 + selectedValue2);
    // return false;
    navigation.navigate('SignUpAvatar', {
      pnick: pnick,
      ppathinterest: ppathinterest,
      pmpatho: pmpatho,
      psecpath: psecpath,
      ppaathocondition: ppaathocondition,
      ppprofile: ppprofile,
      pgender: pgender,
      pmainlang: pmainlang,
      page10: page10,
      pweight: pweight,
      pheight: pheight,
      pemail: pemail,
      pcontact: pcontact,
      ppassword1: ppassword1,
      pprofilehealth: Protitle,
      pdoyouhealthi: selectedValue,
      pcountry: Mycountry,
      pregion: Myregion.replace(' ', '36'),
      pflag: Myflag,
      pweightunit: pweightunit,
      pheightunit: pheightunit,
    });
    //  navigation.navigate('SignUpAvatar')
  }

  return (
    <View style={styles.container}>
      {isLoading1 ? (
        <View style={{flex: 1, paddingTop: '50%'}}>
          <ActivityIndicator animating={true} color={'#253A79'} />
          <Text style={{color: '#253A79', fontSize: 15, textAlign: 'center'}}>
            Please wait...
          </Text>
        </View>
      ) : (
        <SafeAreaView>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <View style={{}}>
              <Text style={styles.text}>Professional Title</Text>
              <View style={styles.TextInput}>
              
                <TextInput
                  autoCapitalize="none"
                  style={styles.TextStyle}
                  value={Protitle}
                  onChangeText={Protitle => setProtitle(Protitle)}
                  placeholder={'Enter professional title '}
                  placeholderTextColor={'grey'}
                />
              </View>

              <Text style={styles.text}>Do You Have Health Insurance</Text>
              <View style={styles.TextInput_Dropdown}>
                <Picker
                  selectedValue={selectedValue}
                  itemStyle={styles.itemStyle}
                  mode="dropdown"
                  style={styles.pickerStyle}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedValue(itemValue)
                  }>
                  {HealthInsurance.map((item, index) =>
                    item.itemid === '0' ? (
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
                        label={item.itemName}
                        value={item.itemid}
                        index={index}
                        key={index}
                      />
                    ),
                  )}
                </Picker>
              </View>

              <Text style={styles.text}>Country</Text>
              <View style={styles.TextInput_Dropdown}>
                <Picker
                  selectedValue={selectedValuecountryid}
                  itemStyle={styles.itemStyle}
                  mode="dropdown"
                  style={styles.pickerStyle}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedValuecountryid(itemValue)
                  }>
                  {selectedValuecountry.map((item, index) =>
                    item.name === 'Please Select' ? (
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
                        label={item.name}
                        value={item.id}
                        index={index}
                        key={index}
                      />
                    ),
                  )}
                </Picker>
              </View>
              <Text style={styles.text}>Region</Text>
              <View style={styles.TextInput_Dropdown}>
                <Picker
                  selectedValue={selectedValueresgionid}
                  itemStyle={styles.itemStyle}
                  mode="dropdown"
                  style={styles.pickerStyle}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedValueresgionid(itemValue)
                  }>
                  {selectedValueresgion.map((item, index) =>
                    item.id === '0' ? (
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
                        label={item.name}
                        value={item.id}
                        index={index}
                        key={index}
                      />
                    ),
                  )}
                </Picker>
              </View>

              {/* <Text style={styles.text}>Country</Text>
        <TouchableOpacity   style={styles.TextInput1}  onPress={ toggleModal }>
         <View style={{width:'10%',margin:'2%'}}>
           <Image source={FlagImage} resizeMode="contain" style={{width:20,height:20}}/>
          </View>
       <Text>{counter}</Text>
    </TouchableOpacity>  

    <Text style={styles.text}>Region</Text>

    <TouchableOpacity   style={styles.TextInput1}  onPress={ toggleModal1 }>
        <Text style={{marginLeft:10}}>{selectRegion}</Text>
    </TouchableOpacity> */}

              {/* <Text style={styles.text}>Country</Text>
      <View  style={styles.TextInput_Dropdown}>
      <Picker
        selectedValue={selectedValue2}
        itemStyle={styles.itemStyle}
        mode="dropdown"
        style={styles.pickerStyle}
        onValueChange={(itemValue, itemIndex) => setSelectedValue2(itemValue)}
        >
        {Country.map((item, index) => (
          <Picker.Item 
            color={COLORS.black}
            label={item.itemName}
            value={item.itemName}
            index={index}
            key={index}
          />
           ))}
        </Picker>
        </View> */}

              {/* <Text style={styles.text}>Region</Text>
      <View  style={styles.TextInput_Dropdown}>
      <Picker
        selectedValue={selectedValue}
        itemStyle={styles.itemStyle}
        mode="dropdown"
        style={styles.pickerStyle}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
        {Region.map((item, index) => (
          <Picker.Item 
            color={COLORS.black}
            label={item.itemName}
            value={item.itemName}
            index={index}
            key={index}
          />
           ))}
        </Picker>
        </View> */}
            </View>
            {/* onPress={()=>navigation.navigate('SignUpAvatar')}
             */}
          
          </ScrollView>
          <View>
          <TouchableOpacity style={styles.Button} onPress={() => submit()}>
              <Text style={styles.ButtonText}>Next</Text>
            </TouchableOpacity>

            <FooterSlider
              navigation={navigation}
              screens={'SignUpProfessional'}
            />
          </View>

          <Modal
            isVisible={isModalVisible}
            swipeDirection="left"
            animationIn="slideInUp"
            animationOut="slideOutDown"
            style={{margin: 0}}
            onSwipeComplete={() => setModalVisible(false)}>
            <View style={{flex: 1, backgroundColor: COLORS.white}}>
              <ScrollView>
                {county.map((item, index) => (
                  <TouchableOpacity
                    style={styles.modalCountry}
                    key={index}
                    onPress={() => selectCountry(item)}>
                    <View style={{width: 10, margin: 2}}>
                      <Image
                        source={{
                          uri:
                            'https://www.werpatients.com/assets/Flag' +
                            item.flag,
                        }}
                        resizeMode="contain"
                        style={{width: 20, height: 20}}
                      />
                    </View>

                    <TouchableOpacity style={{width: '40%', margin: '2%'}}>
                      <Text>{item.name}</Text>
                    </TouchableOpacity>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </Modal>

          <Modal
            isVisible={isModalVisible1}
            swipeDirection="left"
            animationIn="slideInUp"
            animationOut="slideOutDown"
            style={{margin: 0}}
            onSwipeComplete={() => setModalVisible1(false)}>
            <View style={{flex: 1, backgroundColor: COLORS.white}}>
              {Region.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => selectRegion1(item)}
                  style={{width: '40%', margin: '2%'}}>
                  <Text>{item}</Text>
                </TouchableOpacity>
              ))}
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

  TextInput1: {
    height: SIZES.height / 15,
    width: SIZES.width / 1.3,
    borderWidth: 0.3,
    borderRadius: 6,
    borderColor: COLORS.lightGray,
    marginTop: '2%',
    flexDirection: 'row',
    alignItems: 'center',
  },

  modalCountry: {
    flexDirection: 'row',
    width: '100%',
    borderBottomColor: COLORS.lightGray1,
    borderBottomWidth: 0.2,
    justifyContent: 'space-evenly',
  },

  Button: {
    borderRadius: 6,
    backgroundColor: COLORS.primary,
    width: SIZES.width / 1.5,
    height: SIZES.height / 15,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    // marginTop: SIZES.height/20
  },
  TextStyle: {
    ...FONTS.h4,
    marginLeft: '5%',
    padding:12,
    fontSize:15
  },

  ButtonText: {
    color: COLORS.white,
    ...FONTS.h2,
  },

  TextInput_Dropdown: {
    height: SIZES.height / 5,
    width: SIZES.width / 1.3,
    borderWidth: 0.3,
    borderRadius: 6,
    borderColor: COLORS.lightGray,
    marginTop: '2%',
    justifyContent: 'center',
  },

  text: {
    color: COLORS.primary,
    marginTop: '10%',
    ...FONTS.h3,
  },
  TextInput: {
    height: SIZES.height / 14,
    width: SIZES.width / 1.3,
    borderWidth: 0.3,
    borderRadius: 6,
    borderColor: COLORS.lightGray,
    marginTop: '2%',
    // padding:8
  },

  Heading: {
    alignSelf: 'center',
    marginTop: '2%',
    color: COLORS.primary,
    ...FONTS.h1,
  },

  ForgotPassword: {
    color: COLORS.LightGreen,
    // ...FONTS.h3,
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
  },

  textStyle: {
    ...FONTS.h3,
  },
});

export default SignUpProfessional;
