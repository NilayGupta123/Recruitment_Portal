import {CheckCircle2, Briefcase, GraduationCap, Code2} from "lucide-react";
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

  const skills = job.skills || [
    "React",
    "FastAPI",
    "Python",
    "PostgreSQL",
    "Git",
    "REST APIs",
    "Docker",
    "JavaScript",
  ];

  return (
    <div className="space-y-10">
      {/* About */}

      <section className="bg-white rounded-3xl shadow-sm p-10">
        <div className="flex items-center gap-3 mb-6">
          <Briefcase className="text-blue-700" />

          <h2 className="text-3xl font-bold">
            About the Role
          </h2>
        </div>

        <p className="text-gray-600 leading-9 text-lg">
          {job.description}
        </p>

        <p className="text-gray-600 leading-9 text-lg mt-6">
          As part of our engineering team, you'll work on
          real-world products, collaborate with experienced
          professionals, and build scalable software used
          by thousands of users.
        </p>
      </section>

      {/* Responsibilities */}

      <section className="bg-white rounded-3xl shadow-sm p-10">
        <h2 className="text-3xl font-bold mb-8">
          Responsibilities
        </h2>

        <div className="space-y-5">
          {responsibilities.map((item, index) => (
            <div
              key={index}
              className="flex gap-4"
            >
              <CheckCircle2
                className="text-green-600 mt-1"
                size={22}
              />

              <p className="text-gray-700 leading-8">
                {item}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Requirements */}

      <section className="bg-white rounded-3xl shadow-sm p-10">
        <div className="flex items-center gap-3 mb-8">
          <GraduationCap className="text-orange-500" />

          <h2 className="text-3xl font-bold">
            Requirements
          </h2>
        </div>

        <div className="space-y-5">
          {requirements.map((item, index) => (
            <div
              key={index}
              className="flex gap-4"
            >
              <CheckCircle2
                className="text-blue-700 mt-1"
                size={22}
              />

              <p className="text-gray-700 leading-8">
                {item}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}

      <section className="bg-white rounded-3xl shadow-sm p-10">
        <div className="flex items-center gap-3 mb-8">
          <Code2 className="text-purple-600" />

          <h2 className="text-3xl font-bold">
            Skills You'll Use
          </h2>
        </div>

        <div className="flex flex-wrap gap-4">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="bg-blue-50 text-blue-700 px-5 py-3 rounded-full font-medium hover:bg-blue-700 hover:text-white transition"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}