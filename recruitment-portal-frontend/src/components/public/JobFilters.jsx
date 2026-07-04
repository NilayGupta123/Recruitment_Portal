export default function JobFilters({search, setSearch, department, setDepartment, employmentType, setEmploymentType}) {
  return (
    <div className="bg-white rounded-3xl shadow-sm p-7 sticky top-28">

      <h3 className="text-2xl font-bold mb-8">
        Filter Jobs
      </h3>

      <div className="space-y-6">

        <div>

          <label className="text-sm font-semibold">
            Search
          </label>

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Job title..."
            className="mt-2 w-full border rounded-xl px-4 py-3"
          />

        </div>

        <div>

          <label className="text-sm font-semibold">
            Department
          </label>

          <select
            value={department}
            onChange={(e) =>
              setDepartment(e.target.value)
            }
            className="mt-2 w-full border rounded-xl px-4 py-3"
          >

            <option value="">
              All Departments
            </option>

            <option>Engineering</option>

            <option>HR</option>

            <option>Marketing</option>

            <option>Sales</option>

          </select>

        </div>

        <div>

          <label className="text-sm font-semibold">
            Employment Type
          </label>

          <select
            value={employmentType}
            onChange={(e) =>
              setEmploymentType(e.target.value)
            }
            className="mt-2 w-full border rounded-xl px-4 py-3"
          >

            <option value="">
              All Types
            </option>

            <option>Full-Time</option>

            <option>Part-Time</option>

            <option>Internship</option>

            <option>Contract</option>

          </select>

        </div>

      </div>

    </div>
  );
}