import supabase from "./supabase";
import {
  avatarName,
  avatarBucketStorage,
} from "../utils/constants/queryConstants";
import {
  deleteFile,
  getFilenameFromUrl,
  uploadFileAndGetPublicUrl,
} from "../utils/helpers/fileHelpers";

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
  // Step 1: Build payload for auth.updateUser (password + fullName)
  const updatePayload = {};
  if (password) updatePayload.password = password;
  if (fullName)
    updatePayload.data = { ...(updatePayload.data || {}), fullName };

  if (Object.keys(updatePayload).length > 0) {
    const { error: updateError } = await supabase.auth.updateUser(
      updatePayload
    );
    if (updateError) {
      console.error("auth.updateUser error:", updateError);
      throw updateError;
    }
  }

  // Step 2: Get the current user (for old avatar deletion and metadata updates)
  const { data: currentUserResult, error: userError } =
    await supabase.auth.getUser();
  if (userError) {
    console.error("getUser error:", userError);
    throw userError;
  }
  const user = currentUserResult?.user;
  if (!user) throw new Error("No authenticated user found");

  let newAvatarUrl = user.user_metadata?.avatar || null;

  // Step 3: Handle avatar update
  if (avatar) {
    const isNewAvatarFile = typeof avatar === "object"; // File or Blob

    if (isNewAvatarFile) {
      // Delete old avatar if exists
      const oldFileName = getFilenameFromUrl(user.user_metadata?.avatar);
      if (oldFileName) {
        try {
          await deleteFile(avatarBucketStorage, oldFileName);
        } catch (err) {
          console.error("Failed to delete old avatar:", err);
        }
      }

      // Upload new avatar
      const fileName = `${avatarName}-${user.id}-${Date.now()}`.replaceAll(
        "/",
        ""
      );
      newAvatarUrl = await uploadFileAndGetPublicUrl(
        avatarBucketStorage,
        fileName,
        avatar
      );
    }
  }

  // Step 4: Save avatar URL into user metadata
  const { data: finalData, error: avatarError } =
    await supabase.auth.updateUser({
      data: { avatar: newAvatarUrl },
    });
  if (avatarError) {
    console.error("updateUser set avatar error:", avatarError);
    throw avatarError;
  }

  return finalData?.user ?? null;
}
