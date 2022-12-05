import {useEffect, useState} from 'react';
import {Reservation, State} from './types';
import View from './View';

const TmpReserve = () => {
  const handle = {};
  const [state, setState] = useState<State>({
    reservations: [],
  });
  const store = {};
  useEffect(() => {
    const reservations: Reservation[] = [];
    const today = new Date();
    const [year, month, date] = [
      today.getFullYear(), today.getMonth(), today.getDate(),
    ];
    for (let i=1; i<=7; i++) {
      reservations.push({
        isReserved: false,
        date: new Date(year, month, date+i),
      });
    }
    setState({...state, reservations});
  }, []);
  return <View {...{handle, state, store}}/>;
};

export default TmpReserve;
