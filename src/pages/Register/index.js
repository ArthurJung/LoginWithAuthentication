import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import firebase from '../../firebaseConfig'

export default function Register() {
  const navigation = useNavigation();

  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [errorConfirmedPassword, setErrorConfirmedPassword] = useState(false);
  const [errorPasswordDiferent, setErrorPasswordDiferent] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmedpassword, setConfirmedPassword] = useState('');
  const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  const database = firebase.firestore()

  const register = () => {    
    if (email.match(re) && password.length >= 6 && name != '' && password === confirmedpassword){
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        database.collection('names').add({
          name: name,
          Uid: user.uid
        })
        navigation.navigate('Home', { idUser: user.uid })
        // ...
      })
      .catch((error) => {
        setErrorEmail(true)
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // ..
      });
    }else if(!email.match(re)){
      setErrorEmail(false)
    }

    if(name === ''){ setErrorName(true) } else { setErrorName(false) }

    if(password === ''){ setErrorPassword(true) } else{ setErrorPassword(false) }

    if(confirmedpassword === password){ setErrorPasswordDiferent(false) } else{ setErrorPasswordDiferent(true) }

    if(confirmedpassword === ''){
      setErrorConfirmedPassword(true)
      setErrorPasswordDiferent(false)
    }else{
      setErrorConfirmedPassword(false)
    }
  }

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInLeft" delay={100} style={styles.containerHeader}>
          <Text style={styles.message}>Cadastro</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" delay={50}  style={styles.containerForm}>
        <Text style={styles.title}>Nome</Text>
        <TextInput placeholder='Digite o nome...' style={styles.input} onChangeText={setName} value={name}/>
        {errorName && <Text style={styles.labelError}>O campo nome não pode estar vazio</Text>}

        <Text style={styles.title}>Email</Text>
        <TextInput placeholder='Digite o email...' style={styles.input} onChangeText={setEmail} value={email}/>
        {errorEmail && <Text style={styles.labelError}>Email inválido ou já existente</Text>}

        <Text style={styles.title}>Senha</Text>
        <TextInput placeholder='Digite a senha... (min: 6 caracteres)' secureTextEntry={true} style={styles.input} onChangeText={setPassword} value={password}/>
        {errorPassword && <Text style={styles.labelError}>Preencha a senha (min: 6 caracteres)</Text>}  

        <Text style={styles.title}>Confirme a senha</Text>
        <TextInput placeholder='Confirme a senha...' secureTextEntry={true} style={styles.input} onChangeText={setConfirmedPassword} value={confirmedpassword}/> 
        {errorConfirmedPassword && <Text style={styles.labelError}>Preencha esse campo</Text>}
        {errorPasswordDiferent && <Text style={styles.labelError}>As senha são diferentes</Text>}

        <TouchableOpacity style={styles.button} onPress={register}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonRegister} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.registerText}>Já possui uma conta ? Faça o login</Text>
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