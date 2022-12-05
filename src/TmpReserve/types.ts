export interface Reservation {
  date: Date;
  isReserved: boolean;
};

export interface Store {};
export interface State {
  reservations: Reservation[];
};
export interface Handle {};
export interface Props {
  store: Store;
  state: State;
  handle: Handle;
};
