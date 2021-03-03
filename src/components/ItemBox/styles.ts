import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler'

export const Container = styled.View`
    flex:1;
    flex-direction: row;
    margin-bottom: 16px;
    padding-top: 16px;

`;

export const Item = styled(RectButton)`
    flex: 1;
    background-color: #fff;
    border-width: 2px;
    border-color: #eee;
    height: 140px;
    width: 160px;
    border-radius: 8px;
    padding-top: 20px;
    padding-bottom: 16px;
    margin-right: 8px;
    align-items: center;
    text-align: center;
    box-shadow: 0px 4px 4px rgba(25, 25, 25, 25);
`;

export const Title = styled.Text`
    top: 10px;
    font-family: 'Lato-Bold';
    font-weight: bold;
    font-size: 16px;
    line-height: 20px;
    color: #000000;
 `;
