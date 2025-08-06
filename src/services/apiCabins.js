import {
  cabinsBucketStorage,
  cabinsTableName,
} from "../features/cabins/constants";
import { createFilePath, getFilenameFromUrl } from "./helper";
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
  let imagePath;
  let imageName;

  if (typeof newCabin.image === "string") {
    // It's a copy: use existing URL
    imagePath = newCabin.image;
  } else {
    // New file uploaded
    const fileData = createFilePath(cabinsBucketStorage, newCabin.image);
    imagePath = fileData.filePath;
    imageName = fileData.fileName;
  }

  // 1. Create cabin
  const { data, error } = await supabase
    .from(cabinsTableName)
    .insert([{ ...newCabin, image: imagePath }])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error(`Cabin could not be created`);
  }

  // 2. Upload image only if it's a new file (not a copy)
  if (!isCopy && typeof newCabin.image !== "string") {
    const { error: storageError } = await uploadFile(
      cabinsBucketStorage,
      imageName,
      newCabin.image
    );

    if (storageError) {
      // 3. Delete the cabin
      await deleteCabin(data.id);

      console.error(storageError);
      throw new Error(
        `Cabin image could not be uploaded and the cabin was not created`
      );
    }
  }
  return data;
}

export async function updateCabin(updatedCabin, id) {
  const isNewImage = typeof updatedCabin.image === "object";

  let imagePath;

  if (isNewImage) {
    ({ filePath: imagePath } = createFilePath(
      cabinsBucketStorage,
      updatedCabin.image
    ));
  } else imagePath = updatedCabin.image;

  // 1. Update the cabin
  const { data, error } = await supabase
    .from(cabinsTableName)
    .update({ ...updatedCabin, image: imagePath })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error(`Cabin could not be updated`);
  }

  // 2. If a new image file was uploaded, upload it to storage
  if (isNewImage) {
    const imageName = imagePath.split("/").at(-1);

    const { error: storageError } = await uploadFile(
      cabinsBucketStorage,
      imageName,
      updatedCabin.image
    );

    if (storageError) {
      console.error(storageError);
      throw new Error(
        `Cabin image could not be uploaded, but the cabin was updated`
      );
    }

    // then delete old one:
    const oldName = getFilenameFromUrl(updatedCabin.image);
    await supabase.storage.from(cabinsBucketStorage).remove([oldName]);
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("Cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error(`Cabin with id ${id} could not be deleted`);
  }
}

async function uploadFile(bucketStorageName, fileName, file) {
  const { data, error } = await supabase.storage
    .from(bucketStorageName)
    .upload(fileName, file);

  return { data, error };
}
