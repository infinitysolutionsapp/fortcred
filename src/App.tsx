import 'react-native-gesture-handler';
import "intl";
import "intl/locale-data/jsonp/pt-BR";
// import SplashScreen from 'react-native-splash-screen'

import React from 'react';
import {StatusBar, Alert} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import SignIn from './pages/SignIn';
import {createStackNavigator} from "@react-navigation/stack";
import Home from "./pages/Home";
import CollectionRoute from "./pages/CollectionRoute";
import Collection from "./pages/Collection";
import Expense from "./pages/Expense";
import BoxClosed from "./pages/BoxClosed";
import LateCharges from "./pages/LateCharges";
import Calculate from "./pages/Calculate";
import Profile from "./pages/Profile";
import login from "./services/login";
import {STORE_TOKEN_ACCESS, STORE_DATA_TOKEN, STORE_PROFILE} from "./utils";
import getProfile from "./services/profile";

function SignInScreen() {
  const {signIn} = React.useContext(AuthContext);

  return (
    <SignIn signIn={signIn}/>
  );
}

const Stack = createStackNavigator();
const AuthContext = React.createContext();

export default function App() {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':

          console.log('state', state);
          console.log('prevState', prevState);

          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem(STORE_TOKEN_ACCESS);
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };

    bootstrapAsync();

    // SplashScreen.hide();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {

        console.log('data', data);

        try {
          const { username, password } = data;
          const token = await login(username, password);

          await AsyncStorage.setItem(STORE_TOKEN_ACCESS, token.access);
          await AsyncStorage.setItem(STORE_DATA_TOKEN, JSON.stringify(token));

          const profile = await getProfile();

          await AsyncStorage.setItem(STORE_PROFILE, JSON.stringify(profile));

          dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
        } catch (e) {

          console.log('ERROR', e);

          Alert.alert('Atenção', 'Usuário ou senha inválida!')
        }
      },
      signOut: async () => {
        await AsyncStorage.clear();

        dispatch({type: 'SIGN_OUT'})
      },
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor="#000" translucent={false}/>

        <Stack.Navigator screenOptions={{
          title: 'Cred Novo',
          headerTitleAlign: 'center',
          headerTintColor: "#fff",
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: "#000",
          },
        }}>
          {state.userToken == null ? (
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{
                animationTypeForReplace: state.isSignout ? 'pop' : 'push',
              }}
            />
          ) : (
            <>
              <Stack.Screen name="Home" component={Home}/>
              <Stack.Screen name="CollectionRoute" component={CollectionRoute}/>
              <Stack.Screen name="Expense" component={Expense}/>
              <Stack.Screen name="Collection" component={Collection}/>
              <Stack.Screen name="BoxClosed" component={BoxClosed}/>
              <Stack.Screen name="LateCharges" component={LateCharges}/>
              <Stack.Screen name="Calculate" component={Calculate}/>
              <Stack.Screen name="Profile">
                {props => (<Profile {...props} extraData={{
                  authContext: AuthContext
                }}></Profile>)}
              </Stack.Screen>
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  )
}
