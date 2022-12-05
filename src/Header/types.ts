export interface Store {};
export interface State {
  username?: string;
};
export interface Handle {};
export interface Props {
  store: Store;
  state: State;
  handle: Handle;
};
