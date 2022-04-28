import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';

import ModulesStack from './Modules.stack.routes';
import FortButton from '../components/FortButton';
import {Platform} from 'react-native';
import Home from '../pages/Home';

const {Navigator, Screen} = createBottomTabNavigator();

function AppTabRoutes() {
  const icons = {
    ModulesStack: {
      lib: AntDesign,
      name: 'home',
    },
  };
  return (
    <Navigator
      screenOptions={({route, navigation}) => ({
        tabBarIcon: ({color, size, focused}) => {
          if (route.name === 'Home') {
            return (
              <FortButton
                focused={focused}
                onPress={() => navigation.navigate('Home')}
              />
            );
          }
          const {lib: Icon, name} = icons[route.name];
          return (
            <Icon name={name} size={size} color={color} focused={focused} />
          );
        },
      })}
      tabBarOptions={{
        style: {
          elevation: 0,
          shadowOpacity: 0,
          height: Platform.OS === 'ios' ? 90 : 64,
          paddingBottom: 8,
          borderTopWidth: 1,
          backgroundColor: '#131418',
          borderTopColor: 'rgba(255,255,255, 0.2)',
        },
        labelStyle: {
          fontSize: 12,
          fontFamily: 'Roboto-ThinItalic',
        },
        activeTintColor: '#FFF',
        inactiveTintColor: '#999',
        keyboardHidesTabBar: true,
      }}>
      <Screen name="ModulesStack" component={ModulesStack} />
      <Screen name="Home" component={Home} options={{title: ''}} />
    </Navigator>
  );
}

export default AppTabRoutes;
