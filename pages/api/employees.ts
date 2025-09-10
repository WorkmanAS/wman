// pages/api/employees.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { readFile, writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

// ✅ keep your teamMembers seed
import { teamMembers as teamSeedRaw } from "../../src/data/teamMembers";

type Emp = {
  id: number;
  name: string;
  title: string;
  phone?: string;
  email?: string;
  image?: string;
  order?: number;
};

const dataDir = path.join(process.cwd(), "data");
const filePath = path.join(dataDir, "employees.json");

const toNum = (v: any, fallback = 0) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
};

// ---- seed & load helpers ----------------------------------------------------

function normalizeSeed(seed: any[]): Emp[] {
  return (seed || []).map((m: any, i: number) => ({
    id: toNum(m.id ?? i + 1, i + 1),
    name: String(m.name ?? "Ukjent"),
    title: String(m.title ?? m.position ?? ""),
    phone: m.phone ?? "",
    email: m.email ?? "",
    image: m.image ?? m.pic ?? "",
    order: typeof m.order === "number" ? m.order : i,
  }));
}

async function ensureDataFile() {
  if (!existsSync(dataDir)) {
    await mkdir(dataDir, { recursive: true });
  }
  if (!existsSync(filePath)) {
    const seeded = normalize(normalizeSeed(Array.isArray(teamSeedRaw) ? teamSeedRaw : []));
    await writeFile(filePath, JSON.stringify(seeded, null, 2), "utf8");
    return;
  }
  // if corrupt/empty, reseed
  try {
    const raw = await readFile(filePath, "utf8");
    const parsed = JSON.parse(raw || "[]");
    if (!Array.isArray(parsed) || parsed.length === 0) {
      const seeded = normalize(normalizeSeed(Array.isArray(teamSeedRaw) ? teamSeedRaw : []));
      await writeFile(filePath, JSON.stringify(seeded, null, 2), "utf8");
    }
  } catch {
    const seeded = normalize(normalizeSeed(Array.isArray(teamSeedRaw) ? teamSeedRaw : []));
    await writeFile(filePath, JSON.stringify(seeded, null, 2), "utf8");
  }
}

function normalize(list: Emp[]): Emp[] {
  // stable sort by (order, id)
  const sorted = [...list].map(e => ({
    ...e,
    id: toNum(e.id),
    order: typeof e.order === "number" ? e.order : 1e9,
  })).sort((a, b) => {
    if ((a.order ?? 1e9) !== (b.order ?? 1e9)) return (a.order! - b.order!);
    return (a.id ?? 0) - (b.id ?? 0);
  });

  // reindex orders to unique 0..N-1
  return sorted.map((e, i) => ({ ...e, order: i }));
}

async function readEmployees(): Promise<Emp[]> {
  await ensureDataFile();
  const raw = await readFile(filePath, "utf8");
  const list: any[] = JSON.parse(raw);
  // coerce & normalize every read
  return normalize(list as Emp[]);
}

async function saveEmployees(list: Emp[]) {
  const clean = normalize(list);
  await writeFile(filePath, JSON.stringify(clean, null, 2), "utf8");
  return clean;
}

// ---- handler ----------------------------------------------------------------

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let list = await readEmployees();

  if (req.method === "GET") {
    return res.status(200).json(list);
  }

