import React, {useState} from 'react';
import {RectButton} from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {
  Container,
  SearchInput,
  TitleBold,
  TitleLigth,
  ContainerIcon,
} from './styles';

interface TitleBoldProps {
  name: string;
  hello?: string;
  icon?: string;
  onChangeText?: string;
  value?: string;
  navigateTo?: () => Promisse<voi>;
}

const Header: React.FC<TitleBoldProps> = ({
  name,
  hello,
  icon,
  onChangeText,
  value,
  navigateTo,
}) => {
  const [visible, setVisible] = useState(false);
  const {goBack} = useNavigation();
  return (
    <>
      <Container>
        {visible ? (
          <>
            <SearchInput onChangeText={onChangeText} value={value} />
            {icon && (
              <FontAwesome
                style={{marginRight: 30, top: 2}}
                onPress={() => setVisible(!visible)}
                name={icon}
                size={20}
                color="#fff"
              />
            )}
          </>
        ) : (
          <>
            <TitleLigth>{hello ? hello : ''}</TitleLigth>
            <ContainerIcon onPress={navigateTo || goBack}>
              <FontAwesome name={'arrow-left'} size={20} color="#fff" />
            </ContainerIcon>
            <TitleBold>{name}</TitleBold>
            {icon && (
              <FontAwesome
                style={{marginLeft: 30, top: 2}}
                onPress={() => setVisible(!visible)}
                name={icon}
                size={20}
                color="#fff"
              />
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default Header;
