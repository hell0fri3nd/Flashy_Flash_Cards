import * as React from 'react';
import { Text, View, StyleSheet, Button, TextInput } from 'react-native';
import Constants from 'expo-constants';
import styles from './stylesheet';

export default class Home extends React.Component {
  render() {
    const homeMenu = this.props.decks.map((deck, i) => {
      return (
        <Button
          title={deck.name}
          onPress={() => {
            this.props.stateHandler({ page: 'deckMenu', currDeck: i });
          }}
        />
      );
    });

    const newDeckBtn = (
      <Button
        color="green"
        title="Create a new deck"
        onPress={() => this.props.stateHandler({ page: 'addDeck' })}
      />
    );

    return (
      <View style={styles.container}>
        <Text style={styles.title}> Flashy Flash Cards </Text>
        <Text style={styles.subtitle}>
          <i>Learn effectively exploiting Spaced Repetition!</i>
        </Text>
        {homeMenu}
        {newDeckBtn}
      </View>
    );
  }
}
