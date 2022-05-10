import { useState, useEffect } from 'react';
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
    <h1>Dashboard</h1>
    <p>Signed in as: {user.email}</p>
    <button onClick={handleLogout}>Logout</button>
    <EntryForm onSubmit={refresh} />
    {loading ? (
      <p>Loading...</p>
    ) : (
      <>
      <h3>Entries</h3>
      <ul>
            {entries.length ? (
              entries.map(({ id, content, created_at }) => {
                return (
                  <li key={id} >
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
