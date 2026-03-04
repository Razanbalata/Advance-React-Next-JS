"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootType } from "@/src/core/providers/store";
import { useRouter } from "next/navigation";

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

  // تحقق إذا كان الادمن
  useEffect(() => {
    if (!currentUser || currentUser.role !== "admin") {
      router.push("/login");
    }
  }, [currentUser, router]);

  // جلب بيانات المستخدمين (محاكاة fetch)
  useEffect(() => {
    // هنا بدل API call
    const fetchUsers = async () => {
      // مثال بيانات ثابتة، استبدلها بAPI حقيقي أو Firebase
      const dummyUsers: User[] = [
        {
          id: "1",
          firstName: "Razan",
          lastName: "Balata",
          username: "roz",
          email: "razan1@test.com",
          gender: "female",
          address: "Gaza",
          mobile: "0595485130",
          altmobile: "123123",
          role: "user",
        },
        {
          id: "2",
          firstName: "Ali",
          lastName: "Khalil",
          username: "ali123",
          email: "ali@test.com",
          gender: "male",
          address: "Nablus",
          mobile: "0591234567",
          altmobile: "",
          role: "user",
        },
      ];
      setUsers(dummyUsers);
    };

    fetchUsers();
  }, []);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-60 bg-[#09674eff] text-white p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <button
          className="mb-3 p-2 rounded hover:bg-[#085a54]"
          onClick={() => router.push("/admin/dashboard")}
        >
          Info Admin
        </button>
        <button
          className="mb-3 p-2 rounded hover:bg-[#085a54]"
          onClick={() => router.push("/admin/users_table")}
        >
          Setting
        </button>
        <button
          className="mt-auto bg-red-600 p-2 rounded hover:bg-red-700"
          onClick={() => router.push("/logout")}
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
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
          <table className="w-full bg-white rounded-lg shadow overflow-hidden">
            <thead className="bg-gray-200">
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
                  <td className="p-3">{user.firstName + " " + user.lastName}</td>
                  <td className="p-3">{user.username}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.gender}</td>
                  <td className="p-3">{user.address}</td>
                  <td className="p-3">{user.mobile}</td>
                  <td className="p-3">{user.altmobile || "-"}</td>
                  <td className="p-3">{user.role}</td>
                  <td className="p-3 flex flex-col gap-1">
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                      onClick={() => router.push(`/admin/edit_user/${user.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
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