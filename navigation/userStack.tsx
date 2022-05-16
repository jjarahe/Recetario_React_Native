import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import CreateRecipe from '../screens/CreateRecipe';
import UpdateRecipe from '../screens/UpdateRecipe';

const Stack = createStackNavigator();

export default function UserStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Create Recipe" component={CreateRecipe} />
          <Stack.Screen name="Update Recipe" component={UpdateRecipe} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
