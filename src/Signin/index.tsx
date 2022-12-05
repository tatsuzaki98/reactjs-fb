import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {auth} from '../firebase';
import {useAuth} from '../_contexts/auth';
import {Handle, State} from './types';
import View from './View';

const Signin = () => {
  const [state, setState] = useState<State>({});
  const {user} = useAuth();
  const store = {};
  const navigate = useNavigate();
  const handle: Handle = {
    submit: (e) => {
      e.preventDefault();
      if (state.email === undefined || state.passwd === undefined) {
        return;
      }
      auth.signInWithEmailAndPassword(state.email, state.passwd)
          .then(() => navigate('/'))
          .catch((error) => setState({...state, errorMsg: error.message}));
    },
    inputEmail: (e) => setState({...state, email: e.target.value}),
    inputPassword: (e) => setState({...state, passwd: e.target.value}),
  };
  useEffect(() => {
    user && navigate('/');
  }, []);
  return <View {...{handle, state, store}}/>;
};

export default Signin;
