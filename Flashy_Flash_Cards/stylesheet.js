import * as React from 'react';
import {StyleSheet} from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },

  title: {
    justifyContent: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    position: 'absolute',
    top: Constants.statusBarHeight,
    margin: 0,
    right: 0,
    left: 0,
    padding: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    position: 'absolute',
    top: Constants.statusBarHeight,
    margin: 0,
    right: 0,
    left: 0,
    marginTop: 70,
    padding: 10,
  },

  list: {
    textAlign: 'left',
    margin: 0,
    marginBottom: 10,
    left: 0,
    right: 0,
    padding: 10,
  },

  textInput: {
    width: 'auto',
    borderWidth: 2,
    borderColor: '#000000',
    marginBottom: 10,
    marginTop: 10,
  },
});