import React, {useState} from "react";
import { View, Button, TextInput, ScrollView, StyleSheet, Text } from 'react-native'
import { getDatabase, ref, onValue, set, push } from 'firebase/database';
import { useAuthentication } from '../utils/hooks/useAuthentication';
//const { getFirestore, Timestamp, FieldValue } from ('firebase-admin/firestore');


const CreateRecipe = (props) => {
    const { user } = useAuthentication();
    
    const [recipe, setRecipe] = useState({ 
        name: '', 
        detail: '' 
    })
    
    const [error, setError] = useState<string | null>(null)
    
    const saveNewRecipe = async () => {
        const db = getDatabase();
        //const dbStore = getFirestore();
        
        if(recipe.name === '' || recipe.detail === ''){
            setError('Recipe name and detail should not be empty!')
        } else {
            try {
                const reference = ref(db, `${user?.uid}/recipies`);
                push( reference, recipe);
                props.navigation.navigate('Home')
            } catch (error) {
                console.info(error)
            }
        } 
    }
    
    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Name" onChangeText={(value) => setRecipe({...recipe, name: value})}/>    
            </View>  
            <View style={styles.inputGroup}>
                <TextInput placeholder="Steps" onChangeText={(value) => setRecipe({...recipe, detail: value})}/>   
            </View>
            <View>
                {
                    error &&  <Text style={styles.error}>{error}</Text>
                }
            </View>    
            <View>
                <Button title="Save Recipe" onPress={()=> saveNewRecipe()}/>    
            </View>    
        </ScrollView>
    );
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 40
      },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    },
    error: {
        color: 'red',
        marginBottom: 20,
    }
})


export default CreateRecipe;
