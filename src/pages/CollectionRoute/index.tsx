import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Header';
import {View, TouchableOpacity, FlatList} from 'react-native';
import Calendar from '../../components/Calendar';
import {
  UserImage,
  ValueName,
  HeaderTitle,
  HeaderList,
  EyeIcon,
  ViewImage,
} from './styles';
import House from '../../assets/house.png';
import getClientsInRoute from '../../services/route';
import Spinner from 'react-native-loading-spinner-overlay';
import _ from 'lodash';
import moment from 'moment';

export default function CollectionRoute(props) {
  const navigation = useNavigation();
  const [charges, setCharges] = useState([]);
  const [spinner, setSpinner] = useState(true);
  // const {box, onStartOperationalFlow, onLoadClientsInRoute} = props.route.params;

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
