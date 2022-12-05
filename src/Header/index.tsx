import {useEffect, useState} from 'react';
import {useAuth} from '../_contexts/auth';
import {State} from './types';
import View from './View';

const Header = () => {
  const handle = {};
  const {user} = useAuth();
  const [state, setState] = useState<State>({});
  const store = {};
  useEffect(() => {
    setState({username: user?.email ? user.email : undefined});
  }, [user]);
  return <View {...{handle, state, store}}/>;
};

export default Header;
