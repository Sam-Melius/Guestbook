import { useState } from 'react';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { useUser } from '../../hooks/useAuth';

export default function Auth() {
  const { login, signUp } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const location = useLocation();
  const history = useHistory();
  const[error, setError] = useState('');

  const handleSignUp = async (e) => {
      try {
          e.preventDefault();
          await signUp(email, password);
          const url = location.state.origin ? location.state.origin.pathname : '/';
          history.replace(url);
      } catch (error) {
          setError(error.message)
      }
  }

  const handleSubmit = async (e) => {
    try {
        e.preventDefault();
        await login(email, password);
  
        const url = location.state.origin ? location.state.origin.pathname : '/';
        history.replace(url);
    } catch (error) {
        setError(error.message);
    }
      
  };

  return (
    <>
    <div>Auth</div>
    <Link to='/'>Home</Link>
    <form>
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
        <button type='submit' onClick={handleSubmit}>Sign In</button>
        <button type='submit' onClick={handleSignUp}>Sign Up</button>
        <p>{error}</p>
    </form>
    
    </>
  )
}
