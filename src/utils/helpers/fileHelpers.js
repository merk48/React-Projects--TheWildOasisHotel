import supabase from "../../services/supabase";

/**
 * Optional debug helper: get metadata for a stored object
 */
export async function getFileMetadata(bucket, fileName) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .getMetadata(fileName);
  return { data, error };
}

/**
 * createFilename(bucketName, originalName)
 * returns a safe, unique filename (no slashes)
 */
export function createFilename(bucketName, originalName) {
  const safe = `${bucketName}-${Date.now()}-${originalName}`.replaceAll(
    "/",
    ""
  );
  return safe;
}

/**
 * Upload file and return public URL
 */
export async function uploadFileAndGetPublicUrl(bucket, fileName, file) {
  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(fileName, file, { contentType: file.type, upsert: true });

  if (uploadError) {
    console.error("uploadFile error:", uploadError);
    throw uploadError;
  }

  const { data: publicUrlData, error: publicUrlError } = supabase.storage
    .from(bucket)
    .getPublicUrl(fileName);

  if (publicUrlError) {
    console.error("getPublicUrl error:", publicUrlError);
    throw publicUrlError;
  }

  return publicUrlData.publicUrl;
}

/**
 * Extract filename from a public url previously created by getPublicUrl
 */
export function getFilenameFromUrl(url) {
  if (!url) return null;
  try {
    const parts = url.split("/");
    return parts[parts.length - 1];
  } catch (e) {
    return null;
  }
}

/**
 * Delete a file from storage by filename
 */
export async function deleteFile(bucket, fileName) {
  if (!fileName) return;
  const { error } = await supabase.storage.from(bucket).remove([fileName]);
  if (error) {
    console.warn("deleteFile error", error);
    // don't throw — best-effort cleanup
  }
}
