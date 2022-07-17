import React, {useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Alert, Linking, TextInput, View} from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import BoxTitle from '../../components/TitleBox';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {RectButton} from 'react-native-gesture-handler';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Header from '../../components/Header';
import {
  Box,
  BoxContainer,
  CollectionName,
  Container,
  Location,
  LocationContainer,
  PhoneContainer,
  PhoneText,
  ValueContainer,
  ValueNumber,
  ValueText,
} from './styles';
import {Line} from '../BoxClosed/styles';
import registerCharge from '../../services/charge';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {getMessageErrorRequest} from '../../utils/Message';

interface RegisterCharge {
  received_amount: any;
  action: any;
}

export default function Collection(props) {
  const navigation = useNavigation();
  const {
    charge,
    box,
    onStartOperationalFlow,
    onLoadClientsInRoute,
    loadClientsInRoute,
    date,
  } = props.route.params;
  const {loan} = charge;
  const {client} = charge;

  const [notes, setNotes] = useState('');
  const passwordInputRef = useRef<TextInput>(null);
  const [amount_charge, setAmountCharge] = useState('');

  function handleOpenGoogleMapRoutes() {
    const address = getFormattedAddress();
    Linking.openURL('https://www.google.com/maps/place/' + address);
  }

  function sendPhone() {
    if (client.phone) {
      Linking.openURL('tel://:' + client.phone);
    }
  }

  const sendRegisterCharge = async ({
    received_amount,
    action,
  }: RegisterCharge) => {
    try {
      const register_charge = await registerCharge(
        box.id,
        charge.id,
        received_amount,
        action,
        notes,
      );

      await onLoadClientsInRoute();

      await onStartOperationalFlow();

      await loadClientsInRoute();

      Alert.alert('', 'Cobrança registrada com sucesso!');

      navigation.goBack();
    } catch (e) {
      console.log('e', e);

      const message =
        getMessageErrorRequest(e) || 'Não foi possível registrar a cobrança!';
      Alert.alert('Atenção', message);
    }
  };

  async function onRegisterCharge() {
    const received_amount = parseFloat(
      (amount_charge || '0')
        .replace('R$ ', '')
        .replace('.', '')
        .replace(',', '.'),
    );

    if (!received_amount && !notes) {
      Alert.alert(
        '',
        'Para registrar uma cobrança com valor zero! Você precisa informar um motivo!',
      );
      return;
    }

    if (received_amount > charge.amount) {
      Alert.alert(
        'Atenção',
        'Você está pagando um valor superior ao valor da parcela. \n Como deseja abater o valor ?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Próxima',
            onPress: async () => {
              await sendRegisterCharge({
                received_amount: received_amount,
                action: 'use_next',
              });
            },
          },
          {
            text: 'Última',
            onPress: async () => {
              await sendRegisterCharge({
                received_amount: received_amount,
                action: 'use_last',
              });
            },
          },
        ],
        {cancelable: false},
      );
    } else if (received_amount < charge.amount) {
      Alert.alert(
        'Atenção',
        'Você está pagando um valor menor que o valor da parcela. \n O valor será acrescentado na próxima parcela  ?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Confirmar',
            onPress: async () => {
              await sendRegisterCharge({
                received_amount: received_amount,
                action: 'do_nothing',
              });
            },
          },
        ],
        {cancelable: false},
      );
    } else {
      await sendRegisterCharge({
        received_amount: received_amount,
        action: 'do_nothing',
      });
    }
  }

  const getFormattedAddress = () => {
    const {street, district, city, state} = client;
    return street + ', ' + district + ', ' + city + ' - ' + state;
  };

  return (
    <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
      <Header
        name="Cobrança"
        navigateTo={() => navigation.navigate('ChargeStackRoutes')}
      />
      <Container>
        <CollectionName>{client.name}</CollectionName>
        <PhoneContainer>
          <EntypoIcon name="old-phone" color="#4BAD73" size={20} />
          <RectButton onPress={sendPhone}>
            <PhoneText>{client.phone || 'Sem número'}</PhoneText>
          </RectButton>
        </PhoneContainer>
        <LocationContainer>
          <FontAwesomeIcon name="map-marker" color="#4BAD73" size={20} />
          <RectButton onPress={handleOpenGoogleMapRoutes}>
            <Location>{getFormattedAddress()}</Location>
          </RectButton>
        </LocationContainer>

        <View
          style={{
            paddingTop: 20,
            paddingBottom: 10,
          }}>
          <Line />
        </View>

        <ValueContainer>
          <ValueText>Valor total:</ValueText>
          <ValueNumber>
            {Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(loan.final_amount)}
          </ValueNumber>
        </ValueContainer>

        <ValueContainer>
          <ValueText>Valor solicitado:</ValueText>
          <ValueNumber>
            {Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(loan.amount)}
          </ValueNumber>
        </ValueContainer>

        <ValueContainer>
          <ValueText>Parcelas:</ValueText>
          <ValueNumber>
            {charge.sequence} / {loan.installments_count}
          </ValueNumber>
        </ValueContainer>

        <ValueContainer>
          <ValueText>Valor da diária:</ValueText>
          <ValueNumber>
            {Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(charge.amount)}
          </ValueNumber>
        </ValueContainer>

        {!!charge.received_amount && (
          <ValueContainer>
            <ValueText>Valor Pago:</ValueText>
            <ValueNumber>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(charge.received_amount)}
            </ValueNumber>
          </ValueContainer>
        )}

        <ValueContainer>
          <ValueText>Restante:</ValueText>
          <ValueNumber>
            {Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(loan.final_amount - loan.paid_amount)}
          </ValueNumber>
        </ValueContainer>

        {charge.status === 'pending' && (
          <BoxContainer>
            <Box>
              <BoxTitle title="REGISTRAR COBRANÇA" />
              <Input
                mask="currency"
                value={amount_charge}
                inputMaskChange={setAmountCharge}
                keyboardType="numeric"
                label="Valor"
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />
              <View style={{marginTop: 10}} />

              <Input
                keyboardType="default"
                label="Observação"
                value={notes}
                onChangeText={(text: string) => setNotes(text)}
              />

              <Button onPress={onRegisterCharge}>REGISTRAR</Button>
            </Box>
          </BoxContainer>
        )}
      </Container>
    </KeyboardAwareScrollView>
  );
}
