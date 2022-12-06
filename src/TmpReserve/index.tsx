import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {firedb, DocTmpReserve, TMP_RESERVE} from '../firebase';
import firebase from 'firebase/compat/app';
import {useAuth} from '../_contexts/auth';
import {Handle, State} from './types';
import {getWeeklyReservations} from './utils';
import View from './View';

const TmpReserve = () => {
  const {user} = useAuth();
  const navigate = useNavigate();

  const [state, setState] = useState<State>({
    reservations: [],
  });

  const store = {};

  const handle: Handle = {
    select: (dateString) => {
      setState({...state, selectedDate: dateString});
    },
    submit: (e) => {
      e.preventDefault();
      if (!user?.email) return;
      if (!state.selectedDate) return;
      const record: DocTmpReserve = {
        owner: user?.email,
        date: state.selectedDate,
        createdAt: firebase.firestore.Timestamp.now(),
      };
      firedb.collection(TMP_RESERVE).add(record)
          .then(() => {
            navigate('/');
          });
    },
  };

  useEffect(() => {
    firedb.collection(TMP_RESERVE)
        .get()
        .then((snapShot) => {
          const records = snapShot.docs.map((doc) => {
            return doc.data() as DocTmpReserve;
          });
          const reservations = getWeeklyReservations(records);
          setState({...state, reservations});
        });
  }, []);

  useEffect(() => {
    !user && navigate('/signin');
  }, []);

  return <View {...{handle, state, store}}/>;
};

export default TmpReserve;
