import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { StackScreenProps } from '@react-navigation/stack';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';



const SignUpScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
    const [value, setValue] = React.useState({
        email: '',
        password: '',
        error: ''    
    });
    
    async function signUp() {
        if (value.email === '' || value.password === '') {
            setValue({
                ...value,
                error: 'Email and password are mandatory.'
            })
            return;
        }
        try {
            const auth = getAuth();
            await createUserWithEmailAndPassword(auth, value.email, value.password);
            navigation.navigate('Sign In');
        } catch (error) {
            setValue({
                ...value,
                error: error.message,
            })
        } 
    }
    
    return (
    <View style={styles.container}>
      <Text>SignUpScreen screen!</Text>
      
      {!!value.error && <View style={styles.error}><Text>{ value.error }</Text></View>}
      
      <View style={styles.controls}>
          <Input
            placeholder='Email'
            containerStyle={styles.control}
            value={value.email}
            onChangeText={(Text) => setValue({...value, email: Text})}
            leftIcon={<Icon
                        name='envelope'
                        size={16}
                        />}
          />
          
          <Input
          placeholder='Password'
          containerStyle={styles.control}
          value={value.password}
          onChangeText={(text) => setValue({ ...value, password: text })}
          secureTextEntry={true}
          leftIcon={<Icon
            name='key'
            size={16}
          />}
        />

        <Button title="Sign up" buttonStyle={styles.control} onPress={signUp} />
          
      </View> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  controls: {
      flex: 1,
  },
  
  control: {
    marginTop: 10,
    width: 300,
  },
  
  error: {
      marginTop: 10,
      padding: 10,
      color: '#fff',
      backgroundColor: '#D54826FF',
  }
});

export default SignUpScreen;
