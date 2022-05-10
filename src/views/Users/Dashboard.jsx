import { useState, useEffect } from 'react';
import { UserProvider } from '../../context/UserContext';
import { useUser } from '../../hooks/useAuth';
import { getEntries } from '../../services/entries';
import EntryForm from '../../components/Entry/EntryForm';
import Entry from '../../components/Entry/Entry';

export default function Dashboard() {
  const { user, logout } = useUser();
  const [entries, setEntries] = useState([]);
  const[loading, setLoading] = useState(true);
  
  const handleLogout = () => {
    logout(() => history.push('/'));
  };

  const fetchEntries = () => {
    getEntries()
      .then(setEntries)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
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
    <EntryForm onSubmit={refresh} />
    {loading ? (
      <p>Loading...</p>
    ) : (
      <>
      <h3>Entries</h3>
      <ul className="flex flex-col items-center">
            {entries.length ? (
              entries.map(({ id, content, created_at }) => {
                return (
                  <li key={id} className="w-96">
                    <Entry
                      content={content}
                      author={user.email}
                      date={created_at}
                    />
                  </li>
                );
              })
            ) : (
              <li>
                No entries yet.
              </li>
            )}
          </ul>
      </>
    )}
    
    
    </>
  );
}
