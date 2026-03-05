import { AppDispatch } from "@/src/core/providers/store";
import { updateUser } from "@/src/modules/auth";

export const handleProfileUpdate = (
  dispatch: AppDispatch, 
  userUid: string, 
  formData: FormData
) => {
  const updates = Object.fromEntries(formData.entries());
  // نرسل الـ UID والبيانات المحدثة للـ Thunk
  return dispatch(updateUser({ uid: userUid, ...updates }));
};