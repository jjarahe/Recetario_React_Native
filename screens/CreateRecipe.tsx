import React, {useState} from "react";
import { View, Button, TextInput, ScrollView, StyleSheet } from 'react-native'
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { useAuthentication } from '../utils/hooks/useAuthentication';



const CreateRecipe = () => {
    const { user } = useAuthentication();
    
    const [recipe, setRecipe] = useState({
        name: '',
        detail: ''
    })
    
    const saveNewRecipe = async () => {
        const db = getDatabase();
        
        if(recipe.name === ''){
            alert('Please provide a Recipe name')
        } else {
            const reference = ref(db, 'users/' + 'Juan' );
            set(reference, {...recipe});
        }
        
        
    }
    
    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Recipe's Name" onChangeText={(value) => setRecipe({...recipe, name: value})}/>    
            </View>  
            <View style={styles.inputGroup}>
                <TextInput placeholder="Recipe's Steps" onChangeText={(value) => setRecipe({...recipe, detail: value})}/>    
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

      },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    },
  
})


export default CreateRecipe;
