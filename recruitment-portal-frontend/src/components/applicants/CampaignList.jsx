import { FaBullhorn } from "react-icons/fa";

export default function CampaignList({
  campaigns,
  selectedCampaign,
  onSelect,
}) {
  return (
    <div className="bg-white rounded-xl shadow border h-full">

      <div className="p-4 border-b">

        <h2 className="font-bold text-lg">
          Campaigns
        </h2>

      </div>

      <div className="overflow-y-auto max-h-[650px]">

        {campaigns.map((campaign) => (

          <button
            key={campaign.id}
            onClick={() => onSelect(campaign)}
            className={`w-full text-left px-4 py-3 border-b hover:bg-blue-50 transition

            ${
              selectedCampaign?.id === campaign.id
                ? "bg-blue-100 border-l-4 border-blue-600"
                : ""
            }`}
          >

            <div className="flex items-center gap-3">

              <FaBullhorn className="text-blue-600" />

              <div>

                <div className="font-semibold">

                  {campaign.title}

                </div>

                <div className="text-xs text-gray-500">

                  {campaign.status}

                </div>

              </div>

            </div>

          </button>

        ))}

      </div>

    </div>
  );
}