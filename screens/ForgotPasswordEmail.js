import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {COLORS, FONTS, icons, images, SIZES} from '../constants';

const ForgotPasswordEmail = ({navigation}) => {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <Image
            source={images.Email}
            resizeMode="contain"
            style={styles.ImageHead}
          />
          <Text style={styles.CheckMail}>Check Your mail</Text>

          <View style={{width: SIZES.width / 1.1, marginTop: '10%'}}>
            <Text style={styles.LinkMail}>
              We have sent a link to your email to reset your password.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.Button}
            onPress={() => navigation.navigate('Create_new_Password')}>
            <Text style={styles.ButtonText}>Open Email App</Text>
          </TouchableOpacity>
          <View
            style={{
              width: SIZES.width / 1.1,
              marginTop: '20%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={styles.LinkMail}>
              Didn't receive the email? check your spam box or
              <Text style={[styles.LinkMail, {color: COLORS.primary}]}>
                {' '}
                Try Another Email Address.
              </Text>
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
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
    width: SIZES.width / 1.5,
    height: SIZES.height / 15,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: '10%',
  },

  ButtonText: {
    color: COLORS.white,
    ...FONTS.h2,
  },

  TextInput: {
    height: SIZES.height / 15,
    width: SIZES.width / 1.3,
    borderWidth: 0.3,
    borderRadius: 6,
    borderColor: COLORS.lightGray,
    marginTop: '3%',
  },
  ImageHead: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: '5%',
  },
  CheckMail: {
    alignSelf: 'center',
    color: COLORS.black,
    marginTop: '10%',
    ...FONTS.h1,
  },
  LinkMail: {
    ...FONTS.h3,
    color: COLORS.lightGray,
    textAlign: 'center',
  },
});

export default ForgotPasswordEmail;
