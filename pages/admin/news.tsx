import { useState } from 'react';

export default function AdminNewsPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [image, setImage] =useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }

    const res = await fetch('/api/news', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      setMessage('News item posted successfully!');
      setTitle('');
      setDescription('');
      setImage(null);
    } else {
      setMessage('Error posting news.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
      <h1>Post News</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
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

        <input
        type="file"
        name="image"
        accept="image"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            setImage(file);
          }
        }}
        />

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