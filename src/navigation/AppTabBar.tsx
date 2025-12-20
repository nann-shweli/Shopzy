import { useCallback } from 'react';

import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import { Tab } from './AppNavigation';

import Home from '../screen/Home/Home';
import Detail from '../screen/Home/Details';
import TabBar from './TabBar';


const AppTabBar = () => {
  const tabBar = useCallback(
    (props: BottomTabBarProps) => <TabBar {...props} />,
    [],
  );
  return (
    <Tab.Navigator
      tabBar={tabBar}
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Detail"
        component={Detail}
        options={{
          headerShown: false,
          tabBarLabel: 'Detail',
        }}
      />
      <Tab.Screen
        name="Trends"
        component={Detail}
        options={{
          headerShown: false,
          tabBarLabel: 'Trends',
        }}
      />
      <Tab.Screen
        name="Bag"
        component={Detail}
        options={{
          headerShown: false,
          tabBarLabel: 'Bag',
        }}
      />
      <Tab.Screen
        name="Me"
        component={Detail}
        options={{
          headerShown: false,
          tabBarLabel: 'Me',
        }}
      />
    </Tab.Navigator>
  );
};

export default AppTabBar;
