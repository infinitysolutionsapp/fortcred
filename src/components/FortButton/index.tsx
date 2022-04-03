import React from 'react';
import {
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
        <MaterialIcons
          name="attach-money"
          size={30}
          color={focused ? '#000' : '#FFF'}
        />
        <Label focused={focused}>Caixa</Label>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default FortButton;
