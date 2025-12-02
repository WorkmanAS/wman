// pages/admin/projects.tsx
import { GetServerSideProps } from "next";
import basicAuth from "../../src/lib/basicAuth";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
  Grid, Stack, TextField, Typography, IconButton, Chip, MenuItem,
  Card, CardContent, CardMedia
} from "@mui/material";
import { FiEdit2, FiTrash2, FiPlus, FiArrowUp, FiArrowDown, FiImage } from "react-icons/fi";
import { AdminNav } from "../../src/components/admin/AdminNav";
import Link from "next/link";
import { CardActionArea } from "@mui/material";

const PlusIcon: any = FiPlus;
const EditIcon: any = FiEdit2;
const TrashIcon: any = FiTrash2;
const ArrowUpIcon: any = FiArrowUp;
const ArrowDownIcon: any = FiArrowDown;
const ImageIcon: any = FiImage;

type Project = {
  id: string;
  title: string;
  shortDescription?: string;
  description?: string;
  address?: string;
  customer?: string;
  type: "Bygginredning" | "Entreprenør" | "Renovering" | "Serviceoppdrag";
  slug: string;
  cover?: string;
  middlePic?: string;
  afterPicDiscription?: string;
  pictures: string[];
  order: number;
  published: boolean;
  createdAt?: string;
  updatedAt?: string;
};

const CATS = ["Bygginredning","Entreprenør","Renovering","Serviceoppdrag"] as const;

