// import React from 'react';
// import { StyleSheet, Text, View, Button } from 'react-native';
// import {createAppContainer} from 'react-navigation';
// import {createStackNavigator} from 'react-navigation-stack';

// export default function App() {

//   return (
//     <View style={styles.container}>
//       <Text>Open up App.tsx to start working on your app!</Text>
//       <Button
//             onPress={this._onPressButton}
//             title="Press Me"
//           />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });


import React from 'react';
import { createAppContainer } from 'react-navigation';
import { AppNavigator } from './navigation/navigation'


const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}



// export default createAppContainer(AppNavigator);