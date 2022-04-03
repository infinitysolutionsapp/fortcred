import 'react-native-gesture-handler';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
// import SplashScreen from 'react-native-splash-screen'

import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {StatusBar, Alert, Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Profile from './pages/Profile';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ModulesStack from './routes/Modules.stack.routes';
import FortButton from './components/FortButton';
import CollectionRoute from './pages/CollectionRoute';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SignIn from './pages/SignIn';

import login from './services/login';
import {
  STORE_TOKEN_ACCESS,
  STORE_DATA_TOKEN,
  STORE_PROFILE,
  STORE_TOKEN_REFRESH,
} from './utils';
import getProfile from './services/profile';

const {Navigator, Screen} = createBottomTabNavigator();

function SignInScreen() {
  const {signIn} = React.useContext(AuthContext);

  return <SignIn signIn={signIn} />;
}

const Stack = createStackNavigator();
const AuthContext = React.createContext();

export default function App() {
  const icons = {
    ModulesStack: {
      lib: AntDesign,
      name: 'home',
    },
    Profile: {
      lib: AntDesign,
      name: 'user',
    },
  };
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
    },
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
        try {
          const {username, password} = data;
          const token = await login(username, password);

          await AsyncStorage.setItem(STORE_TOKEN_REFRESH, token.refresh);
          await AsyncStorage.setItem(STORE_TOKEN_ACCESS, token.access);
          await AsyncStorage.setItem(STORE_DATA_TOKEN, JSON.stringify(token));

          const profile = await getProfile();

          await AsyncStorage.setItem(STORE_PROFILE, JSON.stringify(profile));

          dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
        } catch (e) {
          console.log('ERROR', e);

          Alert.alert('Atenção', 'Usuário ou senha inválida!');
        }
      },
      signOut: async () => {
        await AsyncStorage.clear();

        dispatch({type: 'SIGN_OUT'});
      },
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#4BAD73"
          translucent={false}
        />

        {state.userToken == null ? (
          <Stack.Navigator
            screenOptions={{
              title: 'Cred Fort',
              headerTitleAlign: 'center',
              headerTintColor: '#fff',
              headerBackTitleVisible: false,
              headerStyle: {
                backgroundColor: '#4BAD73',
              },
            }}>
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{
                animationTypeForReplace: state.isSignout ? 'pop' : 'push',
              }}
            />
          </Stack.Navigator>
        ) : (
          <Navigator
            screenOptions={({route, navigation}) => ({
              tabBarIcon: ({color, size, focused}) => {
                if (route.name === 'CollectionRoute') {
                  return (
                    <FortButton
                      focused={focused}
                      onPress={() => navigation.navigate('CollectionRoute')}
                    />
                  );
                }
                const {lib: Icon, name} = icons[route.name];
                return (
                  <Icon
                    name={name}
                    size={size}
                    color={color}
                    focused={focused}
                  />
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
            <Screen
              name="CollectionRoute"
              component={CollectionRoute}
              options={{title: ''}}
            />
            <Screen name="Profile">
              {props => (
                <Profile
                  {...props}
                  extraData={{
                    authContext: AuthContext,
                  }}
                />
              )}
            </Screen>
          </Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
