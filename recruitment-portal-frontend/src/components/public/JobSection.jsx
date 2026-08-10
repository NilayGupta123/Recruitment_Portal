import { useEffect, useMemo, useState } from "react";
import JobCard from "./JobCard";
import { getPublicJobs } from "../../api/publicApi";
import { Field, Input, Label, Select } from "../ui/Input";
import EmptyState from "../ui/EmptyState";

export default function JobSection() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [employmentType, setEmploymentType] = useState("");

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const res = await getPublicJobs();
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        !search || job.title?.toLowerCase().includes(search.toLowerCase());
      const matchesDepartment = !department || job.department === department;
      const matchesEmployment =
        !employmentType || job.employment_type === employmentType;
      return matchesSearch && matchesDepartment && matchesEmployment;
    });
  }, [jobs, search, department, employmentType]);

  const departments = [...new Set(jobs.map((j) => j.department).filter(Boolean))];
  const employmentTypes = [
    ...new Set(jobs.map((j) => j.employment_type).filter(Boolean)),
  ];

  return (
    <section id="jobs" className="bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="mb-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-accent)]">
            Open positions
          </p>
          <h2 className="mt-4 text-[clamp(2rem,4vw,3.1rem)] font-semibold tracking-[-0.035em] text-[var(--color-ink)]">
            Find your next opportunity
          </h2>
          <p className="mt-4 text-[16px] text-[var(--color-ink-secondary)]">
            Explore roles that match your craft and ambition.
          </p>
        </div>

        {loading ? (
          <div className="rounded-[22px] border border-[var(--color-line)] bg-[var(--color-canvas)] px-6 py-20 text-center">
            <p className="text-lg font-semibold text-[var(--color-ink)]">Loading roles…</p>
            <p className="mt-2 text-sm text-[var(--color-ink-secondary)]">
              Fetching the latest openings.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-4">
            <aside>
              <div className="sticky top-28 surface-card p-6">
                <h3 className="text-lg font-semibold tracking-[-0.02em] text-[var(--color-ink)]">
                  Filter roles
                </h3>
                <div className="mt-6 space-y-4">
                  <Field>
                    <Label>Search</Label>
                    <Input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Job title…"
                    />
                  </Field>
                  <Field>
                    <Label>Department</Label>
                    <Select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                    >
                      <option value="">All departments</option>
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </Select>
                  </Field>
                  <Field>
                    <Label>Employment type</Label>
                    <Select
                      value={employmentType}
                      onChange={(e) => setEmploymentType(e.target.value)}
                    >
                      <option value="">All types</option>
                      {employmentTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </Select>
                  </Field>
                </div>
              </div>
            </aside>

            <div className="lg:col-span-3">
              {filteredJobs.length === 0 ? (
                <EmptyState
                  title="No roles found"
                  description="Try adjusting your filters or check back soon for new openings."
                />
              ) : (
                <div className="grid gap-5 md:grid-cols-2">
                  {filteredJobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
