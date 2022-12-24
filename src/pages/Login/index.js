import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import firebase from '../../firebaseConfig'

export default function Login() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);
  const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  const validar = () => {
    if (email.match(re)){
      setErrorEmail(false)

      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          setEmail('')
          setPassword('')
          setErrorLogin(false)
          navigation.navigate('Home', { idUser: user});
          // ...
        })
        .catch((error) => {
          setErrorLogin(true)
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });

    }else{
      setErrorEmail(true)
    }
    return;
  };

  const createAccount = () => {
    setErrorEmail(false)
    setEmail('')
    setPassword('')
    navigation.navigate('Register')
  };

  const resetPassword = () => {
    setErrorEmail(false)
    setEmail('')
    setPassword('')
    navigation.navigate('ResetPassword')
  };

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInLeft" delay={100} style={styles.containerHeader}>
          <Text style={styles.message}>Login</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" delay={50} style={styles.containerForm}>
        <Text style={styles.title}>Email</Text>
        <TextInput 
          placeholder='Digite o email...' 
          style={[styles.input, {borderColor: errorEmail && '#ff375b'}]} 
          onChangeText={setEmail} 
          value={email}
        />
        {errorEmail && <Text style={styles.labelError}>Preencha o email corretamente</Text>}

        <Text style={styles.title}>Senha</Text>
        <TextInput 
          placeholder='Digite a senha...' 
          secureTextEntry={true} 
          style={styles.input} 
          onChangeText={setPassword} 
          value={password}
        /> 

        <TouchableOpacity style={styles.button} onPress={validar}>
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>
        {errorLogin && <Text style={styles.labelError}>Login inválido, email ou senha incorretos</Text>}

        <TouchableOpacity style={styles.buttonRegister} onPress={createAccount}>
          <Text style={styles.registerText}>Não possui uma conta ? Cadastre-se</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonRegister} onPress={resetPassword}>
          <Text style={styles.registerText}>Esqueceu sua senha ?</Text>
        </TouchableOpacity>
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
  buttonRegister:{
    alignSelf: 'center',
    marginTop: 14
  },
  registerText: {
    color: '#a1a1a1'
  },
  labelError:{
    color: '#ff375b',
    alignSelf: 'flex-start',
    marginBottom: 8
  }
})