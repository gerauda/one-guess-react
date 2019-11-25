
import { createStackNavigator } from 'react-navigation-stack';
import { HomeScreen } from '../screens/HomeScreen'
import { DetailsScreen } from '../screens/DetailsScreen'

export const AppNavigator = createStackNavigator(
    {
      Home: HomeScreen,
      Details: DetailsScreen,
    },
    {
      initialRouteName: 'Home',
    }
  );
  