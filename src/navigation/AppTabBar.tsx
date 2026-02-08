import { useCallback } from 'react';

import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import { Tab } from './AppNavigation';

import Home from '../screen/Home/Home';
import Category from '../screen/Category/Category';
import Trends from '../screen/Trends/Trends';
import Cart from '../screen/Cart/Cart';
import Me from '../screen/Me/Me';
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
      initialRouteName="Shop"
    >
      <Tab.Screen
        name="Shop"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: 'Shop',
        }}
      />
      <Tab.Screen
        name="Category"
        component={Category}
        options={{
          headerShown: false,
          tabBarLabel: 'Category',
        }}
      />
      <Tab.Screen
        name="Trends"
        component={Trends}
        options={{
          headerShown: false,
          tabBarLabel: 'Trends',
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          headerShown: false,
          tabBarLabel: 'Cart',
        }}
      />
      <Tab.Screen
        name="Me"
        component={Me}
        options={{
          headerShown: false,
          tabBarLabel: 'Me',
        }}
      />
    </Tab.Navigator>
  );
};

export default AppTabBar;
