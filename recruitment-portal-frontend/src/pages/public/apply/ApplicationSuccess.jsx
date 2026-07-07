import {CheckCircle2, Mail, Search, Users, ArrowRight, Briefcase} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/public/Navbar";
import Footer from "../../../components/public/Footer";
export default function ApplicationSuccess() {
  const navigate = useNavigate();

  const steps = [
    {
      icon: <Mail size={26} />,
      title: "Application Received",
      desc: "We've successfully received your application.",
    },
    {
      icon: <Search size={26} />,
      title: "Application Review",
      desc: "Our recruitment team will review your profile.",
    },
    {
      icon: <Users size={26} />,
      title: "Interview",
      desc: "Shortlisted candidates will be contacted.",
    },
  ];

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-slate-50 py-20">

        <div className="max-w-4xl mx-auto px-6">

          {/* Success Card */}

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

            {/* Header */}

            <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white text-center py-16">

              <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center mx-auto shadow-lg">

                <CheckCircle2
                  size={64}
                  className="text-green-600"
                />

              </div>

              <h1 className="text-4xl font-bold mt-8">

                Application Submitted!

              </h1>

              <p className="mt-4 text-blue-100 text-lg">

                Thank you for applying. We've successfully
                received your application.

              </p>

            </div>

            {/* Body */}

            <div className="p-10">

              {/* Success Message */}

              <div className="bg-green-50 border border-green-200 rounded-2xl p-6">

                <h2 className="text-2xl font-bold text-green-700">

                  🎉 You're all set!

                </h2>

                <p className="text-gray-600 mt-3 leading-8">

                  Our recruitment team will review your
                  application. If your profile matches our
                  requirements, we'll contact you via email
                  or phone.

                </p>

              </div>

              {/* Timeline */}

              <div className="mt-12">

                <h2 className="text-3xl font-bold mb-8">

                  What Happens Next?

                </h2>

                <div className="space-y-6">

                  {steps.map((step, index) => (

                    <div
                      key={index}
                      className="flex gap-6 items-start"
                    >

                      <div className="w-14 h-14 rounded-full bg-blue-700 text-white flex items-center justify-center">

                        {step.icon}

                      </div>

                      <div>

                        <h3 className="font-bold text-xl">

                          {step.title}

                        </h3>

                        <p className="text-gray-600 mt-2">

                          {step.desc}

                        </p>

                      </div>

                    </div>

                  ))}

                </div>

              </div>

              {/* Why Create Account */}

              <div className="mt-12 bg-orange-50 border border-orange-200 rounded-2xl p-8">

                <h2 className="text-2xl font-bold">

                  Create an Account

                </h2>

                <p className="text-gray-600 mt-4 leading-8">

                  Since you've already applied, creating an
                  account lets you:

                </p>

                <ul className="mt-5 space-y-3 text-gray-700">

                  <li>✅ Track your application status</li>

                  <li>✅ Update your resume anytime</li>

                  <li>✅ Apply faster for future jobs</li>

                  <li>✅ View all your applications</li>

                  <li>✅ Manage your profile</li>

                </ul>

              </div>

              {/* Buttons */}

              <div className="grid md:grid-cols-2 gap-6 mt-12">

                <button
                  onClick={() => navigate("/signup")}
                  className="bg-orange-500 hover:bg-orange-600 transition text-white rounded-2xl py-4 text-lg font-semibold flex items-center justify-center gap-3"
                >

                  Create Account

                  <ArrowRight size={20} />

                </button>

                <button
                  onClick={() => navigate("/careers")}
                  className="border-2 border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white transition rounded-2xl py-4 text-lg font-semibold flex items-center justify-center gap-3"
                >

                  <Briefcase size={20} />

                  Browse More Jobs

                </button>

              </div>

            </div>

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}