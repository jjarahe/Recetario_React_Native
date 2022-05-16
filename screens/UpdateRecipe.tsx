import React, {useState, useEffect} from "react";
import { View, TextInput,Button, ScrollView, StyleSheet, Text, ActivityIndicator } from 'react-native'
import { getDatabase, ref, set, get, child, remove } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const UpdateRecipe = (props) => {
    const auth = getAuth();  
    const [recipe, setRecipe] = useState({id: '', name:'', detail:''});
    const [loading, setLoading] = useState(true);
    
    const [error, setError] = useState<string | null>(null);
    let recipeDummy = {};
    let recipeList = {id: '', name:'', detail:''};
    
    useEffect(() => {
        const db = getDatabase();
        const dbRef = ref(db);
        get(child(dbRef, `${auth.currentUser?.uid}/recipies/${props.route.params.id}`)).then((snapshot) => {
            if(snapshot.exists()){
                recipeDummy = snapshot.val()
               
                recipeList = { id: props.route.params.id, name: recipeDummy.name, detail: recipeDummy.detail}

                setRecipe( recipeList );
               
            } else {
                console.log('No data available');
            }
        }).catch( (error) => {
            console.error(error)
        })
        
        setLoading(false)
    },[])
    
    const deleteRecipe = async () =>{
        try {
            const db = getDatabase();
            const reference = ref(db, `${auth.currentUser?.uid}/recipies/${props.route.params.id}`);
            remove(reference);
            props.navigation.navigate('Home')
        } catch (error) {
            console.info(error)
        }
        
    }
    
    
    const updateRecipe = async () => {
        const db = getDatabase(); 
        if(recipe.name === '' || recipe.detail === ''){
            setError('Recipe name and detail should not be empty!')
        } else {
            try {
                const reference = ref(db, `${auth.currentUser?.uid}/recipies/${props.route.params.id}`);
                set( reference, recipe);
                props.navigation.navigate('Home')
            } catch (error) {
                console.info(error)
            }
        } 
    }
    
    if(loading){
        return (
            <View>
                <ActivityIndicator size='large' color='#9e9e9e'/>
            </View>
        );
    }
    
    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Name" value={recipe.name} onChangeText={(value) => setRecipe({...recipe, name: value})}/>    
            </View>  
            <View style={styles.inputGroup}>
                <TextInput placeholder="Steps" value={recipe.detail}  onChangeText={(value) => setRecipe({...recipe, detail: value})}/>   
            </View>
            <View>
                {
                    error &&  <Text style={styles.error}>{error}</Text>
                }
            </View>    
            <View style={styles.button}>
                <Button color='green' title="Update Recipe" onPress={()=> updateRecipe()}/>    
            </View>   
            <View style={styles.button}>
                <Button color='red'  title="Delete Recipe" onPress={()=> deleteRecipe()}/>    
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
    },
    button:{
        margin: 10,
    },
})


export default UpdateRecipe;
