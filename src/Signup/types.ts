import React from 'react';

export interface Store {};
export interface State {
  email?: string;
  passwd?: string
  errorMsg?: string;
};
export interface Handle {
  submit: (e: React.FormEvent<HTMLButtonElement>) => void;
  inputPassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export interface Props {
  store: Store;
  state: State;
  handle: Handle;
};
