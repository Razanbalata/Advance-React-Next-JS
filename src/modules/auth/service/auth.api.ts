import { auth, db, firebaseConfig } from "@/src/core/firebase/firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  getAuth,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { updatePassword as firebaseUpdatePassword } from "firebase/auth";
import { deleteApp, initializeApp } from "firebase/app";

export const authApi = {
  login: async ({ email, password }: { email: string; password: string }) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return { uid: userCredential.user.uid, email: userCredential.user.email };
  },

  signup: async (data: any) => {
    const { password, confirmPassword, ...rest } = data;
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      password,
    );
    const user = userCredential.user;

    const dataToSave = {
      uid: user.uid,
      ...rest,
      img: null,
      createdAt: new Date().toISOString(),
    };

    // 🔥 إضافة user في Firestore
    await setDoc(doc(db, "users", user.uid), dataToSave);
    return { uid: user.uid, email: user.email };
  },
  changePassword:async(newPass:string)=>{
    if (!auth.currentUser) throw new Error("User not logged in");
    await firebaseUpdatePassword(auth.currentUser,newPass)
    return true
  },
  adminCreateUserApi : async (data: any) => {
  const tempApp = initializeApp(firebaseConfig, `temp-${Date.now()}`);
  const tempAuth = getAuth(tempApp);

  try {
    // إنشاء الحساب في Authentication
    const userCredential = await createUserWithEmailAndPassword(
      tempAuth,
      data.email,
      data.password
    );
    const newUser = userCredential.user;

    // تخزين البيانات في Firestore
    const userDoc = {
      uid: newUser.uid,
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      email: data.email,
      role: data.role || "user",
      gender: data.gender || "",
      address: data.address || "",
      mobile: data.mobile || "",
      createdAt: new Date().toISOString(),
    };

    await setDoc(doc(db, "users", newUser.uid), userDoc);

    // تسجيل الخروج من التطبيق المؤقت وحذفه
    await signOut(tempAuth);
    await deleteApp(tempApp);

    return userDoc;
  } catch (error) {
    await deleteApp(tempApp);
    throw error;
  }
}
,
  logout: async () => {
    await signOut(auth);
  },
};
