import React, {useState, useEffect,useRef} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {COLORS, FONTS, icons, images, SIZES} from '../constants';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../screens/Home';
import MyEvent from '../screens/MyEvent';
import MyChat from '../screens/MyChat';
import MyDebeat from '../screens/MyDebeat';
import MyAngel from '../screens/MyAngel';
import Notifications from '../screens/Notifications';

import { Platform } from 'react-native'

import {
  useFocusEffect,
} from '@react-navigation/native';
import CustomDrawer from './CustomDrawer';

const Tab = createBottomTabNavigator();
const DrawerH = createDrawerNavigator();
const DrawerME = createDrawerNavigator();
const DrawerC = createDrawerNavigator();
const DrawerD = createDrawerNavigator();
const DrawerA = createDrawerNavigator();



const DefaultDrawerH = props => (
  
 
  <DrawerH.Navigator
    openByDefault={false}
    drawerContentOptions={{
      activeTintColor: '#fff',
      itemStyle: {marginVertical: 5},
    }}
    drawerContent={(props, navigation) => (
      <CustomDrawer {...props} {...navigation} />
    )}>
    <DrawerH.Screen name="Home" component={Home} />
  </DrawerH.Navigator>
);
const DefaultDrawerME = props => (
  <DrawerME.Navigator
    openByDefault={false}
    drawerContentOptions={{
      activeTintColor: '#fff',
      itemStyle: {marginVertical: 5},
    }}
    drawerContent={(props, navigation) => (
      <CustomDrawer {...props} {...navigation} />
    )}>
    <DrawerME.Screen name="MyEvent" component={MyEvent} />
  </DrawerME.Navigator>
);
const DefaultDrawerC = props => (
  <DrawerC.Navigator
    openByDefault={false}
    drawerContentOptions={{
      activeTintColor: '#fff',
      itemStyle: {marginVertical: 5},
    }}
    drawerContent={(props, navigation) => (
      <CustomDrawer {...props} {...navigation} />
    )}>
    <DrawerC.Screen name="MyChat" component={MyChat} />
  </DrawerC.Navigator>
);
const DefaultDrawerD = props => (
  <DrawerD.Navigator
    openByDefault={false}
    drawerContentOptions={{
      activeTintColor: '#fff',
      itemStyle: {marginVertical: 5},
    }}
    drawerContent={(props, navigation) => (
      <CustomDrawer {...props} {...navigation} />
    )}>
    <DrawerD.Screen name="MyDebeat" component={MyDebeat} />
  </DrawerD.Navigator>
);
const DefaultDrawerA = props => (
  <DrawerA.Navigator
    openByDefault={false}
    drawerContentOptions={{
      activeTintColor: '#fff',
      itemStyle: {marginVertical: 5},
    }}
    drawerContent={(props, navigation) => (
      <CustomDrawer {...props} {...navigation} />
    )}>
    <DrawerA.Screen name="MyAngel" component={MyAngel} />
  </DrawerA.Navigator>
);

export default function App() {
  const [mychatmessaged, setMychatmessaged] = useState('0');
  const[leftstytle,setleftstytle]=useState();

  useEffect(() => {

    if (Platform.isPad) {
      setleftstytle(15)
    }
    else{
      setleftstytle(5)
    }
   
    let timer = setInterval(() => chathistory(), 5000);
    return () => clearInterval(timer);

   
  }, [mychatmessaged]);
  async function chathistory(){
    setMychatmessaged(global.chenewmessages)
console.log("hhhh"+global.chenewmessages)

  }
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={DefaultDrawerH}
        options={{
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                textAlignVertical:'center',
                //left:leftstytle,
                left:Platform.isPad?16.5:0,
                ...FONTS.h5,
                color: focused ? COLORS.primary : COLORS.lightGray1,
              }}>
              Home
            </Text>
          ),
          tabBarIcon: ({focused}) => (
            <View style={{}}>
              <Image
              source={icons.Home}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.primary : COLORS.lightGray1,
              }}
            />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="MyEvent"
        component={DefaultDrawerME}
        options={{
          // tabBarLabel: 'My Event',
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                textAlignVertical:'center',
                left:Platform.isPad?16.5:0,
                ...FONTS.h5,
                color: focused ? COLORS.primary : COLORS.lightGray1,
              }}>
              My Event
            </Text>
          ),
          tabBarIcon: ({focused}) => (
            <View>
            <Image 
              source={icons.CreateEvent}
              resizeMode="contain"
              style={{ 
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.primary : COLORS.lightGray1,
              }}
            />
            </View>
          ),
        }}
      />
 {mychatmessaged === '0' ? 
      <Tab.Screen
        name="Mychat"
        component={DefaultDrawerC}
        options={{
          // tabBarLabel: 'My Event',
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                textAlignVertical:'center',
                left:Platform.isPad?16.5:0,
                ...FONTS.h5,
                color: focused ? COLORS.primary : COLORS.lightGray1,
              }}>
              My Chat{' '}
            </Text>
          ),
          tabBarIcon: ({focused}) => (
            <View>
            <Image
              source={icons.Chat}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.primary : COLORS.lightGray1,
              }}
            />
            </View>
          ),
        }}
      />
      : 
 <Tab.Screen
        name="Mychat"
        component={DefaultDrawerC}
        options={{
          // tabBarLabel: 'My Event',
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                textAlignVertical:'center',
                left:Platform.isPad?16.5:0,
                ...FONTS.h522,
                color: focused ? COLORS.primary : COLORS.LightGreen,
              }}>
              {global.chenewmessages} New Msg{' '}
            </Text>
          ),
          tabBarIcon: ({focused}) => (
            
            <View>
            <Image
              source={icons.Chat}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.primary : COLORS.LightGreen,
              }}
            />
            </View>
          ),
        }}
      />
      }

      {/* <Tab.Screen name="MyChat" component={DefaultDrawerC}
         options={{
            tabBarLabel:({focused}) => ( 
                <Text style={{ ...FONTS.h5, color:focused ? COLORS.primary : COLORS.lightGray1  }}> My Chat </Text>) ,            tabBarIcon: ({ focused }) => (
                <TouchableOpacity>
                <Image
                    source={icons.Chat}
                    resizeMode="contain"
                    style={{
                        width: 25,
                        height: 25,
                        tintColor: focused ? COLORS.primary : COLORS.lightGray1
                    }}
                />
                </TouchableOpacity>
                
            ),
          
        }} /> */}
      <Tab.Screen
        name="MyDebeat"
        component={DefaultDrawerD}
        options={{
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                textAlignVertical:'center',
                left:Platform.isPad?16.5:0,
                ...FONTS.h5,
                color: focused ? COLORS.primary : COLORS.lightGray1,
              }}>
              My Debate
            </Text>
          ),
          tabBarIcon: ({focused}) => (
            <View>
            <Image
              source={icons.CreateDebate}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.primary : COLORS.lightGray1,
              }}
            />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="MyAngel"
        component={DefaultDrawerA}
        options={{
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                textAlignVertical:'center',
                left:Platform.isPad?16.5:0,
                ...FONTS.h5,
                color: focused ? COLORS.primary : COLORS.lightGray1,
              }}>
              My Angel{' '}
            </Text>
          ),

          tabBarIcon: ({focused}) => (
            <View>
            <Image
              source={icons.MyAngel}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.primary : COLORS.lightGray1,
              }}
            />
            </View>
          ),
        }}
      />

      {/* <Tab.Screen name="Notifications" component={DefaultDrawerN}
         tabBarOptions={{
            showLabel: false 
        }} /> */}
    </Tab.Navigator>
    
  );
}
