import React, {useEffect, useState} from 'react';
import ProgressCircle from 'react-native-progress-circle';

import ItemBox from '../../components/ItemBox';
import Header from '../../components/Header';
import {
  Container,
  DescriptionText,
  ContainerText,
  ContainerTextColumn,
  TextBar,
  BoxStartBox,
  ButtonStartBox,
  BoxStarted,
  BoxStartedText,
} from './styles';
import {Alert, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {STORE_BOX_OPERATION_FLOW, STORE_PROFILE} from '../../utils';
import startOperationalFlow from '../../services/operational-flow';
import {format} from 'date-fns';
import _ from 'lodash';
import getClientsInRoute from '../../services/route';

const Home: React.FC = props => {
  const [profile, setProfile] = useState({});
  const [box, setBox] = useState({});
  const [charges, setCharges] = useState([]);

  const loadOperationalFlow = async () => {
    const data = await AsyncStorage.getItem(STORE_BOX_OPERATION_FLOW);
    setBox({
      ...JSON.parse(data || '{}'),
    });
  };

  const loadClientsInRoute = async () => {
    const data = await getClientsInRoute();
    try {
      setCharges([...data]);
    } catch (e) {}
  };

  const loadProfile = async () => {
    const data = await AsyncStorage.getItem(STORE_PROFILE);

    setProfile({
      ...JSON.parse(data),
    });
  };

  const onStartOperationalFlow = async () => {
    try {
      const data = await startOperationalFlow();

      await AsyncStorage.setItem(
        STORE_BOX_OPERATION_FLOW,
        JSON.stringify(data),
      );

      setBox({
        ...data,
      });
    } catch (e) {
      Alert.alert('', 'Não foi possível iniciar o caixa!');
    }
  };

  useEffect(() => {
    loadClientsInRoute();

    loadProfile();

    loadOperationalFlow();

    if (box.id) {
      onStartOperationalFlow();
    }
  }, []);

  const onReseteBox = async () => {
    setBox({});
    await AsyncStorage.setItem(STORE_BOX_OPERATION_FLOW, '{}');
  };

  const charges_done = _.filter(charges, {status: 'done'});
  const percent =
    charges.length === 0
      ? 0
      : parseFloat((100 * charges_done.length) / charges.length).toFixed(2);

  return (
    <>
      <Header hello="olá," name={profile.full_name || ''} />

      <Container>
        {!!box.id && (
          <ContainerText>
            <ProgressCircle
              percent={percent}
              radius={50}
              borderWidth={8}
              color="#4C9448"
              shadowColor="#999"
              bgColor="#fff">
              <TextBar>
                {parseInt(percent) === 100 ? 'OK' : percent + '%'}
              </TextBar>
            </ProgressCircle>
            <ContainerTextColumn>
              <DescriptionText>Total: {charges.length}</DescriptionText>
              <DescriptionText>
                Visitados: {charges_done.length}
              </DescriptionText>
              <DescriptionText>
                Restantes: {charges.length - charges_done.length}
              </DescriptionText>
            </ContainerTextColumn>
          </ContainerText>
        )}

        <ItemBox
          box={box}
          onReseteBox={onReseteBox}
          onLoadClientsInRoute={loadClientsInRoute}
          onStartOperationalFlow={onStartOperationalFlow}
        />

        {!box.id ? (
          <TouchableOpacity
            onPress={() => {
              onStartOperationalFlow();
            }}>
            <BoxStartBox>
              <ButtonStartBox>Iniciar caixa</ButtonStartBox>
            </BoxStartBox>
          </TouchableOpacity>
        ) : (
          <BoxStarted>
            <BoxStartedText>Caixa iniciado às </BoxStartedText>
            <Text>{format(new Date(box.created_at), 'dd/MM/yyyy HH:mm')} </Text>
          </BoxStarted>
        )}
      </Container>
    </>
  );
};

export default Home;
