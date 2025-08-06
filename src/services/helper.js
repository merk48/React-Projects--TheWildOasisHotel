import { supabaseUrl } from "./supabase";

export function getFilenameFromUrl(url) {
  const parts = new URL(url).pathname.split("/");
  return parts.pop() || "";
}

export function createFilePath(bucketStorageName, file) {
  const fileName = `${Math.random()}-${file.name}`.replaceAll("/", "");

  const filePath = `${supabaseUrl}/storage/v1/object/public/${bucketStorageName}/${fileName}`;

  return { fileName, filePath };
}
