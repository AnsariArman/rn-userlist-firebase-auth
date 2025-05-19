import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screen/LoginScreen';
import UserListScreen from '../screen/UserListScreen';
import { AUTHLOADING, LOGINSCREEN, USERLISTSCREEN } from './routes';
import AuthLoadingScreen from '../screen/AuthLoadingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  const [isUserLogin, setIsUserLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    const isLoggedIn = await AsyncStorage.getItem('isUserLoggedIn');
    console.log("isLoggedIn", isLoggedIn)
    setIsUserLogin(isLoggedIn === 'true' ? true : false);
    setIsLoading(false)
  };
  return (
    <>
      {!isLoading && <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* <Stack.Screen name={AUTHLOADING} component={AuthLoadingScreen} /> */}
          {!isUserLogin ?
            <>
              <Stack.Screen name={LOGINSCREEN} component={LoginScreen} />
              <Stack.Screen name={USERLISTSCREEN} component={UserListScreen} />
            </>

            :
            <>
              <Stack.Screen name={USERLISTSCREEN} component={UserListScreen} />
              <Stack.Screen name={LOGINSCREEN} component={LoginScreen} />
            </>
          }
        </Stack.Navigator>

      </NavigationContainer>}
    </>

  );
};

export default MainNavigator;
