import styled from 'styled-components/native';
import Input from '../Input';

export const Container = styled.View`
  align-items: center;
  flex-direction: row;
  background-color: #4BAD73;
  height: 60px;
`;
export const TitleLigth = styled.Text`
  margin-top: 10px;
  margin-bottom: 10px;
  color: #FFF;
  font-size: 24px;
  font-family: 'Roboto-ThinItalic';
  padding-left: 8px;
`;

export const TitleBold = styled.Text`
  margin-top: 10px;
  margin-bottom: 10px;
  color: #FFF;
  font-size: 24px;
  font-family: 'Lato-Bold';
  padding-left: 8px;
  font-weight: bold;
`;

export const SearchInput = styled(Input).attrs({
  placeholder: 'Pesquisar...',
  maxLength: 35,
  placeholderTextColor: '#fff'

})`
color: #fff;
font-size: 16px;
margin-bottom: 26px;
margin-left: 8px;
margin-right: 20px;

`;
