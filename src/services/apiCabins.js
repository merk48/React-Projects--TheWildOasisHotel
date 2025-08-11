import {
  cabinsName,
  cabinsBucketStorage,
  cabinsTableName,
} from "../utils/queryConstants";
import {
  createFilename,
  deleteFile,
  getFilenameFromUrl,
  uploadFileAndGetPublicUrl,
} from "./helper";
import supabase from "./supabase";

export async function readCabins() {
  const { data, error } = await supabase.from(cabinsTableName).select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createCabin(newCabin, isCopy = false) {
  let imageUrl = null;
  let uploadedFileName = null;

  try {
    // If newCabin.image is a file (object), upload it first
    if (!isCopy && typeof newCabin.image !== "string") {
      const fileName = createFilename(cabinsName, newCabin.image.name);
      const publicUrl = await uploadFileAndGetPublicUrl(
        cabinsBucketStorage,
        fileName,
        newCabin.image
      );
      imageUrl = publicUrl;
      uploadedFileName = fileName;
    } else {
      // copy or existing url
      imageUrl = newCabin.image;
    }

    // 1) Insert DB row with the imageUrl
    const { data, error } = await supabase
      .from(cabinsTableName)
      .insert([{ ...newCabin, image: imageUrl }])
      .select()
      .single();

    if (error) {
      // cleanup uploaded file if insert failed
      if (uploadedFileName) {
        await deleteFile(cabinsBucketStorage, uploadedFileName);
      }
      console.error(error);
      throw new Error("Cabin could not be created");
    }

    return data;
  } catch (err) {
    // ensure any uploaded artifact gets cleaned up (best-effort)
    if (uploadedFileName) {
      await deleteFile(cabinsBucketStorage, uploadedFileName);
    }
    throw err;
  }
}

export async function updateCabin(updatedCabin, id) {
  const isNewImage = typeof updatedCabin.image === "object";
  let newImageUrl = updatedCabin.image; // default to existing string
  let uploadedFileName = null;
  let oldFileName = null;

  try {
    // fetch current cabin to know the old image
    const { data: existing, error: fetchError } = await supabase
      .from(cabinsTableName)
      .select("image")
      .eq("id", id)
      .single();
    if (fetchError) {
      console.error(fetchError);
      throw new Error("Could not fetch existing cabin");
    }
    const oldImageUrl = existing?.image;
    oldFileName = getFilenameFromUrl(oldImageUrl);

    // If new file uploaded, upload and get public url first
    if (isNewImage) {
      const fileName = createFilename(cabinsName, updatedCabin.image.name);
      const publicUrl = await uploadFileAndGetPublicUrl(
        cabinsBucketStorage,
        fileName,
        updatedCabin.image
      );
      newImageUrl = publicUrl;
      uploadedFileName = fileName;
    }

    // Update DB with the new image url (or same url if not changed)
    const { data, error } = await supabase
      .from(cabinsTableName)
      .update({ ...updatedCabin, image: newImageUrl })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      // on DB error, cleanup uploaded file
      if (uploadedFileName) {
        await deleteFile(cabinsBucketStorage, uploadedFileName);
      }
      console.error(error);
      throw new Error("Cabin could not be updated");
    }

    // success: if we uploaded a new file and there was an old one - delete the old file
    if (uploadedFileName && oldFileName) {
      await deleteFile(cabinsBucketStorage, oldFileName);
    }

    return data;
  } catch (err) {
    // cleanup any uploaded artifact on error
    if (uploadedFileName) {
      await deleteFile(cabinsBucketStorage, uploadedFileName);
    }
    throw err;
  }
}

export async function deleteCabin(id) {
  const { error } = await supabase.from(cabinsTableName).delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error(`Cabin with id ${id} could not be deleted`);
  }
}
