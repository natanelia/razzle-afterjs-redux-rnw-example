import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import logo from './react.svg';
import { Link } from 'react-router-dom';

class Home extends Component {
  static async getInitialProps({ req, res, match, history, location, ...ctx }) {
    return { whatever: 'stuff' };
  }

  render() {
    return (
      <View style={styles.box}>
        <img src={logo} alt="logo" />
        <Text style={styles.text}>saya mau {this.props.whatever}</Text>
        <Text style={styles.text}>saya mau makan</Text>
        <Link to="/about">About -></Link>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: { padding: 10, flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { textDecorationLine: 'underline', paddingVertical: 10 },
});

export default Home;
