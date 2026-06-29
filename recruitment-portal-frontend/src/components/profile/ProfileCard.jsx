export default function ProfileCard({
  profile,
  onEdit,
}) {
  if (!profile) return null;

  const initials = profile.full_name
    ? profile.full_name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .substring(0, 2)
        .toUpperCase()
    : "U";

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-8">

      {/* Header */}

      <div className="flex items-center justify-between">

        <h2 className="text-2xl font-bold text-slate-800">
          Personal Information
        </h2>

        <button
          onClick={onEdit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl transition"
        >
          Edit Profile
        </button>

      </div>

      {/* Avatar */}

      <div className="flex items-center gap-6 mt-8">

        <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold">

          {initials}

        </div>

        <div>

          <h3 className="text-2xl font-bold text-slate-800">

            {profile.full_name}

          </h3>

          <p className="text-gray-500 mt-1">

            {profile.user_type}

          </p>

        </div>

      </div>

      {/* Details */}

      <div className="grid grid-cols-2 gap-6 mt-10">

        <div className="bg-slate-50 rounded-xl p-4">

          <p className="text-sm text-gray-500">

            Email

          </p>

          <p className="font-semibold mt-2 break-all">

            {profile.email}

          </p>

        </div>

        <div className="bg-slate-50 rounded-xl p-4">

          <p className="text-sm text-gray-500">

            Phone

          </p>

          <p className="font-semibold mt-2">

            {profile.phone_number || "-"}

          </p>

        </div>

        <div className="bg-slate-50 rounded-xl p-4">

          <p className="text-sm text-gray-500">

            Role

          </p>

          <span
            className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold
            ${
              profile.user_type === "ADMIN"
                ? "bg-red-100 text-red-700"
                : profile.user_type === "HR"
                ? "bg-green-100 text-green-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {profile.user_type}
          </span>

        </div>

        <div className="bg-slate-50 rounded-xl p-4">

          <p className="text-sm text-gray-500">

            User ID

          </p>

          <p className="font-semibold mt-2">

            #{profile.id}

          </p>

        </div>

      </div>

    </div>
  );
}