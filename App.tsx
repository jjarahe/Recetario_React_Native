import 'react-native-gesture-handler';
import React from 'react'
import { ThemeProvider } from 'react-native-elements';
import './config/firebase'
import RootNavigation from './navigation/index';
import { SafeAreaProvider } from 'react-native-safe-area-context';


export default function App() {
  return (
       <ThemeProvider>
           <RootNavigation />
        </ThemeProvider>
  );
}
