import React from 'react';

import {
  ActivityIndicator,
  Button,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import { BlurView } from 'expo-blur';
import { ScoreStorage } from '../storage/ScoreStorage';

type Props = {
  navigation: NavigationStackProp<{ userId: string }>;
};

interface State {
  isLoading: boolean;
  characters: UnexpandedArticle[];
  imageUrl: string
  score: number
  highScore: number
}

export class DetailsScreen extends React.Component<Props, State> {

  unexpandedListArticleResultSet: UnexpandedListArticleResultSet;
  correctAnswer: number
  characters: UnexpandedArticle[];

  state = {
    isLoading: true,
    characters: [],
    imageUrl: null,
    score: 0,
    highScore: 0,
  };

  componentDidMount() {

    ScoreStorage.getHighestScore().then((res) => {
      this.setState({
        highScore: res
      })
    })

    return fetch('https://onepiece.wikia.com/api/v1/Articles/List?category=Male_Characters&limit=1000')
      .then((response) => response.json())
      .then((responseJson) => {


        this.setState({
          isLoading: false,
        });

        this.unexpandedListArticleResultSet = responseJson


        this.generateNextQuestion()

      })
      .catch((error) => {
        console.error(error);
      });
  }

  generateNextQuestion() {
    if (this.unexpandedListArticleResultSet != null) {

      this.characters = []
      this.characters.push(this.unexpandedListArticleResultSet.items[Math.floor(Math.random() * this.unexpandedListArticleResultSet.items.length) + 1])
      this.characters.push(this.unexpandedListArticleResultSet.items[Math.floor(Math.random() * this.unexpandedListArticleResultSet.items.length) + 1])
      this.characters.push(this.unexpandedListArticleResultSet.items[Math.floor(Math.random() * this.unexpandedListArticleResultSet.items.length) + 1])
      this.characters.push(this.unexpandedListArticleResultSet.items[Math.floor(Math.random() * this.unexpandedListArticleResultSet.items.length) + 1])
      this.correctAnswer = Math.floor(Math.random() * 4)

      this.setState({
        characters: this.characters,
        isLoading: true
      })

      console.log(`correct = ${this.getCorrectCharacter().title}(${this.getCorrectCharacter().id})`)

      return fetch(`https://onepiece.wikia.com/api/v1/Articles/Details?ids=${this.getCorrectCharacter().id}&abstract=100`)
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            imageUrl: responseJson.items[this.getCorrectCharacter().id.toString()].thumbnail,
            isLoading: false
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  getCorrectCharacter(): UnexpandedArticle {
    return this.characters[this.correctAnswer]
  }

  checkAnswer(userAnswer: number) {
    let newScore: number
    if (userAnswer == this.correctAnswer) {
      newScore = this.state.score + 1
    } else {
      newScore = 0
    }
    this.setState({
      score: newScore
    })

    ScoreStorage.getHighestScore().then((res) => {

      if (newScore > res) {
        console.log(`NEW HIGH SCORE`)
        ScoreStorage.setNewHighScore(newScore)
        this.setState({
          highScore: newScore
        })
      }

    })
    this.generateNextQuestion()
  }




  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <View style={[styles.score]}>
            <Text style={styles.score}>Score: {this.state.score}{"\n"}High score: {this.state.highScore}</Text>
          </View>


          <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
            <ActivityIndicator />
          </View>
        </View>
      )
    }

    return (

      <View style={styles.container}>

        <View style={[styles.score]}>
          <Text style={styles.score}>Score: {this.state.score}{"\n"}High score: {this.state.highScore}</Text>
        </View>

        <Text style={{ flex: 1, justifyContent: 'center' }}>Who's that character</Text>

        <Image
          style={{ flex: 7, width: 300 }}
          source={{ uri: this.state.imageUrl != null ? this.state.imageUrl : 'https://vignette.wikia.nocookie.net/onepiece/images/e/ec/Kin%27emon_Anime_Infobox.png/revision/latest?cb=20190524201317' }} />


        <View style={styles.row}>
          <View style={styles.answer}>
            <Button
              title={this.state.characters[0] != null ? this.state.characters[0].title : "ok"}
              onPress={() => { this.checkAnswer(0) }}>
            </Button>
          </View>
          <View style={styles.answer}>
            <Button
              title={this.state.characters[1] != null ? this.state.characters[1].title : "ok"}
              onPress={() => { this.checkAnswer(1) }}>
            </Button>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.answer}>
            <Button
              title={this.state.characters[2] != null ? this.state.characters[2].title : "ok"}
              onPress={() => { this.checkAnswer(2) }}>
            </Button>
          </View>
          <View style={styles.answer}>
            <Button
              title={this.state.characters[3] != null ? this.state.characters[3].title : "ok"}
              onPress={() => { this.checkAnswer(3) }}>
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  notBlurred: {
    ...StyleSheet.absoluteFillObject,
    // top: Constants.statusBarHeight,
    flex: 7,
    width: 300
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  score: {
    alignSelf: 'flex-end',
    textAlign: 'right'
  },
  answer: {
    flex: 1,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
});