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
            <th>owner</th>
            <th>select</th>
          </tr>
        </thead>
        <tbody>
          {props.state.reservations.map((each, key) => {
            const checked = props.state.selectedDate === each.dateString;
            return <tr key={key}>
              <td>{each.dateString}</td>
              <td>{each.isReserved ? 'yes' : 'no'}</td>
              <td>{each.owner}</td>
              <td>{each.isReserved ? null :
                <input
                  type={'checkbox'}
                  onChange={() => props.handle.select(each.dateString)}
                  checked={checked}
                />
              }</td>
            </tr>;
          })
          }
        </tbody>
      </table>
      <div>
        <button
          onClick={props.handle.submit}
        >submit</button>
      </div>
    </form>
  </div>
);

export default View;
