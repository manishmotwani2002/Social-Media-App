import React from 'react';
import {StyleSheet} from 'react-native';

import {Text, Header, Body, Button, Right, Icon, Title} from 'native-base';

import {connect} from 'react-redux';
import propTypes from 'prop-types';
import {signOut} from '../action/auth';

//168310

const CustomHeader = ({signOut, authState, navigation}) => {
  return (
    <Header
      androidStatusBarColor="#0061a8"
      style={{
        backgroundColor: '#0061a8',
      }}>
      <Body>
        <Title>Social App</Title>
      </Body>
      <Right>
        {authState.isAuthenticated && (
          <>
            <Button
              transparent
              iconLeft
              onPress={() => {
                navigation.navigate('AddPost');
              }}>
              <Text style={{color: '#fae3d9'}}>Add Post</Text>
            </Button>
            <Button transparent onPress={() => signOut()}>
              <Icon name="log-out-outline" style={{color: 'red'}} />
            </Button>
          </>
        )}
      </Right>
    </Header>
  );
};

const mapStateToProps = state => ({
  authState: state.auth,
});

const mapDispatchToProps = {
  signOut,
};

CustomHeader.propTypes = {
  signOut: propTypes.func.isRequired,
  authState: propTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomHeader);
