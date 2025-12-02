// pages/admin/projects/[id].tsx
import { GetServerSideProps } from "next";
import basicAuth from "../../../src/lib/basicAuth";
import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Stack,
} from "@mui/material";
import { useRouter } from "next/router";
import { AdminNav } from "../../../src/components/admin/AdminNav";
import {
    FiTrash2,
    FiArrowUp,
    FiArrowDown,
    FiStar,
    FiUpload,
} from "react-icons/fi";

const TrashIcon: any = FiTrash2;
const ArrowUpIcon: any = FiArrowUp;
const ArrowDownIcon: any = FiArrowDown;
const StarIcon: any = FiStar;
const UploadIcon: any = FiUpload;

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

type Props = {
  id: string;
};

export default function AdminProjectDashboard({ id }: Props) {
  const router = useRouter();

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const filesGalleryRef = useRef<HTMLInputElement>(null);

  // ---- helpers to talk to existing APIs ----
  async function uploadMany(files: FileList): Promise<string[]> {
    const result: string[] = [];

    // We reuse the single-file upload API for each file
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
            console.warn("Unexpected upload-image response", data);
        }
    }

    return result;
  }

  async function saveProject(updated: Project) {
    setSaving(true);

    const body = {
        ...updated,
        description: updated.description ?? "",
        afterPicDiscription: updated.afterPicDiscription ?? "",
        pictures: updated.pictures ?? [],
    };

    await fetch(`/api/projects?id=${updated.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    setSaving(false);
  }

  // ---- gallery operations in memory ----
  function handleDeleteImage(img: string) {
    if (!project) return;
    if (!confirm("Remove this image from the gallery?")) return;
    setProject({
        ...project,
        pictures: project.pictures.filter((p) => p !== img),
    });
  }

  function handleMoveImage(idx: number, dir: "up" | "down") {
    if (!project) return;
    const pics = [...project.pictures]; //copy
    const swapIdx = dir === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= pics.length) return;

    const tmp = pics[idx];
    pics[idx] = pics[swapIdx];
    pics[swapIdx] = tmp;

    setProject({ ...project, pictures: pics });
  }

  function handleSetCover(img: string) {
    if (!project) return;
    setProject({ ...project, cover: img });
  }

  async function handleUpload(files: FileList | null) {
    if (!project || !files || !files.length) return;
    const paths = await uploadMany(files);
    if (!paths || paths.length === 0) return;
    
    setProject({
        ...project,
        pictures: [...(project.pictures ?? []), ...paths],
    });
  }

  async function handleSaveClick() {
    if (!project) return;
    await saveProject(project);
    alert("Gallery saved.");
  }

  // Load project from API
  useEffect(() => {
    async function load() {
      const res = await fetch("/api/projects");
      const all = await res.json();
      const p = all.find((proj: Project) => proj.id === id) || null;
      setProject(p);
      setLoading(false);
    }

    if (id) load();
  }, [id]);

  return (
    <Box p={3}>
      <AdminNav />

      <Button
        onClick={() => router.push("/admin/projects")}
        sx={{ mb: 2 }}
        variant="outlined"
      >
        ← Back to projects
      </Button>

      {loading && <Typography>Loading project…</Typography>}

      {!loading && !project && (
        <Typography color="error">Project not found.</Typography>
      )}

      {project && (
        <>
          {/* Header */}
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {project.title}
          </Typography>

          <Typography variant="body2" color="text.secondary" gutterBottom>
            Category: {project.type}
          </Typography>

          {project.shortDescription && (
            <Typography variant="body1" gutterBottom>
              {project.shortDescription}
            </Typography>
          )}

          {/* Cover image */}
          <Box mt={3} mb={4}>
            <Typography variant="h6" gutterBottom>
              Cover Image
            </Typography>

            {project.cover ? (
              <Card sx={{ maxWidth: 400 }}>
                <CardMedia
                  component="img"
                  height="240"
                  image={project.cover}
                  alt="Cover image"
                  sx={{ objectFit: "cover" }}
                />
              </Card>
            ) : (
              <Typography color="text.secondary">
                No cover uploaded. You can set any gallery image as cover.
                </Typography>
            )}
          </Box>

          {/* Upload new images */}
          <Box mb={3}>
            <Stack direction="row" spacing={2} alignItems="center">
                <Button
                variant="contained"
                startIcon={<UploadIcon />}
                onClick={() => filesGalleryRef.current?.click()}
                >
                    Add images to gallery
                </Button>
                <Typography variant="body2" color="text.secondary">
                    {project.pictures?.length || 0} images in this gallery
                </Typography>
            </Stack>
            <input
            ref={filesGalleryRef}
            type="file"
            hidden
            multiple
            onChange={async (e) => {
                await handleUpload(e.target.files);
                // allow selecting the same file again later
                e.target.value = "";
            }}
            />
          </Box>

{/* Gallery images */}
<Box mt={2}>
  <Typography variant="h6" gutterBottom>
    Gallery Images
  </Typography>

  {project.pictures.length === 0 && (
    <Typography color="text.secondary">
      No images uploaded.
    </Typography>
  )}

  <Grid container spacing={2}>
    {project.pictures.map((img, idx) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={img + idx}>
        <Card>
          <CardMedia
            component="img"
            height="160"
            image={img}
            alt={`Image ${idx + 1}`}
            sx={{ objectFit: "cover" }}
          />
          <CardContent>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack direction="row" spacing={1}>
                <IconButton
                  size="small"
                  onClick={() => handleMoveImage(idx, "up")}
                >
                  <ArrowUpIcon />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleMoveImage(idx, "down")}
                >
                  <ArrowDownIcon />
                </IconButton>
              </Stack>

              <IconButton
                size="small"
                color={project.cover === img ? "primary" : "default"}
                onClick={() => handleSetCover(img)}
              >
                <StarIcon />
              </IconButton>

              <IconButton
                size="small"
                color="error"
                onClick={() => handleDeleteImage(img)}
              >
                <TrashIcon />
              </IconButton>
            </Stack>

            {project.cover === img && (
              <Typography
                variant="caption"
                color="primary"
                sx={{ mt: 1, display: "block" }}
              >
                Cover image
              </Typography>
            )}
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
</Box>

        <Stack
        direction="row"
        justifyContent="flex-end"
        mt={4}
        spacing={2}
        >
            <Button onClick={() => router.push("/admin/projects")}>
                Cancel
            </Button>
            <Button
            variant="contained"
            onClick={handleSaveClick}
            disabled={saving}
            >
                {saving ? "Saving..." : "Save gallery"}
            </Button>
        </Stack>
        </>
      )}
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const { req, res, query } = ctx;

  const ok = basicAuth(req, res);
  if (!ok)
    return {
      props: { id: "" },
    };

  const idParam = Array.isArray(query.id) ? query.id[0] : query.id || "";

  return {
    props: {
      id: idParam,
    },
  };
};