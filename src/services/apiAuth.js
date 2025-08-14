import supabase from "./supabase";
import {
  avatarName,
  avatarBucketStorage,
} from "../utils/constants/queryConstants";
import { uploadFileAndGetPublicUrl } from "../utils/helpers/fileHelpers";

export async function signUp({ email, password, fullName, avatar }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { fullName, avatar },
    },
  });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  console.log(data);
  return data;
}

export async function logout() {
  let { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

export async function readLoggedInUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data?.user;
}
export async function updateCurrentUser({ password, fullName, avatar }) {
  // Build update payload for auth.updateUser
  const updatePayload = {};
  if (password) updatePayload.password = password;
  if (fullName)
    updatePayload.data = { ...(updatePayload.data || {}), fullName };

  // 1) Update password or metadata if present
  if (Object.keys(updatePayload).length > 0) {
    const { data: updateResult, error: updateError } =
      await supabase.auth.updateUser(updatePayload);
    if (updateError) {
      console.error("auth.updateUser error:", updateError);
      throw updateError;
    }
    // continue — we don't return early because avatar might still need upload
  }

  // 2) If no avatar provided, return latest user
  if (!avatar) {
    const { data: currentUserResult, error: userError } =
      await supabase.auth.getUser();
    if (userError) {
      console.error("getUser error:", userError);
      throw userError;
    }
    return currentUserResult?.user ?? null;
  }

  // 3) Avatar upload
  const { data: currentUserResult, error: userError } =
    await supabase.auth.getUser();
  if (userError) {
    console.error("getUser error:", userError);
    throw userError;
  }
  const user = currentUserResult?.user;
  if (!user) throw new Error("No authenticated user found");

  const userId = user.id;

  const fileName = `${avatarName}-${userId}-${Date.now()}`.replaceAll("/", ""); // deterministic unique name

  // upload + get public url
  const publicUrl = await uploadFileAndGetPublicUrl(
    avatarBucketStorage,
    fileName,
    avatar
  );

  // 4) save the public url into user metadata
  const { data: dataWithAvatar, error: avatarError } =
    await supabase.auth.updateUser({
      data: { avatar: publicUrl },
    });

  if (avatarError) {
    console.error("updateUser set avatar error:", avatarError);
    throw avatarError;
  }

  return dataWithAvatar?.user ?? null;
}
