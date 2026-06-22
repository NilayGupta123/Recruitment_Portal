import { useAuth } from "../../context/AuthContext";

export default function CampaignDrawer({
  campaign,
  onClose,
  onEdit,
}) {
  const { user } = useAuth();

  if (!campaign) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-end z-50">
      <div className="w-[600px] h-full bg-white shadow-xl p-6 overflow-y-auto">

        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-2xl font-bold">
            Campaign Details
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 text-xl"
          >
            ✕
          </button>
        </div>

        <div className="space-y-5">

          <div>
            <p className="text-sm text-gray-500">
              Title
            </p>
            <p className="font-semibold">
              {campaign.title}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Status
            </p>
            <p>{campaign.status}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Location
            </p>
            <p>{campaign.location}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Start Date
            </p>
            <p>{campaign.start_date}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              End Date
            </p>
            <p>{campaign.end_date}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Description
            </p>
            <p>{campaign.description}</p>
          </div>

        </div>

        {(user?.user_type === "ADMIN" ||
          user?.user_type === "HR") && (
          <button
            onClick={() => onEdit(campaign)}
            className="w-full mt-8 bg-blue-600 text-white py-3 rounded-xl"
          >
            Edit Campaign
          </button>
        )}

      </div>
    </div>
  );
}