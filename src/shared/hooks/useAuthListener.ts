'use client'

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/src/core/firebase/firebaseConfig";
import { useDispatch } from "react-redux";
import { clearUser } from "@/src/modules/auth/model/auth.store";
import { fetchUser } from "@/src/modules/auth";
import { AppDispatch } from "@/src/core/providers/store";

export function useAuthListener() {

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {

 const unsubscribe = onAuthStateChanged(auth, (user) => {

  console.log("Firebase user:", user);

  if (user) {
    console.log("Dispatch fetchUser:", user.uid);
    dispatch(fetchUser(user.uid));
  } else {
    dispatch(clearUser());
  }

});

    return () => unsubscribe();

  }, [dispatch]);
}