export default function AdminProjects() {
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("Alle");

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState<Partial<Project>>({
    type: "Bygginredning",
    pictures: [],
    published: true
  });

  const fileCoverRef = useRef<HTMLInputElement>(null);
  const filesGalleryRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(
    () => items.filter(p => (filter === "Alle" ? true : p.type === filter)),
    [items, filter]
  );

  async function fetchItems() {
    setLoading(true);
    const res = await fetch("/api/projects");
    const data = await res.json();
    setItems(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchItems();
  }, []);

  function openCreate() {
    setEditing(null);
    setForm({
      title: "",
      type: "Bygginredning",
      slug: "",
      pictures: [],
      published: true,
      shortDescription: ""
    });
    setOpen(true);
  }

  function openEdit(p: Project) {
    setEditing(p);
    setForm(p);
    setOpen(true);
  }

  async function uploadOne(file: File): Promise<string> {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload-image", { method: "POST", body: fd });
    const data = await res.json();
    return data.path; // your endpoint returns { path }
  }

  async function uploadMany(files: FileList): Promise<string[]> {
    const result: string[] = [];

    // Reuse the single-file upload API for each file
    for (const file of Array.from(files)) {
      const fd = new FormData();
      fd.append("file", file);

      const res = await fetch("/api/upload-image", {
        method: "POST",
        body: fd,
      });

      const data = await res.json();

      if (typeof data.path === "string") {
        result.push(data.path);
      } else {
        console.warn("Unexpected upload-image response:", data);
      }
    }

    return result;
  }

  async function handleSave() {
    const body = {
      ...form,
      // ensure these are always strings (never undefined)
      description: form.description ?? "",
      afterPicDiscription: form.afterPicDiscription ?? "",
      pictures: form.pictures ?? []
    };
    
    if (!body.title || !body.type) return alert("Title and Type are required.");

    if (editing) {
      await fetch(`/api/projects?id=${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } else {
      await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    }
    setOpen(false);
    await fetchItems();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this project?")) return;
    await fetch(`/api/projects?id=${id}`, { method: "DELETE" });
    await fetchItems();
  }

  async function move(id: string, dir: "up" | "down") {
    // Decide which list we're moving within:
    // all projects, of just the current category
    const list =
    filter === "Alle"
    ? items
    : items.filter((p) => p.type === filter);

    const idx = list.findIndex((p) => p.id === id);
    if (idx === -1) return;

    const swapIdx = dir === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= list.length) return;

    // Both a and b come from the SAME list
    const a = list[idx];
    const b = list[swapIdx];

    const payload = [
      { id: a.id, order: b.order },
      { id: b.id, order: a.order },
    ];

    await fetch("/api/projects", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    await fetchItems();
  }

  return (
    <Box p={3}>
      <AdminNav />
      
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h5" fontWeight="bold">
          Manage Projects
        </Typography>
        <Button
          variant="contained"
          startIcon={<PlusIcon />}
          onClick={openCreate}
        >
          New Project
        </Button>
      </Box>

      <Stack direction="row" spacing={1} mb={2}>
        {["Alle", ...CATS].map((c) => (
          <Chip
            key={c}
            label={c}
            color={filter === c ? "primary" : "default"}
            onClick={() => setFilter(c)}
          />
        ))}
      </Stack>

      {loading ? (
        <Typography>Loading…</Typography>
      ) : (
        <Grid container spacing={2}>
          {filtered.map((p) => (
            <Grid item xs={12} md={6} lg={4} key={p.id}>
              <Card>
                <Link href={`/admin/projects/${p.id}`}>
                <a
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  display: "block",
              }}
              >
                <CardActionArea>
                {p.cover ? (
                  <CardMedia
                    component="img"
                    height="140"
                    image={p.cover}
                    alt={p.title}
                  />
                ) : (
                  <Box
                    height={140}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    bgcolor="#f3f4f6"
                  >
                    <ImageIcon />
                  </Box>
                )}
                <CardContent>
                  <Typography fontWeight="bold">{p.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {p.type}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Click to edit gallery
                  </Typography>
                  </CardContent>
                  </CardActionArea>
                  </a>
                  </Link>

                  {/* Action buttons stay outside CardActionArea so they don't trigger navigation */}
                  <CardContent sx={{ pt: 0 }}>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <IconButton onClick={() => move(p.id, "up")}>
                      <ArrowUpIcon />
                    </IconButton>
                    <IconButton onClick={() => move(p.id, "down")}>
                      <ArrowDownIcon />
                    </IconButton>
                    <IconButton onClick={() => openEdit(p)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(p.id)} color="error">
                      <TrashIcon />
                    </IconButton>
                    </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>{editing ? "Edit Project" : "New Project"}</DialogTitle>
        <DialogContent>

          <Stack spacing={2} mt={1}>
            {/* Title */}
            <Stack spacing={0.5}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Title
            </Typography>
            <TextField
              value={form.title ?? ""}
              onChange={(e) =>
                setForm((f) => ({ ...f, title: e.target.value }))
              }
              placeholder="f.eks.: Stortorvet 7 | Oslo"
            />
            </Stack>

            {/* Slug */}
            <Stack spacing={0.5}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Slug
              </Typography>
            <TextField
              value={form.slug ?? ""}
              onChange={(e) =>
                setForm((f) => ({ ...f, slug: e.target.value }))
              }
              placeholder="URL-navn for prosjektet (eks. stortorvet-7-oslo)"
            />
            </Stack>

            {/* Category */}
            <Stack spacing={0.5}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Category
              </Typography>
            <TextField
              select
              value={form.type ?? "Bygginredning"}
              onChange={(e) =>
                setForm((f) => ({ ...f, type: e.target.value as any }))
              }
            >
              {CATS.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </TextField>
            </Stack>

            {/* Short Description */}
            <Stack spacing={0.5}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Short description
              </Typography>
            <TextField
              value={form.shortDescription ?? ""}
              onChange={(e) =>
                setForm((f) => ({ ...f, shortDescription: e.target.value }))
              }
              placeholder="Kort tekst som vises på prosjektkortet"
            />
            </Stack>

            {/* Address */}
            <Stack spacing={0.5}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Address
              </Typography>
            <TextField
              value={form.address ?? ""}
              onChange={(e) =>
                setForm((f) => ({ ...f, address: e.target.value }))
              }
              placeholder="Write the project address here"
            />
            </Stack>

            {/* Customer */}
            <Stack spacing={0.5}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Customer
              </Typography>
            <TextField
              value={form.customer ?? ""}
              onChange={(e) =>
                setForm((f) => ({ ...f, customer: e.target.value }))
              }
              placeholder="Who is our client? Write here"
            />
            </Stack>
            
            <Stack direction="row" spacing={2} alignItems="center">
              <Button onClick={() => fileCoverRef.current?.click()}>
                Upload Cover image (main thumbnail)
              </Button>
              <Typography variant="body2" color="text.secondary">
                {form.cover || "No file"}
              </Typography>
              <input
                ref={fileCoverRef}
                type="file"
                hidden
                onChange={async (e) => {
                  if (e.target.files?.[0]) {
                    const p = await uploadOne(e.target.files[0]);
                    setForm((f) => ({ ...f, cover: p }));
                  }
                }}
              />
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Button onClick={() => filesGalleryRef.current?.click()}>
                Upload Gallery
              </Button>
              <Typography variant="body2" color="text.secondary">
                {(form.pictures?.length || 0) + " images"}
              </Typography>
              <input
                ref={filesGalleryRef}
                type="file"
                hidden
                multiple
                onChange={async (e) => {
                  const fileList = e.target.files;
                  if (!fileList || !fileList.length) return;
                  
                  const paths = await uploadMany(fileList);
                  if (!paths || paths.length === 0) return;


                    setForm((f) => ({
                      ...f,
                      pictures: [...(f.pictures ?? []), ...paths],
                    }));

                    // allow selectin the same files again later
                    e.target.value = "";
                }}
              />
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req, res } = ctx;
  const ok = basicAuth(req, res);
  if (!ok) return { props: {} };
  return { props: {} };
};