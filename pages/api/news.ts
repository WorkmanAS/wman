import { writeFile, mkdir, readFile } from 'fs/promises';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import { existsSync } from 'fs';

const dataDir = path.join(process.cwd(), 'data');
const newsFile = path.join(dataDir, 'news.json');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    try {
      // Ensure /data folder exists
      if (!existsSync(dataDir)) {
        await mkdir(dataDir);
      }

      const newsItem = {
        id: Date.now(),
        title,
        description,
        createdAt: new Date().toISOString(),
      };

      let existing = [];
      try {
        const file = await readFile(newsFile, 'utf8');
        existing = JSON.parse(file);
      } catch (e) {
        existing = [];
      }

      existing.unshift(newsItem); // newest first

      await writeFile(newsFile, JSON.stringify(existing, null, 2));
      return res.status(200).json({ message: 'News saved' });
    } catch (err) {
      return res.status(500).json({ message: 'Server error' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
