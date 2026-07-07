import { useAuth } from "../../../context/AuthContext";

export default function UserDrawer({
  user,
  onClose,
  onEdit,
}) {
  const { user: currentUser } = useAuth();

  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-end z-50">
      <div className="w-[600px] h-full bg-white shadow-xl overflow-y-auto">

        <div className="flex justify-between items-center p-6 border-b">

          <h2 className="text-2xl font-bold">
            User Details
          </h2>

          <button
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>

        </div>

        <div className="p-6 space-y-6">

          <div>
            <p className="text-sm text-gray-500">
              Full Name
            </p>

            <p className="font-semibold text-lg">
              {user.full_name}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Email
            </p>

            <p>{user.email}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Phone Number
            </p>

            <p>{user.phone_number || "-"}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Role
            </p>

            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-semibold
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
          </div>

        </div>

        {currentUser?.user_type === "ADMIN" && (
          <div className="p-6 border-t">
            <button
              onClick={() => onEdit(user)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium"
            >
              Edit User
            </button>
          </div>
        )}

      </div>
    </div>
  );
}