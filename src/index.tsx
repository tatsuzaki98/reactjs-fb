import {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import './index.css';
import Signin from './Signin';
import Signout from './Signout';
import Signup from './Signup';
import TmpReserve from './TmpReserve';
import {AuthProvider} from './_contexts/auth';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
    <StrictMode>
      <AuthProvider>
        <BrowserRouter>
          <Header/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/signin' element={<Signin/>}/>
            <Route path='/signout' element={<Signout/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/tmpres' element={<TmpReserve/>}/>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </StrictMode>,
);
