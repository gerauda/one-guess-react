import { AsyncStorage } from 'react-native';

export class ScoreStorage {

    static setNewHighScore(newhighScore: number) {
        AsyncStorage.setItem('HIGH_SCORE', String(newhighScore));
        // this.setState({
        //   highScore: newhighScore
        // })
      }
    
    static async getHighestScore(): Promise<number> {
    
        try {
          const value = await AsyncStorage.getItem('HIGH_SCORE');
          if (value !== null){
            // this.setState({
            //   highScore: Number(value)
            // })
            return Number(value)
          }
        } catch (error) {
          console.error(`getHighestScore error: ${error}`)
        }
        return 0;
      }
}