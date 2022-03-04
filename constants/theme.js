import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    widthPercentageToFonts as wf,
    heightPercentageToFonts as hf,
  } from "react-native-responsive-screen-font";
  

// Color Code #253A79 #EE351F #0A0A0A #707070 #4B75F2 #D8E2FF #1A2853 #59627D

export const COLORS = {
    // base colors
    primary: "#253A79", 
    secondary: "#EE351F",   
    red: "#ff0000", 
    // colors
    black: "#0A0A0A",
    white: "#FFFFFF",

    LightGreen:'#18D92B',

    lightGray: "#707070",
    lightGray1:"#59627D",

    blue:"#4B75F2",
    
};

export const SIZES = {
    width,
    height
};

export const FONTS = {
    FF_YM:"Roboto-Italic",
    largeTitle: { fontFamily: "Roboto-regular", fontSize: SIZES.largeTitle, lineHeight: 55 },
    h1: { fontFamily: "Yantramanav-Bold",  fontSize: wf("9%"), lineHeight: 65 },
    h2: { fontFamily: "Yantramanav-Medium", fontSize: wf("5.5%"), },
    h3: { fontFamily: "Yantramanav-Medium", fontSize: wf("5%"), },
   h4: { fontFamily: "Yantramanav-Regular", fontSize: wf("4%"), },
   h5: { fontFamily: "Yantramanav-Regular", fontSize: wf("4%"), },
   h522: { fontFamily: "Yantramanav-Regular", fontSize: wf("3.5%"), },

    body1: { fontFamily: "Roboto-Regular", fontSize: SIZES.body1, lineHeight: 36 },
    body2: { fontFamily: "Roboto-Regular", fontSize: SIZES.body2, lineHeight: 30 },
    body3: { fontFamily: "Yantramanav-Light", fontSize: SIZES.body3, lineHeight: 22 },
    body4: { fontFamily: "Yantramanav-Light", fontSize: wf("4%"), lineHeight: 22 },
    body5: { fontFamily: "Roboto-Regular", fontSize: SIZES.body5, lineHeight: 22 },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
