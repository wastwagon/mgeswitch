import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import {
  saveUploadFile,
  deleteUploadFile,
  publicUploadUrl,
} from "@/lib/media";

function isS3Configured() {
  return Boolean(
    process.env.S3_BUCKET &&
      process.env.S3_ACCESS_KEY_ID &&
      process.env.S3_SECRET_ACCESS_KEY
  );
}

function getS3Client() {
  return new S3Client({
    region: process.env.S3_REGION ?? "auto",
    endpoint: process.env.S3_ENDPOINT || undefined,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID!,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
    },
    forcePathStyle: process.env.S3_FORCE_PATH_STYLE === "true",
  });
}

function getPublicUrl(key: string) {
  if (process.env.S3_PUBLIC_URL) {
    return `${process.env.S3_PUBLIC_URL.replace(/\/$/, "")}/${key}`;
  }
  const bucket = process.env.S3_BUCKET!;
  const region = process.env.S3_REGION ?? "auto";
  if (process.env.S3_ENDPOINT) {
    return `${process.env.S3_ENDPOINT.replace(/\/$/, "")}/${bucket}/${key}`;
  }
  return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
}

export async function storeMediaFile(
  filename: string,
  buffer: Buffer,
  mimeType: string
): Promise<{ url: string; storage: "local" | "s3" }> {
  if (isS3Configured()) {
    const key = `uploads/${filename}`;
    const client = getS3Client();
    await client.send(
      new PutObjectCommand({
        Bucket: process.env.S3_BUCKET!,
        Key: key,
        Body: buffer,
        ContentType: mimeType,
        ACL: process.env.S3_ACL as "public-read" | undefined,
      })
    );
    return { url: getPublicUrl(key), storage: "s3" };
  }

  await saveUploadFile(filename, buffer);
  return { url: publicUploadUrl(filename), storage: "local" };
}

export async function removeMediaFile(
  filename: string,
  url: string
): Promise<void> {
  if (isS3Configured() && url.startsWith("http")) {
    const key = url.includes("/uploads/")
      ? url.slice(url.indexOf("/uploads/") + 1)
      : `uploads/${filename}`;
    const client = getS3Client();
    await client.send(
      new DeleteObjectCommand({
        Bucket: process.env.S3_BUCKET!,
        Key: key,
      })
    );
    return;
  }

  await deleteUploadFile(filename);
}
