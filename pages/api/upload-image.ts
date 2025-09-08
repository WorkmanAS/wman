// pages/api/upload-image.ts
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { promises as fsp } from "fs";
import formidable, { type File, type Files, type Fields } from "formidable";

export const config = {
  api: { bodyParser: false }, // important for file uploads
};

const uploadDir = path.join(process.cwd(), "public", "assets", "team");

function toSlug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

// Safely get the first uploaded file regardless of whether it's File or File[]
function firstFile(files: Files): File | null {
  const entry = (files as any).file ?? Object.values(files)[0];
  if (!entry) return null;
  return Array.isArray(entry) ? (entry[0] as File) : (entry as File);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  await fsp.mkdir(uploadDir, { recursive: true });

  // Save directly into /public/assets/team; we'll rename after parsing
  const form = formidable({
    multiples: false,
    maxFileSize: 10 * 1024 * 1024, // 10MB
    keepExtensions: true,
    uploadDir,
  });

  const parse = () =>
    new Promise<{ fields: Fields; files: Files }>((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

  try {
    const { files } = await parse();
    const file = firstFile(files);
    if (!file) return res.status(400).json({ message: "No file uploaded" });

    // Formidable v2 uses .filepath, older versions used .path — handle both
    const currentPath = (file as any).filepath || (file as any).path;
    const original = file.originalFilename || "image";
    const ext = path.extname(original) || path.extname(currentPath) || ".jpg";
    const base = toSlug(path.basename(original, path.extname(original))) || "image";
    const safeName = `${base}-${Date.now()}${ext}`;
    const finalPath = path.join(uploadDir, safeName);

    if (currentPath && currentPath !== finalPath) {
      await fsp
        .rename(currentPath, finalPath)
        .catch(async () => {
          // Fallback for cross-device moves
          await fsp.copyFile(currentPath, finalPath);
          await fsp.unlink(currentPath);
        });
    }

    const relPath = `/assets/team/${safeName}`;
    return res.status(200).json({ path: relPath });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Upload failed" });
  }
}
