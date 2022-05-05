import { Route, Switch } from 'react-router-dom';
import Auth from './views/Auth/Auth';
import Home from './views/Home/Home';
import Dashboard from './views/Users/Dashboard';


export default function App() {
  return (
    <Switch>
      <Route path='/login'>
        <Auth />
      </Route>
      <Route path='/dashboard'>
        <Dashboard />
      </Route>
      <Route path='/'>
        <Home />
      </Route>
    </Switch>
  );
}
