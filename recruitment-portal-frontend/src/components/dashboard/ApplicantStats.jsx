import { FileText, CheckCircle2, CalendarCheck, Award } from "lucide-react";
import StatCard from "../ui/StatCard";

export default function ApplicantStats({ stats }) {
  const cards = [
    { title: "Applied", value: stats.applied, icon: <FileText size={20} /> },
    {
      title: "Shortlisted",
      value: stats.shortlisted,
      icon: <CheckCircle2 size={20} />,
    },
    {
      title: "Interview",
      value: stats.interview,
      icon: <CalendarCheck size={20} />,
    },
    { title: "Selected", value: stats.selected, icon: <Award size={20} /> },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <StatCard
          key={card.title}
          title={card.title}
          value={card.value}
          icon={card.icon}
        />
      ))}
    </div>
  );
}
