import { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import { getEntries } from '../../services/entries';

export default function Dashboard() {
  const [entries, setEntries] = useState([]);
  const { logout } = useUser();

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
    <button onClick={logout}>Logout</button>
    <ul>
        {entries.map((entry) => (
            <li key={entry.id}>{entry.content}</li>
        ))}
    </ul>
    
    </>
  )
}
