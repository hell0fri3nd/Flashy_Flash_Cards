import * as React from 'react';
import { Text, View, StyleSheet, Button, TextInput } from 'react-native';
import Constants from 'expo-constants';
import styles from './stylesheet';

export default class DeckMenu extends React.Component {
  render() {
    const answer = (
      <View style={styles.container}>
        <Text style={styles.subtitle}>
          {
            this.props.decks[this.props.state.currDeck].cards[
              this.props.state.currCard
            ].back
          }
        </Text>
      </View>
    );

    const guess = (
      <View style={styles.container}>
        <Button
          title="right"
          onPress={() => {
            this.props.answered(true);
          }}
        />
        <Button
          title="wrong"
          onPress={() => {
            this.props.answered(false);
          }}
        />
      </View>
    );

    return (
      <View style={styles.container}>
        {answer}
        {guess}
        {this.props.goBackBtn('deckMenu', this.props.state.currDeck)}
      </View>
    );
  }
}
