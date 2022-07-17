import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ChargesTobsRoutes from './charges.tops.routes';
import Header from '../components/Header';
import Calendar from '../components/Calendar';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
const {Navigator, Screen} = createStackNavigator();

const chargeStackRoutes = props => {
  const {navigate} = useNavigation();

  return (
    <Navigator
      initialRouteName="ChargesTobsRoutes"
      screenOptions={{headerShown: true}}>
      <Screen
        name="ChargesTobsRoutes"
        component={ChargesTobsRoutes}
        options={{
          header: () => (
            <>
              <Header
                name="Rota cobrança"
                navigateTo={() =>
                  navigate('ModulesStack', {
                    screen: 'Dashboard',
                  })
                }
              />
              <Calendar date={moment()} />
            </>
          ),
        }}
      />
    </Navigator>
  );
};
export default chargeStackRoutes;
