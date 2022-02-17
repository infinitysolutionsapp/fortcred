import styled from 'styled-components/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import {FlatList} from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

interface ClientData {
  id: number
}

export const Container = styled(FlatList as new () => FlatList<ClientData>)`
  flex: 1;
`;

export const EyeIcon = styled(FontAwesomeIcon)`
  padding-right: 10px;
`;

export const FontAwesome5Icon = styled(FontAwesome5)`
  padding-right: 10px;
`;

export const HeaderList = styled.View`
  background: #fff;
  flex-direction: row;
  padding: 10px;
  justify-content: space-between;
`;

export const HeaderTitle = styled.Text`
  font-family: 'Lato-Bold';
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  color: #6B6B6B;
`;

export const ValueName = styled.Text`
  font-family: 'Lato-Light';
  font-size: 14px;
  line-height: 17px;
  color: #6B6B6B;
  align-items: center;
`;

export const DebtorAmount = styled.Text`
  font-family: 'Lato-Light';
  font-size: 14px;
  line-height: 17px;
  color: #000;
  align-items: center;
  font-weight: bold;
`;

export const UserImage = styled.Image`
`;

export const ViewImage = styled.View`
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 22px;
  margin-right: 8px;
  background-color: #CFD8DD;

`;
