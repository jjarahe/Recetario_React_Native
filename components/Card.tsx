import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

interface Props {
    id: string,
    name: string,
    detail: string,
    onPress: () => void
}

export default function Card(props: Props) {
    const appleIcon = () => {
        return (
            <MaterialCommunityIcons name="food-apple-outline" size={24} color="black" />
        )
    }
    
    
    const detailsIcon = () => <MaterialCommunityIcons name="details" size={24} color="black" />
    
  return (
      <Pressable style={styles.container} onPress={props.onPress}>
            <View >
              <Text style={styles.title}>{props.name}</Text>
              <Text>{props.detail}</Text>
            </View>
            <View>
                <MaterialCommunityIcons name="details" size={24} color="black" />
            </View> 
      </Pressable>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        fontWeight: 'bold'
    }
})
