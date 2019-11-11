import * as React from 'react';
import { Text, View, StyleSheet, Button, TextInput } from 'react-native';
import Constants from 'expo-constants';

// imported custom files
import decks from './flashcards';
import styles from './stylesheet';
import Home from './Home';
import DeckMenu from './DeckMenu';
import TestQuestion from './TestQuestion'
import TestAnswer from './TestAnswer'

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default class App extends React.Component {
  state = {
    right: [],
    wrong: [],
    currDeck: -1,
    currCard: 0,
    startTime: 0,
    stopTime: 0,
    page: 'home',
    tempDkName: '',
    tempCrdQuest: '',
    tempCrdAns: '',
  };

  stateHandler(s) {
    this.setState(s);
  }

  goBackBtn(prev, dk) {
    return (
      <Button
        color="red"
        title="Back"
        onPress={() => {
          this.setState({ page: prev, currDeck: dk });
        }}
      />
    );
  }

  flip() {
    this.setState({ page: 'test.answ' });
  }

  answered(answ) {
    this.setState({ stopTime: Date.now });

    let card = decks[this.state.currDeck].cards[this.state.currCard];
    card.time = this.state.startTime - this.state.stopTime;

    if (answ) {
      this.state.right.push(card);
      this.state.right.sort((a, b) => a.time - b.time);
    } else {
      this.state.wrong.push(card);
      this.state.wrong.sort((a, b) => a.time - b.time);
    }
    this.nextCard();
  }

  nextCard() {
    if (this.state.currCard < decks[this.state.currDeck].cards.length - 1) {
      this.setState({
        currCard: this.state.currCard + 1,
        page: 'test.quest',
        startTime: Date.now,
      });
    } else {
      this.reorderDeck();
      this.setState({
        currCard: 0,
        page: 'test.quest',
        startTime: Date.now,
        right: [],
        wrong: [],
      });
    }
  }

  reorderDeck() {
    console.log('reorderDeck');
    decks[this.state.currDeck].cards = [];
    decks[this.state.currDeck].cards = this.state.wrong
      .concat(decks[this.state.currDeck].cards)
      .concat(this.state.right);
  }

  deleteDeck() {
    decks.splice(this.state.currDeck, 1);
    this.setState({ page: 'home', currDeck: -1 });
  }

  deleteCard(c) {
    for (var i = 0; i < decks[this.state.currDeck].cards.length; i++) {
      if (
        decks[this.state.currDeck].cards[i].front === c.front &&
        decks[this.state.currDeck].cards[i].back === c.back
      ) {
        decks[this.state.currDeck].cards.splice(i, 1);
      }
    }
    this.setState({ page: 'deleteCard' });
  }

  listCards() {
    return decks[this.state.currDeck].cards.map(c => (
      <View style={styles.list}>
        <li>
          <Text>
            <b>Question: </b>
          </Text>
          <Text>{c.front}</Text>
          <br />
          <Text>
            <b>Answer: </b>
          </Text>
          <Text>{c.back}</Text>
          <br />
          <Button
            color="#ffcc00"
            title="Delete"
            onPress={() => {
              if (window.confirm('Are you sure?')) {
                this.deleteCard(c);
              }
            }}
          />
        </li>
      </View>
    ));
  }

  render() {
    if (this.state.page === 'home') {
      return (
        <Home
          decks={decks}
          state={this.state}
          stateHandler={this.stateHandler.bind(this)}
        />
      );
    } else if (this.state.page === 'deckMenu') {
      return (
        <DeckMenu
          decks={decks}
          state={this.state}
          goBackBtn={this.goBackBtn.bind(this)}
          deleteDeck={this.deleteDeck.bind(this)}
          stateHandler={this.stateHandler.bind(this)}
        />
      );
    } else if (this.state.page === 'test.quest') {
     return (
        <TestQuestion
          decks={decks}
          state={this.state}
          goBackBtn={this.goBackBtn.bind(this)}
          flip={this.flip.bind(this)}
          stateHandler={this.stateHandler.bind(this)}
        />
      );
    } else if (this.state.page === 'test.answ') {
     return (
        <TestAnswer
          decks={decks}
          state={this.state}
          goBackBtn={this.goBackBtn.bind(this)}
          answered={this.answered.bind(this)}
          stateHandler={this.stateHandler.bind(this)}
        />
      );
    } else if (this.state.page === 'renameDeck') {
      const submitRenameDeckBtn = (
        <Button
          title="Submit"
          onPress={() => {
            if (this.state.tempDkName != '') {
              decks[this.state.currDeck].name = this.state.tempDkName;
              this.setState({ page: 'deckMenu' });
            }
          }}
        />
      );

      return (
        <View style={styles.container}>
          <Text style={styles.title}>
            Please enter a new name for <b>{decks[this.state.currDeck].name}</b>
          </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={val => this.setState({ tempDkName: val })}
          />
          {submitRenameDeckBtn}
          {this.goBackBtn('deckMenu', this.state.currDeck)}
        </View>
      );
    } else if (this.state.page === 'addCard') {
      const addCardBtn = (
        <Button
          title="Add Card"
          onPress={() => {
            if (this.state.tempCrdQuest != '' && this.state.tempCrdAns != '') {
              decks[this.state.currDeck].cards.push({
                front: this.state.tempCrdQuest,
                back: this.state.tempCrdAns,
              });
              alert('Your card has been added');
              this.setState({ page: 'deckMenu' });
            }
          }}
        />
      );

      return (
        <View style={styles.container}>
          <Text style={styles.title}>
            Add a new card in <b>{decks[this.state.currDeck].name}</b>
          </Text>
          <Text>Question:</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={val => this.setState({ tempCrdQuest: val })}
          />
          <Text>Answer:</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={val => this.setState({ tempCrdAns: val })}
          />
          {addCardBtn}
          {this.goBackBtn('deckMenu', this.state.currDeck)}
        </View>
      );
    } else if (this.state.page === 'deleteCard') {
      return (
        <View style={styles.container}>
          <View>
            <Text
              style={{ fontSize: 30, fontWeight: 'bold', marginBottom: 10 }}>
              List of cards in <b>{decks[this.state.currDeck].name}</b>
            </Text>
          </View>
          <br />
          <View>{this.goBackBtn('deckMenu', this.state.currDeck)}</View>
          <br />
          <View style={styles.list}>
            <ul>{this.listCards()}</ul>
          </View>
        </View>
      );
    } else if (this.state.page === 'addDeck') {
      const addDeckBtn = (
        <Button
          title="Create Deck"
          onPress={() => {
            if (this.state.tempDkName != '') {
              decks.push({
                name: this.state.tempDkName,
                cards: [],
              });
              alert('Your deck has been created');
              this.setState({ page: 'home', tempDkName: '' });
            }
          }}
        />
      );

      return (
        <View style={styles.container}>
          <Text style={styles.title}>Create a new custom deck</Text>
          <Text>Title of your Deck:</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={val => this.setState({ tempDkName: val })}
          />
          {addDeckBtn}
          {this.goBackBtn('home', this.state.currDeck)}
        </View>
      );
    }
  }
}
