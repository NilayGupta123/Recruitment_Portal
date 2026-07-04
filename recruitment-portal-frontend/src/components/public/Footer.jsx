import {Facebook, Linkedin, Instagram, Twitter, MapPin, Phone, Mail} from "lucide-react";
export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">

      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid lg:grid-cols-4 gap-14">

          {/* Company */}

          <div>

            <div className="flex items-center gap-3">

              <div className="w-14 h-14 rounded-xl bg-blue-600 flex items-center justify-center text-2xl font-bold">

                RP

              </div>

              <div>

                <h2 className="text-2xl font-bold">

                  RecruitPro

                </h2>

                <p className="text-gray-400">

                  Careers Portal

                </p>

              </div>

            </div>

            <p className="mt-6 text-gray-400 leading-8">

              Build your future with us.

              We create technology that empowers
              businesses and people around the world.

            </p>

            <div className="flex gap-4 mt-8">

              {[Facebook, Linkedin, Instagram, Twitter].map(
                (Icon, index) => (
                  <button
                    key={index}
                    className="w-11 h-11 rounded-full bg-slate-800 hover:bg-blue-600 transition flex items-center justify-center"
                  >
                    <Icon size={18} />
                  </button>
                )
              )}

            </div>

          </div>

          {/* Company */}

          <div>

            <h3 className="text-xl font-bold mb-6">

              Company

            </h3>

            <ul className="space-y-4 text-gray-400">

              <li>
                <a href="#about" className="hover:text-white">
                  About Us
                </a>
              </li>

              <li>
                <a href="#jobs" className="hover:text-white">
                  Careers
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white">
                  Our Team
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white">
                  News
                </a>
              </li>

            </ul>

          </div>

          {/* Resources */}

          <div>

            <h3 className="text-xl font-bold mb-6">

              Resources

            </h3>

            <ul className="space-y-4 text-gray-400">

              <li>
                <a href="#" className="hover:text-white">
                  FAQs
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white">
                  Privacy Policy
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white">
                  Terms & Conditions
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white">
                  Contact
                </a>
              </li>

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-xl font-bold mb-6">

              Contact

            </h3>

            <div className="space-y-5">

              <div className="flex gap-4">

                <MapPin className="text-orange-400 mt-1" />

                <p className="text-gray-400">

                  Bangalore, India

                </p>

              </div>

              <div className="flex gap-4">

                <Phone className="text-orange-400 mt-1" />

                <p className="text-gray-400">

                  +91 9876543210

                </p>

              </div>

              <div className="flex gap-4">

                <Mail className="text-orange-400 mt-1" />

                <p className="text-gray-400">

                  careers@recruitpro.com

                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="border-t border-slate-700 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">

          <p className="text-gray-400">

            © {new Date().getFullYear()} RecruitPro.

            All rights reserved.

          </p>

          <p className="text-gray-500 mt-4 md:mt-0">

            Made with ❤️ by RecruitPro

          </p>

        </div>

      </div>

    </footer>
  );
}