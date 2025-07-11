import { useState } from 'react';

export default function AdminNewsPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/news', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description }),
    });

    if (res.ok) {
      setMessage('News item posted successfully!');
      setTitle('');
      setDescription('');
    } else {
      setMessage('Error posting news.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
      <h1>Post News</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: '100%', marginBottom: '1rem' }}
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={5}
            style={{ width: '100%', marginBottom: '1rem' }}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

import { GetServerSideProps } from 'next';
import basicAuth from '../../src/lib/basicAuth';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { req, res } = context;

    const authorized = basicAuth(req, res);
    if (!authorized) {
        return { props: {} };
    }

    return { props: {} };
};