"use client";
import { Provider, useDispatch } from "react-redux";
import { AppDispatch, store } from "./store";
import { ReactNode, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { setUser, clearUser } from "@/src/modules/auth/model/auth.store";

type Props = {
  children: ReactNode;
};

function AuthInitializer({ children }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        dispatch(
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email!,
            firstName: firebaseUser.displayName?.split(" ")[0] || "User",
            role: "user",
            // إضافة قيم افتراضية للحقول الناقصة
            address: "",
            gender: "",
            mobile: "",
            img: "",
          }),
        );
      } else {
        dispatch(clearUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return <>{children}</>;
}

function ReduxProvider({ children }: Props) {
  return (
    <Provider store={store}>
      <AuthInitializer>{children}</AuthInitializer>
    </Provider>
  );
}

export default ReduxProvider;
