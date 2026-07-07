import { useEffect, useMemo, useState } from "react";
import JobCard from "./JobCard";
import JobFilters from "./JobFilters";
import { getPublicJobs } from "../../api/publicApi";
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

      // if API returns array
      setJobs(res.data);

      // If your API returns {jobs:[]}
      // setJobs(res.data.jobs);

      // If your API returns {items:[]}
      // setJobs(res.data.items);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        !search ||
        job.title?.toLowerCase().includes(search.toLowerCase());

      const matchesDepartment =
        !department || job.department === department;

      const matchesEmployment =
        !employmentType ||
        job.employment_type === employmentType;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesEmployment
      );
    });
  }, [jobs, search, department, employmentType]);

  // Generate filter options dynamically
  const departments = [
    ...new Set(jobs.map((j) => j.department).filter(Boolean)),
  ];

  const employmentTypes = [
    ...new Set(jobs.map((j) => j.employment_type).filter(Boolean)),
  ];

  if (loading) {
    return (
      <section
        id="jobs"
        className="py-28 bg-slate-100"
      >
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center">

            <h2 className="text-5xl font-bold">

              Loading Jobs...

            </h2>

            <p className="text-gray-500 mt-6">

              Please wait...

            </p>

          </div>

        </div>
      </section>
    );
  }

  return (
    <section
      id="jobs"
      className="py-28 bg-slate-100"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <p className="uppercase tracking-[6px] text-orange-500 font-semibold">

            Open Positions

          </p>

          <h2 className="text-5xl font-bold mt-4">

            Find Your Next Opportunity

          </h2>

          <p className="text-gray-600 mt-5 text-lg">

            Explore our latest opportunities.

          </p>

        </div>

        <div className="grid lg:grid-cols-4 gap-10">

          {/* Filters */}

          <div>

            <div className="bg-white rounded-3xl shadow-sm p-7 sticky top-28">

              <h3 className="text-2xl font-bold mb-8">

                Filter Jobs

              </h3>

              <div className="space-y-6">

                <div>

                  <label className="font-semibold">

                    Search

                  </label>

                  <input
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    placeholder="Search..."
                    className="w-full border rounded-xl px-4 py-3 mt-2"
                  />

                </div>

                <div>

                  <label className="font-semibold">

                    Department

                  </label>

                  <select
                    value={department}
                    onChange={(e) =>
                      setDepartment(e.target.value)
                    }
                    className="w-full border rounded-xl px-4 py-3 mt-2"
                  >

                    <option value="">

                      All Departments

                    </option>

                    {departments.map((dept) => (

                      <option
                        key={dept}
                        value={dept}
                      >

                        {dept}

                      </option>

                    ))}

                  </select>

                </div>

                <div>

                  <label className="font-semibold">

                    Employment Type

                  </label>

                  <select
                    value={employmentType}
                    onChange={(e) =>
                      setEmploymentType(e.target.value)
                    }
                    className="w-full border rounded-xl px-4 py-3 mt-2"
                  >

                    <option value="">

                      All Types

                    </option>

                    {employmentTypes.map((type) => (

                      <option
                        key={type}
                        value={type}
                      >

                        {type}

                      </option>

                    ))}

                  </select>

                </div>

              </div>

            </div>

          </div>

          {/* Job Cards */}

          <div className="lg:col-span-3">

            {filteredJobs.length === 0 ? (

              <div className="bg-white rounded-3xl p-16 text-center shadow">

                <h2 className="text-3xl font-bold">

                  No Jobs Found

                </h2>

                <p className="text-gray-500 mt-5">

                  Try changing the filters.

                </p>

              </div>

            ) : (

              <div className="grid md:grid-cols-2 gap-8">

                {filteredJobs.map((job) => (

                  <JobCard
                    key={job.id}
                    job={job}
                  />

                ))}

              </div>

            )}

          </div>

        </div>

      </div>

    </section>
  );
}