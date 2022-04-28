import React from 'react';
import {
  Image,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
} from 'react-native';
import Moto from '../../assets/moto.png';

import {Container, Label} from './styles';

interface FortButton extends TouchableWithoutFeedbackProps {
  focused: boolean;
}

const FortButton: React.FC<FortButton> = ({onPress, focused}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Container
        colors={focused ? ['#FFF', '#CCC'] : ['#00FC6B', '#00AC4A']}
        start={{x: 1, y: 0.2}}>
        <Image
          source={Moto}
          resizeMode="contain"
          style={{width: 30, height: 30}}
        />
        <Label focused={focused}>Rota</Label>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default FortButton;
