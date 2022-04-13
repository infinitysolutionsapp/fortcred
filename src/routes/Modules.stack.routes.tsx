import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Collection from '../pages/Collection';
import Expense from '../pages/Expense';
import BoxClosed from '../pages/BoxClosed';
import LateCharges from '../pages/LateCharges';
import Calculate from '../pages/Calculate';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';

const {Navigator, Screen} = createStackNavigator();

const ModulesStackRoutes = props => {
  const {signOut} = React.useContext(props.extraData.authContext);
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name="Dashboard" component={Dashboard} />
      <Screen name="Expense" component={Expense} />
      <Screen name="Collection" component={Collection} />
      <Screen name="BoxClosed" component={BoxClosed} />
      <Screen name="LateCharges" component={LateCharges} />
      <Screen name="Calculate" component={Calculate} />
      <Screen name="Profile">
        {props => (
          <Profile
            {...props}
            extraData={{
              signOut,
            }}
          />
        )}
      </Screen>
    </Navigator>
  );
};
export default ModulesStackRoutes;
