import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

interface LabelProps {
  focused: boolean;
}
export const Container = styled(LinearGradient)`
  width: 60px;
  height: 60px;
  border-radius: 30px;

  align-items: center;
  justify-content: center;
`;

export const Label = styled.Text<LabelProps>`
  font-size: 12px;
  color: ${({focused}) => (focused ? '#000' : '#FFF')};
`;
