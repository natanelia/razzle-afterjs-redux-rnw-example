import React, { Component } from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';

import './index.scss';
import { Link } from 'react-router-dom';

class Home extends Component {
  static async getInitialProps({ req, res, match, history, location, ...ctx }) {
    return { whatever: 'stuff' };
  }

  render() {
    return (
      <View style={styles.box}>
        <Image
          source={{ uri: require('./react.svg'), width: 200, height: 200 }}
          resizeMode="contain"
          accessibilityLabel="logo"
        />
        <Text style={styles.text}>
          This is 'whatever' from getInitialProps: {this.props.whatever}
        </Text>
        <Link className="link" to="/about">
          About ->
        </Link>
        <Link to="/counter">Counter -></Link>
        <Link to="/counter?counter=100">Counter with 120 starting value-></Link>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: { padding: 10, flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { paddingVertical: 10 },
});

export default Home;
