import {RectButton} from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import Input from '../Input';

export const Container = styled.View`
  align-items: center;
  flex-direction: row;
  background-color: #860000;
  height: 60px;
`;

export const ContainerIcon = styled(RectButton)`
  width: 40;
  height: 40;
  border-radius: 20;
  justify-content: center;
  align-items: center;
`;
export const TitleLigth = styled.Text`
  margin-top: 10px;
  margin-bottom: 10px;
  color: #fff;
  font-size: 24px;
  font-family: 'Roboto-ThinItalic';
  padding-left: 8px;
`;

export const TitleBold = styled.Text`
  margin-top: 10px;
  margin-bottom: 10px;
  color: #fff;
  font-size: 24px;
  font-family: 'Lato-Bold';
  padding-left: 8px;
  font-weight: bold;
`;

export const SearchInput = styled(Input).attrs({
  placeholder: 'Pesquisar...',
  maxLength: 35,
  placeholderTextColor: '#fff',
})`
  color: #fff;
  font-size: 16px;
  margin-bottom: 26px;
  margin-left: 8px;
  margin-right: 20px;
`;
