import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

export const Container = styled.View`
  flex: 1;
  background-color: #131418;
`;

export const Header = styled.View`
  padding: 12px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Time = styled.Text`
  color: #999;
  font-size: 12px;
  font-weight: bold;
`;

export const UserName = styled.Text`
  font-size: 24px;
  color: #fff;
  font-weight: bold;
`;

export const NotificationIcon = styled(Ionicons).attrs({
  name: 'notifications',
  size: 24,
  color: '#FFF',
})``;

export const NotificationContainer = styled.View`
  border-radius: 10px;
  background-color: #f00;
  position: absolute;
  right: 0px;
  top: 16px;

  justify-content: center;
  align-items: center;
`;

export const NotificationNumber = styled.Text`
  color: #fff;
  font-size: 12px;
`;

export const SaldoBox = styled.View`
  margin: 16px;
  background-color: #333;
  border-radius: 10px;
`;

export const SaldoText = styled.Text`
  color: #999;
  padding: 12px;
`;

export const SaldoBoxContent = styled.View`
  padding: 0 12px;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
`;

export const MoneyBox = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

export const EyeBox = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  height: 32px;
  width: 32px;
  background-color: #666;
  border-radius: 16px;
  align-items: center;
  justify-content: center;
`;

export const EyeIcon = styled(Feather).attrs({
  size: 20,
  color: '#FFF',
})``;

export const SeeExtractButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  background-color: #444;
  padding: 12px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

export const SeeExtractButtonText = styled.Text`
  color: #fff;
`;

export const SeeExtractButtonIcon = styled(Feather).attrs({
  size: 20,
  color: '#FFF',
  name: 'chevron-right',
})``;

export const ModalContainer = styled.View`
  flex: 1;
  margin-top: 20px;
  background-color: #f5f5f9;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

export const MenuContainer = styled.View`
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: #fff;
  align-items: center;
  justify-content: center;
  height: 50px;
`;

export const IconMenu = styled(AntDesign).attrs({
  name: 'minus',
  size: 80,
})`
  color: #dde;
  bottom: 14px;
`;
