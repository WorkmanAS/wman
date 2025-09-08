// pages/api/employees.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { readFile, writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

// ✅ Import your existing team list to seed from
import { teamMembers as teamSeedRaw } from "../../src/data/teamMembers";

const dataDir = path.join(process.cwd(), "data");
const employeesFile = path.join(dataDir, "employees.json");

// New unified shape used by Admin UI and Kontakt page
type Employee = {
  id: number;
  name: string;
  title: string;      // mapped from position
  phone?: string;
  email?: string;
  image?: string;     // mapped from pic
  order?: number; // display order (lower = earlier)
};

// Map old shape -> new shape
function normalizeSeed(seed: any[]): Employee[] {
  return (seed || []).map((m: any, i: number) => ({
    id: Number(m.id ?? i + 1),
    name: String(m.name ?? "Ukjent"),
    title: String(m.title ?? m.position ?? ""),    // position -> title
    phone: m.phone ?? "",
    email: m.email ?? "",
    image: m.image ?? m.pic ?? "",                 // pic -> image
    order: typeof m.order === "number" ? m.order : i
  }));
}

async function ensureDataFile() {
  if (!existsSync(dataDir)) {
    await mkdir(dataDir, { recursive: true });
  }

  // If file doesn't exist OR is empty array -> seed it from teamMembers
  if (!existsSync(employeesFile)) {
    const seeded = normalizeSeed(Array.isArray(teamSeedRaw) ? teamSeedRaw : []);
    await writeFile(employeesFile, JSON.stringify(seeded, null, 2), "utf8");
    return;
  }

  // File exists: if it's empty or invalid, also seed
  try {
    const current = await readFile(employeesFile, "utf8");
    const parsed = JSON.parse(current || "[]");
    if (!Array.isArray(parsed) || parsed.length === 0) {
      const seeded = normalizeSeed(Array.isArray(teamSeedRaw) ? teamSeedRaw : []);
      await writeFile(employeesFile, JSON.stringify(seeded, null, 2), "utf8");
    }
  } catch {
    const seeded = normalizeSeed(Array.isArray(teamSeedRaw) ? teamSeedRaw : []);
    await writeFile(employeesFile, JSON.stringify(seeded, null, 2), "utf8");
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await ensureDataFile();

    if (req.method === "GET") {
      const json = await readFile(employeesFile, "utf8");
      const data: Employee[] = JSON.parse(json);
      const sorted = [...data].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      return res.status(200).json(data);
    }

    if (req.method === "POST") {
      const body = req.body as Omit<Employee, "id"> & Partial<Pick<Employee, "id">>;
      if (!body?.name || !body?.title) {
        return res.status(400).json({ message: "Missing required fields: name, title" });
      }
      const json = await readFile(employeesFile, "utf8");
      const data: Employee[] = JSON.parse(json);

      const nextId =
        typeof body.id === "number"
          ? body.id
          : data.length
          ? Math.max(...data.map((e) => e.id)) + 1
          : 1;

      const newEmp: Employee = {
        id: nextId,
        name: body.name,
        title: body.title,
        phone: body.phone || "",
        email: body.email || "",
        image: body.image || "",
        order:
        typeof (body as any).order === "number"
        ? (body as any).order
        : (data.length ? Math.max(...data.map(e => e.order ?? 0)) + 1 : 0),
      };

      data.push(newEmp);
      await writeFile(employeesFile, JSON.stringify(data, null, 2), "utf8");
      return res.status(201).json(newEmp);
    }

    if (req.method === "PUT") {
      const body = req.body as Partial<Employee> & { id?: number };
      const id = typeof body.id === "number" ? body.id : Number(req.query.id);
      if (!id) {
        return res.status(400).json({ message: "Missing employee id" });
      }

      const json = await readFile(employeesFile, "utf8");
      const data: Employee[] = JSON.parse(json);

      const idx = data.findIndex((e) => e.id === id);
      if (idx === -1) {
        return res.status(404).json({ message: "Employee not found" });
      }

      const updated: Employee = { ...data[idx], ...body, id };
      data[idx] = updated;

      await writeFile(employeesFile, JSON.stringify(data, null, 2), "utf8");
      return res.status(200).json(updated);
    }

    if (req.method === "DELETE") {
      const id = Number(req.query.id);
      if (!id) {
        return res.status(400).json({ message: "Missing employee id" });
      }

      const json = await readFile(employeesFile, "utf8");
      const data: Employee[] = JSON.parse(json);

      const next = data.filter((e) => e.id !== id);
      await writeFile(employeesFile, JSON.stringify(next, null, 2), "utf8");
      return res.status(204).end();
    }

    res.setHeader("Allow", "GET,POST,PUT,DELETE");
    return res.status(405).json({ message: "Method Not Allowed" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}
