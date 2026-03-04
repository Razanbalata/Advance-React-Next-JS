import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "../service/auth.api";
import { setUser, setLoading, setError, logout } from "./auth.store";
import { db } from "@/src/core/firebase/firebaseConfig";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { AuthUser, LoginPayload, SignupPayload } from "../types";



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
      createdAt: data.createdAt ? (data.createdAt instanceof Date ? data.createdAt.toISOString() : data.createdAt) : new Date().toISOString(),
      gender:data.gender || '',
      address:data.address || '',
      img:data.img || '',
      mobile:data.mobile || ''
    } as AuthUser;
  }
)

export const authLogic = createAsyncThunk
<
any,
LoginPayload
>(
  "auth/loginUser",
  async (credentials, { dispatch }) => {
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

export const signUser = createAsyncThunk<
any,
SignupPayload
>(
  "auth/signUser",
  async (data, { dispatch }) => {
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

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (data: Partial<AuthUser> & { uid: string }) => {
    const { uid, ...updates } = data;

    const docRef = doc(db, "users", uid);
    await updateDoc(docRef, updates);

    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) throw new Error("User not found");

    const rawData = docSnap.data();

    return {
      ...rawData,
      createdAt: rawData?.createdAt?.toDate?.().toISOString() || null,
    } as AuthUser;
  }
);
export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (newPassword: string, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await authApi.changePassword(newPassword);
      return true;
    } catch (error: any) {
      dispatch(setError(error.message));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
)

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { dispatch }) => {
    await authApi.logout();
    dispatch(logout());
  },
);
