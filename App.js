import React from 'react';
import MainNavigator from './src/navigation/MainNavigator';
import { StatusBar, useColorScheme, Platform, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundColor = isDarkMode ? '#000000' : '#ffffff';

  return (
    <SafeAreaProvider>
      {/* StatusBar setup */}
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundColor}
        translucent={Platform.OS === 'android'}
      />

      {/* Safe area to avoid UI going under status bar */}
      <SafeAreaView style={{ flex: 1, backgroundColor }}>
        <MainNavigator />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
