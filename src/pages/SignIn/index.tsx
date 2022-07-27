import React, {useRef, useState} from 'react';
import {Image, TextInput, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Button from '../../components/Button';
import Input from '../../components/Input';
import BoxTitle from '../../components/TitleBox';
import Logo from '../../assets/logo.jpg';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {Box, BoxContainer, Container, ImageContainer} from './styles';

// @ts-ignore
const SignIn: React.FC = ({signIn}) => {
  const navigation = useNavigation();
  const passwordInputRef = useRef<TextInput>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function navigateToHome() {
    // navigation.navigate('Home')
    signIn({username, password});
  }

  return (
    <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
      <Container>
        <ImageContainer>
          <Image source={Logo} style={{
            width: 200,
            height: 120
          }} />
        </ImageContainer>

        <BoxContainer>
          <Box>
            <BoxTitle title="LOGIN" />
            <Input
              autoCapitalize="none"
              label="Usuário"
              returnKeyType="next"
              onSubmitEditing={() => passwordInputRef.current?.focus()}
              value={username}
              onChangeText={setUsername}
            />
            <View style={{marginTop: 10}} />
            <Input
              label="Senha"
              ref={passwordInputRef}
              returnKeyType="send"
              secureTextEntry
              onSubmitEditing={navigateToHome}
              value={password}
              onChangeText={setPassword}
            />

            <Button onPress={navigateToHome}>ENTRAR</Button>
          </Box>
        </BoxContainer>
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default SignIn;
