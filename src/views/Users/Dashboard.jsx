import { useState, useEffect } from 'react';
import { UserProvider } from '../../context/UserContext';
import { useUser } from '../../hooks/useAuth';
import { getEntries } from '../../services/entries';
import EntryForm from '../../components/EntryForm';

export default function Dashboard() {
  const { user, logout } = useUser();
  const [entries, setEntries] = useState([]);
  const[loading, setLoading] = useState(true);
  
  const handleLogout = () => {
    logout(() => history.push('/'));
  };

  useEffect(() => {
      async function fetchEntries() {
          const results = await getEntries();
          setEntries(results);

      setLoading(false);
      };
      fetchEntries();
  }, []);

  async function refresh() {
    const results = await getEntries();
    setEntries(results);

    setLoading(false);
  }

  return (
    <>
    <div>Dashboard</div>
    <p>Signed in as: {user.email}</p>
    <button onClick={handleLogout}>Logout</button>
    <EntryForm refresh={refresh} />
    {loading ? (
      <p>Loading...</p>
    ) : (
      <>
      <h3>Entries</h3>
    <ul>
        {entries.map((entry) => (
            <li key={entry.id}>{entry.content}{user.email}</li>
        ))}
    </ul>
      </>
    )}
    
    
    </>
  );
}
