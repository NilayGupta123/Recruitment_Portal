import { CheckCircle2, Briefcase, GraduationCap, Code2 } from "lucide-react";
import Card from "../../ui/Card";
import Badge from "../../ui/Badge";

export default function JobDescription({ job }) {
  const responsibilities = job.responsibilities
    ? job.responsibilities.split("\n")
    : [
        "Design, develop and maintain high-quality software applications.",
        "Collaborate with cross-functional teams to deliver scalable solutions.",
        "Write clean, maintainable and well-tested code.",
        "Participate in code reviews and technical discussions.",
        "Troubleshoot production issues and improve system performance.",
      ];

  const requirements = job.requirements
    ? job.requirements.split("\n")
    : [
        `${job.experience_required || 2}+ years of relevant experience.`,
        "Strong problem-solving and analytical skills.",
        "Excellent communication and teamwork abilities.",
        "Experience with modern development tools and workflows.",
        "Passion for learning new technologies.",
      ];

  const skills = Array.isArray(job.skills)
    ? job.skills.map((s) => (typeof s === "string" ? s : s.skill_name)).filter(Boolean)
    : ["React", "FastAPI", "Python", "PostgreSQL", "Git", "REST APIs"];

  return (
    <div className="space-y-5">
      <Card className="p-7 sm:p-8">
        <div className="mb-5 flex items-center gap-2.5">
          <Briefcase className="text-[var(--color-brand)]" size={20} />
          <h2 className="text-2xl font-semibold tracking-[-0.025em] text-[var(--color-ink)]">
            About the role
          </h2>
        </div>
        {job.description?.includes("<") ? (
          <div
            className="prose max-w-none text-[15px] leading-8 text-[var(--color-ink-secondary)]"
            dangerouslySetInnerHTML={{ __html: job.description }}
          />
        ) : (
          <p className="text-[15px] leading-8 text-[var(--color-ink-secondary)]">
            {job.description}
          </p>
        )}
      </Card>

      <Card className="p-7 sm:p-8">
        <h2 className="mb-6 text-2xl font-semibold tracking-[-0.025em] text-[var(--color-ink)]">
          Responsibilities
        </h2>
        <div className="space-y-4">
          {responsibilities.map((item, index) => (
            <div key={index} className="flex gap-3">
              <CheckCircle2 className="mt-0.5 text-[var(--color-success)]" size={18} />
              <p className="text-[15px] leading-7 text-[var(--color-ink-secondary)]">
                {item}
              </p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-7 sm:p-8">
        <div className="mb-6 flex items-center gap-2.5">
          <GraduationCap className="text-[var(--color-accent)]" size={20} />
          <h2 className="text-2xl font-semibold tracking-[-0.025em] text-[var(--color-ink)]">
            Requirements
          </h2>
        </div>
        <div className="space-y-4">
          {requirements.map((item, index) => (
            <div key={index} className="flex gap-3">
              <CheckCircle2 className="mt-0.5 text-[var(--color-brand)]" size={18} />
              <p className="text-[15px] leading-7 text-[var(--color-ink-secondary)]">
                {item}
              </p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-7 sm:p-8">
        <div className="mb-6 flex items-center gap-2.5">
          <Code2 className="text-[#5e5ce6]" size={20} />
          <h2 className="text-2xl font-semibold tracking-[-0.025em] text-[var(--color-ink)]">
            Skills you’ll use
          </h2>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {skills.map((skill, index) => (
            <Badge key={index} tone="brand" className="px-3.5 py-2 text-sm">
              {skill}
            </Badge>
          ))}
        </div>
      </Card>
    </div>
  );
}
