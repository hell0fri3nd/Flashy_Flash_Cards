import * as React from 'react';
import { Text, View, StyleSheet, Button, TextInput } from 'react-native';
import Constants from 'expo-constants';
import styles from './stylesheet';

export default class DeckMenu extends React.Component {
  render() {
    const question = (
      <View style={styles.container}>
        <Text style={styles.subtitle}>
          {this.props.decks[this.props.state.currDeck].cards[this.props.state.currCard].front}
        </Text>
      </View>
    );

    const check = (
      <Button
        title="Check"
        onPress={() => {
          this.props.flip();
        }}
      />
    );

    return (
      <View style={styles.container}>
        {question}
        {check}
        {this.props.goBackBtn('deckMenu', this.props.state.currDeck)}
      </View>
    );
  }
}
