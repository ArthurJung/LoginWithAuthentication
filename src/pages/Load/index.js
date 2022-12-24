import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

export default function Load() {
  const navigation = useNavigation();
  setTimeout(() => {
        navigation.navigate('Login')
    }, 600);

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInUp" delay={10} style={styles.containerHeader}>
          <Text style={styles.message}>Loading...</Text>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
      flex: 1,
      backgroundColor: '#cae0e0',
      alignItems: 'center'
    },
    containerHeader:{
      marginTop: '100%',
      alignSelf: 'center',
      justifyContent: 'center'
    },
  message:{
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000'
  }
});