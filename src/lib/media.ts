import { mkdir, writeFile, unlink } from "fs/promises";
import { join } from "path";
import { randomUUID } from "crypto";

export const UPLOAD_DIR = join(process.cwd(), "public", "uploads");

export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

export const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
]);

export async function ensureUploadDir() {
  await mkdir(UPLOAD_DIR, { recursive: true });
}

export function sanitizeFilename(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 120);
}

export function buildStoredFilename(originalName: string) {
  const ext = originalName.includes(".")
    ? originalName.slice(originalName.lastIndexOf("."))
    : "";
  return `${randomUUID()}${ext.toLowerCase()}`;
}

export async function saveUploadFile(filename: string, buffer: Buffer) {
  await ensureUploadDir();
  const filepath = join(UPLOAD_DIR, filename);
  await writeFile(filepath, buffer);
  return filepath;
}

export async function deleteUploadFile(filename: string) {
  try {
    await unlink(join(UPLOAD_DIR, filename));
  } catch {
    // File may already be removed
  }
}

export function publicUploadUrl(filename: string) {
  return `/uploads/${filename}`;
}