if (req.method === "POST") {
  const raw = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body ?? {});
  const action = String(req.query.action ?? raw.action ?? "");

  // --- Actions over POST (works even if PATCH is blocked) ---
  if (action === "reorder") {
    const id = Number(raw.id);
    let toIndex = Number(raw.toIndex);

    list = normalize(list); // ensure 0..N-1 first
    if (!Number.isFinite(toIndex)) toIndex = 0;
    toIndex = Math.max(0, Math.min(toIndex, list.length - 1));

    const fromIndex = list.findIndex(e => e.id === id);
    if (fromIndex < 0) return res.status(404).json({ message: "Employee not found" });
if (fromIndex !== toIndex) {
  const [item] = list.splice(fromIndex, 1);
  list.splice(toIndex, 0, item);
  // IMPORTANT: write orders to match current array order
  list = list.map((e, i) => ({ ...e, order: i }));
  list = await saveEmployees(list);
}
return res.status(200).json(list);

  }

  if (action === "move") {
    const id = Number(raw.id);
    const dir = raw.direction === "up" ? -1 : 1;

    list = normalize(list);
    const idx = list.findIndex(e => e.id === id);
    if (idx < 0) return res.status(404).json({ message: "Employee not found" });

    const target = idx + dir;
    if (target >= 0 && target < list.length) {
      const a = list[idx].order!;
      const b = list[target].order!;
      list[idx].order = b;
      list[target].order = a;
      list = await saveEmployees(list);
    }
    return res.status(200).json(list);
  }

  // --- Normal create flow (validate) ---
  const body = raw as Partial<Emp>;
  if (!body.name || !body.title) {
    return res.status(400).json({ message: "Missing required fields: name, title" });
  }

  const maxOrder = Math.max(-1, ...list.map(e => e.order ?? -1));
  const nextId = list.length ? Math.max(...list.map(e => e.id)) + 1 : 1;

  const item: Emp = {
    id: toNum(body.id ?? nextId, nextId),
    name: body.name ?? "",
    title: body.title ?? "",
    phone: body.phone ?? "",
    email: body.email ?? "",
    image: body.image ?? "",
    order: toNum(body.order ?? maxOrder + 1, maxOrder + 1),
  };

  list.push(item);
  const saved = await saveEmployees(list);
  const returned = saved.find(e => e.id === item.id) ?? item;
  return res.status(201).json(returned);
}


  if (req.method === "PUT") {
    const id = toNum((typeof req.body === "string" ? JSON.parse(req.body) : req.body)?.id ?? req.query.id);
    if (!id) return res.status(400).json({ message: "Missing employee id" });

    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    let found = false;
    list = list.map((e) => {
      if (e.id === id) {
        found = true;
        const newOrder = body.order !== undefined ? toNum(body.order, e.order ?? 0) : e.order;
        return { ...e, ...body, id: e.id, order: newOrder };
      }
      return e;
    });

    if (!found) return res.status(404).json({ message: "Employee not found" });

    const saved = await saveEmployees(list);
    const returned = saved.find(e => e.id === id);
    return res.status(200).json(returned ?? { ok: true });
  }

  if (req.method === "DELETE") {
    const id = toNum(req.query.id);
    list = list.filter((e) => e.id !== id);
    await saveEmployees(list);
    return res.status(200).json({ ok: true });
  }

  // Atomic operations
  if (req.method === "PATCH") {
  const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

  // A) simple neighbor swap (kept for backwards compatibility)
  if (body?.action === "move") {
    const id = toNum(body.id);
    const dir = body.direction === "up" ? -1 : 1;

    // ensure unique, sequential orders before we move
    list = normalize(list);

    const idx = list.findIndex((e) => e.id === id);
    if (idx < 0) return res.status(404).json({ message: "Employee not found" });

    const target = idx + dir;
    if (target < 0 || target >= list.length) {
      return res.status(200).json({ ok: true });
    }

    // swap orders
    const a = list[idx].order!;
    const b = list[target].order!;
    list[idx].order = b;
    list[target].order = a;

    const saved = await saveEmployees(list);
    return res.status(200).json(saved);
  }

  // B) **reorder to a specific index** (recommended)
  if (body?.action === "reorder") {
    const id = toNum(body.id);
    list = normalize(list); // make sure orders are clean first

    let toIndex = toNum(body.toIndex);
    if (!Number.isFinite(toIndex)) toIndex = 0;
    toIndex = Math.max(0, Math.min(toIndex, list.length - 1)); // clamp

    const fromIndex = list.findIndex((e) => e.id === id);
    if (fromIndex < 0) return res.status(404).json({ message: "Employee not found" });
    if (fromIndex === toIndex) {
      return res.status(200).json(list); // nothing to do
    }

    // remove and insert at new index
const [item] = list.splice(fromIndex, 1);
list.splice(toIndex, 0, item);

// IMPORTANT: write orders to match current array order
list = list.map((e, i) => ({ ...e, order: i }));

const saved = await saveEmployees(list);
return res.status(200).json(saved);

  }

  return res.status(400).json({ message: "Unknown PATCH action" });
}


  res.setHeader("Allow", "GET, POST, PUT, DELETE, PATCH");
  return res.status(405).json({ message: "Method Not Allowed" });
}
