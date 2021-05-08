import React, {useEffect} from 'react';
import {StyleSheet, SafeAreaView, FlatList} from 'react-native';
import {Container, H1, Text} from 'native-base';

import {connect} from 'react-redux';
import {getPost} from '../action/post';
import propTypes from 'prop-types';

import EmptyContainer from '../components/EmptyContainer';

import Post from '../components/Post';

const Home = ({getPost, postState, userDetails}) => {
  useEffect(() => {
    getPost();
  }, []);

  if (postState.loading) {
    return <EmptyContainer />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={postState.posts}
        keyExtractor={item => item.id}
        renderItem={({item, index, separators}) => (
          <Post item={item} userDetails={userDetails} key={item.id} />
        )}
        ListEmptyComponent={() => (
          <Container style={styles.emptyContainer}>
            <H1>No post found!!</H1>
          </Container>
        )}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  postState: state.post,
  userDetails: state.auth.user,
});

const mapDispatchToProps = {
  getPost,
};

Home.propTypes = {
  getPost: propTypes.func.isRequired,
  postState: propTypes.object.isRequired,
  userDetails: propTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fbe0c4',
    justifyContent: 'flex-start',
    padding: 4,
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: '#1b262c',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
