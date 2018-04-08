import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const CounterModifier = ({
  increment,
  incrementIfOdd,
  incrementAsync,
  decrement,
  counter,
}) => (
  <View style={styles.container}>
    <Text style={styles.clickedText}>Clicked: {counter} times</Text>
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={increment}>
        <Text>+</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={decrement}>
        <Text>-</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={incrementIfOdd}>
        <Text>Increment if odd</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => incrementAsync()}>
        <Text>Increment async</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  button: {
    borderWidth: 1,
    padding: 5,
    marginRight: 10,
    minWidth: 100,
    alignItems: 'center',
  },
  clickedText: {
    paddingVertical: 20,
  },
});

CounterModifier.propTypes = {
  increment: PropTypes.func.isRequired,
  incrementIfOdd: PropTypes.func.isRequired,
  incrementAsync: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  counter: PropTypes.number.isRequired,
};

export default CounterModifier;
