import styled from 'styled-components/native';

export const Container = styled.ScrollView.attrs(() => ({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
 paddingTop: 20,
paddingLeft: 20,
  },
}))`
`;
export const CollectionName = styled.Text`
flex:1;
  font-family: 'Lato-Bold';
  font-size: 20px;
  line-height: 25px;
`;
export const PhoneContainer = styled.View`
flex:1;
flex-direction: row;
margin: 20px 0px 10px 0px;
/* cima esquerdo, baixo, direito */
`;
export const PhoneText = styled.Text`
  flex:1;
  font-family: 'Lato-SemiBold';
  font-size: 14px;
  line-height: 17px;
  padding-left: 10px;
  color: #4BAD73;
  `;

export const Location = styled.Text`
  font-family: 'Lato-SemiBold';
  font-size: 14px;
  line-height: 17px;
  padding-left: 10px;
  color: #4BAD73;
  padding-left:16px;
`;
export const LocationContainer = styled.View`
flex:1;
flex-direction: row;
padding-left: 4px;
`;

export const ValueContainer = styled.View`
flex:1;
flex-direction: row;
justify-content: space-between;
margin-top: 10px;
/* cima esquerdo, baixo, direito */

`;
export const ValueText = styled.Text`
  font-family:'Lato-Bold';
  font-size: 16px;
  line-height:17px;
  color: #6B6B6B;
`;
export const ValueNumber = styled.Text`
margin: 0px 10px;
font-family: 'Lato-Medium';
font-size: 16px;
line-height: 17px;
color: #6B6B6B;
`;

export const BoxContainer = styled.ScrollView.attrs(() => ({
  vertical: true,
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
  }
}))`
margin: 20px 20px 0px 0px;
`;

export const Box = styled.View`
border-radius: 20px;
padding: 20px;
width: 100%;
background-color: #fff;
`;

