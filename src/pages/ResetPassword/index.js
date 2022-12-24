import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import firebase from '../../firebaseConfig'

export default function Login() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState(false);
  const [sendEmail, setSendEmail] = useState(false);
  const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  const resetPassword = () => {
    if (email.match(re)){
      firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
        // Password reset email sent!
        // ..
        setErrorEmail(false)
        setSendEmail(true)
        setTimeout(() => {
        navigation.navigate('Login')
        }, 10000);
      })
      .catch((error) => {
        setErrorEmail(true)
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // ..
      })
    }else {
      setErrorEmail(true)
    }
  }
 

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInLeft" delay={100} style={styles.containerHeader}>
          <Text style={styles.message}>Redefinição de Senha</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" delay={50} style={styles.containerForm}>
        <Text style={styles.title}>Email</Text>
        <TextInput 
          placeholder='Digite seu email...' 
          style={[styles.input, {borderColor: errorEmail && '#ff375b'}]} 
          onChangeText={setEmail} 
          value={email}
        />
        {errorEmail && <Text style={styles.labelError}>Email inválido ou inexistente</Text>}

        <TouchableOpacity style={styles.button} onPress={resetPassword}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
        {sendEmail && <Text style={styles.labelSend}>Email enviado com sucesso!</Text>}

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
    paddingStart: '5%'
  },
  message:{
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000'
  },
  containerForm:{
    backgroundColor: '#FFF',
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%'
  },
  title: {
    fontSize: 20,
    marginTop: 28
  },
  input:{
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16
  },
  button:{
    backgroundColor: '#cae0e0',
    width: '100%',
    borderRadius: 4,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 20,
    color: '#000000'
  },
  labelSend:{
    color: '#008000',
    alignSelf: 'center',
    marginBottom: 8,
    fontSize: 18
  }
})