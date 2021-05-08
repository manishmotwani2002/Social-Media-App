import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Container, Spinner, H1} from 'native-base';

const EmptyContainer = () => {
  return (
    <Container style={styles.emptyContainer}>
      <H1>No post of any usesr!!</H1>
      <Spinner />
    </Container>
  );
};

export default EmptyContainer;

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#1b262c',
  },
});
