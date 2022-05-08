import 'react-native-gesture-handler';
import React from 'react'
import './config/firebase'
import RootNavigation from './navigation';


export default function App() {
  return (
      <RootNavigation />
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
