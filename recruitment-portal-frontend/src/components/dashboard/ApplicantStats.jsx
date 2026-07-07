import {
  FaFileAlt,
  FaCheckCircle,
  FaUserCheck,
  FaAward,
} from "react-icons/fa";

export default function ApplicantStats({
  stats,
}) {
  const cards = [
    {
      title: "Applied Jobs",
      value: stats.applied,
      icon: <FaFileAlt />,
      color: "bg-blue-500",
    },

    {
      title: "Shortlisted",
      value: stats.shortlisted,
      icon: <FaCheckCircle />,
      color: "bg-yellow-500",
    },

    {
      title: "Interview",
      value: stats.interview,
      icon: <FaUserCheck />,
      color: "bg-purple-500",
    },

    {
      title: "Selected",
      value: stats.selected,
      icon: <FaAward />,
      color: "bg-green-500",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-6">

      {cards.map((card) => (

        <div
          key={card.title}
          className="bg-white rounded-xl shadow border p-6"
        >

          <div className="flex justify-between">

            <div>

              <p className="text-gray-500">

                {card.title}

              </p>

              <h2 className="text-4xl font-bold mt-2">

                {card.value}

              </h2>

            </div>

            <div
              className={`${card.color} text-white p-4 rounded-xl`}
            >
              {card.icon}
            </div>

          </div>

        </div>

      ))}

    </div>
  );
}