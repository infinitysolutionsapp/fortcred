import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const BoxContainer = styled.ScrollView.attrs(() => ({
  vertical: true,
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {},
}))`
  margin: 20px;
`;

export const Box = styled.View`
  border-radius: 20px;
  padding: 20px;
  width: 100%;
  background-color: #fff;
`;
