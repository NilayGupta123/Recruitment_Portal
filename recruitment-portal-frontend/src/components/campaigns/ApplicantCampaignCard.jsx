import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";

const statusColor = {
  DRAFT: "bg-gray-100 text-gray-700",
  PUBLISHED: "bg-green-100 text-green-700",
  CLOSED: "bg-red-100 text-red-700",
};

export default function ApplicantCampaignCard({
  campaign,
  onOpen,
}) {
  return (
    <div className="bg-white rounded-2xl shadow border hover:shadow-lg transition overflow-hidden">

      {/* Header */}

      <div className="p-6">

        <div className="flex justify-between items-start">

          <div>

            <h2 className="text-xl font-bold text-slate-800">
              {campaign.title}
            </h2>

            <p className="text-sm text-gray-500 mt-2 line-clamp-3">
              {campaign.description ||
                "No description available."}
            </p>

          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              statusColor[campaign.status] ||
              "bg-gray-100 text-gray-700"
            }`}
          >
            {campaign.status}
          </span>

        </div>

      </div>

      {/* Body */}

      <div className="px-6 pb-5 space-y-3">

        <div className="flex items-center gap-3 text-gray-600">

          <FaMapMarkerAlt className="text-blue-600" />

          <span>
            {campaign.location || "Remote"}
          </span>

        </div>

        <div className="flex items-center gap-3 text-gray-600">

          <FaCalendarAlt className="text-green-600" />

          <span>

            {campaign.start_date
              ? new Date(
                  campaign.start_date
                ).toLocaleDateString()
              : "-"}

            {"  "} - {"  "}

            {campaign.end_date
              ? new Date(
                  campaign.end_date
                ).toLocaleDateString()
              : "-"}

          </span>

        </div>

      </div>

      {/* Footer */}

      <div className="border-t p-5">

        <button
          onClick={onOpen}
          className="w-full flex justify-center items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
        >

          View Jobs

          <FaArrowRight />

        </button>

      </div>

    </div>
  );
}