// pages/admin/employees.tsx
import { GetServerSideProps } from "next";
import basicAuth from "../../src/lib/basicAuth"; // ✅ uses your existing Basic Auth
import React, { useEffect, useMemo, useState, useRef } from "react";
import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
  Grid, Stack, TextField, Typography, IconButton, Card, CardContent, Avatar, Chip
} from "@mui/material";
import { FiEdit2, FiTrash2, FiUserPlus, FiArrowUp, FiArrowDown } from "react-icons/fi";
const FiEdit2Icon = FiEdit2 as React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
const FiTrash2Icon = FiTrash2 as React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
const FiUserPlusIcon = FiUserPlus as React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
const FiArrowUpIcon = FiArrowUp as React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
const FiArrowDownIcon = FiArrowDown as React.ComponentType<{ size?: number; style?: React.CSSProperties }>;


type Employee = {
  id: number;
  name: string;
  title: string;
  phone?: string;
  email?: string;
  image?: string; // e.g. /assets/team/john.jpg
  order?: number;
};

export default function ManageEmployees() {
  const [items, setItems] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Employee | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);

  // Default empty form (memoized so it doesn’t recreate on every render)
  const emptyForm: Omit<Employee, "id"> = useMemo(
    () => ({ name: "", title: "", phone: "", email: "", image: "" }),
    []
  );
  const [form, setForm] = useState<Omit<Employee, "id">>(emptyForm);

  // Load employees from the API
  async function load() {
    setLoading(true);
    const res = await fetch("/api/employees");
    const data = await res.json();
    setItems(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  // Open dialog to create new
  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setOpen(true);
  }

  // Open dialog to edit existing
  function openEdit(emp: Employee) {
    setEditing(emp);
    setForm({
      name: emp.name,
      title: emp.title,
      phone: emp.phone || "",
      email: emp.email || "",
      image: emp.image || "",
    });
    setOpen(true);
  }

  // Save (handles both create and update)
  async function save() {
    // Minimal client-side validation
    if (!form.name.trim() || !form.title.trim()) {
      alert("Please fill in both Name and Title.");
      return;
    }

    const method = editing ? "PUT" : "POST";
    const url = editing ? `/api/employees?id=${editing.id}` : "/api/employees";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing ? { ...form, id: editing.id } : form),
    });

    if (!res.ok) {
      const msg = await res.text();
      alert("Failed to save: " + msg);
      return;
    }

    setOpen(false);
    setEditing(null);
    await load(); // Refresh list
  }

  // Delete
  async function remove(id: number) {
    const ok = confirm("Delete this employee?");
    if (!ok) return;

    const res = await fetch(`/api/employees?id=${id}`, { method: "DELETE" });
    if (!res.ok) {
      const msg = await res.text();
      alert("Failed to delete: " + msg);
      return;
    }
    await load();
  }

  async function handleUploadChange(ev: React.ChangeEvent<HTMLInputElement>) {
    const file = ev.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append("file", file);
    try {
        setUploading(true);
        const res =await fetch("/api/upload-image", {
            method: "POST",
            body: fd,
        });
        setUploading(false);
        if (!res.ok) {
            const msg = await res.text();
            alert("Upload failed: " + msg);
            return;
        }
        const data = await res.json();
        // Auto-fill the image path returned by the server
        setForm((prev) => ({ ...prev, image: data.path }));
    } catch (e) {
        setUploading(false);
        alert("Upload failed.");
    } finally {
        // reset file input so the same file can be re-selected if needed
        if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function updateEmployee(e: Employee) {
    await fetch(`/api/employees?id=${e.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(e),
    });
  }

  async function moveUp(id: number) {
    const list = [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    const idx = list.findIndex(e => e.id === id);
    if (idx <= 0) return; // already at top or not found
    const current = list[idx];
    const prev = list[idx - 1];
    const a = current.order ?? idx;
    const b = prev.order ?? (idx - 1);
    // swap
    current.order = b;
    prev.order = a;
    await updateEmployee(prev);
    await updateEmployee(current);
    await load();
  }

  async function moveDown(id: number) {
    const list = [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    const idx = list.findIndex(e => e.id === id);
    if (idx === -1 || idx >= list.length -1) return; // bottom or not found
    const current = list[idx];
    const next = list[idx + 1];
    const a = current.order ?? idx;
    const b = next.order ?? (idx + 1);
    //swap
    current.order = b;
    next.order = a;
    await updateEmployee(next);
    await updateEmployee(current);
    await load();
  }

  const sorted = [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  return (
    <Box minHeight="100vh" bgcolor="#f3f4f6" py={6} px={2}>
      <Box maxWidth="lg" mx="auto">
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4" fontWeight="bold">Manage Employees</Typography>
          <Button variant="contained" startIcon={<FiUserPlusIcon size={18} />} onClick={openCreate}>
            Add Employee
          </Button>
        </Stack>

        {loading ? (
          <Typography>Loading…</Typography>
        ) : (
          <Grid container spacing={2}>
            {sorted.map((e) => (
              <Grid item key={e.id} xs={12} sm={6} md={4} lg={3}>
                <Card>
                  <CardContent>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar
                        src={e.image || undefined}
                        alt={e.name}
                        sx={{ width: 56, height: 56 }}
                      />
                      <Box>
                        <Typography fontWeight="bold">{e.name}</Typography>
                        {e.title ? (
                            <Chip
                            label={e.title}
                            size="small"
                            variant="outlined"
                            sx={{ mt: 0.5 }}
                            />
                        ) : null}
                        {e.phone ? <Typography variant="body2">{e.phone}</Typography> : null}
                        {e.email ? <Typography variant="body2">{e.email}</Typography> : null}
                      </Box>
                      <Box sx={{ ml: "auto", display: "flex", gap: 0.5 }}>
                        <IconButton onClick={() => moveUp(e.id)} aria-label="move up" title="Move up">
                            <FiArrowUpIcon size={18} />
                        </IconButton>
                        <IconButton onClick={() => moveDown(e.id)} aria-label="move down" title="Move down">
                            <FiArrowDownIcon size={18} />
                        </IconButton>
                        <IconButton onClick={() => openEdit(e)} aria-label="edit" title="Edit">
                          <FiEdit2Icon size={18} />
                        </IconButton>
                        <IconButton onClick={() => remove(e.id)} aria-label="delete" color="error" title="Delete">
                          <FiTrash2Icon size={18} />
                        </IconButton>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Add/Edit dialog */}
        <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
          <DialogTitle>{editing ? "Edit Employee" : "Add Employee"}</DialogTitle>
          <DialogContent>
            <Stack spacing={2} mt={1}>
              <TextField
                label="Name *"
                placeholder="Ivan Ivanov"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <TextField
                label="Title *"
                placeholder="Prosjektleder eller Avdelingsleder"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
              <TextField
                label="Phone"
                placeholder="+47 909 ... ..."
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              <TextField
                label="Email"
                placeholder="ivan@wman.no"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <TextField
                label="Image path"
                placeholder="/assets/team_png/ivan.png"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
              />

              <Box display="flex" alignItems="center" gap={1}>
                <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleUploadChange}
                />
                <Button
                variant="outlined"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                >
                    {uploading ? "Uploading..." : "Upload image"}
                </Button>

                {/* Live preview if we have a path */}
                <Avatar
                src={form.image || undefined}
                alt={form.name || "preview"}
                sx={{ width: 40, height: 40 }}
                />
              </Box>
              <Typography variant="caption" color="text.secondary">
                Tip: You can paste a path (e.t. /assets/team_png/name.png) or click <strong>Upload image</strong>.
                Uploaded files are saved to <code>/public/assets/team/</code>
              </Typography>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={save}>Save</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}

// Protect the page with the same Basic Auth you use in other admin pages
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;
  const authorized = basicAuth(req, res);
  if (!authorized) return { props: {} };
  return { props: {} };
};
