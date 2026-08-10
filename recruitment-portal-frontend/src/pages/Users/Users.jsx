import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Plus } from "lucide-react";

import { getUsers, createUser, updateUser } from "../../api/usersApi";

import UserDrawer from "../../components/drawers/users/UserDrawer";
import CreateUserDrawer from "../../components/drawers/users/CreateUserDrawer";
import EditUserDrawer from "../../components/drawers/users/EditUserDrawer";
import PageHeader from "../../components/ui/PageHeader";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import { Input, Select } from "../../components/ui/Input";
import {
  TableShell,
  Table,
  THead,
  Th,
  TBody,
  Tr,
  Td,
} from "../../components/ui/Table";
import { TableLoadingRow } from "../../components/ui/LoadingState";

const roleTone = {
  ADMIN: "danger",
  HR: "success",
  APPLICANT: "brand",
};

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [showCreateDrawer, setShowCreateDrawer] = useState(false);
  const [showEditDrawer, setShowEditDrawer] = useState(false);
  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
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

  const handleUpdateUser = async (userId, data) => {
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
      user.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "" || user.user_type === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <>
      <div className="space-y-6">
        <PageHeader
          title="Users"
          description="Manage admins, HR, and applicants."
          actions={
            <Button onClick={() => setShowCreateDrawer(true)}>
              <Plus size={18} />
              Create user
            </Button>
          }
        />

        <div className="flex flex-col gap-3 rounded-[18px] border border-[var(--color-line)] bg-white/80 p-3 sm:flex-row sm:items-center">
          <Input
            type="text"
            placeholder="Search users…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1"
            disabled={loading}
          />
          <Select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="sm:max-w-[180px]"
            disabled={loading}
          >
            <option value="">All roles</option>
            <option value="ADMIN">ADMIN</option>
            <option value="HR">HR</option>
            <option value="APPLICANT">APPLICANT</option>
          </Select>
        </div>

        <TableShell>
          <Table>
            <THead>
              <tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Phone</Th>
                <Th>Role</Th>
              </tr>
            </THead>
            <TBody>
              {loading ? (
                <TableLoadingRow colSpan={4} label="Loading users…" />
              ) : filteredUsers.length === 0 ? (
                <Tr>
                  <Td
                    colSpan={4}
                    className="py-10 text-center text-[var(--color-ink-secondary)]"
                  >
                    No users found
                  </Td>
                </Tr>
              ) : (
                filteredUsers.map((user) => (
                  <Tr key={user.id} onClick={() => setSelectedUser(user)}>
                    <Td className="font-semibold">{user.full_name}</Td>
                    <Td>{user.email}</Td>
                    <Td>{user.phone_number || "—"}</Td>
                    <Td>
                      <Badge tone={roleTone[user.user_type] || "default"}>
                        {user.user_type}
                      </Badge>
                    </Td>
                  </Tr>
                ))
              )}
            </TBody>
          </Table>
        </TableShell>
      </div>

      <UserDrawer
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
        onEdit={(user) => {
          setEditingUser(user);
          setShowEditDrawer(true);
        }}
      />

      <CreateUserDrawer
        isOpen={showCreateDrawer}
        onClose={() => setShowCreateDrawer(false)}
        onSubmit={handleCreateUser}
        loading={creating}
      />

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
