import styled from 'styled-components/native';

export const Container = styled.ScrollView.attrs(() => ({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    padding: 20,
  },
}))`
`;

export const ContainerText = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const DescriptionText = styled.Text`
  flex: 1;
  font-family: 'Lato-Bold';
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  text-align: left;
  color: #000000;
`;

export const ContainerTextColumn = styled.View`
  flex: 1;
  padding-top: 20px;
  padding-left: 90px;
`;
export const TextBar = styled.Text`
  font-family: 'Lato-Bold';
  font-size: 20px;
  justify-content: center;
  align-items: center;
`;

export const BoxStartBox = styled.View`
  background-color: #fff;
  height: 40px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 4px rgba(25, 25, 25, 25);
`;

export const BoxStarted = styled.View`
  background-color: #fff;
  height: 40px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 4px rgba(25, 25, 25, 25);
`;

export const BoxStartedText = styled.Text`
  font-weight: bold;
`;

export const ButtonStartBox = styled.Text`
  color: #22bb33;
  font-weight: bold;
  font-size: 16px;
  margin-left: 20px;
`;
