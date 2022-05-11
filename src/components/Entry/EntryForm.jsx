import { useState } from 'react';
import { useUser } from '../../hooks/useAuth';
import { createEntry, getEntries } from '../../services/entries';

export default function EntryForm() {
  const [content, setContent] = useState('');
  const { user } = useUser();

  async function refresh() {
    const results = await getEntries();
    return results;
  }

  const handleAddEntry = async (e) => {
      e.preventDefault();
      const entry = await createEntry({ userId: user.id, content });
      setContent('');
      //refresh();
      
  }

  return (
    <>
    <div>Create Entry</div>
    <form onSubmit={handleAddEntry}>
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
