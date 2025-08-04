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
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create cabin
  const { data, error } = await supabase
    .from("Cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();

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
async function uploadFile(storageBucket, filePath, file) {
  const { data, error } = await supabase.storage
    .from(storageBucket)
    .upload(filePath, file);

  return { data, error };
}

export async function updateCabin(newCabin) {
  const { data, error } = await supabase
    .from("Cabins")
    .update([newCabin])
    .select();

  if (error) {
    console.error(error);
    throw new Error(`Cabin could not be created`);
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
