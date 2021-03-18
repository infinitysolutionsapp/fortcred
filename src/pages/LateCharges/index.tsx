import React, {useCallback, useEffect, useState} from 'react';
import { useNavigation } from '@react-navigation/native'
import Header from '../../components/Header';
import _ from 'lodash';
import {View, TouchableOpacity, FlatList, Text} from 'react-native';
import Calendar from '../../components/Calendar'
import {
  UserImage,
  ValueName,
  HeaderTitle,
  HeaderList,
  EyeIcon,
  ViewImage
} from './styles';
import House from '../../assets/house.png'
import {getUnchargedClients} from "../../services/route";
import Spinner from 'react-native-loading-spinner-overlay';

export default function LateCharges(props) {
  const navigation = useNavigation();
  const [charges, setCharges] = useState([]);
  const [spinner, setSpinner] = useState(true);
  const {box, onLoadClientsInRoute, onStartOperationalFlow} = props.route.params;

  const items = _.groupBy(charges, 'planned_date');

  function navigationToCollection(currentCharge) {
    navigation.navigate('Collection', {
      charge: currentCharge,
      box: box,
      onStartOperationalFlow: onStartOperationalFlow,
      loadClientsInRoute: loadClientsInRoute,
      onLoadClientsInRoute: onLoadClientsInRoute
    })
  }

  const loadClientsInRoute = async () => {
    setSpinner(true);
    const uncharged_clients = await getUnchargedClients();

    setCharges([...uncharged_clients]);
    setSpinner(false);
  }

  useEffect(()=> {
    loadClientsInRoute();
  }, []);

  const renderItem = ({ item, index }) => {

    const amount = !!item.received_amount ? item.received_amount : item.amount;

    return (
      <TouchableOpacity onPress={() => {
        navigationToCollection(item);
      }} key={index}>
        <HeaderList>
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
            <ViewImage>
              <UserImage source={House}/>
            </ViewImage>
            <View style={{
              flexDirection: 'column'
            }}>
              <HeaderTitle>
                {item.client.name}
              </HeaderTitle>

              <ValueName>{Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(amount)}</ValueName>
            </View>
          </View>
          <View>
            {item.status !== 'pending' ? (
              <EyeIcon name="check-circle" color="#11B586" size={22}/>
            ) : (
              <EyeIcon name="check-circle" color="#8F8888" size={22}/>
            )}
          </View>
        </HeaderList>
      </TouchableOpacity>
    );
  };

  const renderItemDate = ({ item, index }) => {
    return (
      <View>
        <Calendar date={item} subtitle={items[item].length} />

        <FlatList
          data={items[item]}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    )
  }

  const keyExtractorHeader = useCallback((item)=> item.toString(), []);

  return (
    <>
      <Spinner
        visible={spinner}
        textContent={'Carregando...'}
        textStyle={{
          color: '#FFF'
        }}
      />

      <Header name="Cobranças Atrasadas" />

      <FlatList
        data={Object.keys(items)}
        keyExtractor={keyExtractorHeader}
        refreshing={spinner}
        maxToRenderPerBatch={6}
        onRefresh={loadClientsInRoute}
        ListEmptyComponent={<Text style={{
          fontSize: 20,
          color: '#5c5656',
          marginLeft: 10,
          marginTop: 10,
          fontWeight: 'bold',
          textAlign: 'center',
        }}>Nenhuma cobrança atrasada!</Text>}
        renderItem={renderItemDate}
      />
    </>
  )
}
