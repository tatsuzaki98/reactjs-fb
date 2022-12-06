import {DocTmpReserve} from '../firebase';
import {Reservation} from './types';

export const getWeeklyReservations = (docs: DocTmpReserve[]): Reservation[] => {
  const reservations: Reservation[] = [];
  const today = new Date();
  const [year, month, day] = [
    today.getFullYear(), today.getMonth(), today.getDate(),
  ];
  for (let i=1; i<=7; i++) {
    const date = new Date(year, month, day+i);
    const dateString = date.toISOString().split('T')[0];
    const filteredDocs = docs.filter((each) => each.date === dateString);
    const isReserved = filteredDocs.length > 0;
    const owner = filteredDocs[0]?.owner;
    reservations.push({isReserved, dateString, owner});
  }
  return reservations;
};
