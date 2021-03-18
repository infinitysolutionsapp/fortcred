import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
height: 50px;
width: 70%;
border-radius: 50px;
background-color: #4BAD73;
align-items: center;
justify-content: center;
margin: 24px 0px 10px 0px;
align-self:center;
`;

export const ButtonText = styled.Text`
font-family:'Lato-Bold';
color: #fff;
font-size: 20px;
`;
