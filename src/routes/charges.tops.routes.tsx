import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import CollectionRoute from '../pages/CollectionRoute';
import LateCharges from '../pages/LateCharges';

const {Navigator, Screen} = createMaterialTopTabNavigator();

export default function ChargeStackRoutes(props) {
  return (
    <Navigator
      tabBarOptions={{
        style: {
          backgroundColor: '#4BAD73',
        },
        inactiveTintColor: '#000',
        indicatorContainerStyle: {},
        indicatorStyle: {
          backgroundColor: '#FFF',
        },
        activeTintColor: '#FFF',
        pressColor: '#00AC4A',
        labelStyle: {
          fontSize: 12,
          fontFamily: 'Roboto-ThinItalic',
        },
      }}>
      <Screen name="Hoje" component={CollectionRoute} />
      <Screen name="atrasadas" component={LateCharges} />
    </Navigator>
  );
}
