import * as React from 'react';
import { Text, View, StyleSheet, Button, TextInput } from 'react-native';
import Constants from 'expo-constants';
import styles from './stylesheet';

export default class DeckMenu extends React.Component {
  render() {
    const addCardBtn = (
      <Button
        title="Add a custom Card to Deck"
        onPress={() =>
          this.props.stateHandler({
            page: 'addCard',
          })
        }
      />
    );

    const deletCardBtn = (
      <Button
        title="Delete card from Deck"
        onPress={() =>
          this.props.stateHandler({
            page: 'deleteCard',
          })
        }
      />
    );

    const deleteDeckBtn = (
      <Button
        color="#ffcc00"
        title="Delete Deck"
        onPress={() => {
          if (
            window.confirm(
              'Are you sure you want to delete ' +
                this.props.decks[this.props.state.currDeck].name +
                '?'
            )
          ) {
            this.props.deleteDeck();
          }
        }}
      />
    );

    const renameDeckBtn = (
      <Button
        title="Rename Deck"
        onPress={() =>
          this.props.stateHandler({
            page: 'renameDeck',
          })
        }
      />
    );

    const startBtn = (
      <Button
        title="Start!"
        color="green"
        onPress={() => {
          if (this.props.decks[this.props.state.currDeck].cards.length != 0) {
            this.props.stateHandler({
              page: 'test.quest',
              currCard: 0,
              startTime: Date.now,
            });
          } else {
            alert('Your deck is empty, add new Cards and start learning!');
          }
        }}
      />
    );

    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {this.props.decks[this.props.state.currDeck].name}
        </Text>
        {startBtn}
        {addCardBtn}
        {deletCardBtn}
        {renameDeckBtn}
        {deleteDeckBtn}
        {this.props.goBackBtn('home', -1)}
      </View>
    );
  }
}
