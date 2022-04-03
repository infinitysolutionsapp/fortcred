import React, {useEffect, useCallback, useState} from 'react';

import ItemBox from '../../components/ItemBox';

import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {STORE_BOX_OPERATION_FLOW, STORE_PROFILE} from '../../utils';
import startOperationalFlow from '../../services/operational-flow';
import _ from 'lodash';
import getClientsInRoute from '../../services/route';

import {
  Container,
  Time,
  UserName,
  Header,
  NotificationIcon,
  NotificationNumber,
  SaldoBox,
  SaldoBoxContent,
  SaldoText,
  MoneyBox,
  EyeBox,
  EyeIcon,
  SeeExtractButton,
  SeeExtractButtonText,
  SeeExtractButtonIcon,
  NotificationContainer,
  ModalContainer,
  MenuContainer,
  IconMenu,
} from './styles';

const Dashboard: React.FC = () => {
  const [check, setCheck] = useState(true);

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

  const CheckVisible = useCallback(() => {
    setCheck(!check);
  }, [check]);

  const navigateTo = useCallback(() => {
    Alert.alert('Aviso', 'Fazer navegação');
  }, []);

  return (
    <Container>
      <Header>
        <Time>
          Boa tarde,{'\n'}
          <UserName>Gleilson</UserName>
        </Time>
        <NotificationIcon />
        <NotificationContainer>
          <NotificationNumber>99+</NotificationNumber>
        </NotificationContainer>
      </Header>
      <SaldoBox>
        <SaldoText>Saldo</SaldoText>
        <SaldoBoxContent>
          <MoneyBox>R$ {check ? '00000' : '* * * * *'}</MoneyBox>
          <EyeBox onPress={CheckVisible}>
            <EyeIcon name={check ? 'eye' : 'eye-off'} />
          </EyeBox>
        </SaldoBoxContent>
        <SeeExtractButton onPress={navigateTo}>
          <SeeExtractButtonText>VER EXTRATO</SeeExtractButtonText>
          <SeeExtractButtonIcon />
        </SeeExtractButton>
      </SaldoBox>
      <ModalContainer>
        <MenuContainer>
          <IconMenu />
        </MenuContainer>
        <ItemBox
          box={box}
          onReseteBox={onReseteBox}
          onLoadClientsInRoute={loadClientsInRoute}
          onStartOperationalFlow={onStartOperationalFlow}
          isModal={true}
        />
      </ModalContainer>
    </Container>
  );
};

export default Dashboard;
