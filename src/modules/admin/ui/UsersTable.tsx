"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootType } from "@/src/core/providers/store";
import { useRouter } from "next/navigation";
import { Delete, Edit } from "lucide-react";
import { EditProfileForm } from "../../user";
import { deleteUser } from "../../auth";
import { db } from "@/src/core/firebase/firebaseConfig"; // تأكدي من استيراد db
import { collection, getDocs } from "firebase/firestore";
import { handleProfileUpdate } from "@/src/shared/config/auth.logic";

// نوع المستخدم
interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  gender: string;
  address: string;
  mobile: string;
  altmobile?: string;
  role: string;
}

const AdminDashboard: React.FC = () => {
  const router = useRouter();
  const currentUser = useSelector((state: RootType) => state.auth.user);
  const [users, setUsers] = useState<User[]>([]);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  // تحقق إذا كان الادمن
  useEffect(() => {
    if (!currentUser || currentUser.role !== "admin") {
      router.push("/login");
    }
  }, [currentUser, router]);

  const fetchUsers = async () => {
    try {
      const querySnapShot = await getDocs(collection(db, "users"));
      const userData = querySnapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as User[];
      setUsers(userData);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  // جلب بيانات المستخدمين (محاكاة fetch)
  useEffect(() => {
    fetchUsers();
  }, []);
  console.log(users);
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  async function handleSave(formData: FormData) {
    if (selectedUser) {
      await handleProfileUpdate(dispatch, selectedUser.id, formData);
    }
  }

  return (
    <div className="flex min-h-screen w-[88%] m-auto">
      {/* Main Content */}
      <div className="flex-1 py-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">User List</h1>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => router.push("/admin/add_user")}
          >
            Add New User
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full rounded-lg shadow overflow-hidden bg-green-50 dark:bg-green-900/10">
            <thead className="bg-green-100 dark:bg-green-900/20">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Full Name</th>
                <th className="p-3">Username</th>
                <th className="p-3">Email</th>
                <th className="p-3">Gender</th>
                <th className="p-3">Address</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Alt Phone</th>
                <th className="p-3">Role</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id} className="border-b">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">
                    {user.firstName + " " + user.lastName}
                  </td>
                  <td className="p-3">{user.username}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.gender}</td>
                  <td className="p-3">{user.address}</td>
                  <td className="p-3">{user.mobile}</td>
                  <td className="p-3">{user.altmobile || "-"}</td>
                  <td className="p-3">{user.role}</td>
                  <td className="p-3 flex flex-1 gap-0.5">
                    <button
                      className=" text-green-400 px-2 py-1 rounded hover:text-green-600 cursor-pointer transition-colors duration-300"
                      onClick={() => { setSelectedUser(user); setOpen(true); }}
                    >
                      <Edit />
                    </button>
                    <button
                      className=" text-red-500 px-2 py-1 rounded hover:text-red-600 cursor-pointer transition-colors duration-300"
                      onClick={() => handleDelete(user.id)}
                    >
                      <Delete />
                    </button>
                  </td>
                  <EditProfileForm
                    open={open}
                    onClose={() => setOpen(false)}
                    onSave={handleSave}
                    user={user}
                  />
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={10} className="text-center p-4">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
