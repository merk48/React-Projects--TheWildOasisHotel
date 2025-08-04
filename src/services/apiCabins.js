import supabase from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("Cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createCabin(newCabinObj) {
  const { data, error } = await supabase
    .from("Cabins")
    .insert([newCabinObj])
    .select();

  if (error) {
    console.error(error);
    throw new Error(`Cabin could not be created`);
  }

  return data;
}

export async function updateCabin(newCabinObj) {
  const { data, error } = await supabase
    .from("Cabins")
    .update([newCabinObj])
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
