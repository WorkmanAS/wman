// pages/admin/employees.tsx
import { GetServerSideProps } from "next";
import basicAuth from "../../src/lib/basicAuth"; // ✅ uses your existing Basic Auth
import React, { useEffect, useMemo, useState, useRef } from "react";
import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Tooltip,
  Grid, Stack, TextField, Typography, IconButton, Card, CardContent, Avatar, Chip
} from "@mui/material";
import { FiEdit2, FiTrash2, FiUserPlus, FiArrowUp, FiArrowDown } from "react-icons/fi";
import { AdminNav } from "../../src/components/admin/AdminNav";

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
  const [movingId, setMovingId] = useState<number | null>(null);

  const sortByOrder = (arr: Employee[]): Employee[] =>
  [...arr].sort((a, b) => {
    const ao = a.order ?? 1e9;
    const bo = b.order ?? 1e9;
    if (ao !== bo) return ao - bo;
    return (a.id ?? 0) - (b.id ?? 0);
  });

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

async function patchEmployees(body: any) {
  // try PATCH first
  try {
    const res = await fetch("/api/employees", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      body: JSON.stringify(body),
    });
    if (res.ok) return await res.json().catch(() => null);
    // if PATCH not allowed (405/501/etc), fall through to POST retry
    if (![405, 501].includes(res.status)) {
      const text = await res.text();
      throw new Error(`PATCH ${body.action} failed (${res.status}): ${text}`);
    }
  } catch (_ignore) {
    // will retry with POST below
  }

  // retry with POST ?action=...
  const params = new URLSearchParams({ action: String(body.action || "") });
  const res2 = await fetch(`/api/employees?${params.toString()}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    body: JSON.stringify(body),
  });
  if (!res2.ok) {
    const text = await res2.text();
    throw new Error(`POST ${body.action} failed (${res2.status}): ${text}`);
  }
  return await res2.json().catch(() => null);
}


async function reorderToIndex(id: number, toIndex: number) {
  setMovingId(id);
  try {
    // 1) Preferred: server reindex
    await patchEmployees({ action: "reorder", id, toIndex });
  } catch (e1) {
    // 2) Fallback: neighbor move (up/down) on server
    try {
      const list = sortByOrder(items);
      const fromIndex = list.findIndex((e) => e.id === id);
      if (fromIndex < 0) return;

      const dir = toIndex < fromIndex ? "up" : "down";
      await patchEmployees({ action: "move", id, direction: dir });
    } catch (e2) {
      // 3) Last resort: local swap + two PUTs (old behavior)
      try {
        const list = sortByOrder(items);
        const fromIndex = list.findIndex((e) => e.id === id);
        if (fromIndex < 0 || fromIndex === toIndex) return;

        // remove + insert
        const copy = [...list];
        const [item] = copy.splice(fromIndex, 1);
        copy.splice(toIndex, 0, item);

        // reindex sequentially and persist each changed row
        for (let i = 0; i < copy.length; i++) {
          const emp = copy[i];
          if (emp.order !== i) {
            await fetch(`/api/employees?id=${emp.id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ...emp, order: i }),
            });
          }
        }
      } catch (e3) {
        alert("Reorder failed. See console for details.");
        console.error("Fallback PUT sequence also failed:", e3);
      }
    }
  } finally {
    setMovingId(null);
  }
  await load();
}

async function moveUp(id: number) {
  const list = sortByOrder(items);
  const idx = list.findIndex((e) => e.id === id);
  if (idx <= 0) return;
  await reorderToIndex(id, idx - 1);
}

async function moveDown(id: number) {
  const list = sortByOrder(items);
  const idx = list.findIndex((e) => e.id === id);
  if (idx === -1 || idx >= list.length - 1) return;
  await reorderToIndex(id, idx + 1);
}



  const sorted = React.useMemo(() => sortByOrder(items), [items]);
  return (
    <Box minHeight="100vh" bgcolor="#f3f4f6" py={6} px={2}>
      <Box maxWidth="lg" mx="auto">
        <AdminNav />
        
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
                        sx={{ width: 56, height: 56, flexShrink: 0 }}
                      />
                      <Box sx={{ flex: "1 1 auto", minWidth: 0 }}>
                        <Typography fontWeight="bold" noWrap>{e.name}</Typography>
                        {e.title ? (
                          <Tooltip title={e.title}>
                            <Chip
                            label={e.title}
                            size="small"
                            variant="outlined"
                            sx={{
                              mt: 0.5,
                            maxWidth: "100%",
                          ".MuiChip-label": {
                            display: "block",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          },
                        }}
                        />
                            </Tooltip>
                        ) : null}

                        {e.phone ? (
                          <Typography variant="body2" noWrap>
                            {e.phone}
                            </Typography>
                            ) : null}
                        {e.email ? (
                          <Typography variant="body2" noWrap>
                            {e.email}
                            </Typography>
                            ) : null}
                      </Box>

                      <Box sx={{ ml: 1, display: "flex", gap: 0.5, flexShrink: 0 }}>
                        <IconButton
                        onClick={() => moveUp(e.id)}
                        aria-label="move up"
                        title="Move up"
                        disabled={loading || movingId === e.id}
                        >
                            <FiArrowUpIcon size={18} />
                        </IconButton>
                        <IconButton
                        onClick={() => moveDown(e.id)}
                        aria-label="move down"
                        title="Move down"
                        disabled={loading || movingId === e.id}
                        >
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
