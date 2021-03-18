import React from 'react'
import {useNavigation} from '@react-navigation/native'
import {Alert, Image} from 'react-native'

import Moto from '../../assets/moto.png';
import Cadeado from '../../assets/cadeado.png';
import Despesa from '../../assets/despesa.png';
import ProfileImg from '../../assets/profile.png';
import CalendarImg from '../../assets/calendar.png';

import {Title, Item, Container} from './styles'

export default function ItemBox({box, onStartOperationalFlow, onReseteBox, onLoadClientsInRoute}) {
  const navigation = useNavigation();

  function CollectionRoute() {

    if (!box.id) {
      Alert.alert('', 'Você precisa iniciar o caixa');
      return;
    }

    navigation.navigate('CollectionRoute', {
      box: box,
      onStartOperationalFlow: onStartOperationalFlow,
      onLoadClientsInRoute: onLoadClientsInRoute,
    })
  }

  function BoxClosed() {
    if (!box.id) {
      Alert.alert('', 'Você precisa iniciar o caixa');
      return;
    }

    navigation.navigate('BoxClosed', {
      box: box,
      onReseteBox: onReseteBox,
      onStartOperationalFlow: onStartOperationalFlow
    })
  }

  function Expense() {
    if (!box.id) {
      Alert.alert('', 'Você precisa iniciar o caixa');
      return;
    }

    navigation.navigate('Expense', {
      box: box,
      onStartOperationalFlow: onStartOperationalFlow
    })
  }

  function goToProfile() {
    navigation.navigate('Profile')
  }

  function goToLateCharges() {
    if (!box.id) {
      Alert.alert('', 'Você precisa iniciar o caixa');
      return;
    }

    navigation.navigate('LateCharges', {
      box: box,
      onStartOperationalFlow: onStartOperationalFlow,
      onLoadClientsInRoute: onLoadClientsInRoute,
    })
  }

  return (
    <>
      <Container>
        <Item onPress={CollectionRoute} style={{shadowColor: '#000', elevation: 8,}}>
          <Image source={Moto} width={42} height={42}/>
          <Title>Rota</Title>
          <Title>Cobrança</Title>
        </Item>

        <Item onPress={BoxClosed} style={{shadowColor: '#000', elevation: 8,}}>
          <Image source={Cadeado} width={42} height={42}/>
          <Title>Fechamento</Title>
          <Title>de Caixa</Title>
        </Item>
      </Container>
      <Container>
        <Item onPress={Expense} style={{shadowColor: '#000', elevation: 8,}}>
          <Image source={Despesa} width={42} height={42}/>
          <Title>Cadastrar</Title>
          <Title>despesas</Title>
        </Item>
        <Item onPress={goToLateCharges} style={{shadowColor: '#000', elevation: 8,}}>
          <Image source={CalendarImg} width={42} height={42}/>
          <Title>Cobranças</Title>
          <Title>Atrasadas</Title>
        </Item>
      </Container>
      <Container>
        <Item onPress={goToProfile} style={{shadowColor: '#000', elevation: 8,}}>
          <Image source={ProfileImg} width={42} height={42}/>
          <Title>Perfil</Title>
        </Item>
      </Container>
    </>
  )
}
