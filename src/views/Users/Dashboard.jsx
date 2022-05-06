import { useState, useEffect } from 'react';
import { UserProvider } from '../../context/UserContext';
import { useUser } from '../../hooks/useAuth';
import { getEntries } from '../../services/entries';

export default function Dashboard() {
  const { user, logout } = useUser();
  const [entries, setEntries] = useState([]);
  
  const handleLogout = () => {
    logout(() => history.push('/'));
  };

  useEffect(() => {
      const fetchEntries = async () => {
          const results = await getEntries();
          setEntries(results);

      };
      fetchEntries();
  }, []);

  return (
    <>
    <div>Dashboard</div>
    <p>Signed in as: {user.email}</p>
    <button onClick={handleLogout}>Logout</button>
    <ul>
        {entries.map((entry) => (
            <li key={entry.id}>{entry.content}</li>
        ))}
    </ul>
    
    </>
  )
}
