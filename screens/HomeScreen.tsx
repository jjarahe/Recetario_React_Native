import React, { useEffect, useState } from 'react';
//import { Button, ListItem, Avatar } from 'react-native-elements'
import { ListItem, Avatar } from "react-native-elements";
import { useAuthentication } from '../utils/hooks/useAuthentication';
import { getAuth, signOut } from 'firebase/auth';
import { StyleSheet, Text, View, Button} from 'react-native';
import { getDatabase, ref, child, get, } from 'firebase/database'; 
import { ScrollView } from 'react-native-gesture-handler';
import Card from '../components/Card';

export default function HomeScreen(props) {
    const auth = getAuth();
    
    const { user } = useAuthentication();
    const [recipies, setRecipies] = useState<Array<{id: string, name:string; detail:string}>>([]);
    let recipeListDummy = [];
    let recipeList: Array<{id: string, name:string; detail:string}> = [];
    
    
    useEffect(()=> {
        const db = getDatabase();
        const dbRef = ref(db);
        get(child(dbRef, `${auth.currentUser?.uid}/recipies`)).then((snapshot) => {
            if(snapshot.exists()){
                recipeListDummy = Object.entries(snapshot.val());
                recipeListDummy.forEach(recipe => {
                    recipeList.push({ id: recipe[0], name: recipe[1].name, detail: recipe[1].detail})
                })
                setRecipies( recipeList);
            } else {
                console.log('No data available');
            }
        }).catch( (error) => {
            console.error(error)
        })
    },[recipies]);
   
  return (
      
      <ScrollView style={styles.container}>
                
                <Text style= {styles.userData}>Welcome {user?.email}!</Text>
                <Button title='Create Recipe' style={styles.button} onPress={()=> props.navigation.navigate('Create Recipe')}/>
                
               {
                  
                   recipies.map((recipe) => {
                    return ( 
                    <ListItem
                       key={recipe.id}
                       bottomDivider
                     >
                         <Card id={recipe.id} name={recipe.name} detail={recipe.detail} onPress={()=> {props.navigation.navigate('Update Recipe', { id: recipe.id })}}/>
                     </ListItem>
                     );
                    })
               }
               
                <View style={styles.button}>
                    <Button color='red' title='Sign Out'  onPress={() => signOut(auth)}/>
                </View>
      </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: '#fff',
   padding: 30
  },
  userData: {
    backgroundColor: '#fff',
    fontSize: 15,
    marginBottom: 15 
  },
  button: {
      padding: 10,
      margin: 30
  }
});
