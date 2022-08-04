import React, {useEffect, useState} from 'react';
import {Alert, FlatList, Text, View} from 'react-native';
import Calendar from '../../components/Calendar';
import Button from '../../components/Button';
import Header from '../../components/Header';
import {useNavigation} from '@react-navigation/native';
import {format} from 'date-fns';
import _ from 'lodash';
import {
  Container,
  Line,
  ProviderMeta,
  TotalPrice,
  TotalText,
  UserContainer,
  UserDate,
  UserInfor,
  UserName,
  UserPrice,
} from './styles';
import Prompt from 'react-native-modal-prompt';
import startOperationalFlow, {finishOperationalFlow} from '../../services/operational-flow';
import {getMessageErrorRequest} from '../../utils/Message';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {STORE_BOX_OPERATION_FLOW} from "../../utils";

export default function BoxClosed(props) {
  const {onReseteBox} = props.route.params;
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  const [box, setBox] = useState(props.route.params.box);

  function navigateToHome() {
    navigation.navigate('Home');
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      onStartOperationalFlow();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

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

  const charge_records = _.get(box, 'charge_records', []);
  const sum_charge = parseFloat(
    _.sumBy(charge_records, 'received_amount'),
  ).toFixed(2);
  const expense_records = _.get(box, 'expense_records', []);
  const sum_expense = parseFloat(_.sumBy(expense_records, 'amount')).toFixed(2);

  const renderItemExpense = ({item}) => (
    <View>
      <UserContainer>
        <UserInfor>
          <ProviderMeta>
            <UserName> {item.description} </UserName>
            <UserPrice price={-1 * item.amount}>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(item.amount)}
            </UserPrice>
          </ProviderMeta>
          <UserDate>{format(new Date(item.created_at), 'HH:mm')}</UserDate>
        </UserInfor>
      </UserContainer>
      <Line />
    </View>
  );

  const renderItemCharge = ({item}) => (
    <View>
      <UserContainer>
        <UserInfor>
          <ProviderMeta>
            <UserName> {item.client.name} </UserName>
            <UserPrice price={item.received_amount}>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(item.received_amount)}
            </UserPrice>
          </ProviderMeta>
          <UserDate>{format(new Date(item.execution_date), 'HH:mm')}</UserDate>
        </UserInfor>
      </UserContainer>
      <Line />
    </View>
  );

  const handleFinishBox = () => {
    setVisible(true);
  };

  const sendFinishFlowOperational = async code => {
    try {
      await finishOperationalFlow(box.id, code);
      await onReseteBox({});

      Alert.alert('Sucesso', 'Caixa finalizado com sucesso!');

      navigateToHome();
    } catch (e) {
      const message =
        getMessageErrorRequest(e) || 'Não foi possível finalizar o caixa!';
      Alert.alert('Atenção', message);
    }
  };

  return (
    <>
      <Prompt
        visible={visible}
        title="Segurança"
        placeholder="Confirmar senha"
        defaultValue={''}
        maxLength={6}
        showCount={true}
        operation={[
          {
            text: 'Cancelar',
            color: '#4BAD73',
            onPress: () => {
              setVisible(false);
            },
          },
          {
            text: 'Confimar',
            onPress: value =>
              new Promise(resolve => {
                sendFinishFlowOperational(value);
              }),
          },
        ]}
      />

      <Header name="Fechamento de caixa" />
      <Calendar date={box.created_at} />
      <Container>
        <FlatList
          data={charge_records}
          renderItem={renderItemCharge}
          keyExtractor={item => item.id.toString()}
          ListEmptyComponent={
            <Text
              style={{
                fontSize: 18,
                color: '#5c5656',
                marginLeft: 10,
                fontWeight: 'bold',
              }}>
              Nenhuma cobrança realizada
            </Text>
          }
          ListHeaderComponent={
            <Text
              style={{
                fontSize: 18,
                color: '#0710de',
                marginLeft: 10,
                fontWeight: 'bold',
              }}>
              Cobranças
            </Text>
          }
        />

        <View
          style={{
            margin: 10,
          }}>
          <Line />
        </View>

        <FlatList
          data={expense_records}
          renderItem={renderItemExpense}
          keyExtractor={item => item.id.toString()}
          ListEmptyComponent={
            <Text
              style={{
                fontSize: 18,
                color: '#5c5656',
                marginLeft: 10,
                fontWeight: 'bold',
              }}>
              Nenhuma despesa adicionada
            </Text>
          }
          ListHeaderComponent={
            <Text
              style={{
                fontSize: 18,
                color: '#0710de',
                marginLeft: 10,
                fontWeight: 'bold',
              }}>
              Despesas
            </Text>
          }
        />

        <View
          style={{
            margin: 10,
          }}>
          <Line />
        </View>

        <TotalPrice>
          <TotalText>
            RECEBIDO {'\n'}
            {'\n'}
            DESPESAS {'\n'}
            {'\n'}
            PRESTAR CONTA
          </TotalText>

          <TotalText>
            <UserPrice price={sum_charge}>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(sum_charge)}
            </UserPrice>{' '}
            {'\n'}
            {'\n'}
            <UserPrice price={-1 * sum_expense}>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(sum_expense)}
            </UserPrice>{' '}
            {'\n'}
            {'\n'}
            <UserPrice price={box.amount}>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(box.amount)}
            </UserPrice>
          </TotalText>
        </TotalPrice>

        <Button onPress={handleFinishBox}>Fechar caixa</Button>
      </Container>
    </>
  );
}
