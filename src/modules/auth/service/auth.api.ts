import { auth, db } from "@/src/core/firebase/firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
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
    const { password, confrimPassword, ...rest } = data;
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

  logout: async () => {
    await signOut(auth);
  },
};
