import React from 'react';
import moment from 'moment';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

import {ContainerDate, TextDate} from './styles';

interface CalendarProps {
  date: string;
  subtitle: string;
  isDateVisible: boolean;
}

const Calendar: React.FC<CalendarProps> = ({
  date,
  subtitle,
  isDateVisible = true,
}) => {
  const formattedDate = isDateVisible ? moment(date).format('DD/MM/YYYY') : '';

  return (
    <>
      <ContainerDate>
        <AntDesignIcon name="calendar" size={32} color="#4BAD73" />
        <TextDate>
          {formattedDate} {subtitle ? '(' + subtitle + ')' : ''}
        </TextDate>
      </ContainerDate>
    </>
  );
};

export default Calendar;
