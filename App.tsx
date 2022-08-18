import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider} from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import NavigationComponent from './navigation/navigationComponent';

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
          <NavigationComponent />
          <StatusBar />

      </SafeAreaProvider>
    );
  }
}
