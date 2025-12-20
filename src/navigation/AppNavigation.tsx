import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import AppTabBar from './AppTabBar';

export const Tab = createBottomTabNavigator();
export const Stack = createStackNavigator();

const AppNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        headerShown: false,
      }}
      initialRouteName={'MainTab'}
    >
      <Stack.Screen
        name="MainTab"
        component={AppTabBar}
        options={{
          headerShown: false,
          cardStyleInterpolator:
            CardStyleInterpolators.forScaleFromCenterAndroid,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigation;
