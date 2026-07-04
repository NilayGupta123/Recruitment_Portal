import {Search, MapPin, Briefcase} from "lucide-react";
export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center"
    >

      {/* Background */}

      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600')",
        }}
      />

      {/* Overlay */}

      <div className="absolute inset-0 bg-slate-900/60" />

      {/* Content */}

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">

        <div className="max-w-3xl">

          <p className="uppercase tracking-[6px] text-orange-400 font-semibold mb-6">

            Build Your Future

          </p>

          <h1 className="text-6xl md:text-7xl font-extrabold text-white leading-tight">

            Find Your Dream
            <br />

            Career With Us

          </h1>

          <p className="mt-8 text-xl text-gray-200 leading-8">

            Join a team where innovation,
            collaboration and growth come
            together to shape the future.

          </p>

        </div>

        {/* Search Card */}

        <div className="mt-16 bg-white rounded-3xl shadow-2xl p-6">

          <div className="grid lg:grid-cols-4 gap-5">

            {/* Search */}

            <div className="border rounded-2xl px-5 py-4 flex items-center gap-4">

              <Search
                size={20}
                className="text-gray-500"
              />

              <div className="w-full">

                <p className="text-xs text-gray-500">

                  Search

                </p>

                <input
                  placeholder="Job title"
                  className="outline-none w-full font-medium"
                />

              </div>

            </div>

            {/* Location */}

            <div className="border rounded-2xl px-5 py-4 flex items-center gap-4">

              <MapPin
                size={20}
                className="text-gray-500"
              />

              <div className="w-full">

                <p className="text-xs text-gray-500">

                  Location

                </p>

                <input
                  placeholder="Anywhere"
                  className="outline-none w-full font-medium"
                />

              </div>

            </div>

            {/* Department */}

            <div className="border rounded-2xl px-5 py-4 flex items-center gap-4">

              <Briefcase
                size={20}
                className="text-gray-500"
              />

              <div className="w-full">

                <p className="text-xs text-gray-500">

                  Department

                </p>

                <select className="outline-none w-full font-medium bg-transparent">

                  <option>
                    All Departments
                  </option>

                  <option>
                    Engineering
                  </option>

                  <option>
                    HR
                  </option>

                  <option>
                    Marketing
                  </option>

                </select>

              </div>

            </div>

            {/* Button */}

            <button className="rounded-2xl bg-orange-500 hover:bg-orange-600 transition text-white font-semibold text-lg">

              FIND YOUR ROLE

            </button>

          </div>

        </div>

      </div>

    </section>
  );
}