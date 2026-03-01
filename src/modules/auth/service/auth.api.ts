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

  signup: async ({
  email,
  password,
  firstName,
  lastName,
  role = "user"
}: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: string;
}) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    // 🔥 إضافة user في Firestore
    await setDoc(doc(db, "users", userCredential.user.uid), {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      firstName,
      lastName,
      role,
      createdAt: new Date().toISOString(),
    });
    return { uid: userCredential.user.uid, email: userCredential.user.email };
  },

  logout: async () => {
    await signOut(auth);
  },
};
