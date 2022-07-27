import React from 'react';
import {RectButtonProperties} from 'react-native-gesture-handler';

import {ButtonText, Container} from './styles';

interface ButtonProps extends RectButtonProperties {
  children: string;
}

const Button: React.FC<ButtonProps> = ({children, ...rest}) => {
  return (
    <Container {...rest} style={{shadowColor: '#860000', elevation: 6}}>
      <ButtonText>{children}</ButtonText>
    </Container>
  );
};

export default Button;
