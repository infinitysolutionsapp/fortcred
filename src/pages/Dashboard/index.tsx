import React, {useCallback, useEffect, useState} from 'react';

import ItemBox from '../../components/ItemBox';

import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {STORE_BOX_OPERATION_FLOW, STORE_PROFILE} from '../../utils';
import startOperationalFlow from '../../services/operational-flow';
import getClientsInRoute from '../../services/route';

import {
  Container,
  EyeBox,
  EyeIcon,
  Header,
  HeaderIconContainer,
  IconMenu,
  MenuContainer,
  ModalContainer,
  MoneyBox,
  NotificationContainer,
  NotificationIcon,
  NotificationNumber,
  SaldoBox,
  SaldoBoxContent,
  SaldoText,
  SeeExtractButton,
  SeeExtractButtonIcon,
  SeeExtractButtonText,
  Time,
  UserContainer,
  UserIcon,
  UserName,
} from './styles';
import {useNavigation} from '@react-navigation/native';

const Dashboard: React.FC = () => {
  const navigation = useNavigation();

  const [check, setCheck] = useState(false);
  const [gretting, setGretting] = useState('');
  const [profile, setProfile] = useState({});
  const [box, setBox] = useState({
    id: false,
  });
  const [charges, setCharges] = useState([]);

  const loadOperationalFlow = async () => {
    const data = await AsyncStorage.getItem(STORE_BOX_OPERATION_FLOW);
    setBox({
      ...JSON.parse(data || '{}'),
    });
  };

  const getHoursTime = useCallback(() => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      setGretting('Bom dia');
    } else if (currentHour >= 12 && currentHour < 18) {
      setGretting('Boa tarde');
    } else {
      setGretting('Boa noite');
    }
  }, []);

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
    getHoursTime();
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
    if (!box.id) {
      Alert.alert('', 'Você precisa iniciar o caixa');
      return;
    }
    setCheck(!check);
  }, [check, box]);

  const handleBox = useCallback(() => {
    if (box.id) {
      navigation.navigate('BoxClosed', {
        box: box,
        onReseteBox: onReseteBox,
        onStartOperationalFlow: onStartOperationalFlow,
      });
    } else {
      onStartOperationalFlow().then();
    }
  }, []);

  // console.log('box', box);

  return (
    <Container>
      <Header>
        <Time>
          {gretting || 'Carregando...'},{'\n'}
          <UserName>{profile.full_name}</UserName>
        </Time>
        <HeaderIconContainer>
          <NotificationIcon />
          <NotificationContainer>
            <NotificationNumber>99+</NotificationNumber>
          </NotificationContainer>
          <UserContainer>
            <UserIcon />
          </UserContainer>
        </HeaderIconContainer>
      </Header>
      <SaldoBox>
        <SaldoText>Saldo</SaldoText>
        <SaldoBoxContent>
          <MoneyBox>
            {check
              ? Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(box.amount)
              : 'R$ * * * * *'}
          </MoneyBox>
          <EyeBox onPress={CheckVisible}>
            <EyeIcon name={check ? 'eye' : 'eye-off'} />
          </EyeBox>
        </SaldoBoxContent>
        <SeeExtractButton onPress={handleBox}>
          <SeeExtractButtonText>
            {box.id ? 'VER CAIXA' : 'INICAR CAIXA'}
          </SeeExtractButtonText>
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
