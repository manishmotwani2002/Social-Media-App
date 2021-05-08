import auth from '@react-native-firebase/auth';
import Snackbar from 'react-native-snackbar';
import database from '@react-native-firebase/database';

export const signUp = data => async dispatch => {
  console.log(data);

  const {name, instaUserName, country, image, email, password, bio} = data;

  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(data => {
      console.log(data);
      console.log('user creation successfull!!');

      database()
        .ref('/users/' + data.user.uid)
        .set({
          name: name,
          instaUserName: instaUserName,
          country: country,
          image: image,
          bio: bio,
          uid: data.user.uid,
          email: email,
        })
        .then(() => {
          console.log('data set successfull!!');
          Snackbar.show({
            text: 'Signup Success!!',
            textColor: 'black',
            backgroundColor: 'green',
          });
        });
    })
    .catch(error => {
      console.log(error);

      Snackbar.show({
        text: 'Signup failed!!',
        textColor: 'white',
        backgroundColor: 'red',
      });
    });
};

export const signIn = data => async dispatch => {
  console.log(data);
  const {email, password} = data;

  auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log('signin successfull!!');
      Snackbar.show({
        text: 'SignIn Success!!',
        textColor: 'black',
        backgroundColor: 'green',
      });
    })
    .catch(error => {
      console.log(error);
      Snackbar.show({
        text: 'SignIn failed!!',
        textColor: 'white',
        backgroundColor: 'red',
      });
    });
};

export const signOut = () => async dispatch => {
  auth()
    .signOut()
    .then(() => {
      console.log('signout successfull!!');
      Snackbar.show({
        text: 'Signout Success!!',
        textColor: 'black',
        backgroundColor: 'green',
      });
    })
    .catch(() => {
      console.log(error);
      Snackbar.show({
        text: 'Signout failed!!',
        textColor: 'white',
        backgroundColor: 'red',
      });
    });
};
