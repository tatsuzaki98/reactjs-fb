export interface Reservation {
  dateString: string;
  isReserved: boolean;
  owner?: string;
};

export interface Store {};
export interface State {
  reservations: Reservation[];
  selectedDate?: string;
};
export interface Handle {
  select: (dateString: string) => void;
  submit: (e: React.FormEvent<HTMLButtonElement>) => void;
};
export interface Props {
  store: Store;
  state: State;
  handle: Handle;
};
