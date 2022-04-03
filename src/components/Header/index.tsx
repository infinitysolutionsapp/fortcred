import React, {useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {Container, SearchInput, TitleBold, TitleLigth} from './styles';

interface TitleBoldProps {
  name: string;
  hello?: string;
  icon?: string;
  onChangeText?: string;
  value?: string;
}

const Header: React.FC<TitleBoldProps> = ({
  name,
  hello,
  icon,
  onChangeText,
  value,
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Container>
        {icon && (
          <FontAwesome
            style={{marginLeft: 20}}
            onPress={() => setVisible(!visible)}
            name={icon}
            size={20}
            color="#fff"
          />
        )}

        {visible ? (
          <SearchInput onChangeText={onChangeText} value={value} />
        ) : (
          <>
            <TitleLigth>{hello ? hello : ''}</TitleLigth>
            <TitleBold>{name}</TitleBold>
          </>
        )}
      </Container>
    </>
  );
};

export default Header;
