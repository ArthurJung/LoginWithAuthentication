import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import firebase from '../../firebaseConfig/index'

export default function Home( idUser ) {
  const navigation = useNavigation();

  const signOut = () => {
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      navigation.navigate('Login')
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInLeft" delay={100} style={styles.containerHeader}>
          <Text style={styles.message}>Bem-vindo(a)</Text>
          <TouchableOpacity style={styles.button} onPress={signOut}>
            <Text style={styles.buttonText}>Sair</Text>
          </TouchableOpacity>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" delay={50} style={styles.containerForm}>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
      flex: 1,
      backgroundColor: '#cae0e0'
    },
    containerHeader:{
      marginTop: '14%',
      marginBottom: '8%',
      paddingStart: '5%',
      flexDirection: 'row'
    },
    message:{
      fontSize: 28,
      fontWeight: 'bold',
      color: '#000000',
      borderRadius: 4,
      paddingVertical: 8,
      marginTop: 14,
      justifyContent: 'center',
      alignItems: 'center'
    },
    containerForm:{
      backgroundColor: '#FFF',
      flex: 1,
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      paddingStart: '5%',
      paddingEnd: '5%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    button:{
      paddingVertical: 8,
      marginTop: 22,
      paddingStart: 80
    },
    buttonText: {
      fontSize: 18,
      color: '#000000'
    }
});
