import {Link} from 'react-router-dom';
import {Props} from './types';

const View = (props: Props) => (
  <div className='bg-red'>
    {props.state.username ? (
      <div>
        <p>{props.state.username}</p>
        <p><Link to='/signout'>signout</Link></p>
      </div>
    ) : (
      <div>
        <p><Link to='/signin'>signin</Link></p>
        <p><Link to='/signup'>signup</Link></p>
      </div>
    )}
  </div>
);

export default View;
