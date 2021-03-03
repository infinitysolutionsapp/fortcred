import React from 'react';

import { Container, TitleLigth, TitleBold } from './styles'

interface TitleBoldProps  {
name: string;
hello?:string;
}

const Header: React.FC<TitleBoldProps> = ({name,hello }) => {
  return (
    <>
      <Container>
        <TitleLigth>{hello ? hello : '' }</TitleLigth>
        <TitleBold>{name}</TitleBold>
      </Container>
    </>
  );

}

export default Header;
