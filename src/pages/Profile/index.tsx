import React, {useEffect, useState} from 'react';
import Header from '../../components/Header';
import {
  Container, VersionText, Label, Title, Value, Info, BoxLogout, ButtonLogout
} from './styles';
import {Alert, TouchableOpacity} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {STORE_PROFILE} from "../../utils";
import Config from "../../../package.json";

const Profile: React.FC = (props) => {

  const [profile, setProfile] = useState({});

  const loadProfile = async () => {
    const data = await AsyncStorage.getItem(STORE_PROFILE);
    setProfile({
      ...JSON.parse(data)
    });
  }

  useEffect(()=> {
    loadProfile();
  }, []);

  const { signOut } = React.useContext(props.extraData.authContext);

  const values = {
    full_name: 'Nome',
    phone: 'Meu número',
    email: 'Email',
  }

  return (
    <>
      <Header name="Perfil"/>

      <Container>

        <Title>Minha informações</Title>

        {
          Object.keys(values).map((value)=> {
            return (
              <Info key={value}>
                <Label>{values[value]}</Label>
                <Value>{profile[value]}</Value>
              </Info>
            )
          })
        }

        <TouchableOpacity onPress={()=> {
          Alert.alert(
            'Atenção',
            'Deseja realmente sair da aplicação ?',
            [
              {
                text: 'Não',
                style: 'cancel'
              },
              { text: 'Sim', onPress: signOut }
            ],
            { cancelable: false }
          );
        }}>
          <BoxLogout>
              <ButtonLogout>Sair</ButtonLogout>
          </BoxLogout>
        </TouchableOpacity>

        <VersionText>Versão: {Config.version}</VersionText>
      </Container>
    </>
  )
}

export default Profile;

