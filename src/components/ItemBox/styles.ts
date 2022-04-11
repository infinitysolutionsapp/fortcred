import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  flex-direction: row;
  margin-bottom: 16px;
  padding-top: 16px;
`;

export const ModalContainer = styled.View``;

export const ModalContainerScroll = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})`
  margin: 20px;
`;

export const Option = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  height: 90px;
  width: 90px;
  margin-right: 16px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0px 4px 4px rgba(25, 25, 25, 25);

  align-items: center;
  justify-content: center;
`;

export const Label = styled.Text`
  text-align: center;
  color: #000;
  font-weight: bold;
  margin-top: 8px;
  font-size: 14px;
`;

export const ImageOption = styled.Image.attrs({
  resizeMode: 'contain',
  tintColor: '#3a3838',
})`
  height: 30px;
  width: 30px;
`;

export const Item = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
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
