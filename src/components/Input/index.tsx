import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { TextInputProps } from 'react-native'

import {maskCurrency} from '../../utils/masks'

interface InputProps extends TextInputProps {
  mask?: "currency" | any;
  inputMaskChange?: any
  label: string;
}

interface InputRef {
  focus(): void;
}

import { Container, TextInput,Label } from './styles';

const Input: React.RefForwardingComponent<InputRef, InputProps> = ({ mask, inputMaskChange, label, ...rest }, ref) => {

  const inputElementRef = useRef<any>(null);
  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    }
  }));

  function handleChange(text:string) {
    if (mask === "currency") {

      console.log('handleChange text', text);

      const value = maskCurrency(text);
      inputMaskChange(value);
    }
  }

  return (
    <>
      <Container>
      <Label>{label}</Label>

        <TextInput
        onChangeText={(text: string) => handleChange(text)}
          ref={inputElementRef}
          keyboardAppearance="dark"
          placeholderTextColor="#666360"
          {...rest}
        />
            </Container>
    </>
  );
}

export default forwardRef(Input);
