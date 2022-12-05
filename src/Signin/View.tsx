import {Props} from './types';

const View = (props: Props) => (
  <form className='bg-green'>
    <h1>Login</h1>
    {props.state.errorMsg ?
      <p>{props.state.errorMsg}</p> :
      null
    }
    <div>
      <label>email</label>
      <input
        type={'email'}
        onChange={props.handle.inputEmail}
        value={props.state.email || ''}
      />
    </div>

    <div>
      <label>password</label>
      <input
        type={'password'}
        onChange={props.handle.inputPassword}
        value={props.state.passwd || ''}
      />
    </div>

    <button onClick={props.handle.submit}>submit</button>
  </form>
);

export default View;
