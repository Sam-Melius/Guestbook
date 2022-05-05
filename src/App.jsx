import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Auth from './views/Auth/Auth';
import Home from './views/Home/Home';
import Dashboard from './views/Users/Dashboard';


export default function App() {
  return (
    <Switch>
      <Route path='/login'>
        <Auth />
      </Route>
      <PrivateRoute path='/dashboard'>
        <Dashboard />
      </PrivateRoute>
      <Route path='/'>
        <Home />
      </Route>
    </Switch>
  );
}
