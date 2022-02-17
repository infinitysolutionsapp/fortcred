import React, {useEffect, useRef, useState} from 'react';
import {Alert, Text, TextInput, View} from 'react-native'
import {Picker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/native'
import Button from '../../components/Button'
import Input from '../../components/Input'
import BoxTitle from '../../components/TitleBox'
import Header from '../../components/Header';
import {
  Container,
  BoxContainer,
  Box,
} from './styles';
import getExpenseCategories from "../../services/expense-categories";
import registerExpense from "../../services/expense";
import Spinner from 'react-native-loading-spinner-overlay';

const Exprense: React.FC = (props) => {
  const {box, onStartOperationalFlow} = props.route.params;
  const navigation = useNavigation();
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const [categories, setCategories] = useState([]);
  const [notes, setNotes] = useState('');
  const [spinner, setSpinner] = useState(false);

  const loadCategories = async () => {
    try {
      const items = await getExpenseCategories();
      if (!items.length) {
        Alert.alert('Atenção', 'Solicite ao administrador para cadastrar as categorias!');
      } else {
        setCategory(items[0].id)
        setCategories([...items]);
      }
    } catch (e) {
      Alert.alert('Atenção', 'Não foi possível carregar as catgorias')
    }
  }

  useEffect(()=> {
    loadCategories();
  }, []);

  function navigateToHome() {
    Alert.alert('Sucesso', 'Despesa Cadastrada')
    navigation.navigate('Home')
  }

  const onRegisterExpense = async () => {
    try {

      if (!categories.length) {
        Alert.alert('Atenção', 'Solicite ao administrador para cadastrar as categorias!');
        return;
      }

      setSpinner(true);

      const expense_amount = parseFloat((amount || '0')
        .replace('R$ ', '')
        .replace('.', '')
        .replace(',', '.'));

      if (!expense_amount && !notes) {
        Alert.alert('', 'Informe o valor e a descrição da despesa')
        return;
      }

      await registerExpense(box.id, category, expense_amount, notes, notes);
      await onStartOperationalFlow();

      setCategory(categories[0].id);
      setNotes('');
      setAmount('');

      Alert.alert('Sucesso', 'Despesa cadastrada com sucesso');
    } catch (e) {
      Alert.alert('Atenção', 'Não foi possível registrar a despesa!')
    } finally {
      setSpinner(false);
    }
  }

  return (
    <>
      <Spinner
        visible={spinner}
        textContent={'Carregando despesa...'}
        textStyle={{
          color: '#FFF'
        }}
      />

      <Container>
        <Header name="Cadastrar despesas"/>

        <BoxContainer>
          <Box>
            <BoxTitle title="CADASTRAR DESPESA"/>

            <Text style={{
              fontWeight: 'normal',
            }}>Tipo de Despesa:</Text>
            <Picker
              selectedValue={category}
              style={{
                height: 50,
                width: '100%',
                marginLeft: -10,
                marginBottom: 10,
                marginTop: 10,
              }}
              onValueChange={(itemValue, itemIndex) =>
                setCategory(itemValue)
              }>
              {
                categories.map((item, index)=> {
                  return <Picker.Item key={index} label={item.name} value={item.id} />
                })
              }
            </Picker>

            <Input
              mask="currency"
              value={amount}
              inputMaskChange={(text: string) => setAmount(text)}
              keyboardType="numeric"
              label="Valor"
              returnKeyType="next"
            />
            <View style={{marginTop: 10}}/>

            <Input
              label="Descrição"
              value={notes}
              onChangeText={(text: string) => setNotes(text)}
            />

            <Button onPress={onRegisterExpense}>CADASTRAR</Button>
          </Box>
        </BoxContainer>
      </Container>
    </>
  );
};

export default Exprense;
