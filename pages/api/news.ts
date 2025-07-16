import { writeFile, mkdir, readFile } from 'fs/promises';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import { existsSync } from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

const dataDir = path.join(process.cwd(), 'data');
const newsFile = path.join(dataDir, 'news.json');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
        const file = await readFile(newsFile, 'utf8');
        const news =JSON.parse(file);
        return res.status(200).json(news);
    } catch (err) {
        return res.status(500).json({ message: 'Failed to load news' });
    }
  }
  
  if (req.method === 'POST') {
  const formidable = (await import ('formidable')).IncomingForm;

  const form = new formidable({
    uploadDir: path.join(process.cwd(), 'public/uploads'),
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Form parsing error:', err);
      return res.status(500).json({ message: 'Upload error' });
    }

    const title = fields.title?.[0];
    const description = fields.description?.[0];
    const file = files.image?.[0];

    if (!title || !description) {
      return res.status(400).json({ message: 'Missing fields'});
    }

    const image = file
    ? '/uploads/' + path.basename(file.filepath)
    : null;

    try {
      if (!existsSync(dataDir)) {
        await mkdir(dataDir);
      }

      const newsItem = {
        id: Date.now(),
        title,
        description,
        image,
        createdAt: new Date().toISOString(),
      };

      let existing = [];
      try {
        const file = await readFile(newsFile, 'utf8');
        existing =JSON.parse(file);
      } catch (e) {
        existing = [];
      }
      
      existing.unshift(newsItem); // newest first

      await writeFile(newsFile, JSON.stringify(existing, null, 2));
      return res.status(200).json({ message: 'News saved' });
    } catch (err) {
      return res.status(500).json({ message: 'Server error' });
    }
  });

  return;
  
}
}