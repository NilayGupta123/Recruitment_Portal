import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  getUsers,
  createUser,
  updateUser,
} from "../../api/usersApi";

import UserDrawer from "../../components/drawers/users/UserDrawer";
import CreateUserDrawer from "../../components/drawers/users/CreateUserDrawer";
import EditUserDrawer from "../../components/drawers/users/EditUserDrawer";

export default function Users() {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [roleFilter, setRoleFilter] = useState("");

  const [selectedUser, setSelectedUser] = useState(null);

  const [editingUser, setEditingUser] = useState(null);

  const [showCreateDrawer, setShowCreateDrawer] =
    useState(false);

  const [showEditDrawer, setShowEditDrawer] =
    useState(false);

  const [creating, setCreating] = useState(false);

  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await getUsers();

      setUsers(response.data);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (data) => {
    try {
      setCreating(true);

      await createUser(data);

      toast.success("User created successfully");

      await loadUsers();

      setShowCreateDrawer(false);
    } catch (error) {
      console.error(error);

      toast.error("Failed to create user");
    } finally {
      setCreating(false);
    }
  };

  const handleUpdateUser = async (
    userId,
    data
  ) => {
    try {
      setUpdating(true);

      await updateUser(userId, data);

      toast.success("User updated successfully");

      await loadUsers();

      setShowEditDrawer(false);

      setEditingUser(null);

      setSelectedUser(null);
    } catch (error) {
      console.error(error);

      toast.error("Failed to update user");
    } finally {
      setUpdating(false);
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.full_name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      user.email
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchesRole =
      roleFilter === "" ||
      user.user_type === roleFilter;

    return matchesSearch && matchesRole;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        Loading...
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">

        {/* Header */}

        <div className="flex justify-between items-center">

          <div>

            <h1 className="text-3xl font-bold text-slate-800">
              Users
            </h1>

            <p className="text-gray-500">
              Manage Admins, HR and Applicants
            </p>

          </div>

          <button
            onClick={() =>
              setShowCreateDrawer(true)
            }
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium"
          >
            + Create User
          </button>

        </div>

        {/* Search */}

        <div className="flex gap-4">

          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="flex-1 border rounded-xl px-4 py-3"
          />

          <select
            value={roleFilter}
            onChange={(e) =>
              setRoleFilter(e.target.value)
            }
            className="border rounded-xl px-4 py-3"
          >
            <option value="">
              All Roles
            </option>

            <option value="ADMIN">
              ADMIN
            </option>

            <option value="HR">
              HR
            </option>

            <option value="APPLICANT">
              APPLICANT
            </option>

          </select>

        </div>

        {/* Table */}

        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

          <table className="w-full">

            <thead className="bg-slate-50">

              <tr>

                <th className="text-left p-4">
                  Name
                </th>

                <th className="text-left p-4">
                  Email
                </th>

                <th className="text-left p-4">
                  Phone
                </th>

                <th className="text-left p-4">
                  Role
                </th>

                <th className="text-center p-4">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredUsers.length === 0 ? (

                <tr>

                  <td
                    colSpan={5}
                    className="text-center py-10 text-gray-500"
                  >
                    No users found
                  </td>

                </tr>

              ) : (

                filteredUsers.map((user) => (

                  <tr
                    key={user.id}
                    className="border-t hover:bg-slate-50 transition"
                  >

                    <td className="p-4 font-medium">
                      {user.full_name}
                    </td>

                    <td className="p-4">
                      {user.email}
                    </td>

                    <td className="p-4">
                      {user.phone_number}
                    </td>

                    <td className="p-4">

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${
                          user.user_type === "ADMIN"
                            ? "bg-red-100 text-red-700"
                            : user.user_type === "HR"
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {user.user_type}
                      </span>

                    </td>

                    <td className="p-4 text-center">

                      <button
                        onClick={() =>
                          setSelectedUser(user)
                        }
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        View
                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* View Drawer */}

      <UserDrawer
        user={selectedUser}
        onClose={() =>
          setSelectedUser(null)
        }
        onEdit={(user) => {
          setEditingUser(user);
          setShowEditDrawer(true);
        }}
      />

      {/* Create Drawer */}

      <CreateUserDrawer
        isOpen={showCreateDrawer}
        onClose={() =>
          setShowCreateDrawer(false)
        }
        onSubmit={handleCreateUser}
        loading={creating}
      />

      {/* Edit Drawer */}

      <EditUserDrawer
        isOpen={showEditDrawer}
        onClose={() => {
          setShowEditDrawer(false);
          setEditingUser(null);
        }}
        user={editingUser}
        onSubmit={handleUpdateUser}
        loading={updating}
      />
    </>
  );
}