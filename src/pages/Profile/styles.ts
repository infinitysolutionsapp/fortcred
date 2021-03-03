import styled from 'styled-components/native';

export const Container = styled.ScrollView.attrs(() => ({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    padding: 20,
    flex: 1,
  },
}))`
`;

export const Title = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: green;
  margin-bottom: 10px;
`;

export const Info = styled.View`
  margin-bottom: 10px;
`;

export const Label = styled.Text`
  font-size: 15px;
  font-weight: bold;
`;

export const Value = styled.Text`
  font-size: 15px;
`;

export const BoxLogout = styled.View`
  background-color: #fff;
  height: 40px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ButtonLogout = styled.Text`
  color: #e50d0d;
  font-weight: bold;
  font-size: 16px;
  margin-left: 20px;
`;

export const VersionText = styled.Text`
  font-size: 15px;
  font-weight: bold;
  alignItems: center;
  justifyContent: center;
  color: #000000;
  position: absolute;
  bottom: 10px;
  left: 45%;
`;
