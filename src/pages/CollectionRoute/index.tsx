import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Header';
import {Alert, FlatList, TouchableOpacity, View} from 'react-native';
import Calendar from '../../components/Calendar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {STORE_BOX_OPERATION_FLOW} from '../../utils';
import startOperationalFlow from '../../services/operational-flow';

import {
  EyeIcon,
  HeaderList,
  HeaderTitle,
  UserImage,
  ValueName,
  ViewImage,
} from './styles';
import House from '../../assets/house.png';
import getClientsInRoute from '../../services/route';
import Spinner from 'react-native-loading-spinner-overlay';
import _ from 'lodash';
import moment from 'moment';

export default function CollectionRoute(props) {
  const navigation = useNavigation();
  const [box, setBox] = useState({});
  const [charges, setCharges] = useState([]);
  const [spinner, setSpinner] = useState(true);
  // const {box, onStartOperationalFlow, onLoadClientsInRoute} = props.route.params;

  const loadOperationalFlow = async () => {
    const data = await AsyncStorage.getItem(STORE_BOX_OPERATION_FLOW);
    setBox({
      ...JSON.parse(data || '{}'),
    });
  };

  const onLoadClientsInRoute = async () => {
    const data = await getClientsInRoute();
    try {
      setCharges([...data]);
    } catch (e) {}
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

  function navigationToCollection(currentCharge) {
    navigation.navigate('Collection', {
      charge: currentCharge,
      box: box,
      onStartOperationalFlow: onStartOperationalFlow,
      loadClientsInRoute: loadClientsInRoute,
      onLoadClientsInRoute: onLoadClientsInRoute,
    });
  }

  const loadClientsInRoute = async () => {
    setSpinner(true);
    const items = await getClientsInRoute();

    setCharges([...items]);
    setSpinner(false);
  };

  useEffect(() => {
    loadClientsInRoute();
    onLoadClientsInRoute();
    loadOperationalFlow();
    if (box.id) {
      onStartOperationalFlow();
    }
  }, []);

  const renderItem = ({item, index}) => (
    <TouchableOpacity
      onPress={() => {
        navigationToCollection(item);
      }}
      key={index}>
      <HeaderList>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <ViewImage>
            <UserImage source={House} />
          </ViewImage>
          <View
            style={{
              flexDirection: 'column',
            }}>
            <HeaderTitle>{item.client.name}</HeaderTitle>

            <ValueName>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(item.amount)}
            </ValueName>
          </View>
        </View>
        <View>
          {item.status !== 'pending' ? (
            <EyeIcon name="check-circle" color="#11B586" size={22} />
          ) : (
            <EyeIcon name="check-circle" color="#8F8888" size={22} />
          )}
        </View>
      </HeaderList>
    </TouchableOpacity>
  );

  const charges_done = _.filter(charges, {status: 'done'});

  return (
    <>
      <Spinner
        visible={spinner}
        textContent={'Carregando...'}
        textStyle={{
          color: '#FFF',
        }}
      />

      <Header name="Rota cobrança" />
      <Calendar
        date={moment()}
        subtitle={charges_done.length + ' / ' + charges.length}
      />

      <FlatList
        data={charges}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </>
  );
}
