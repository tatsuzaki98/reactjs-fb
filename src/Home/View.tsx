import {Link} from 'react-router-dom';
import {Props} from './types';

const View = (props: Props) => (
  <div className='bg-blue'>
    <h1>Home</h1>
    <p>
      <Link to='/tmpres'>reserve</Link>
    </p>
  </div>
);

export default View;
