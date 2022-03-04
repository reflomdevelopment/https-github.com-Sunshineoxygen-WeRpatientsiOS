import React from 'react';
import {Text, Image, TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {COLORS, FONTS, icons, images, SIZES} from '../constants';
import {
  SplashScreen,
  Login,
  Register,
  ForgotPassword,
  ForgotPasswordEmail,
  Create_new_Password,
} from '../screens';
import SignupPatholodgy from '../screens/SignupPatholodgy';
import SignUpgender from '../screens/SignUpgender';
import SignUpEmail from '../screens/SignUpEmail';
import SignUpProfessional from '../screens/SignUpProfessional';
import SignUpAvatar from '../screens/SignUpAvatar';
import Create_Your_own_Avatar from '../screens/Create_Your_own_Avatar';
import Chat from '../screens/Chat';
import Tabs from './Footer';
import MyProfile from '../screens/MyProfile';
import MyState from '../screens/MyState';
import MyPost from '../screens/MyPost';
import MyPathology from '../screens/MyPathology';
import Notifications from '../screens/Notifications';
import EventDescription from '../screens/EventDescription';
import OncologyEvent from '../screens/OncologyEvent';
import Debate from '../screens/Debate';
import Logout from '../screens/Logout';
import Chatstatus from '../screens/Chatstatus';
import EventFeed from '../screens/EventFeed';
import Zoomapi from '../screens/Zoomapi';
import Zoomtesting from '../screens/Zoomtesting';
import Privacy from '../screens/Privacy';
import CustomDrawer from './CustomDrawer';

const DrawerN = createDrawerNavigator();
const Stack = createStackNavigator();

const DefaultDrawerN = props => (
  <DrawerN.Navigator
    openByDefault={false}
    drawerContentOptions={{
      activeTintColor: '#fff',
      itemStyle: {marginVertical: 5},
    }}
    drawerContent={(props, navigation) => (
      <CustomDrawer {...props} {...navigation} />
    )}>
    <DrawerN.Screen name="Notifications" component={Notifications} />
  </DrawerN.Navigator>
);

const StackNavigator = navigation => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={({navigation}) => ({
          title: ' Reset Password',
          headerTitleStyle: {
            alignSelf: 'center',
            color: COLORS.primary,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Image
                source={icons.ArrowLeft}
                resizeMode="contain"
                style={{
                  width: SIZES.width / 18,
                  height: SIZES.height / 18,
                  tintColor: COLORS.primary,
                  marginLeft: 10,
                }}
              />
            </TouchableOpacity>
          ),
          headerRight: () => <Text style={{color: '#fff'}}>klkdlk</Text>,
        })}
      />

      <Stack.Screen
        name="ForgotPasswordEmail"
        component={ForgotPasswordEmail}
        options={({navigation}) => ({
          title: ' Reset Password',
          headerTitleStyle: {
            alignSelf: 'center',
            color: COLORS.primary,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}>
              <Image
                source={icons.ArrowLeft}
                resizeMode="contain"
                style={{
                  width: SIZES.width / 18,
                  height: SIZES.height / 18,
                  tintColor: COLORS.primary,
                  marginLeft: 10,
                }}
              />
            </TouchableOpacity>
          ),
          headerRight: () => <Text style={{color: '#fff'}}>klkdlk</Text>,
        })}
      />

      <Stack.Screen
        name="Create_new_Password"
        component={Create_new_Password}
        options={({navigation}) => ({
          title: ' Reset Password',
          headerTitleStyle: {
            alignSelf: 'center',
            color: COLORS.primary,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}>
              <Image
                source={icons.ArrowLeft}
                resizeMode="contain"
                style={{
                  width: SIZES.width / 18,
                  height: SIZES.height / 18,
                  tintColor: COLORS.primary,
                  marginLeft: 10,
                }}
              />
            </TouchableOpacity>
          ),
        })}
      />

      {/* <Stack.Screen
        name="MyPublications"
        component={MyPublications}
        options={ ( {navigation} ) => ({   })}
      />   */}

      <Stack.Screen
        name="SignupPatholodgy"
        component={SignupPatholodgy}
        options={({navigation}) => ({
          title: ' Sign Up',
          headerTitleStyle: {
            alignSelf: 'center',
            color: COLORS.primary,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Image
                source={icons.ArrowLeft}
                resizeMode="contain"
                style={{
                  width: SIZES.width / 18,
                  height: SIZES.height / 18,
                  tintColor: COLORS.primary,
                  marginLeft: 10,
                }}
              />
            </TouchableOpacity>
          ),
          headerRight: () => <Text style={{color: '#fff'}}>klkdlk</Text>,
        })}
      />

      <Stack.Screen
        name="SignUpgender"
        component={SignUpgender}
        options={({navigation}) => ({
          title: ' Sign Up',
          headerTitleStyle: {
            alignSelf: 'center',
            color: COLORS.primary,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('SignupPatholodgy')}>
              <Image
                source={icons.ArrowLeft}
                resizeMode="contain"
                style={{
                  width: SIZES.width / 18,
                  height: SIZES.height / 18,
                  tintColor: COLORS.primary,
                  marginLeft: 10,
                }}
              />
            </TouchableOpacity>
          ),
          headerRight: () => <Text style={{color: '#fff'}}>klkdlk</Text>,
        })}
      />

      <Stack.Screen
        name="SignUpEmail"
        component={SignUpEmail}
        options={({navigation}) => ({
          title: ' Sign Up',
          headerTitleStyle: {
            alignSelf: 'center',
            color: COLORS.primary,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('SignUpgender')}>
              <Image
                source={icons.ArrowLeft}
                resizeMode="contain"
                style={{
                  width: SIZES.width / 18,
                  height: SIZES.height / 18,
                  tintColor: COLORS.primary,
                  marginLeft: 10,
                }}
              />
            </TouchableOpacity>
          ),
          headerRight: () => <Text style={{color: '#fff'}}>klkdlk</Text>,
        })}
      />

      <Stack.Screen
        name="SignUpProfessional"
        component={SignUpProfessional}
        options={({navigation}) => ({
          title: ' Sign Up',
          headerTitleStyle: {
            alignSelf: 'center',
            color: COLORS.primary,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('SignUpEmail')}>
              <Image
                source={icons.ArrowLeft}
                resizeMode="contain"
                style={{
                  width: SIZES.width / 18,
                  height: SIZES.height / 18,
                  tintColor: COLORS.primary,
                  marginLeft: 10,
                }}
              />
            </TouchableOpacity>
          ),
          headerRight: () => <Text style={{color: '#fff'}}>klkdlk</Text>,
        })}
      />

      <Stack.Screen
        name="SignUpAvatar"
        component={SignUpAvatar}
        options={{
          title: ' Sign Up',
          headerTitleStyle: {
            alignSelf: 'center',
            color: COLORS.primary,
          },
          headerLeft: () => (
            <Image
              source={icons.ArrowLeft}
              resizeMode="contain"
              style={{
                width: SIZES.width / 18,
                height: SIZES.height / 18,
                tintColor: COLORS.primary,
                marginLeft: 10,
              }}
            />
          ),
          headerRight: () => <Text style={{color: '#fff'}}>klkdlk</Text>,
        }}
      />

      <Stack.Screen
        name="Create_Your_own_Avatar"
        component={Create_Your_own_Avatar}
        options={{
          title: null,
          headerTitleStyle: {
            alignSelf: 'center',
            color: COLORS.primary,
          },
          headerLeft: () => (
            <Text style={{color: COLORS.primary, ...FONTS.h3, marginLeft: 10}}>
              Cancle
            </Text>
          ),
          headerRight: () => (
            <Text
              style={{color: COLORS.secondary, ...FONTS.h3, marginRight: 10}}>
              Done
            </Text>
          ),
        }}
      />

      <Stack.Screen
        name="Home"
        component={Tabs}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="EventDescription"
        component={EventDescription}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Notifications"
        component={DefaultDrawerN}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="MyPathology"
        component={MyPathology}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="MyPost"
        component={MyPost}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="MyState"
        component={MyState}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="MyProfile"
        component={MyProfile}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="OncologyEvent"
        component={OncologyEvent}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Debate"
        component={Debate}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Logout"
        component={Logout}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Chatstatus"
        component={Chatstatus}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EventFeed"
        component={EventFeed}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Zoomapi"
        component={Zoomapi}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Zoomtesting"
        component={Zoomtesting}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Privacy"
        component={Privacy}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
