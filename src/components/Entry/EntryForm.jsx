import { useState } from 'react';
import { useUser } from '../../hooks/useAuth';
import { createEntry } from '../../services/entries';

export default function EntryForm({ onAddEntry }) {
  const [content, setContent] = useState('');
  const { user } = useUser();

  const handleAddEntry = async (e) => {
      e.preventDefault();
      const entry = await createEntry({ userId: user.id, content });
      onAddEntry(entry);
      setContent('');
      refresh();
  }

  return (
    <>
    <div>Create Entry</div>
    <form onAddEntry={handleAddEntry}>
        <textarea
            id='content'
            name='content'
            value={content}
            onChange={(e) => setContent(e.target.value)} />
        <button type='submit'>Add Entry</button>
    </form>
    </>
  )
}
