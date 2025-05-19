import {
  CardStyleInterpolators,
  HeaderStyleInterpolators,
  TransitionPresets
} from "@react-navigation/native-stack";

export const GeneralHeaderOptions = {
  screenOptions: {
    ...TransitionPresets.SlideFromRightIOS,
    headerStyleInterpolator: HeaderStyleInterpolators.forStatic,
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    headerShown: false
  }
};

export const GestureDisableOptions = {
  gestureEnabled: false,
  animationEnabled: false
};




