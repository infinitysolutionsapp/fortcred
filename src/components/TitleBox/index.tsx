import React from 'react';

interface BoxProps {
  title: string;
}

 import { Container,BoxTitle,  } from './styles';

const TitleBox: React.FC<BoxProps> = ({title}) => {
  return (
    <Container>
     <BoxTitle>{title}</BoxTitle>
    </Container>
  )
}

export default TitleBox;
