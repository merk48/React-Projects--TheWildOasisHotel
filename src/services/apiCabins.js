import { cabinsBucketStorage } from "../features/cabins/constants";
import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("Cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createCabin(newCabin) {
  const { filePath: imagePath, fileName: imageName } = createFilePath(
    cabinsBucketStorage,
    newCabin.image
  );

  // 1. Create cabin
  const { data, error } = await supabase
    .from("Cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error(`Cabin could not be created`);
  }

  // 2. Upload image
  const { error: storageError } = await uploadFile(
    "cabin-images",
    imageName,
    newCabin.image
  );

  if (storageError) {
    // 3. Delete the cabin
    await deleteCabin(data.id);

    console.error(error);
    throw new Error(
      `Cabin image could not be uploaded and the cabin was not created`
    );
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
    .from("Cabins")
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
      "cabin-images",
      imageName,
      updatedCabin.image
    );

    if (storageError) {
      console.error(storageError);
      throw new Error(
        `Cabin image could not be uploaded, but the cabin was updated`
      );
    }
  }

  return data;
}

function createFilePath(cabinsBucketStorage, file) {
  const fileName = `${Math.random()}-${file.name}`.replaceAll("/", "");

  const filePath = `${supabaseUrl}/storage/v1/object/public/${cabinsBucketStorage}/${fileName}`;

  return { fileName, filePath };
}

async function uploadFile(cabinsBucketStorage, fileName, file) {
  const { data, error } = await supabase.storage
    .from(cabinsBucketStorage)
    .upload(fileName, file);

  return { data, error };
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("Cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error(`Cabin with id ${id} could not be deleted`);
  }
}
