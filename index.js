/**
 * @format
 */
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

const EzoAuthApp = () => (
    <GestureHandlerRootView style={{flex:1}}>
            <SafeAreaProvider>
                <App />
            </SafeAreaProvider>
    </GestureHandlerRootView>
);
AppRegistry.registerComponent(appName, () => EzoAuthApp);
