import 'react-native-gesture-handler';
import React from 'react'
import { ThemeProvider } from 'react-native-elements';
import './config/firebase'
import RootNavigation from './navigation/index';


export default function App() {
  return (
      <ThemeProvider>
           <RootNavigation />
      </ThemeProvider>
     
    /*<View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>*/
  );
}

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});*/
