import { Redirect, Route } from 'react-router-dom';
import { useUser } from '../../hooks/useAuth';

export default function PrivateRoute({ children, ...rest }) {
  const { user } = useUser();
  

  return (
    <Route 
      {...rest}
      render={({ location }) =>
    
        user.email ? (
            children
        ) : (
            <Redirect
            to={{
                pathname: '/login',
                state: { from: location },
            }}
            />
        )}
    />
  );
}
