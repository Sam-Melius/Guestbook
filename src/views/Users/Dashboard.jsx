import { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import { getEntries } from '../../services/entries';

export default function Dashboard() {
  const [entries, setEntries] = useUser([]);

  useEffect(() => {
      const getEntries = async () => {
          const results = await getEntries();
          setEntries(results);

      };
      getEntries();
  }, []);

  return (
    <>
    <div>Dashboard</div>
    <ul>
        {entries.map((entry) => (
            <li key={entry.id}>{entry.content}</li>
        ))}
    </ul>
    
    </>
  )
}
