import React, {useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  Container,
  Form,
  Item,
  Input,
  Text,
  Button,
  Label,
  H3,
} from 'native-base';

import {connect} from 'react-redux';
import {signIn, signUp} from '../action/auth';
import propTypes from 'prop-types';

import Welcome from '../assets/undraw_welcome_cats_thqn.png';

const SignIn = ({navigation, signIn}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const doSignIn = () => {
    signIn({email, password});
  };

  return (
    <Container style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        {/* <H3 style={styles.heading}>Welcome to the Travel-gram Social App</H3> */}

        <Image
          source={Welcome}
          style={{width: null, height: 150, marginTop: 30}}
          resizeMode="contain"
        />

        <Form>
          <Item floatingLabel style={styles.formItem}>
            <Label style={styles.label}>Enter Email</Label>
            <Input
              // placeholder="enter your registerd email"
              value={email}
              style={{color: '#000'}}
              onChangeText={text => setEmail(text)}
            />
          </Item>
          <Item floatingLabel style={styles.formItem}>
            <Label>Enter Password</Label>
            <Input
              value={password}
              secureTextEntry={true}
              style={{color: '#000'}}
              onChangeText={text => setPassword(text)}
            />
          </Item>
          <Button
            rounded
            block
            onPress={doSignIn}
            style={[styles.formItem, {backgroundColor: '#0061a8'}]}>
            <Text>signIn</Text>
          </Button>
          <View>
            <Text style={{textAlign: 'center'}}>
              do not have an account?
              <TouchableOpacity
                onPress={() => navigation.navigate('SignUp')}
                style={{marginTop: 10}}>
                <Text style={{color: '#11999e'}}>SignUp</Text>
              </TouchableOpacity>
            </Text>
          </View>
        </Form>
      </ScrollView>
    </Container>
  );
};

const mapDispatchToProps = {
  signIn: data => signIn(data),
};

SignIn.propTypes = {
  signIn: propTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(SignIn);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fbe0c4',
    flex: 1,
    justifyContent: 'flex-start',
  },
  heading: {
    textAlign: 'center',
    color: '#40514e',
    marginHorizontal: 5,
    marginTop: 30,
  },
  formItem: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    marginTop: 20,
    // style={{margin: 20}}
  },
  button: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    marginTop: 20,
    backgroundColor: '#11999e',
  },
});
