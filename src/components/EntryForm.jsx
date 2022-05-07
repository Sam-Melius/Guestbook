import { useState } from 'react';
import { useUser } from '../hooks/useAuth';
import { createEntry } from '../services/entries';

export default function EntryForm({ refresh }) {
  const [content, setContent] = useState('');
  const { user } = useUser();

  async function addEntry(e) {
      e.preventDefault();
      await createEntry({ userId: user.id, content });
      setContent('');
      refresh();
  }

  return (
    <>
    <div>Create Entry</div>
    <form onSubmit={addEntry}>
        <textarea
            name='content'
            value={content}
            onChange={(e) => setContent(e.target.value)} />
        <button type='submit'>Add Entry</button>
    </form>
    </>
  )
}
