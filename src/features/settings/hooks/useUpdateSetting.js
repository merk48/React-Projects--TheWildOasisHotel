import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  readSettingsKey,
  updateSettingKey,
} from "../../../utils/constants/queryConstants";
import { updateSetting as updateSettingApi } from "../../../services/apiSettings";

export function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateSetting } = useMutation({
    mutationKey: [updateSettingKey],
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("Settings successfully updated");
      // refetch data => invalidating cache => stale
      queryClient.invalidateQueries({
        queryKey: [readSettingsKey],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateSetting };
}
