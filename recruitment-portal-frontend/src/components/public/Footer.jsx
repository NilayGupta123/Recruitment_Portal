import { Facebook, Linkedin, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0b1220] text-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-brand)] text-lg font-bold">
                RP
              </div>
              <div>
                <h2 className="text-xl font-semibold tracking-[-0.02em]">RecruitPro</h2>
                <p className="text-sm text-white/50">Careers portal</p>
              </div>
            </div>
            <p className="mt-6 max-w-sm text-[15px] leading-7 text-white/55">
              Build your future with us. We create technology that empowers businesses
              and people around the world.
            </p>
            <div className="mt-7 flex gap-2.5">
              {[Facebook, Linkedin, Instagram, Twitter].map((Icon, index) => (
                <button
                  key={index}
                  type="button"
                  className="pressable flex h-10 w-10 items-center justify-center rounded-full bg-white/8 text-white/80 hover:bg-[var(--color-brand)] hover:text-white"
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.1em] text-white/45">
              Company
            </h3>
            <ul className="space-y-3 text-[15px] text-white/65">
              <li><a href="#about" className="hover:text-white">About us</a></li>
              <li><a href="#jobs" className="hover:text-white">Careers</a></li>
              <li><a href="#benefits" className="hover:text-white">Benefits</a></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.1em] text-white/45">
              Resources
            </h3>
            <ul className="space-y-3 text-[15px] text-white/65">
              <li><a href="/login" className="hover:text-white">Sign in</a></li>
              <li><a href="/signup" className="hover:text-white">Create account</a></li>
              <li><a href="#jobs" className="hover:text-white">Open roles</a></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.1em] text-white/45">
              Contact
            </h3>
            <div className="space-y-4 text-[15px] text-white/65">
              <div className="flex gap-3">
                <MapPin className="mt-0.5 text-[var(--color-accent)]" size={18} />
                <p>Bangalore, India</p>
              </div>
              <div className="flex gap-3">
                <Phone className="mt-0.5 text-[var(--color-accent)]" size={18} />
                <p>+91 9876543210</p>
              </div>
              <div className="flex gap-3">
                <Mail className="mt-0.5 text-[var(--color-accent)]" size={18} />
                <p>careers@recruitpro.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-7 text-sm text-white/40 md:flex-row">
          <p>© {new Date().getFullYear()} RecruitPro. All rights reserved.</p>
          <p>Designed for clarity and craft.</p>
        </div>
      </div>
    </footer>
  );
}
