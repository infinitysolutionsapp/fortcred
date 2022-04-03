import React from 'react';
import {BoxTitle, Container} from './styles';

interface BoxProps {
  title: string;
}

const TitleBox: React.FC<BoxProps> = ({title}) => {
  return (
    <Container>
      <BoxTitle>{title}</BoxTitle>
    </Container>
  );
};

export default TitleBox;
