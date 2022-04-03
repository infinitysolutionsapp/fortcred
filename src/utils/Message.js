import _ from 'lodash';

export const getMessageErrorRequest = error => {
  const errors = _.get(error, 'data', {});
  const keys = Object.keys(errors);
  let messages = null;

  if (keys.length) {
    messages = Object.values(errors).join('\n ');
  }

  return messages;
};
