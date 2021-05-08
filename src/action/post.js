import database from '@react-native-firebase/database';
import {ERROR_POST, SET_POST} from './action.types';

export const getPost = () => async dispatch => {
  try {
    database()
      .ref('/posts/')
      .on('value', snapshot => {
        console.log('User data: ', snapshot.val());

        if (snapshot.val()) {
          dispatch({
            type: SET_POST,
            payload: Object.values(snapshot.val()),
          });
        } else {
          dispatch({
            type: ERROR_POST,
            payload: [],
          });
        }
      });
  } catch (error) {
    dispatch({
      type: ERROR_POST,
    });
  }
};
