import styled, {css} from 'styled-components/native';

interface isNegative {
  price: number;
}

export const Container = styled.ScrollView.attrs(() => ({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {},
}))``;

export const UserDate = styled.Text`
  font-family: 'Lato-Light';
  font-size: 14px;
  color: #4bad73;
  align-items: center;
  padding: 0px 4px 8px;
`;
export const UserContainer = styled.View`
  flex: 1;
  background: #fff;
  flex-direction: row;
  align-items: center;
  padding: 8px 8px 0px 10px;
  justify-content: space-between;
`;

export const UserInfor = styled.View`
  flex: 1;
  margin-left: 8px;
`;

export const ProviderMeta = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
  justify-content: space-between;
`;
export const UserName = styled.Text`
  font-family: 'Lato-Bold';
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  color: #6b6b6b;
`;

export const UserPrice = styled.Text<isNegative>`
  ${(props: any) =>
    props.price < 0 &&
    css`
      color: #df0e0e;
    `}
  ${(props: any) =>
    props.price >= 0 &&
    css`
      color: #56c568;
    `}
font-family: 'Lato-SemiBold';
  font-size: 14px;
  line-height: 17px;
`;

export const Line = styled.View`
  flex: 1;
  width: 100%;
  background-color: #dbdbdb;
  padding-top: 1px;
`;

export const TotalPrice = styled.View`
  justify-content: space-between;
  flex-direction: row;
  margin: 10px 20px;
`;

export const TotalText = styled.Text`
  font-family: 'Lato-Bold';
  font-size: 16px;
  color: #6b6b6b;
`;
