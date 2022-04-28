import {atom} from 'recoil';

const profileState = atom({
  key: 'profile',
  default: {
    version: {},
  },
  persistence_UNSTABLE: {
    type: 'profile',
  },
});

export default profileState;
