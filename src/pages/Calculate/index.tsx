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

const Calculate: React.FC = (props) => {
  const [amount, setAmount] = useState(null)
  const [total, setTotal] = useState(0)
  const [installment, setInstallment] = useState(0);
  const [percent, setPercent] = useState(0);
  const [day, setDays] = useState(0);

  const onCalculate = async () => {
    const amount_value = parseFloat((amount || '0')
      .replace('R$ ', '')
      .replace('.', '')
      .replace(',', '.'));

    if (amount_value && day && percent) {
      const total_percent = percent === 0 ? amount_value : amount_value * (percent + 100.0) / 100.0;
      const installment_value = total_percent / day;

      setTotal(total_percent);
      setInstallment(installment_value);
    }
  }

  return (
    <>
      <Container>
        <Header name="Recalcular valor" />

        <BoxContainer>
          <Box>
            <BoxTitle title="INFORME OS VALORES" />

            <Input
              mask="currency"
              value={amount}
              inputMaskChange={(text: string) => setAmount(text)}
              keyboardType="numeric"
              label="VALOR DEVEDOR"
              returnKeyType="next"
            />
            <View style={{marginTop: 10}}/>

            <Input
              label="PERCENTUAL"
              value={percent}
              keyboardType="numeric"
              returnKeyType="next"
              onChangeText={(text: number) => setPercent(parseInt(text))}
            />
            <View style={{marginTop: 10}}/>

            <Input
              label="QUANTIDADE DE DIAS"
              value={day}
              keyboardType="numeric"
              onChangeText={(text: number) => setDays(parseInt(text))}
            />

            <View style={{
              marginTop: 10,
              display: 'flex',
              flexDirection: 'row',
            }}>
              <Text style={{
                fontSize: 16,
                marginRight: 10,
              }}>PARCELA:&nbsp;
              </Text>
              <Text style={{
                fontSize: 16,
                color: '#061dd7'
              }}>{
                Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(installment)
              }
              </Text>
            </View>

            <View style={{
              marginTop: 10,
              display: 'flex',
              flexDirection: 'row',
            }}>
              <Text style={{
                fontSize: 16,
                marginRight: 10,
              }}>VALOR TOTAL:&nbsp;
              </Text>
              <Text style={{
                fontSize: 16,
                color: '#061dd7'
              }}>{
                Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(total)
              }
              </Text>
            </View>

            <Button onPress={onCalculate}>CALCULAR</Button>
          </Box>
        </BoxContainer>
      </Container>
    </>
  );
};

export default Calculate;
