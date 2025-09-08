import { useState, useEffect } from 'react';

type NewsItem = {
  id: number;
  title: string;
  description: string;
  image: string;
  createdAt: string;
};

export default function AdminNewsPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [image, setImage] =useState<File | null>(null);
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    const loadNews =async () => {
      try {
        const res = await fetch('/api/news');
        const data = await res.json();
        setNewsList(data);
      } catch (err) {
        setMessage('Failed to load news list');
      }
    };

    loadNews();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId !== null) {
      // We are editing an existing news item - use PUT
      const res = await fetch('/api/news', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: editingId,
          title,
          description,
        }),
      });

      if (res.ok) {
        setNewsList((prev) =>
        prev.map((item) =>
        item.id === editingId ? { ...item, title, description } : item
      )
    );
    setMessage('News item updated successfully!');
    setEditingId(null);
    setTitle('');
    setDescription('');
    setImage(null);
      } else {
        setMessage('Error updating news item.');
      }

      return;
    }

    // Otherwise, create new news item - use POST

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
      const newItem = await res.json(); // optional
      setMessage('News item posted successfully!');
      setTitle('');
      setDescription('');
      setImage(null);
      setEditingId(null);
      // You could also re-fetch or push to newsList if needed
    } else {
      setMessage('Error posting news.');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this news item?')) return;

    const res = await fetch(`/api/news?id=${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setNewsList((prev) => prev.filter((item) => item.id !== id));
      setMessage('News item deleted');
    } else {
      setMessage('Error deleting news item');
    }
  };

  const handleEdit = (item: NewsItem) => {
    setEditingId(item.id);
    setTitle(item.title);
    setDescription(item.description);
    setImage(null); // optional - you could show the image but leave upload empty
    window.scrollTo({ top: 0, behavior: 'smooth' }); // scroll up to form
  };

  return (
    <>
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
        accept="image/*"
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

    <hr style={{ margin: '2rem 0' }} />
    <h2>Existing News</h2>

    {newsList.length === 0 && <p>No news yet.</p>}

    <ul style={{ maxWidth: '600px', margin: '0 auto', padding: '1rem' }}>
      {newsList.map((item) => (
        <li key={item.id} style={{ marginBottom: '2rem' }}>
          <strong>{item.title}</strong>
          <p>{item.description}</p>
          {item.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
            src={item.image}
            alt={item.title}
            style={{ maxWidth: '100%', maxHeight: '200px' }}
            />
          )}
          <button onClick={() => handleEdit(item)}>Edit</button>
          <button onClick={() => handleDelete(item.id)} style={{ marginLeft: '1rem' }}>
            Delete
            </button>
        </li>
      ))}
    </ul>
    </>
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