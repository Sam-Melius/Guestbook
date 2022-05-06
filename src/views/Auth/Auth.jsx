import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

export default function Auth() {
  const { login } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const location = useLocation();
  const history = useHistory();

  const handleSubmit = async (e) => {
      e.preventDefault();
      await login(email, password);

      const usl = location.state.origin ? location.state.origin.pathname : '/';
      history.replace(url);
  }

  return (
    <>
    <div>Auth</div>
    <form onSubmit={handleSubmit}>
        <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email' />
        <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password' />
        <button type='submit'>Sign In</button>
    </form>
    </>
  )
}
