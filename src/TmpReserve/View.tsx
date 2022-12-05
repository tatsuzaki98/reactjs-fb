import {Props} from './types';

const View = (props: Props) => (
  <div className='bg-blue'>
    <h1>Temporary Reservation</h1>
    <form>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>is reserved</th>
            <th>select</th>
          </tr>
        </thead>
        <tbody>
          {props.state.reservations.map((each, key) => (
            <tr key={key}>
              <td>{each.date.toISOString().split('T')[0]}</td>
              <td>{each.isReserved ? 'y' : 'n'}</td>
              <td><input type={'checkbox'}/></td>
            </tr>
          ))
          }
        </tbody>
      </table>
      <div>
        <button>submit</button>
      </div>
    </form>
  </div>
);

export default View;
