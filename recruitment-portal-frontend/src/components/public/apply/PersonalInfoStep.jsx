import {User, Mail, Phone, MapPin} from "lucide-react";
export default function PersonalInfoStep({formData, updateField}) {

  return (

    <div className="space-y-10">

      {/* Heading */}

      <div>

        <h2 className="text-3xl font-bold text-slate-900">

          Personal Information

        </h2>

        <p className="text-gray-500 mt-2">

          Tell us a little about yourself.

        </p>

      </div>

      {/* Form */}

      <div className="grid md:grid-cols-2 gap-8">

        {/* Full Name */}

        <div>

          <label className="font-semibold text-sm">

            Full Name *

          </label>

          <div className="mt-2 flex items-center border rounded-2xl px-4 h-14">

            <User
              className="text-gray-400"
              size={20}
            />

            <input
              type="text"
              value={formData.full_name}
              onChange={(e) =>
                updateField(
                  "full_name",
                  e.target.value
                )
              }
              placeholder="John Doe"
              className="ml-3 w-full outline-none"
            />

          </div>

        </div>

        {/* Email */}

        <div>

          <label className="font-semibold text-sm">

            Email *

          </label>

          <div className="mt-2 flex items-center border rounded-2xl px-4 h-14">

            <Mail
              className="text-gray-400"
              size={20}
            />

            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                updateField(
                  "email",
                  e.target.value
                )
              }
              placeholder="john@gmail.com"
              className="ml-3 w-full outline-none"
            />

          </div>

          <p className="text-xs text-gray-500 mt-2">

            Existing applicants will be detected automatically.

          </p>

        </div>

        {/* Phone */}

        <div>

          <label className="font-semibold text-sm">

            Phone Number *

          </label>

          <div className="mt-2 flex items-center border rounded-2xl px-4 h-14">

            <Phone
              className="text-gray-400"
              size={20}
            />

            <input
              value={formData.phone_number}
              onChange={(e) =>
                updateField(
                  "phone_number",
                  e.target.value
                )
              }
              placeholder="+91 9876543210"
              className="ml-3 w-full outline-none"
            />

          </div>

        </div>

        {/* Address */}

        <div>

          <label className="font-semibold text-sm">

            Address

          </label>

          <div className="mt-2 flex items-center border rounded-2xl px-4 h-14">

            <MapPin
              className="text-gray-400"
              size={20}
            />

            <input
              value={formData.address}
              onChange={(e) =>
                updateField(
                  "address",
                  e.target.value
                )
              }
              placeholder="City, State"
              className="ml-3 w-full outline-none"
            />

          </div>

        </div>

      </div>

      {/* Notice */}

      <div className="rounded-2xl bg-blue-50 border border-blue-100 p-6">

        <h3 className="font-semibold text-blue-700">

          💡 Why do we ask for your email?

        </h3>

        <p className="text-gray-600 mt-3 leading-7">

          We use your email to check whether you've
          applied before. If you've already applied,
          we'll automatically load your profile so you
          don't have to enter everything again.

        </p>

      </div>

    </div>

  );

}