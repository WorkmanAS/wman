// pages/api/projects.ts
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { readFile, writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import basicAuth from "../../src/lib/basicAuth";

const dataDir = path.join(process.cwd(), "data");
const filePath = path.join(dataDir, "projects.json");

type Project = {
  id: string;
  title: string;
  shortDescription?: string;
  description?: string; // HTML
  address?: string;
  customer?: string;
  type: "Bygginredning" | "Entreprenør" | "Renovering" | "Serviceoppdrag";
  slug: string;
  cover?: string;
  middlePic?: string;
  afterPicDiscription?: string;
  pictures: string[];
  order: number;
  createdAt: string;
  updatedAt: string;
  published: boolean;
};

async function readProjects(): Promise<Project[]> {
  if (!existsSync(filePath)) {
    if (!existsSync(dataDir)) await mkdir(dataDir, { recursive: true });
    await writeFile(filePath, "[]", "utf8");
  }
  const raw = await readFile(filePath, "utf8");
  const list = JSON.parse(raw) as Project[];
  return list.sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999));
}

async function writeProjects(list: Project[]) {
  await writeFile(filePath, JSON.stringify(list, null, 2), "utf8");
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Protect mutating methods only
  if (req.method !== "GET") {
    if (!basicAuth(req, res)) return;
  }

  if (req.method === "GET") {
    const { id, type } = req.query;
    const list = await readProjects();
    if (id && typeof id === "string") {
      const item = list.find((p) => p.id === id);
      if (!item) return res.status(404).json({ message: "Not found" });
      return res.status(200).json(item);
    }
    const filtered = type && typeof type === "string"
      ? list.filter((p) => p.type === type)
      : list;
    return res.status(200).json(filtered);
  }

  if (req.method === "POST") {
    const body = req.body as Partial<Project>;
    if (!body.title || !body.type) {
      return res.status(400).json({ message: "title and type are required" });
    }
    const now = new Date().toISOString();
    const list = await readProjects();
    const id = body.id ?? `${Date.now()}`;
    const order = body.order ?? (list.length ? Math.max(...list.map(p => p.order ?? 0)) + 1 : 1);
    const slug = body.slug ?? id.toString();
    const proj: Project = {
      id: String(id),
      title: body.title,
      shortDescription: body.shortDescription ?? "",
      description: body.description ?? "",
      address: body.address ?? "",
      customer: body.customer ?? "",
      type: body.type as Project["type"],
      slug,
      cover: body.cover ?? "",
      middlePic: body.middlePic ?? "",
      afterPicDiscription: body.afterPicDiscription ?? "",
      pictures: body.pictures ?? [],
      order,
      createdAt: now,
      updatedAt: now,
      published: body.published ?? true,
    };
    list.push(proj);
    await writeProjects(list);
    return res.status(201).json(proj);
  }

  if (req.method === "PUT") {
    const { id } = req.query;
    if (!id || typeof id !== "string") {
      return res.status(400).json({ message: "id is required" });
    }
    const body = req.body as Partial<Project>;
    const list = await readProjects();
    const idx = list.findIndex((p) => p.id === id);
    if (idx === -1) return res.status(404).json({ message: "Not found" });

    const updated: Project = {
      ...list[idx],
      ...body,
      id: list[idx].id,
      updatedAt: new Date().toISOString(),
    };
    // keep order numeric
    if (typeof body.order === "number") updated.order = body.order;
    list[idx] = updated;
    await writeProjects(list);
    return res.status(200).json(updated);
  }

  if (req.method === "PATCH") {
    // Reorder: body = [{id, order}, ...]
    const updates = req.body as { id: string; order: number }[];
    if (!Array.isArray(updates)) return res.status(400).json({ message: "Array required" });
    const list = await readProjects();
    updates.forEach(({ id, order }) => {
      const item = list.find((p) => p.id === id);
      if (item) item.order = order;
    });
    await writeProjects(list);
    return res.status(200).json({ ok: true });
  }

  if (req.method === "DELETE") {
    const { id } = req.query;
    if (!id || typeof id !== "string") {
      return res.status(400).json({ message: "id is required" });
    }
    const list = await readProjects();
    const next = list.filter((p) => p.id !== id);
    if (next.length === list.length) return res.status(404).json({ message: "Not found" });
    await writeProjects(next);
    return res.status(200).json({ ok: true });
  }

  res.setHeader("Allow", "GET,POST,PUT,DELETE,PATCH");
  return res.status(405).json({ message: "Method not allowed" });
}
