import React, {useCallback, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import _ from 'lodash';
import {Alert, FlatList, Text, TouchableOpacity, View} from 'react-native';
import {
  DebtorAmount,
  EyeIcon,
  HeaderList,
  HeaderTitle,
  UserImage,
  ValueName,
  ViewImage,
} from './styles';
import House from '../../assets/house.png';
import getClientsInRoute, {getUnchargedClients} from '../../services/route';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {STORE_BOX_OPERATION_FLOW} from '../../utils';
import startOperationalFlow from '../../services/operational-flow';

export default function LateCharges(props) {
  const navigation = useNavigation();
  const [box, setBox] = useState({});
  const [charges, setCharges] = useState([]);
  const [allCharges, setAllCharges] = useState([]);
  const [spinner, setSpinner] = useState(true);
  const [filterValue, setFilterValue] = useState('');

  const groupsLoan = _.groupBy(charges, 'loan.id');
  const loans = Object.keys(groupsLoan).map(key => {
    const loan = groupsLoan[key][0].loan;
    const customer = groupsLoan[key][0].client;
    const charges = groupsLoan[key];

    return {
      id: loan.id,
      customer_name: customer.name,
      amount_loan: loan.amount,
      loan,
      customer,
      charges,
    };
  });

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
    const uncharged_clients = await getUnchargedClients();

    setCharges([...uncharged_clients]);
    setAllCharges([...uncharged_clients]);
    setSpinner(false);
  };

  const loadOperationalFlow = async () => {
    const data = await AsyncStorage.getItem(STORE_BOX_OPERATION_FLOW);
    setBox({
      ...JSON.parse(data || '{}'),
    });
  };

  useEffect(() => {
    loadOperationalFlow();
    if (box.id) {
      onStartOperationalFlow();
    }
  }, [box.id]);

  useEffect(() => {
    loadClientsInRoute();
  }, []);

  const onFilterChange = async (text: string) => {
    if (!text) {
      setCharges([...allCharges]);
      setFilterValue(text);
      return;
    }

    const itemsFiltered = allCharges.filter(charge => {
      return charge.client.name.toLowerCase().includes(text.toLowerCase());
    });
    setCharges([...itemsFiltered]);
    setFilterValue(text);
  };

  const renderItem = ({item, index}) => {
    const client = item.customer;
    const chargesCustomer = item.charges;
    const itemCharge = item.charges[0];
    const loan = item.loan;

    return (
      <TouchableOpacity
        onPress={() => {
          navigationToCollection(itemCharge);
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
              <HeaderTitle>{client.name}</HeaderTitle>

              <ValueName>
                Parcelas atrasadas: {chargesCustomer.length} de{' '}
                {loan.installments_count}
              </ValueName>
              <DebtorAmount>
                valor devedor:{' '}
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(loan.final_amount - loan.paid_amount)}
              </DebtorAmount>
            </View>
          </View>
          <View>
            {itemCharge.status !== 'pending' ? (
              <EyeIcon name="check-circle" color="#11B586" size={22} />
            ) : (
              <EyeIcon name="check-circle" color="#8F8888" size={22} />
            )}
          </View>
        </HeaderList>
      </TouchableOpacity>
    );
  };

  const keyExtractorHeader = useCallback(item => item.id.toString(), []);

  return (
    <>
      <Spinner
        visible={spinner}
        textContent={'Carregando...'}
        textStyle={{
          color: '#FFF',
        }}
      />

      {/* <Header
        name="Cobranças Atrasadas"
        icon="search"
        onChangeText={onFilterChange}
        value={filterValue}
      /> */}

      <FlatList
        data={_.sortBy(loans, 'customer_name')}
        keyExtractor={keyExtractorHeader}
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        // refreshing={spinner}
        // onRefresh={loadClientsInRoute}
        ListEmptyComponent={
          <Text
            style={{
              fontSize: 20,
              color: '#5c5656',
              marginLeft: 10,
              marginTop: 10,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            Nenhuma cobrança atrasada!
          </Text>
        }
        renderItem={renderItem}
      />
    </>
  );
}
