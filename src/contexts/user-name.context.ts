import { createContext } from 'react';

export const UserNameContext = createContext({
  userName: '',
  handleChangeUserName: (name: string) => { console.log(name) }
});