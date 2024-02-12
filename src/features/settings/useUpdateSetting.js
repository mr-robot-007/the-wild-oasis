import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingAPI } from "../../services/apiSettings";

// without passing data
export function useUpdateSetting() {
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate: updateSetting } = useMutation({
    mutationFn: updateSettingAPI,
    onSuccess: () => {
      toast.success("Setting Updated Successfully");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isUpdating, updateSetting };
}

// with data passing
// export function useUpdateSetting() {
//   const queryClient = useQueryClient();
//   const { isLoading: isUpdating, mutate: updateSetting } = useMutation({
//     mutationFn: ( newsettingData ) => updateSettingAPI(newsettingData),
//     onSuccess: () => {
//       toast.success("Setting Updated Successfully");
//       queryClient.invalidateQueries({
//         queryKey: ["settings"],
//       });
//     },
//     onError: (err) => toast.error(err.message),
//   });
//   return { isUpdating, updateSetting };
// }
