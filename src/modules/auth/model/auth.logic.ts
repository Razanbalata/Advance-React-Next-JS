import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "../service/auth.api";
import { setUser, setLoading, setError, logout } from "./auth.store";
import { db } from "@/src/core/firebase/firebaseConfig";
import { getDoc, doc } from "firebase/firestore";
import { AuthUser } from "../types";


export const fetchUser = createAsyncThunk(
  "auth/fetchUserData",
  async (uid:string)=>{
   const docRef = doc(db,"users",uid)
   const docSnap = await getDoc(docRef)
   if(!docSnap.exists())throw new Error("User not found in Firestore");
   const data = docSnap.data()

       return {
      uid: data.uid,
      email: data.email,
      firstName: data.firstName || "",
      lastName: data.lastName || "",
      role: data.role || "user",
      createdAt: data.createdAt ? (data.createdAt instanceof Date ? data.createdAt.toISOString() : data.createdAt) : new Date().toISOString()
    } as AuthUser;
  }
)

export const authLogic = createAsyncThunk(
  "auth/loginUser",
  async (credentials: { email: string; password: string }, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const user = await authApi.login(credentials);
      const fullUserData = await dispatch(fetchUser(user.uid)).unwrap();
      dispatch(setUser(fullUserData));
      return fullUserData;
    } catch (error: any) {
      dispatch(setError(error.message));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  },
);

export const signUser = createAsyncThunk(
  "auth/signUser",
  async (data: { email: string; password: string ,firstName:string, lastName:string, role:string}, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const user = await authApi.signup(data);
      const fullUserData = await dispatch(fetchUser(user.uid)).unwrap();
      dispatch(setUser(fullUserData));
      return fullUserData;
    } catch (error: any) {
      dispatch(setError(error.message));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { dispatch }) => {
    await authApi.logout();
    dispatch(logout());
  },
);
