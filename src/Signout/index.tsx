import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {auth} from '../firebase';
import View from './View';

const Home = () => {
  const handle = {};
  const state = {};
  const store = {};
  const navigate = useNavigate();
  useEffect(() => {
    auth.signOut()
        .then(() => {
          navigate('/signin');
        })
        .catch((error) => {
          console.error(error.message);
        });
  }, []);
  return <View {...{handle, state, store}}/>;
};

export default Home;
