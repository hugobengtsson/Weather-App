import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider} from 'react-native-safe-area-context';
import NavigationComponent from './navigation/navigationComponent';

export default function App() {

    return (
      <SafeAreaProvider>
          <NavigationComponent />
          <StatusBar />

      </SafeAreaProvider>
    );

}
