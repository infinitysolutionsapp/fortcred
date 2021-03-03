import React from 'react';
import {format} from 'date-fns';
import AntDesignIcon from 'react-native-vector-icons/AntDesign'

import {ContainerDate, TextDate} from './styles'

const Calendar: React.FC = ({date}) => {
  const formattedDate = format(new Date(date), 'dd/MM/yyyy');
  return (
    <>
      <ContainerDate>
        <AntDesignIcon name="calendar" size={32} color="#000"/>
        <TextDate>{formattedDate}</TextDate>
      </ContainerDate>
    </>
  )
}

export default Calendar;
