import React, {useState} from 'react';
import {StyleSheet, ScrollView, TouchableOpacity, View} from 'react-native';
import {
  Text,
  Container,
  Form,
  Input,
  Item,
  Button,
  Thumbnail,
  Content,
  Label,
} from 'native-base';

import storage from '@react-native-firebase/storage';
import ProgressBar from 'react-native-progress/Bar';

import ImagePicker from 'react-native-image-picker';
import {options} from '../utility/options';

import propTypes from 'prop-types';
import {signUp} from '../action/auth';
import {connect} from 'react-redux';

const SignUp = ({signUp}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [instaUserName, setInstaUserName] = useState('');
  const [country, setCountry] = useState('');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState(
    'data:image/png;base64,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',
  );

  const [imageUploading, setImageUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  const chooseImage = async () => {
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log('image res: ', response);
        uploadImage(response);
      }
    });
  };

  const uploadImage = async response => {
    setImageUploading(true);
    const reference = storage().ref(response.fileName);

    const task = reference.putFile(response.path);
    task.on('state_changed', taskSnapshot => {
      const percentage =
        (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 1000;
      setUploadStatus(percentage);
    });

    task.then(async () => {
      const url = await reference.getDownloadURL();

      setImage(url);
      setImageUploading(false);
    });
  };

  const doSignUp = async () => {
    signUp({name, password, instaUserName, country, bio, email, image}).then(
      res => {
        console.log('response is', res);
      },
    );
  };

  return (
    <Container style={styles.container}>
      <Content padder>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={chooseImage}>
              <Thumbnail large source={{uri: image}} />
            </TouchableOpacity>
          </View>

          {imageUploading && (
            <ProgressBar progress={uploadStatus} style={styles.progress} />
          )}

          <Form>
            <Item floatingLabel style={styles.formItem}>
              <Label>Name</Label>
              <Input
                placeholder="name"
                value={name}
                style={{color: '#000'}}
                onChangeText={text => setName(text)}
              />
            </Item>
            <Item floatingLabel style={styles.formItem}>
              <Label>Email</Label>
              <Input
                placeholder="email"
                value={email}
                style={{color: '#000'}}
                onChangeText={text => setEmail(text)}
              />
            </Item>
            <Item floatingLabel style={styles.formItem}>
              <Label>Password</Label>
              <Input
                placeholder="password"
                value={password}
                secureTextEntry={true}
                style={{color: '#000'}}
                onChangeText={text => setPassword(text)}
              />
            </Item>
            <Item floatingLabel style={styles.formItem}>
              <Label>Insta-User-Name</Label>
              <Input
                placeholder="Instagram user name"
                value={instaUserName}
                style={{color: '#000'}}
                onChangeText={text => setInstaUserName(text)}
              />
            </Item>
            <Item floatingLabel style={styles.formItem}>
              <Label>Bio</Label>
              <Input
                placeholder="Your Short Bio"
                value={bio}
                style={{color: '#000'}}
                onChangeText={text => setBio(text)}
              />
            </Item>
            <Item floatingLabel style={styles.formItem}>
              <Label>Country</Label>
              <Input
                placeholder="country"
                value={country}
                style={{color: '#000'}}
                onChangeText={text => setCountry(text)}
              />
            </Item>
            <Button rounded block onPress={doSignUp} style={styles.button}>
              <Text>SignUp</Text>
            </Button>
          </Form>
        </ScrollView>
      </Content>
    </Container>
  );
};

const mapDispatchToProps = {
  signUp: data => signUp(data),
};

SignUp.propTypes = {
  signUp: propTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(SignUp);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fbe0c4',
    flex: 1,
    justifyContent: 'flex-start',
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 5,
  },
  progress: {width: null, marginBottom: 20},
  formItem: {
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
  },

  button: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    marginTop: 20,
    backgroundColor: '#0061a8',
  },
});
