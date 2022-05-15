import React, { useEffect, useState } from 'react';
import { Button } from 'react-native-elements'
import { useAuthentication } from '../utils/hooks/useAuthentication';
import { getAuth, signOut } from 'firebase/auth';
import { StyleSheet, Text, View, SafeAreaView, SectionList, StatusBar } from 'react-native';
import { getDatabase, ref, child, get, } from 'firebase/database'; 

export default function HomeScreen(props) {
    const auth = getAuth();
    auth.currentUser?.uid
    const { user } = useAuthentication();
    const [recipies, setRecipies] = useState<Array<object> | null>([]);
    let recipeList = [];
    
    useEffect(()=> {
        const db = getDatabase();
        const dbRef = ref(db);
        get(child(dbRef, `${auth.currentUser?.uid}/recipies`)).then((snapshot) => {
            if(snapshot.exists()){
                console.log(snapshot.val());
                recipeList = Object.entries(snapshot.val());
                setRecipies( recipeList );
                console.log("Lista de recetas", recipeList);
                console.log("Lista de recetas State", recipies);
            } else {
                console.log('No data available');
            }
        }).catch( (error) => {
            console.error(error)
        })
    },[])
    
    
    const DATA = [
        {
          title: 'Main dishes',
          data: ['Pizza', 'Burger', 'Risotto'],
        },
        {
          title: 'Sides',
          data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
        },
      ];
      
      const Item = ({ title }) => (
        <View style={styles.item}>
          <Text style={styles.title}>{title}</Text>
        </View>
     
      );
    
  return (
      
      <View style={styles.container}>
                
                <Text style= {styles.userData}>Welcome {user?.email}!</Text>
                <Button title='Create Recipe' style={styles.button} onPress={()=> props.navigation.navigate('Create Recipe')}/>
                
                <SectionList
                  sections={DATA}
                  keyExtractor={(item, index) => item + index}
                  renderItem={({ item }) => <Item title={item} />}
                  renderSectionHeader={({ section: { title } }) => <Text style={styles.header}>{title}</Text>}
                />
               
                
                <Button title='Sign Out' style={styles.button} onPress={() => signOut(auth)}/>

      </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: '#fff',
   padding: 30
  },
  button: {
      marginTop: 10
  },
  item: {
    padding: 5,
    marginVertical: 1,
  },
  header: {
    fontSize: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 15,
  },
  userData: {
    backgroundColor: '#fff',
    fontSize: 15,
    marginBottom: 15 
  },
  button: {
      padding: 10
  }
});
